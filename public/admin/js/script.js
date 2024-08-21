// Check if the pagination-next button exists before adding event listener
const paginationNext = document.querySelector(".pagination-next");
if (paginationNext) {
    paginationNext.addEventListener("click", function () {
        const activePaginationItem = document.querySelector(
            ".pagination.listjs-pagination .active"
        );
        if (activePaginationItem && activePaginationItem.nextElementSibling) {
            activePaginationItem.nextElementSibling.children[0].click();
        }
    });
}

// Check if the pagination-prev button exists before adding event listener
const paginationPrev = document.querySelector(".pagination-prev");
if (paginationPrev) {
    paginationPrev.addEventListener("click", function () {
        const activePaginationItem = document.querySelector(
            ".pagination.listjs-pagination .active"
        );
        if (activePaginationItem && activePaginationItem.previousSibling) {
            activePaginationItem.previousSibling.children[0].click();
        }
    });
}

// Check if the showModal element exists before adding event listener
const showModal = document.getElementById("showModal");
if (showModal) {
    showModal.addEventListener("show.bs.modal", function (e) {
        const modalFooter = document
            .getElementById("showModal")
            .querySelector(".modal-footer");
        if (e.relatedTarget.classList.contains("edit-item-btn")) {
            document.getElementById("exampleModalLabel").innerHTML =
                "Edit " + e.relatedTarget.dataset.name;
            modalFooter.style.display = "block";
            document.getElementById("add-btn").innerHTML = "Update";
        } else if (e.relatedTarget.classList.contains("add-btn")) {
            document.getElementById("exampleModalLabel").innerHTML =
                "Add " + e.relatedTarget.dataset.name;
            modalFooter.style.display = "block";
            document.getElementById("add-btn").innerHTML =
                "Add " + e.relatedTarget.dataset.name;
        } else {
            document.getElementById("exampleModalLabel").innerHTML =
                "List " + e.relatedTarget.dataset.name;
            modalFooter.style.display = "none";
        }
    });
}

// Check if the image-input element exists before adding event listener Category and vendor
const imageInput = document.querySelector("#image-input");
if (imageInput) {
    imageInput.addEventListener("change", function () {
        const e = document.querySelector("#image-preview");
        const t = imageInput.files[0];
        const a = new FileReader();
        a.addEventListener(
            "load",
            function () {
                e.src = a.result;
            },
            false
        );
        if (t) a.readAsDataURL(t);
    });
}

const editImageInput = document.querySelector("#editicon");
if (editImageInput) {
    editImageInput.addEventListener("change", function () {
        const e = document.querySelector("#editimage-preview");
        const t = editImageInput.files[0];
        const a = new FileReader();
        a.addEventListener(
            "load",
            function () {
                e.src = a.result;
            },
            false
        );
        if (t) a.readAsDataURL(t);
    });
}

const UserImageInput = document.querySelector("#image");
if (UserImageInput) {
    UserImageInput.addEventListener("change", function () {
        const e = document.querySelector("#edituserimage-preview");
        const t = UserImageInput.files[0];
        const a = new FileReader();
        a.addEventListener(
            "load",
            function () {
                e.src = a.result;
            },
            false
        );
        if (t) a.readAsDataURL(t);
    });
}
const EditImageInput = document.querySelector("#editimage");
if (EditImageInput) {
    EditImageInput.addEventListener("change", function () {
        const e = document.querySelector("#editimage-preview");
        const t = EditImageInput.files[0];
        const a = new FileReader();
        a.addEventListener(
            "load",
            function () {
                e.src = a.result;
            },
            false
        );
        if (t) a.readAsDataURL(t);
    });
}

function logout() {
    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: "once",
        id: "question",
        zindex: 999,
        title: "Hey",
        message: "Are you sure you want to logout?",
        position: "center",
        buttons: [
            [
                "<button><b>YES</b></button>",
                function (instance, toast) {
                    instance.hide(
                        {
                            transitionOut: "fadeOut",
                        },
                        toast,
                        "button"
                    );
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/admin/logout",
                    })
                        .done((res) => {
                            iziToast.info({
                                title: "Success",
                                message: res.message,
                                position: "topRight",
                            });
                            setTimeout(function () {
                                window.location.href = "/admin/login";
                            }, 1000);
                        })
                        .fail(function (xhr, status, error) {
                            iziToast.error({
                                title: "Error",
                                message: xhr.responseText,
                                position: "topRight",
                            });
                        });
                },
            ],
            [
                "<button>NO</button>",
                function (instance, toast) {
                    instance.hide(
                        {
                            transitionOut: "fadeOut",
                        },
                        toast,
                        "button"
                    );
                },
            ],
        ],
    });
}

function sellerLogout() {
    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: "once",
        id: "question",
        zindex: 999,
        title: "Hey",
        message: "Are you sure you want to logout?",
        position: "center",
        buttons: [
            [
                "<button><b>YES</b></button>",
                function (instance, toast) {
                    instance.hide(
                        {
                            transitionOut: "fadeOut",
                        },
                        toast,
                        "button"
                    );
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/seller/logout",
                    })
                        .done((res) => {
                            iziToast.info({
                                title: "Success",
                                message: res.message,
                                position: "topRight",
                            });
                            setTimeout(function () {
                                window.location.href = "/seller/login";
                            }, 1000);
                        })
                        .fail(function (xhr, status, error) {
                            iziToast.error({
                                title: "Error",
                                message: xhr.responseText,
                                position: "topRight",
                            });
                        });
                },
            ],
            [
                "<button>NO</button>",
                function (instance, toast) {
                    instance.hide(
                        {
                            transitionOut: "fadeOut",
                        },
                        toast,
                        "button"
                    );
                },
            ],
        ],
    });
}
