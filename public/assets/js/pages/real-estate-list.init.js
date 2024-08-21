var previewTemplate,
    dropzone,
    dropzonePreviewNode = document.querySelector("#property-preview-list");
(dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone(".property-dropzone", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#property-preview",
        })));
const checkAll = document.getElementById("checkAll");
function handleCheckAll() {
    var e = document.querySelectorAll('.form-check-all input[type="checkbox"]'),
        t = document.querySelectorAll(
            '.form-check-all input[type="checkbox"]:checked'
        ).length;
    const r = this.checked;
    e.forEach((e) => {
        (e.checked = r), updateRowStyle(e);
    }),
        updateRemoveActionsVisibility(t);
}
function updateRowStyle(e) {
    var t = e.closest("tr");
    e.checked
        ? t.classList.add("table-active")
        : t.classList.remove("table-active");
}
function updateRemoveActionsVisibility(e) {
    var t = document.getElementById("remove-actions");
    0 < e ? t.classList.add("d-none") : t.classList.remove("d-none");
}
checkAll && checkAll.addEventListener("click", handleCheckAll);
var perPage = 10,
    editList = !1,
    options = {
        valueNames: [
            "id",
            "propert_Name",
            "address",
            "bedroom",
            "bathroom",
            "propert_type",
            "sqft",
            "agents",
            "amount",
            "status",
        ],
        page: perPage,
        pagination: !0,
        plugins: [ListPagination({ left: 2, right: 2 })],
    },
    propertyList = new List("propertyList", options).on(
        "updated",
        function (e) {
            0 == e.matchingItems.length
                ? (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "block")
                : (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "none");
            var t = 1 == e.i,
                r = e.i > e.matchingItems.length - e.page;
            document.querySelector(".pagination-prev.disabled") &&
                document
                    .querySelector(".pagination-prev.disabled")
                    .classList.remove("disabled"),
                document.querySelector(".pagination-next.disabled") &&
                    document
                        .querySelector(".pagination-next.disabled")
                        .classList.remove("disabled"),
                t &&
                    document
                        .querySelector(".pagination-prev")
                        .classList.add("disabled"),
                r &&
                    document
                        .querySelector(".pagination-next")
                        .classList.add("disabled"),
                e.matchingItems.length <= perPage
                    ? (document.getElementById(
                          "pagination-element"
                      ).style.display = "none")
                    : (document.getElementById(
                          "pagination-element"
                      ).style.display = "flex"),
                0 < e.matchingItems.length
                    ? (document.getElementsByClassName(
                          "noresult"
                      )[0].style.display = "none")
                    : (document.getElementsByClassName(
                          "noresult"
                      )[0].style.display = "block");
        }
    );
const goToPage = (e) => {
        var t = document.querySelector(".pagination.listjs-pagination .active"),
            e = "next" === e ? t.nextElementSibling : t.previousElementSibling;
        e && e.children[0].click();
    },
    xhttp =
        (document
            .querySelector(".pagination-next")
            .addEventListener("click", () => {
                document.querySelector(".pagination.listjs-pagination") &&
                    goToPage("next");
            }),
        document
            .querySelector(".pagination-prev")
            .addEventListener("click", () => {
                document.querySelector(".pagination.listjs-pagination") &&
                    goToPage("prev");
            }),
        new XMLHttpRequest());
