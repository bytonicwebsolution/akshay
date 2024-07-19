var ckClassicEditor = document.querySelectorAll(".private-notes"),
    perPage =
        (ckClassicEditor &&
            Array.from(ckClassicEditor).forEach(function () {
                ClassicEditor.create(document.querySelector(".private-notes"))
                    .then(function (e) {
                        e.ui.view.editable.element.style.height = "60px";
                    })
                    .catch(function (e) {
                        console.error(e);
                    });
            }),
        10),
    editList = !1,
    options = new List("customer-list", {
        valueNames: ["id", "customer", "email", "contact", "date", "status"],
        page: perPage,
        pagination: !0,
        plugins: [ListPagination({ left: 2, right: 2 })],
    }),
    customerList = new List("customer-list", options).on(
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
                a = e.i > e.matchingItems.length - e.page;
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
                a &&
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
const xhttp = new XMLHttpRequest();
function isStatus(e) {
    switch (e) {
        case "Active":
            return (
                '<span class="badge bg-success-subtle text-success">' +
                e +
                "</span>"
            );
        case "Unactive":
            return (
                '<span class="badge bg-secondary-subtle text-secondary">' +
                e +
                "</span>"
            );
        case "Block":
            return (
                '<span class="badge bg-danger-subtle text-danger">' +
                e +
                "</span>"
            );
    }
}
(xhttp.onload = function () {
    var e = JSON.parse(this.responseText);
    Array.from(e).forEach(function (e) {
        customerList.add({
            id:
                '<a href="javascript:void(0);" class="fw-medium link-primary">' +
                e.id +
                "</a>",
            customer:
                '<div class="d-flex align-items-center">                <div class="flex-shrink-0 me-2">                    <div>                        <img class="avatar-xs rounded-circle customer-image-elem" alt="" src="' +
                e.customer[0].img +
                '">                    </div>                </div>                <div class="flex-grow-1">                    <h5 class="fs-base mb-0"><a href="#" class="text-reset customer-name-elem">' +
                e.customer[0].name +
                "</a></h5>                </div>            </div>",
            email: e.email,
            contact: e.phone,
            date: e.create_date,
            status: isStatus(e.status),
        }),
            customerList.sort("id", { order: "desc" });
    }),
        customerList.remove(
            "id",
            '<a href="javascript:void(0);" class="fw-medium link-primary">01</a>'
        ),
        refreshCallbacks();
}),
    xhttp.open("GET", "assets/json/customer-list.json"),
    xhttp.send(),
    (isCount = new DOMParser().parseFromString(
        customerList.items.slice(-1)[0]._values.id,
        "text/html"
    )),
    document
        .querySelector(".pagination-next")
        .addEventListener("click", function () {
            document.querySelector(".pagination.listjs-pagination") &&
                document
                    .querySelector(".pagination.listjs-pagination")
                    .querySelector(".active") &&
                null !=
                    document
                        .querySelector(".pagination.listjs-pagination")
                        .querySelector(".active").nextElementSibling &&
                document
                    .querySelector(".pagination.listjs-pagination")
                    .querySelector(".active")
                    .nextElementSibling.children[0].click();
        }),
    document
        .querySelector(".pagination-prev")
        .addEventListener("click", function () {
            document.querySelector(".pagination.listjs-pagination") &&
                document
                    .querySelector(".pagination.listjs-pagination")
                    .querySelector(".active") &&
                null !=
                    document
                        .querySelector(".pagination.listjs-pagination")
                        .querySelector(".active").previousSibling &&
                document
                    .querySelector(".pagination.listjs-pagination")
                    .querySelector(".active")
                    .previousSibling.children[0].click();
        }),
    document
        .getElementById("showModal")
        .addEventListener("show.bs.modal", function (e) {
            e.relatedTarget.classList.contains("edit-item-btn")
                ? ((document.getElementById("exampleModalLabel").innerHTML =
                      "Edit Customer"),
                  (document
                      .getElementById("showModal")
                      .querySelector(".modal-footer").style.display = "block"),
                  (document.getElementById("add-btn").innerHTML = "Update"))
                : e.relatedTarget.classList.contains("add-btn")
                ? ((document.getElementById("exampleModalLabel").innerHTML =
                      "Add Customer"),
                  (document
                      .getElementById("showModal")
                      .querySelector(".modal-footer").style.display = "block"),
                  (document.getElementById("add-btn").innerHTML =
                      "Add Customer"))
                : ((document.getElementById("exampleModalLabel").innerHTML =
                      "List product"),
                  (document
                      .getElementById("showModal")
                      .querySelector(".modal-footer").style.display = "none"));
        }),
    document
        .querySelector("#customer-image-input")
        .addEventListener("change", function () {
            var e = document.querySelector("#customer-img"),
                t = document.querySelector("#customer-image-input").files[0],
                a = new FileReader();
            a.addEventListener(
                "load",
                function () {
                    e.src = a.result;
                },
                !1
            ),
                t && a.readAsDataURL(t);
        });
var idField = document.getElementById("id-field"),
    customerImg = document.getElementById("customer-img"),
    customerNameField = document.getElementById("customername-field"),
    emailField = document.getElementById("email-field"),
    contactField = document.getElementById("contact-field"),
    joinDateField = document.getElementById("date-field"),
    statsField = document.getElementById("status-field"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn"),
    viewBtns = document.getElementsByClassName("view-item-btn"),
    statsVal = new Choices(statsField, { searchEnabled: !1 }),
    count =
        (flatpickr("#date-field", { enableTime: !0, dateFormat: "d M, Y" }),
        refreshCallbacks(),
        14),
    forms = document.querySelectorAll(".tablelist-form");
function refreshCallbacks() {
    removeBtns &&
        Array.from(removeBtns).forEach(function (e) {
            e.addEventListener("click", function (e) {
                e.target.closest("tr").children[0].innerText,
                    (itemId = e.target.closest("tr").children[0].innerText);
                e = customerList.get({ id: itemId });
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
                                customerList.remove("id", t.outerHTML),
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
                    e.target.closest("tr").children[0].innerText,
                        (itemId = e.target.closest("tr").children[0].innerText);
                    e = customerList.get({ id: itemId });
                    Array.from(e).forEach(function (e) {
                        var t = (isid = new DOMParser().parseFromString(
                            e._values.id,
                            "text/html"
                        )).body.firstElementChild.innerHTML;
                        t == itemId &&
                            ((editList = !0),
                            (idField.value = t),
                            (t = new DOMParser().parseFromString(
                                e._values.customer,
                                "text/html"
                            )),
                            (customerImg.src = t.body.querySelector(
                                ".customer-image-elem"
                            ).src),
                            (customerNameField.value = t.body.querySelector(
                                ".customer-name-elem"
                            ).innerHTML),
                            (emailField.value = e._values.email),
                            (contactField.value = e._values.contact),
                            (joinDateField.value = e._values.date),
                            (t = new DOMParser().parseFromString(
                                e._values.status,
                                "text/html"
                            )),
                            (statsField.value =
                                t.body.querySelector(".badge").innerHTML),
                            flatpickr("#date-field", {
                                enableTime: !0,
                                dateFormat: "d M, Y",
                                defaultDate: e._values.date,
                            }),
                            statsVal && statsVal.destroy(),
                            (statsVal = new Choices(statsField, {
                                searchEnabled: !1,
                            })).setChoiceByValue(
                                t.body.querySelector(".badge").innerHTML
                            ));
                    });
                });
            }),
        viewBtns &&
            Array.from(viewBtns).forEach(function (e) {
                e.addEventListener("click", function (e) {
                    e.target.closest("tr").children[0].innerText,
                        (itemId = e.target.closest("tr").children[0].innerText);
                    e = customerList.get({ id: itemId });
                    Array.from(e).forEach(function (e) {
                        var t;
                        (isid = new DOMParser().parseFromString(
                            e._values.id,
                            "text/html"
                        )).body.firstElementChild.innerHTML == itemId &&
                            ((t = new DOMParser().parseFromString(
                                e._values.customer,
                                "text/html"
                            )),
                            (document.querySelector(
                                "#overview-card .overview-img"
                            ).src = t.body.querySelector(
                                ".customer-image-elem"
                            ).src),
                            (document.querySelector(
                                "#overview-card .overview-name"
                            ).innerHTML = t.body.querySelector(
                                ".customer-name-elem"
                            ).innerHTML),
                            (t = t.body
                                .querySelector(".customer-name-elem")
                                .innerHTML.split(" ")),
                            (document.querySelector(
                                "#overview-card .overview-nick-name"
                            ).innerHTML = "@" + t[1]),
                            (document.querySelector(
                                "#overview-card .overview-email"
                            ).innerHTML = e._values.email),
                            (document.querySelector(
                                "#overview-card .overview-contact"
                            ).innerHTML = e._values.contact),
                            (document.querySelector(
                                "#overview-card .overview-date"
                            ).innerHTML = e._values.date),
                            (t = e._values.status),
                            (document.querySelector(
                                "#overview-card .overview-status"
                            ).innerHTML = t));
                    });
                });
            });
}
function filterData() {
    var s = document.getElementById("idStatus").value,
        n = document.getElementById("datepicker-range").value,
        l = n.split(" to ")[0],
        r = n.split(" to ")[1];
    customerList.filter(function (e) {
        var t = (matchData = new DOMParser().parseFromString(
                e.values().status,
                "text/html"
            )).body.firstElementChild.innerHTML,
            a = !1,
            i = !1,
            a = "all" == t || "all" == s || t == s,
            i =
                new Date(e.values().create_date) >= new Date(l) &&
                new Date(e.values().create_date) <= new Date(r);
        return (a && i) || (a && "" == n ? a : i && "" == n ? i : void 0);
    }),
        customerList.update();
}
function clearFields() {
    (document.getElementById("id-field").value = ""),
        (customerImg.src = "assets/images/users/user-dummy-img.jpg"),
        (customerNameField.value = ""),
        (emailField.value = ""),
        (contactField.value = ""),
        (joinDateField.value = ""),
        statsVal && statsVal.destroy(),
        (statsVal = new Choices(statsField, { searchEnabled: !1 })),
        flatpickr("#date-field", { enableTime: !0, dateFormat: "d M, Y" }),
        (document.getElementById("customer-image-input").value = "");
}
Array.prototype.slice.call(forms).forEach(function (e) {
    e.addEventListener("submit", function (e) {
        e.preventDefault();
        var t = document.getElementById("alert-error-msg"),
            e =
                (t.classList.remove("d-none"),
                setTimeout(() => t.classList.add("d-none"), 2e3),
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        return "" == customerNameField.value
            ? !(t.innerHTML = "Please enter a customer name")
            : emailField.value.match(e)
            ? "" == contactField.value
                ? !(t.innerHTML = "Please enter a contact no")
                : "" == joinDateField.value
                ? !(t.innerHTML = "Please select a join date")
                : "" == statsField.value
                ? !(t.innerHTML = "Please select a status")
                : ("" !== customerNameField.value &&
                  emailField.value.match(e) &&
                  "" !== contactField.value &&
                  "" !== joinDateField.value &&
                  "" !== statsField.value &&
                  !editList
                      ? (customerList.add({
                            id:
                                '<a href="javascript:void(0);" class="fw-medium link-primary">' +
                                count +
                                "</a>",
                            customer:
                                '<div class="d-flex align-items-center">                    <div class="flex-shrink-0 me-2">                        <div>                            <img class="avatar-xs rounded-circle customer-image-elem" alt="" src="' +
                                customerImg.src +
                                '">                        </div>                    </div>                    <div class="flex-grow-1">                        <h5 class="fs-base mb-0"><a href="#" class="text-reset customer-name-elem">' +
                                customerNameField.value +
                                "</a></h5>                    </div>                </div>",
                            email: emailField.value,
                            contact: contactField.value,
                            date: joinDateField.value,
                            status: isStatus(statsField.value),
                        }),
                        customerList.sort("id", { order: "desc" }),
                        document
                            .getElementById("alert-error-msg")
                            .classList.add("d-none"),
                        document.getElementById("close-ordermodal").click(),
                        count++,
                        clearFields(),
                        refreshCallbacks(),
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Customer list inserted successfully!",
                            showConfirmButton: !1,
                            timer: 2e3,
                            showCloseButton: !0,
                        }))
                      : "" !== customerNameField.value &&
                        emailField.value.match(e) &&
                        "" !== contactField.value &&
                        "" !== joinDateField.value &&
                        "" !== statsField.value &&
                        editList &&
                        ((e = customerList.get({ id: idField.value })),
                        Array.from(e).forEach(function (e) {
                            (isid = new DOMParser().parseFromString(
                                e._values.id,
                                "text/html"
                            )).body.firstElementChild.innerHTML == itemId &&
                                e.values({
                                    id:
                                        '<a href="javascript:void(0);" class="fw-medium link-primary">' +
                                        idField.value +
                                        "</a>",
                                    customer:
                                        '<div class="d-flex align-items-center">                            <div class="flex-shrink-0 me-2">                                <div>                                    <img class="avatar-xs rounded-circle customer-image-elem" alt="" src="' +
                                        customerImg.src +
                                        '">                                </div>                            </div>                            <div class="flex-grow-1">                                <h5 class="fs-base mb-0"><a href="#" class="text-reset customer-name-elem">' +
                                        customerNameField.value +
                                        "</a></h5>                            </div>                        </div>",
                                    email: emailField.value,
                                    contact: contactField.value,
                                    date: joinDateField.value,
                                    status: isStatus(statsField.value),
                                });
                        }),
                        document
                            .getElementById("alert-error-msg")
                            .classList.add("d-none"),
                        document.getElementById("close-ordermodal").click(),
                        clearFields(),
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Customer Detail updated Successfully!",
                            showConfirmButton: !1,
                            timer: 2e3,
                            showCloseButton: !0,
                        })),
                  !0)
            : !(t.innerHTML = "Please enter valid email address");
    });
}),
    document
        .getElementById("showModal")
        .addEventListener("hidden.bs.modal", function () {
            clearFields();
        });
