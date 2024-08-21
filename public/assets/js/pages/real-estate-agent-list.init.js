var previewTemplate,
    dropzone,
    dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
(dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone(".dropzone", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#dropzone-preview",
        })));
const checkAll = document.getElementById("checkAll");
function handleCheckAll() {
    var e = document.querySelectorAll('.form-check-all input[type="checkbox"]'),
        t = document.querySelectorAll(
            '.form-check-all input[type="checkbox"]:checked'
        ).length;
    const n = this.checked;
    e.forEach((e) => {
        (e.checked = n), updateRowStyle(e);
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
            "agent_id",
            "joining_date",
            "agent_Name",
            "address",
            "email",
            "propert_type",
            "contact",
            "status",
        ],
        page: perPage,
        pagination: !0,
        plugins: [ListPagination({ left: 2, right: 2 })],
    },
    agentList = new List("agentList", options).on("updated", function (e) {
        0 == e.matchingItems.length
            ? (document.getElementsByClassName("noresult")[0].style.display =
                  "block")
            : (document.getElementsByClassName("noresult")[0].style.display =
                  "none");
        var t = 1 == e.i,
            n = e.i > e.matchingItems.length - e.page;
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
            n &&
                document
                    .querySelector(".pagination-next")
                    .classList.add("disabled"),
            e.matchingItems.length <= perPage
                ? (document.getElementById("pagination-element").style.display =
                      "none")
                : (document.getElementById("pagination-element").style.display =
                      "flex"),
            0 < e.matchingItems.length
                ? (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "none")
                : (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "block");
    });
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
                '<span class="badge bg-danger-subtle text-danger">' +
                e +
                "</span>"
            );
    }
}
(xhttp.onload = function () {
    var e = JSON.parse(this.responseText);
    Array.from(e).forEach(function (e) {
        agentList.add({
            agent_id:
                '<a href="apps-real-estate-agent-overview.html" class="fw-medium link-primary">#TBS' +
                e.id +
                "</a>",
            joining_date: e.joining_date,
            agent_Name:
                '<div class="d-flex align-items-center gap-2">                <img src="' +
                e.agent[0].img +
                '" alt="' +
                e.agent[0].img_alt +
                '" class="avatar-xs rounded">                <a href="apps-real-estate-agent-overview.html" class="text-reset text-capitalize">' +
                e.agent[0].name +
                "</a>            </div>",
            address: e.location,
            email: e.email,
            contact: e.contact,
            status: isStatus(e.status),
        }),
            agentList.sort("agent_id", { order: "desc" });
    }),
        agentList.remove(
            "agent_id",
            '<a href="apps-real-estate-agent-overview.html" class="fw-medium link-primary">#TBS01</a>'
        ),
        refreshCallbacks(),
        ischeckboxcheck();
}),
    xhttp.open("GET", "assets/json/agent-list.json"),
    xhttp.send(),
    (isCount = new DOMParser().parseFromString(
        agentList.items.slice(-1)[0]._values.agent_id,
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
        });