function isStatus(e) {
    switch (e) {
        case "Sale":
            return (
                '<span class="badge bg-danger-subtle text-danger">' +
                e +
                "</span>"
            );
        case "Rent":
            return (
                '<span class="badge bg-info-subtle text-info">' + e + "</span>"
            );
    }
}
(xhttp.onload = function () {
    var e = JSON.parse(this.responseText);
    Array.from(e).forEach(function (e) {
        propertyList.add({
            id:
                '<a href="apps-real-estate-property-overview.html" class="fw-medium link-primary">#TBS' +
                e.id +
                "</a>",
            propert_Name:
                '<img src="' +
                e.property[0].img +
                '" alt="' +
                e.property[0].img_alt +
                '" class="rounded avatar-sm object-fit-cover d-none"><a href="apps-real-estate-property-overview.html" class="text-reset">' +
                e.property[0].title +
                "</a>",
            address: e.location,
            bedroom: e.facility[0].bedroom,
            bathroom: e.facility[0].bathroom,
            propert_type: e.property[0].type,
            sqft: e.facility[0].area,
            agents: e.agent,
            amount: '<span class="fw-medium">' + e.price + "</span>",
            status: isStatus(e.requirement),
        }),
            propertyList.sort("id", { order: "desc" });
    }),
        propertyList.remove(
            "id",
            '<a href="apps-real-estate-property-overview.html" class="fw-medium link-primary">#TBS01</a>'
        ),
        refreshCallbacks(),
        ischeckboxcheck();
}),
    xhttp.open("GET", "assets/json/property-list.json"),
    xhttp.send(),
    (isCount = new DOMParser().parseFromString(
        propertyList.items.slice(-1)[0]._values.id,
        "text/html"
    )),
    document
        .getElementById("addProperty")
        .addEventListener("show.bs.modal", function (e) {
            e.relatedTarget.classList.contains("edit-item-btn")
                ? ((document.getElementById("exampleModalLabel").innerHTML =
                      "Edit Property list"),
                  (document
                      .getElementById("addProperty")
                      .querySelector(".modal-footer").style.display = "block"),
                  (document.getElementById("add-btn").innerHTML = "Update"))
                : e.relatedTarget.classList.contains("add-btn")
                ? ((document.getElementById("exampleModalLabel").innerHTML =
                      "Add Property list"),
                  (document
                      .getElementById("addProperty")
                      .querySelector(".modal-footer").style.display = "block"),
                  (document.getElementById("add-btn").innerHTML =
                      "Add Property"))
                : ((document.getElementById("exampleModalLabel").innerHTML =
                      "List product"),
                  (document
                      .getElementById("addProperty")
                      .querySelector(".modal-footer").style.display = "none"));
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
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn"),
    propertyTypeVal = new Choices(propertyTypeInput, {
        searchEnabled: !1,
        removeItemButton: !0,
    }),
    requirementVal = new Choices(requirementInput, {
        searchEnabled: !1,
        removeItemButton: !0,
    }),
    count = (refreshCallbacks(), 14),
    forms = document.querySelectorAll(".tablelist-form");
function clearFields() {
    (editList = !1),
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
        propertyTypeVal && propertyTypeVal.destroy(),
        (propertyTypeVal = new Choices(propertyTypeInput, {
            searchEnabled: !1,
            removeItemButton: !0,
        })),
        requirementVal && requirementVal.destroy(),
        (requirementVal = new Choices(requirementInput, {
            searchEnabled: !1,
            removeItemButton: !0,
        }));
}
function ischeckboxcheck() {
    Array.from(document.getElementsByName("chk_child")).forEach(function (r) {
        r.addEventListener("change", function (e) {
            1 == r.checked
                ? e.target.closest("tr").classList.add("table-active")
                : e.target.closest("tr").classList.remove("table-active");
            var t = document.querySelectorAll(
                '[name="chk_child"]:checked'
            ).length;
            e.target.closest("tr").classList.contains("table-active"),
                0 < t
                    ? document
                          .getElementById("remove-actions")
                          .classList.remove("d-none")
                    : document
                          .getElementById("remove-actions")
                          .classList.add("d-none");
        });
    });
}
function refreshCallbacks() {
    removeBtns &&
        Array.from(removeBtns).forEach(function (e) {
            e.addEventListener("click", function (e) {
                e.target.closest("tr").children[1].innerText,
                    (itemId = e.target.closest("tr").children[1].innerText);
                e = propertyList.get({ id: itemId });
                Array.from(e).forEach(function (e) {
                    var e = new DOMParser().parseFromString(
                            e._values.id,
                            "text/html"
                        ),
                        t = e.body.firstElementChild;
                    e.body.firstElementChild.innerHTML == itemId &&
                        document
                            .getElementById("delete-record")
                            .addEventListener("click", function () {
                                propertyList.remove("id", t.outerHTML),
                                    document
                                        .getElementById("deleteRecord-close")
                                        .click();
                            });
                });
            });
        }),
        editBtns &&
            Array.from(editBtns).forEach(function (e) {
                e.addEventListener("click", function (e) {
                    e.target.closest("tr").children[1].innerText,
                        (itemId = e.target.closest("tr").children[1].innerText);
                    e = propertyList.get({ id: itemId });
                    Array.from(e).forEach(function (e) {
                        var t,
                            r = new DOMParser().parseFromString(
                                e._values.id,
                                "text/html"
                            ).body.firstElementChild.innerHTML;
                        r == itemId &&
                            ((editList = !0),
                            (idFieldInput.value = r),
                            (r = new DOMParser().parseFromString(
                                e._values.propert_Name,
                                "text/html"
                            )),
                            (propertyTitleInput.value =
                                r.body.querySelector(".text-reset").innerHTML),
                            (bedroomInput.value = e._values.bedroom),
                            (bathroomInput.value = e._values.bathroom),
                            (sqftInput.value = e._values.sqft),
                            (t = new DOMParser().parseFromString(
                                e._values.amount,
                                "text/html"
                            )),
                            (propertyPriceInput.value = t.body
                                .querySelector("span")
                                .innerHTML.split("$")[1]),
                            (agentNameInput.value = e._values.agents),
                            (addressInput.value = e._values.address),
                            propertyTypeVal && propertyTypeVal.destroy(),
                            (propertyTypeVal = new Choices(propertyTypeInput, {
                                searchEnabled: !1,
                                removeItemButton: !0,
                            })).setChoiceByValue(e._values.propert_type),
                            (propertyTypeInput.value = e._values.propert_type),
                            (t = new DOMParser()
                                .parseFromString(e._values.status, "text/html")
                                .body.querySelector("span").innerHTML),
                            requirementVal && requirementVal.destroy(),
                            (requirementVal = new Choices(requirementInput, {
                                searchEnabled: !1,
                                removeItemButton: !0,
                            })).setChoiceByValue(t),
                            (document.getElementById(
                                "property-preview"
                            ).innerHTML = ""),
                            (e = {
                                name: r.body
                                    .querySelector("img")
                                    .getAttribute("alt"),
                                size: 12345,
                            }),
                            dropzone.options.addedfile.call(dropzone, e),
                            dropzone.options.thumbnail.call(
                                dropzone,
                                e,
                                r.body.querySelector("img").src
                            ));
                    });
                });
            });
}
function deleteMultiple() {
    ids_array = [];
    var e,
        t = document.getElementsByName("chk_child");
    for (i = 0; i < t.length; i++)
        1 == t[i].checked &&
            ((e =
                t[i].parentNode.parentNode.parentNode.querySelector(
                    "td a"
                ).innerHTML),
            ids_array.push(e));
    "undefined" != typeof ids_array && 0 < ids_array.length
        ? Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: !0,
              confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
              cancelButtonClass: "btn btn-danger w-xs mt-2",
              confirmButtonText: "Yes, delete it!",
              buttonsStyling: !1,
              showCloseButton: !0,
          }).then(function (e) {
              if (e.value) {
                  for (i = 0; i < ids_array.length; i++)
                      propertyList.remove(
                          "id",
                          `<a href="apps-real-estate-property-overview.html" class="fw-medium link-primary">${ids_array[i]}</a>`
                      );
                  document
                      .getElementById("remove-actions")
                      .classList.add("d-none"),
                      (document.getElementById("checkAll").checked = !1),
                      Swal.fire({
                          title: "Deleted!",
                          text: "Your data has been deleted.",
                          icon: "success",
                          confirmButtonClass: "btn btn-info w-xs mt-2",
                          buttonsStyling: !1,
                      });
              }
          })
        : Swal.fire({
              title: "Please select at least one checkbox",
              confirmButtonClass: "btn btn-info",
              buttonsStyling: !1,
              showCloseButton: !0,
          });
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
            r = document.getElementById("alert-error-msg");
        return (
            r.classList.remove("d-none"),
            setTimeout(() => r.classList.add("d-none"), 2e3),
            0 == document.querySelectorAll(".dz-image-preview").length
                ? !(r.innerHTML = "Please select a image")
                : "" == propertyTitleInput.value
                ? !(r.innerHTML = "Please enter a property title")
                : "" == propertyTypeInput.value
                ? !(r.innerHTML = "Please select a property type")
                : "" == bedroomInput.value
                ? !(r.innerHTML = "Please enter a no. of bedroom")
                : "" == bathroomInput.value
                ? !(r.innerHTML = "Please enter a no. of bathroom")
                : "" == sqftInput.value
                ? !(r.innerHTML = "Please enter a no. of sqft area")
                : "" == propertyPriceInput.value
                ? !(r.innerHTML = "Please enter a price")
                : "" == agentNameInput.value
                ? !(r.innerHTML = "Please enter a agent name")
                : "" == requirementInput.value
                ? !(r.innerHTML = "Please select a requirement")
                : "" == addressInput.value
                ? !(r.innerHTML = "Please enter a sort address")
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
                      ? (propertyList.add({
                            id:
                                '<a href="apps-real-estate-property-overview.html" class="fw-medium link-primary">#TBS' +
                                count +
                                "</a>",
                            propert_Name:
                                '<img src="' +
                                t.src +
                                '" alt="' +
                                t.getAttribute("alt") +
                                '" class="rounded avatar-sm object-fit-cover d-none"><a href="apps-real-estate-property-overview.html" class="text-reset">' +
                                propertyTitleInput.value +
                                "</a>",
                            address: addressInput.value,
                            bedroom: bedroomInput.value,
                            propert_type: propertyTypeInput.value,
                            sqft: sqftInput.value,
                            agents: agentNameInput.value,
                            amount:
                                '<span class="fw-medium">$' +
                                propertyPriceInput.value +
                                "</span>",
                            status: isStatus(requirementInput.value),
                        }),
                        propertyList.sort("id", { order: "desc" }),
                        document
                            .getElementById("alert-error-msg")
                            .classList.add("d-none"),
                        document
                            .getElementById("close-addPropertyModal")
                            .click(),
                        count++,
                        clearFields(),
                        refreshCallbacks(),
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Property Detail inserted successfully!",
                            showConfirmButton: !1,
                            timer: 2e3,
                            showCloseButton: !0,
                        }))
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
                        ((e = propertyList.get({ id: idFieldInput.value })),
                        Array.from(e).forEach(function (e) {
                            new DOMParser().parseFromString(
                                e._values.id,
                                "text/html"
                            ).body.firstElementChild.innerHTML == itemId &&
                                e.values({
                                    id: `<a href="apps-real-estate-property-overview.html" class="fw-medium link-primary"> ${idFieldInput.value} </a>`,
                                    propert_Name: `<img src="${
                                        t.src
                                    }" alt="${t.getAttribute(
                                        "alt"
                                    )}" class="rounded avatar-sm object-fit-cover d-none"><a href="apps-real-estate-property-overview.html" class="text-reset">${
                                        propertyTitleInput.value
                                    }</a>`,
                                    address: addressInput.value,
                                    bedroom: bedroomInput.value,
                                    propert_type: propertyTypeInput.value,
                                    sqft: sqftInput.value,
                                    agents: agentNameInput.value,
                                    amount: `<span class="fw-medium">$ ${propertyPriceInput.value}</span>`,
                                    status: isStatus(requirementInput.value),
                                });
                        }),
                        document
                            .getElementById("alert-error-msg")
                            .classList.add("d-none"),
                        document
                            .getElementById("close-addPropertyModal")
                            .click(),
                        clearFields(),
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Property Detail updated Successfully!",
                            showConfirmButton: !1,
                            timer: 2e3,
                            showCloseButton: !0,
                        })),
                  !0)
        );
    });
}),
    document
        .getElementById("addProperty")
        .addEventListener("hidden.bs.modal", function () {
            clearFields();
        });
