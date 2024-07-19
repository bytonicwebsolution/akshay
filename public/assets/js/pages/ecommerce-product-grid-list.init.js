var url = "assets/json/",
    productListData = "",
    editList = !1,
    prevButton = document.getElementById("page-prev"),
    nextButton = document.getElementById("page-next"),
    currentPage = 1,
    itemsPerPage = 12,
    getJSON = function (e, t) {
        var a = new XMLHttpRequest();
        a.open("GET", url + e, !0),
            (a.responseType = "json"),
            (a.onload = function () {
                var e = a.status;
                t(200 === e ? null : e, a.response);
            }),
            a.send();
    };
function loadProductList(e, t) {
    var a = Math.ceil(e.length / itemsPerPage);
    a < (t = t < 1 ? 1 : t) && (t = a),
        (document.getElementById("product-grid").innerHTML = "");
    for (
        var r, n, i, c = (t - 1) * itemsPerPage;
        c < t * itemsPerPage && c < e.length;
        c++
    )
        e[c] &&
            ((i = e[c].discount.split("%")[0]),
            (r = (r = e[c].price.split("$"))[1] - (r[1] * i) / 100),
            (i =
                0 < i
                    ? ((n = '<div class="ribbon ribbon-danger">Sale</div>'),
                      '<h5 class="fs-lg mb-3">$' +
                          r.toFixed(2) +
                          ' <small class="fs-sm fw-normal text-decoration-line-through text-muted">' +
                          e[c].price +
                          "</small></h5>")
                    : ((n = ""),
                      '<h5 class="fs-lg mb-3">' + e[c].price + "</h5>")),
            (document.getElementById("product-grid").innerHTML +=
                '<div class="col-xxl-3 col-lg-4 col-md-6">            <div class="card ribbon-box ribbon-fill">                ' +
                n +
                '                <div class="card-body p-4 m-4">                    <button type="button" class="btn btn-sm btn-icon btn-subtle-danger position-absolute top-0 end-0 m-3 remove-list"  data-remove-id="' +
                e[c].id +
                '" data-bs-toggle="modal" data-bs-target="#deleteRecordModal"><i class="ph-trash"></i></button>                    <img src="' +
                e[c].product[0].img +
                '" alt="" class="img-fluid">                </div>                <div class="card-body pt-0">                    <span class="badge bg-warning-subtle text-warning float-end"><i class="bi bi-star-fill align-baseline me-1"></i> <span class="rate">' +
                e[c].ratings +
                "</span></span>                    " +
                i +
                '                    <a href="apps-ecommerce-product-details.html">                        <h6 class="fs-md text-truncate">' +
                e[c].product[0].title +
                '</h6>                    </a>                    <a href="#!" class="text-decoration-underline text-muted mb-0">' +
                e[c].category +
                '</a>                    <div class="mt-3 hstack gap-2">                        <a href="apps-ecommerce-add-product.html" class="btn btn-primary w-100"><i class="ph-pencil me-1 align-middle"></i> Edit</a>                        <a href="apps-ecommerce-product-details.html" class="btn btn-secondary w-100"><i class="ph-eye me-1 align-middle"></i> Overview</a>                    </div>                </div>            </div>        </div>'));
    paginationEvents(),
        searchResult(e),
        selectedPage(),
        1 == currentPage
            ? prevButton.parentNode.classList.add("disabled")
            : prevButton.parentNode.classList.remove("disabled"),
        currentPage == a
            ? nextButton.parentNode.classList.add("disabled")
            : nextButton.parentNode.classList.remove("disabled"),
        refreshCallbacks();
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
        return Math.ceil(productListData.length / itemsPerPage);
    }
    prevButton.addEventListener("click", function () {
        1 < currentPage && loadProductList(productListData, --currentPage);
    }),
        nextButton.addEventListener("click", function () {
            currentPage < e() &&
                loadProductList(productListData, ++currentPage);
        });
    var t = document.getElementById("page-num");
    t.innerHTML = "";
    for (var a = 1; a < e() + 1; a++)
        t.innerHTML +=
            "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" +
            a +
            "</a></div>";
    document.addEventListener("click", function (e) {
        "A" == e.target.nodeName &&
            e.target.classList.contains("clickPageNumber") &&
            ((currentPage = e.target.textContent),
            loadProductList(productListData, currentPage));
    }),
        selectedPage();
}
function refreshCallbacks() {
    var a;
    Array.from(document.querySelectorAll(".remove-list")).forEach(function (t) {
        t.addEventListener("click", function (e) {
            (a = t.getAttribute("data-remove-id")),
                document
                    .getElementById("remove-element")
                    .addEventListener("click", function () {
                        var t;
                        (t = a),
                            loadProductList(
                                (productListData = productListData.filter(
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
getJSON("product-list.json", function (e, t) {
    null !== e
        ? console.log("Something went wrong: " + e)
        : (loadProductList((productListData = t), currentPage), rangeSlider());
});
var searchProductList = document.getElementById("searchResultList");
function rangeSlider() {
    var i,
        c,
        e = document.getElementById("product-price-range");
    e &&
        (noUiSlider.create(e, {
            start: [100, 1e3],
            step: 10,
            margin: 20,
            connect: !0,
            behaviour: "tap-drag",
            range: { min: 0, max: 2e3 },
            format: wNumb({ decimals: 0, prefix: "$ " }),
        }),
        (i = document.getElementById("minCost")),
        (c = document.getElementById("maxCost")),
        e.noUiSlider.on("update", function (e, t) {
            var a = productListData,
                r =
                    (t ? (c.value = e[t]) : (i.value = e[t]),
                    c.value.substr(2)),
                n = i.value.substr(2);
            loadProductList(
                a.filter(function (e) {
                    if (e.price)
                        return (
                            (e = e.price.split("$")),
                            parseFloat(e[1]) >= n && parseFloat(e[1]) <= r
                        );
                }),
                currentPage
            );
        }),
        i.addEventListener("change", function () {
            e.noUiSlider.set([null, this.value]);
        }),
        c.addEventListener("change", function () {
            e.noUiSlider.set([null, this.value]);
        }));
}
searchProductList.addEventListener("keyup", function () {
    var t,
        e = searchProductList.value.toLowerCase();
    (t = e),
        loadProductList(
            productListData.filter(function (e) {
                return (
                    -1 !==
                        e.product[0].title
                            .toLowerCase()
                            .indexOf(t.toLowerCase()) ||
                    -1 !== e.category.toLowerCase().indexOf(t.toLowerCase())
                );
            }),
            currentPage
        );
}),
    Array.from(document.querySelectorAll(".filter-list a")).forEach(function (
        a
    ) {
        a.addEventListener("click", function () {
            var e = document.querySelector(".filter-list a.active"),
                t =
                    (e && e.classList.remove("active"),
                    a.classList.add("active"),
                    a.querySelector(".listname").innerHTML);
            loadProductList(
                productListData.filter((e) => e.category === t),
                currentPage
            );
        });
    });
var arraylist = [];
function searchResult(e) {
    0 == e.length
        ? ((document.getElementById("pagination-element").style.display =
              "none"),
          document
              .getElementById("search-result-elem")
              .classList.remove("d-none"))
        : ((document.getElementById("pagination-element").style.display =
              "flex"),
          document
              .getElementById("search-result-elem")
              .classList.add("d-none"));
    for (
        var t = document.getElementById("page-num"),
            a = ((t.innerHTML = ""), Math.ceil(e.length / itemsPerPage)),
            r = 1;
        r < a + 1;
        r++
    )
        t.innerHTML +=
            "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" +
            r +
            "</a></div>";
}
document.querySelectorAll("#discount-filter .form-check").forEach(function (a) {
    var r = a.querySelector(".form-check-input").value;
    a.querySelector(".form-check-input").addEventListener(
        "change",
        function () {
            a.querySelector(".form-check-input").checked
                ? arraylist.push(r)
                : arraylist.splice(arraylist.indexOf(r), 1);
            var t,
                e = productListData;
            loadProductList(
                (filterDataAll =
                    a.querySelector(".form-check-input").checked && 0 == r
                        ? e.filter(function (e) {
                              if (e.discount)
                                  return (
                                      (e = e.discount.split("%")),
                                      parseFloat(e[0]) < 10
                                  );
                          })
                        : a.querySelector(".form-check-input").checked &&
                          0 < arraylist.length
                        ? ((t = Math.min.apply(Math, arraylist)),
                          e.filter(function (e) {
                              if (e.discount)
                                  return (
                                      (e = e.discount.split("%")),
                                      parseFloat(e[0]) >= t
                                  );
                          }))
                        : productListData),
                currentPage
            );
        }
    );
});
