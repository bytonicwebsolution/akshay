document.getElementById("agent-chat").addEventListener("click", function () {
    document
        .getElementById("emailchat-detailElem")
        .classList.contains("d-block")
        ? document
              .getElementById("emailchat-detailElem")
              .classList.remove("d-block")
        : document
              .getElementById("emailchat-detailElem")
              .classList.add("d-block");
}),
    document
        .getElementById("emailchat-btn-close")
        .addEventListener("click", function () {
            document
                .getElementById("emailchat-detailElem")
                .classList.contains("d-block") &&
                document
                    .getElementById("emailchat-detailElem")
                    .classList.remove("d-block");
        });
var previewTemplate,
    dropzone,
    basicRating,
    dropzonePreviewNode = document.querySelector("#dropzone-preview-list"),
    editList =
        ((dropzonePreviewNode.id = ""),
        dropzonePreviewNode &&
            ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
            dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
            (dropzone = new Dropzone(".dropzone", {
                url: "https://httpbin.org/post",
                method: "post",
                previewTemplate: previewTemplate,
                previewsContainer: "#dropzone-preview",
            }))),
        document.querySelector("#basic-rater") &&
            (basicRating = raterJs({
                starSize: 22,
                rating: 0,
                step: 0.5,
                element: document.querySelector("#basic-rater"),
                rateCallback: function (e, t) {
                    this.setRating(e), t();
                },
            })),
        !1),
    reviewTitleInput = document.getElementById("reviewTitle-input"),
    reviewDescInput = document.getElementById("reviewDesc-input"),
    userNameVal = document.querySelector(".user-name-text").innerHTML,
    rating = document.getElementById("basic-rater"),
    date = new Date().toUTCString().slice(5, 16),
    forms = document.querySelectorAll(".tablelist-form");
