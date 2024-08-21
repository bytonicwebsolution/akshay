document.querySelectorAll(".myButton").forEach(function (e) {
    e.addEventListener("click", function () {
        var e = document.getElementById("propertyFilters");
        e.style.display = "none" === e.style.display ? "block" : "none";
    });
});
var previewTemplate,
    dropzone,
    dropzonePreviewNode = document.querySelector("#property-preview-list"),
    url =
        ((dropzonePreviewNode.id = ""),
        dropzonePreviewNode &&
            ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
            dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
            (dropzone = new Dropzone(".property-dropzone", {
                url: "https://httpbin.org/post",
                method: "post",
                previewTemplate: previewTemplate,
                previewsContainer: "#property-preview",
            }))),
        "assets/json/"),
    propertyListData = "",
    editList = !1,
    prevButton = document.getElementById("page-prev"),
    nextButton = document.getElementById("page-next"),
    currentPage = 1,
    itemsPerPage = 8,
    getJSON = function (e, t) {
        var r = new XMLHttpRequest();
        r.open("GET", url + e, !0),
            (r.responseType = "json"),
            (r.onload = function () {
                var e = r.status;
                t(200 === e ? null : e, r.response);
            }),
            r.send();
    };
function loadPropertyList(e, t) {
    var r = Math.ceil(e.length / itemsPerPage);
    r < (t = t < 1 ? 1 : t) && (t = r),
        (document.getElementById("property-list").innerHTML = "");
    for (
        var n, a = (t - 1) * itemsPerPage;
        a < t * itemsPerPage && a < e.length;
        a++
    )
        e[a] &&
            ((n = e[a].starred ? "active" : ""),
            (document.getElementById("property-list").innerHTML +=
                '<div class="col-xxl-3 col-lg-4 col-md-6">        <div class="card real-estate-grid-widgets card-animate">            <div class="card-body p-2">                <img src="' +
                e[a].property[0].img +
                '" alt="' +
                e[a].property[0].img_alt +
                '" class="rounded w-100 object-fit-cover" style="height: 180px">                <button type="button" class="btn btn-subtle-warning custom-toggle btn-icon btn-sm ' +
                n +
                '" data-bs-toggle="button">                    <span class="icon-on"><i class="bi bi-star"></i></span>                    <span class="icon-off"><i class="bi bi-star-fill"></i></span>                </button>                <div class="dropdown dropdown-real-estate">                    <button class="btn btn-light btn-icon btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">                        <i class="bi bi-three-dots-vertical"></i>                    </button>                    <ul class="dropdown-menu dropdown-menu-end">                        <li><a class="dropdown-item edit-list" href="#addProperty" data-edit-id="' +
                e[a].id +
                '" data-bs-toggle="modal"><i class="bi bi-pencil-square me-1 align-baseline"></i> Edit</a></li>                        <li><a class="dropdown-item remove-list" href="#deleteRecordModal" data-remove-id="' +
                e[a].id +
                '" data-bs-toggle="modal"><i class="bi bi-trash3 me-1 align-baseline"></i> Delete</a></li>                    </ul>                </div>            </div>            <div class="card-body p-3">                <p class="text-muted float-end mb-0"><i class="bi bi-star text-warning align-baseline me-1"></i> ' +
                e[a].rating +
                "</p>                " +
                isType(e[a].property[0].type) +
                '                <a href="apps-real-estate-property-overview.html">                    <h6 class="fs-lg text-capitalize text-truncate">' +
                e[a].property[0].title +
                '</h6>                </a>                <p class="text-muted"><i class="bi bi-geo-alt align-baseline me-1"></i> ' +
                e[a].location +
                '</p>                <ul class="d-flex align-items-center gap-2 flex-wrap list-unstyled">                    <li>                        <p class="text-muted mb-0"><i class="bi bi-house align-baseline text-primary me-1"></i> ' +
                e[a].facility[0].bedroom +
                ' Bedroom</p>                    </li>                    <li>                        <p class="text-muted mb-0"><i class="ph ph-bathtub align-middle text-primary me-1"></i> ' +
                e[a].facility[0].bathroom +
                ' Bathroom</p>                    </li>                    <li>                        <p class="text-muted mb-0"><i class="bi bi-columns align-baseline text-primary me-1"></i> ' +
                e[a].facility[0].area +
                ' sqft</p>                    </li>                </ul>                <div class="border-top border-dashed mt-3 pt-3 d-flex align-items-center justify-content-between gap-3">                    <h5 class="mb-0">' +
                e[a].price +
                '</h5>                    <a href="apps-real-estate-property-overview.html" class="link-effect">Read More <i class="bi bi-chevron-right align-baseline ms-1"></i></a>                </div>            </div>        </div>    </div>'));
    paginationEvents(),
        pageEvent(e),
        selectedPage(),
        1 == currentPage
            ? prevButton.parentNode.classList.add("disabled")
            : prevButton.parentNode.classList.remove("disabled"),
        currentPage == r
            ? nextButton.parentNode.classList.add("disabled")
            : nextButton.parentNode.classList.remove("disabled"),
        refreshCallbacks();
}
function isType(e) {
    switch (e) {
        case "Villa":
            return (
                '<span class="badge bg-danger-subtle text-danger fs-xxs mb-3"><i class="bi bi-house-door align-baseline me-1"></i>' +
                e +
                "</span>"
            );
        case "Apartment":
            return (
                '<span class="badge bg-info-subtle text-info fs-xxs mb-3"><i class="bi bi-building align-baseline me-1"></i>' +
                e +
                "</span>"
            );
        case "Residency":
            return (
                '<span class="badge bg-success-subtle text-success fs-xxs mb-3"><i class="bi bi-buildings align-baseline me-1"></i>' +
                e +
                "</span>"
            );
    }
}
function fetchIdFromObj(e) {
    return parseInt(e.id);
}
function findNextId() {
    var e, t;
    return 0 === propertyListData.length
        ? 0
        : (e = fetchIdFromObj(propertyListData[propertyListData.length - 1])) <=
          (t = fetchIdFromObj(propertyListData[0]))
        ? t + 1
        : e + 1;
}
function sortElementsById() {
    loadPropertyList(
        propertyListData.sort(function (e, t) {
            (e = fetchIdFromObj(e)), (t = fetchIdFromObj(t));
            return t < e ? -1 : e < t ? 1 : 0;
        }),
        currentPage
    );
}
function selectedPage() {
    for (
        var e = document
                .getElementById("page-num")
                .getElementsByClassName("clickPageNumber"),
            t = 0;
        t < e.length;
        t++
    )
        t == currentPage - 1
            ? e[t].parentNode.classList.add("active")
            : e[t].parentNode.classList.remove("active");
}
function paginationEvents() {
    function e() {
        return Math.ceil(propertyListData.length / itemsPerPage);
    }
    prevButton.addEventListener("click", function () {
        1 < currentPage && loadPropertyList(propertyListData, --currentPage);
    }),
        nextButton.addEventListener("click", function () {
            currentPage < e() &&
                loadPropertyList(propertyListData, ++currentPage);
        });
    var t = document.getElementById("page-num");
    t.innerHTML = "";
    for (var r = 1; r < e() + 1; r++)
        t.innerHTML +=
            "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" +
            r +
            "</a></div>";
    document.addEventListener("click", function (e) {
        "A" == e.target.nodeName &&
            e.target.classList.contains("clickPageNumber") &&
            ((currentPage = e.target.textContent),
            loadPropertyList(propertyListData, currentPage));
    }),
        selectedPage();
}
getJSON("property-list.json", function (e, t) {
    null !== e
        ? console.log("Something went wrong: " + e)
        : (loadPropertyList((propertyListData = t), currentPage),
          sortElementsById(),
          rangeSlider());
});
var idFieldInput = document.getElementById("id-field"),
    propertyTitleInput = document.getElementById("property-title-input"),
    propertyTypeInput = document.getElementById("property-type-input"),
    bedroomInput = document.getElementById("bedroom-input"),
    bathroomInput = document.getElementById("bathroom-input"),
    sqftInput = document.getElementById("sqft-input"),
    propertyPriceInput = document.getElementById("property-price-input"),
    agentNameInput = document.getElementById("agent-name-input"),
    requirementInput = document.getElementById("requirement-input"),
    addressInput = document.getElementById("addressLine-input"),
    properyTypeVal = new Choices(propertyTypeInput, {
        searchEnabled: !1,
        removeItemButton: !0,
    }),
    requirementVal = new Choices(requirementInput, {
        searchEnabled: !1,
        removeItemButton: !0,
    }),
    forms = document.querySelectorAll(".tablelist-form");