var idFieldInput = document.getElementById("id-field"),
    agentNameInput = document.getElementById("agent-name-input"),
    emailInput = document.getElementById("email-input"),
    contactInput = document.getElementById("contact-input"),
    statusInput = document.getElementById("status-type-input"),
    addressInput = document.getElementById("address-input"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn"),
    statusTypeVal = new Choices(statusInput, {
        searchEnabled: !1,
        removeItemButton: !0,
    }),
    date = new Date().toUTCString().slice(5, 16),
    count = 14,
    forms = document.querySelectorAll(".tablelist-form");
function ischeckboxcheck() {
    Array.from(document.getElementsByName("chk_child")).forEach(function (n) {
        n.addEventListener("change", function (e) {
            1 == n.checked
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
                e = agentList.get({ agent_id: itemId });
                Array.from(e).forEach(function (e) {
                    var e = new DOMParser().parseFromString(
                            e._values.agent_id,
                            "text/html"
                        ),
                        t = e.body.firstElementChild;
                    e.body.firstElementChild.innerHTML == itemId &&
                        document
                            .getElementById("delete-record")
                            .addEventListener("click", function () {
                                agentList.remove("agent_id", t.outerHTML),
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
                    e = agentList.get({ agent_id: itemId });
                    Array.from(e).forEach(function (e) {
                        var t,
                            n = (isid = new DOMParser().parseFromString(
                                e._values.agent_id,
                                "text/html"
                            )).body.firstElementChild.innerHTML;
                        n == itemId &&
                            ((editList = !0),
                            (document.getElementById(
                                "addAgentModalLabel"
                            ).innerHTML = "Edit Agent Details"),
                            (document.getElementById("add-btn").innerHTML =
                                "Update"),
                            (idFieldInput.value = n),
                            (n = new DOMParser().parseFromString(
                                e._values.agent_Name,
                                "text/html"
                            )),
                            (agentNameInput.value =
                                n.body.querySelector(".text-reset").innerHTML),
                            (emailInput.value = e._values.email),
                            (contactInput.value = e._values.contact),
                            (t = new DOMParser().parseFromString(
                                e._values.status,
                                "text/html"
                            )),
                            statusTypeVal && statusTypeVal.destroy(),
                            (statusTypeVal = new Choices(statusInput, {
                                searchEnabled: !1,
                                removeItemButton: !0,
                            })).setChoiceByValue(
                                t.body.querySelector(".badge").innerHTML
                            ),
                            (addressInput.value = e._values.address),
                            (document.getElementById("date-input").value =
                                e._values.joining_date),
                            (document.getElementById(
                                "dropzone-preview"
                            ).innerHTML = ""),
                            (t = {
                                name: n.body
                                    .querySelector("img")
                                    .getAttribute("alt"),
                                size: 12345,
                            }),
                            dropzone.options.addedfile.call(dropzone, t),
                            dropzone.options.thumbnail.call(
                                dropzone,
                                t,
                                n.body.querySelector("img").src
                            ));
                    });
                });
            });
}
function clearFields() {
    (editList = !1),
        (document.getElementById("addAgentModalLabel").innerHTML = "Add Agent"),
        (document.getElementById("add-btn").innerHTML = "Add"),
        (idFieldInput.value = ""),
        (document.getElementById("dropzone-preview").innerHTML = ""),
        (agentNameInput.value = ""),
        (emailInput.value = ""),
        (contactInput.value = ""),
        (addressInput.value = ""),
        (document.getElementById("date-input").value = ""),
        statusTypeVal && statusTypeVal.destroy(),
        (statusTypeVal = new Choices(statusInput, {
            searchEnabled: !1,
            removeItemButton: !0,
        }));
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
                      agentList.remove(
                          "agent_id",
                          `<a href="apps-real-estate-agent-overview.html" class="fw-medium link-primary">${ids_array[i]}</a>`
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
            n = document.getElementById("alert-error-msg"),
            e =
                (n.classList.remove("d-none"),
                setTimeout(() => n.classList.add("d-none"), 2e3),
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        return 0 == document.querySelectorAll(".dz-image-preview").length
            ? !(n.innerHTML = "Please select a image")
            : "" == agentNameInput.value
            ? !(n.innerHTML = "Please enter a agent name")
            : emailInput.value.match(e)
            ? "" == contactInput.value
                ? !(n.innerHTML = "Please enter a contact no")
                : "" == statusInput.value
                ? !(n.innerHTML = "Please select a status")
                : "" == addressInput.value
                ? !(n.innerHTML = "Please enter a address")
                : ("" !== agentNameInput.value &&
                  emailInput.value.match(e) &&
                  "" !== contactInput.value &&
                  "" !== addressInput.value &&
                  "" !== statusInput.value &&
                  0 < document.querySelectorAll(".dz-image-preview").length &&
                  !editList
                      ? (agentList.add({
                            agent_id:
                                '<a href="apps-real-estate-agent-overview.html" class="fw-medium link-primary">#TBS' +
                                count +
                                "</a>",
                            joining_date: date,
                            agent_Name:
                                '<div class="d-flex align-items-center gap-2">                    <img src="' +
                                t.src +
                                '" alt="' +
                                t.getAttribute("alt") +
                                '" class="avatar-xs rounded">                    <a href="apps-real-estate-agent-overview.html" class="text-reset text-capitalize">' +
                                agentNameInput.value +
                                "</a>                </div>",
                            address: addressInput.value,
                            email: emailInput.value,
                            contact: contactInput.value,
                            status: isStatus(statusInput.value),
                        }),
                        agentList.sort("agent_id", { order: "desc" }),
                        document
                            .getElementById("alert-error-msg")
                            .classList.add("d-none"),
                        document.getElementById("close-addAgentModal").click(),
                        count++,
                        clearFields(),
                        refreshCallbacks(),
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Agent detail inserted successfully!",
                            showConfirmButton: !1,
                            timer: 2e3,
                            showCloseButton: !0,
                        }))
                      : "" !== agentNameInput.value &&
                        emailInput.value.match(e) &&
                        "" !== contactInput.value &&
                        "" !== addressInput.value &&
                        "" !== statusInput.value &&
                        0 <
                            document.querySelectorAll(".dz-image-preview")
                                .length &&
                        editList &&
                        ((e = agentList.get({ agent_id: idFieldInput.value })),
                        Array.from(e).forEach(function (e) {
                            (isid = new DOMParser().parseFromString(
                                e._values.agent_id,
                                "text/html"
                            )).body.firstElementChild.innerHTML == itemId &&
                                e.values({
                                    agent_id:
                                        '<a href="apps-real-estate-agent-overview.html" class="fw-medium link-primary">' +
                                        idFieldInput.value +
                                        "</a>",
                                    joining_date:
                                        document.getElementById("date-input")
                                            .value,
                                    agent_Name:
                                        '<div class="d-flex align-items-center gap-2">                            <img src="' +
                                        t.src +
                                        '" alt="' +
                                        t.getAttribute("alt") +
                                        '" class="avatar-xs rounded">                            <a href="apps-real-estate-agent-overview.html" class="text-reset text-capitalize">' +
                                        agentNameInput.value +
                                        "</a>                        </div>",
                                    address: addressInput.value,
                                    email: emailInput.value,
                                    contact: contactInput.value,
                                    status: isStatus(statusInput.value),
                                });
                        }),
                        document
                            .getElementById("alert-error-msg")
                            .classList.add("d-none"),
                        document.getElementById("close-addAgentModal").click(),
                        clearFields(),
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Agent Detail updated Successfully!",
                            showConfirmButton: !1,
                            timer: 2e3,
                            showCloseButton: !0,
                        })),
                  !0)
            : !(n.innerHTML = "Please enter valid email address");
    });
}),
    document
        .getElementById("addAgent")
        .addEventListener("hidden.bs.modal", function () {
            clearFields();
        });