function clearFields() {
    rating.removeAttribute("data-rating"),
        rating.setAttribute("title", ""),
        (rating.querySelector(".star-value").style.width = "0%"),
        (reviewTitleInput.value = ""),
        (reviewDescInput.value = ""),
        (document.getElementById("dropzone-preview").innerHTML = "");
}
Array.prototype.slice.call(forms).forEach(function (e) {
    e.addEventListener("submit", function (e) {
        e.preventDefault();
        var e = rating.getAttribute("data-rating"),
            t = document.getElementById("alert-error-msg");
        if (
            (t.classList.remove("d-none"),
            setTimeout(() => t.classList.add("d-none"), 2e3),
            !e)
        )
            return !(t.innerHTML = "Please select a rating");
        if ("" == reviewTitleInput.value)
            return !(t.innerHTML = "Please enter a review");
        if (!e) return !(t.innerHTML = "Please select a rating");
        if ("" == reviewDescInput.value)
            return !(t.innerHTML = "Please enter a review description");
        var r = '<div class="d-flex flex-grow-1 gap-2 review-gallery-img">';
        document
            .querySelectorAll("#dropzone-preview .dz-image-preview")
            .forEach(function (e) {
                var t = e.querySelector("[data-dz-thumbnail]"),
                    e = e.querySelector("[data-dz-name]").innerHTML;
                r +=
                    '<a href="#" class="avatar-md mt-3">            <div class="avatar-title bg-light rounded">                <img src="' +
                    t.src +
                    '" alt="' +
                    e +
                    '" class="product-img avatar-sm">            </div>        </a>';
            }),
            (r += "</div>");
        var i,
            a =
                '<li class="review-list py-2"  id="review-' +
                Math.floor(100 * Math.random()) +
                '">            <div class="border border-dashed rounded p-3">                <div class="hstack flex-wrap gap-3 mb-4">                    <div class="badge rounded-pill bg-danger-subtle text-danger mb-0">                        <i class="mdi mdi-star"></i> <span class="rate-num">' +
                parseFloat(e).toFixed(1) +
                '</span>                    </div>                    <div class="vr"></div>                    <div class="flex-grow-1">                        <p class="mb-0"><a href="#!">' +
                userNameVal +
                '</a></p>                    </div>                    <div class="flex-shrink-0">                        <span class="text-muted fs-13 mb-0">' +
                date +
                '</span>                    </div>                    <div class="flex-shrink-0">                        <a href="#addReview" class="badge bg-secondary-subtle text-secondary edit-item-list" data-bs-toggle="modal"><i class="ph-pencil align-baseline me-1"></i> Edit</a>                        <a href="#removeItemModal" class="badge bg-danger-subtle text-danger" data-bs-toggle="modal"><i class="ph-trash align-baseline"></i></a>                    </div>                </div>                <h6 class="review-title fs-md">' +
                reviewTitleInput.value +
                '</h6>                <p class="review-desc mb-0">' +
                reviewDescInput.value +
                "</p>                " +
                r +
                "            </div>        </li>";
        return (
            "" !== reviewTitleInput.value &&
            e &&
            "" !== reviewDescInput.value &&
            !editList
                ? (document
                      .getElementById("review-list")
                      .insertAdjacentHTML("afterbegin", a),
                  document.getElementById("review-close").click(),
                  editReviewList())
                : "" !== reviewTitleInput.value &&
                  e &&
                  "" !== reviewDescInput.value &&
                  editList &&
                  ((i = 0),
                  (i = document.getElementById("id-field").value),
                  (document
                      .getElementById(i)
                      .querySelector(".rate-num").innerHTML =
                      parseFloat(e).toFixed(1)),
                  (document
                      .getElementById(i)
                      .querySelector(".review-title").innerHTML =
                      reviewTitleInput.value),
                  (document
                      .getElementById(i)
                      .querySelector(".review-desc").innerHTML =
                      reviewDescInput.value),
                  (document
                      .getElementById(i)
                      .querySelector(".review-gallery-img").innerHTML = ""),
                  document
                      .querySelectorAll("#dropzone-preview .dz-image-preview")
                      .forEach(function (e) {
                          var t = e.querySelector("[data-dz-thumbnail]"),
                              e = e.querySelector("[data-dz-name]").innerHTML;
                          document
                              .getElementById(i)
                              .querySelector(".review-gallery-img").innerHTML +=
                              '<a href="#" class="avatar-md mt-3">                <div class="avatar-title bg-light rounded">                    <img src="' +
                              t.src +
                              '" alt="' +
                              e +
                              '" class="product-img avatar-sm">                </div>            </a>';
                      }),
                  document.getElementById("review-close").click()),
            !0
        );
    });
}),
    document
        .getElementById("addReview")
        .addEventListener("hidden.bs.modal", function () {
            clearFields();
        });
var removeProduct = document.getElementById("removeItemModal");
function editReviewList() {
    Array.from(document.querySelectorAll("#review-list .review-list")).forEach(
        function (r) {
            r.querySelector(".edit-item-list").addEventListener(
                "click",
                function (e) {
                    editList = !0;
                    var t = r.getAttribute("id");
                    (document.getElementById("id-field").value = t),
                        (reviewTitleInput.value =
                            r.querySelector(".review-title").innerHTML),
                        (reviewDescInput.value =
                            r.querySelector(".review-desc").innerHTML),
                        r.querySelectorAll(
                            ".review-gallery-img .product-img"
                        ) &&
                            r
                                .querySelectorAll(
                                    ".review-gallery-img .product-img"
                                )
                                .forEach(function (e) {
                                    var t = {
                                        name: e.getAttribute("alt"),
                                        size: 12345,
                                    };
                                    dropzone.options.addedfile.call(
                                        dropzone,
                                        t
                                    ),
                                        dropzone.options.thumbnail.call(
                                            dropzone,
                                            t,
                                            e.src
                                        );
                                }),
                        basicRating.setRating(
                            parseFloat(r.querySelector(".rate-num").innerHTML)
                        );
                }
            );
        }
    );
}
removeProduct &&
    removeProduct.addEventListener("show.bs.modal", function (t) {
        document
            .getElementById("remove-product")
            .addEventListener("click", function (e) {
                t.relatedTarget.closest(".review-list").remove(),
                    document.getElementById("close-modal-review").click();
            });
    }),
    editReviewList();