function refreshCallbacks() {
    var r, n;
    Array.from(document.querySelectorAll(".edit-list")).forEach(function (t) {
        t.addEventListener("click", function (e) {
            (r = t.getAttribute("data-edit-id")),
                (propertyListData = propertyListData.map(function (e) {
                    var t;
                    return (
                        e.id == r &&
                            ((editList = !0),
                            (document.getElementById(
                                "addPropertyModalLabel"
                            ).innerHTML = "Edit Property details"),
                            (document.getElementById("add-btn").innerHTML =
                                "Update"),
                            (idFieldInput.value = e.id),
                            (propertyTitleInput.value = e.property[0].title),
                            (propertyTypeInput.value = e.property[0].type),
                            (bedroomInput.value = e.facility[0].bedroom),
                            (bathroomInput.value = e.facility[0].bathroom),
                            (sqftInput.value = e.facility[0].area),
                            (propertyPriceInput.value = e.price.split("$")[1]),
                            (agentNameInput.value = e.agent),
                            (requirementInput.value = e.requirement),
                            (addressInput.value = e.location),
                            (document.getElementById(
                                "property-preview"
                            ).innerHTML = ""),
                            (t = { name: e.property[0].img_alt, size: 12345 }),
                            dropzone.options.addedfile.call(dropzone, t),
                            dropzone.options.thumbnail.call(
                                dropzone,
                                t,
                                e.property[0].img
                            ),
                            properyTypeVal && properyTypeVal.destroy(),
                            (properyTypeVal = new Choices(propertyTypeInput, {
                                searchEnabled: !1,
                                removeItemButton: !0,
                            })).setChoiceByValue(e.property[0].type),
                            requirementVal && requirementVal.destroy(),
                            (requirementVal = new Choices(requirementInput, {
                                searchEnabled: !1,
                                removeItemButton: !0,
                            })).setChoiceByValue(e.requirement)),
                        e
                    );
                }));
        });
    });
    Array.from(document.querySelectorAll(".remove-list")).forEach(function (t) {
        t.addEventListener("click", function (e) {
            (n = t.getAttribute("data-remove-id")),
                document
                    .getElementById("remove-element")
                    .addEventListener("click", function () {
                        var t;
                        (t = n),
                            loadPropertyList(
                                (propertyListData = propertyListData.filter(
                                    function (e) {
                                        return e.id != t;
                                    }
                                )),
                                currentPage
                            ),
                            document
                                .getElementById("close-removemodal")
                                .click();
                    });
        });
    });
}
function clearFields() {
    (editList = !1),
        (document.getElementById("addPropertyModalLabel").innerHTML =
            "Add Property list"),
        (document.getElementById("add-btn").innerHTML = "Add"),
        (idFieldInput.value = ""),
        (document.getElementById("property-preview").innerHTML = ""),
        (propertyTitleInput.value = ""),
        (propertyTypeInput.value = ""),
        (bedroomInput.value = ""),
        (bathroomInput.value = ""),
        (sqftInput.value = ""),
        (propertyPriceInput.value = ""),
        (agentNameInput.value = ""),
        (requirementInput.value = ""),
        (addressInput.value = ""),
        properyTypeVal && properyTypeVal.destroy(),
        (properyTypeVal = new Choices(propertyTypeInput, {
            searchEnabled: !1,
            removeItemButton: !0,
        })),
        requirementVal && requirementVal.destroy(),
        (requirementVal = new Choices(requirementInput, {
            searchEnabled: !1,
            removeItemButton: !0,
        }));
}
function pageEvent(e) {
    0 == e.length
        ? ((document.getElementById("pagination-element").style.display =
              "none"),
          document.getElementById("noresult").classList.remove("d-none"))
        : ((document.getElementById("pagination-element").style.display =
              "flex"),
          document.getElementById("noresult").classList.add("d-none"));
    for (
        var t = document.getElementById("page-num"),
            r = ((t.innerHTML = ""), Math.ceil(e.length / itemsPerPage)),
            n = 1;
        n < r + 1;
        n++
    )
        t.innerHTML +=
            "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" +
            n +
            "</a></div>";
}
Array.prototype.slice.call(forms).forEach(function (e) {
    e.addEventListener("submit", function (e) {
        e.preventDefault(),
            document.querySelector(".dz-image-preview") &&
                (t = new DOMParser()
                    .parseFromString(
                        document.querySelectorAll(".dz-image-preview")[0]
                            .innerHTML,
                        "text/html"
                    )
                    .body.querySelector("[data-dz-thumbnail]"));
        var t,
            r,
            n = document.getElementById("alert-error-msg");
        return (
            n.classList.remove("d-none"),
            setTimeout(() => n.classList.add("d-none"), 2e3),
            0 == document.querySelectorAll(".dz-image-preview").length
                ? !(n.innerHTML = "Please select a image")
                : "" == propertyTitleInput.value
                ? !(n.innerHTML = "Please enter a property title")
                : "" == propertyTypeInput.value
                ? !(n.innerHTML = "Please select a property type")
                : "" == bedroomInput.value
                ? !(n.innerHTML = "Please enter a no. of bedroom")
                : "" == bathroomInput.value
                ? !(n.innerHTML = "Please enter a no. of bathroom")
                : "" == sqftInput.value
                ? !(n.innerHTML = "Please enter a no. of sqft area")
                : "" == propertyPriceInput.value
                ? !(n.innerHTML = "Please enter a price")
                : "" == agentNameInput.value
                ? !(n.innerHTML = "Please enter a agent name")
                : "" == requirementInput.value
                ? !(n.innerHTML = "Please select a requirement")
                : "" == addressInput.value
                ? !(n.innerHTML = "Please enter a sort address")
                : ("" !== propertyTitleInput.value &&
                  "" !== propertyTypeInput.value &&
                  "" !== bedroomInput.value &&
                  "" !== bathroomInput.value &&
                  "" !== sqftInput.value &&
                  "" !== propertyPriceInput.value &&
                  "" !== agentNameInput.value &&
                  "" !== requirementInput.value &&
                  "" !== addressInput.value &&
                  0 < document.querySelectorAll(".dz-image-preview").length &&
                  !editList
                      ? ((e = {
                            id: findNextId(),
                            property: [
                                {
                                    type: propertyTypeInput.value,
                                    title: propertyTitleInput.value,
                                    img: t.src,
                                    img_alt: t.getAttribute("alt"),
                                },
                            ],
                            location: addressInput.value,
                            facility: [
                                {
                                    bedroom: bedroomInput.value,
                                    bathroom: bathroomInput.value,
                                    area: sqftInput.value,
                                },
                            ],
                            rating: "-",
                            price: "$" + propertyPriceInput.value,
                            starred: !1,
                            agent: agentNameInput.value,
                            requirement: requirementInput.value,
                        }),
                        propertyListData.push(e),
                        sortElementsById())
                      : "" !== propertyTitleInput.value &&
                        "" !== propertyTypeInput.value &&
                        "" !== bedroomInput.value &&
                        "" !== bathroomInput.value &&
                        "" !== sqftInput.value &&
                        "" !== propertyPriceInput.value &&
                        "" !== agentNameInput.value &&
                        "" !== requirementInput.value &&
                        "" !== addressInput.value &&
                        0 <
                            document.querySelectorAll(".dz-image-preview")
                                .length &&
                        editList &&
                        ((r = 0),
                        (r = idFieldInput.value),
                        (propertyListData = propertyListData.map(function (e) {
                            return e.id == r
                                ? {
                                      id: r,
                                      property: [
                                          {
                                              type: propertyTypeInput.value,
                                              title: propertyTitleInput.value,
                                              img: t.src,
                                              img_alt: t.getAttribute("alt"),
                                          },
                                      ],
                                      location: addressInput.value,
                                      facility: [
                                          {
                                              bedroom: bedroomInput.value,
                                              bathroom: bathroomInput.value,
                                              area: sqftInput.value,
                                          },
                                      ],
                                      rating: e.rating,
                                      price: "$" + propertyPriceInput.value,
                                      starred: e.starred,
                                      agent: agentNameInput.value,
                                      requirement: requirementInput.value,
                                  }
                                : e;
                        }))),
                  loadPropertyList(propertyListData, currentPage),
                  document
                      .getElementById("alert-error-msg")
                      .classList.add("d-none"),
                  document.getElementById("close-addPropertyModal").click(),
                  !0)
        );
    });
}),
    document
        .getElementById("addProperty")
        .addEventListener("hidden.bs.modal", function () {
            clearFields();
        });
var locationSelect = new Choices(document.getElementById("select-location"), {
    searchEnabled: !0,
});
function rangeSlider() {
    var a,
        i,
        e = document.getElementById("product-price-range");
    e &&
        (noUiSlider.create(e, {
            start: [500, 3800],
            step: 10,
            margin: 20,
            connect: !0,
            behaviour: "tap-drag",
            range: { min: 0, max: 5e3 },
            format: wNumb({ decimals: 0, prefix: "$ " }),
        }),
        (a = document.getElementById("minCost")),
        (i = document.getElementById("maxCost")),
        e.noUiSlider.on("update", function (e, t) {
            t ? (i.value = e[t]) : (a.value = e[t]);
            var r = i.value.substr(2),
                n = a.value.substr(2);
            loadPropertyList(
                propertyListData.filter(
                    (e) =>
                        parseFloat(e.price.split("$")[1]) >= n &&
                        parseFloat(e.price.split("$")[1]) <= r
                ),
                currentPage
            );
        }),
        a.addEventListener("change", function () {
            e.noUiSlider.set([null, this.value]);
        }),
        i.addEventListener("change", function () {
            e.noUiSlider.set([null, this.value]);
        }));
}
function windowResize() {
    var e = document.documentElement.clientWidth;
    document.getElementById("propertyFilters").style.display =
        e < 1400 ? "none" : "block";
}
locationSelect.passedElement.element.addEventListener(
    "change",
    function (e) {
        var t = e.detail.value;
        loadPropertyList(
            e.detail.value
                ? propertyListData.filter(function (e) {
                      return e.location.split(",").slice(-1).pop().trim() == t;
                  })
                : propertyListData,
            currentPage
        );
    },
    !1
),
    document.querySelectorAll('[name="propertyType"]').forEach(function (e) {
        e.addEventListener("change", function () {
            var t = e.getAttribute("value");
            loadPropertyList(
                "all" != t
                    ? propertyListData.filter(function (e) {
                          return e.property[0].type == t;
                      })
                    : propertyListData,
                currentPage
            );
        });
    }),
    windowResize(),
    window.addEventListener("resize", windowResize);
