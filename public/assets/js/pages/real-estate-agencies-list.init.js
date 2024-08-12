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
      "agencies_id",
      "since",
      "agencies_Name",
      "address",
      "total_property",
      "employee",
      "email",
      "contact",
    ],
    page: perPage,
    pagination: !0,
    plugins: [ListPagination({ left: 2, right: 2 })],
  },
  agencyList = new List("agenciesList", options).on("updated", function (e) {
    0 == e.matchingItems.length
      ? (document.getElementsByClassName("noresult")[0].style.display = "block")
      : (document.getElementsByClassName("noresult")[0].style.display = "none");
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
      t && document.querySelector(".pagination-prev").classList.add("disabled"),
      n && document.querySelector(".pagination-next").classList.add("disabled"),
      e.matchingItems.length <= perPage
        ? (document.getElementById("pagination-element").style.display = "none")
        : (document.getElementById("pagination-element").style.display =
            "flex"),
      0 < e.matchingItems.length
        ? (document.getElementsByClassName("noresult")[0].style.display =
            "none")
        : (document.getElementsByClassName("noresult")[0].style.display =
            "block");
  });
const xhttp = new XMLHttpRequest();
(xhttp.onload = function () {
  var e = JSON.parse(this.responseText);
  Array.from(e).forEach(function (e) {
    agencyList.add({
      agencies_id:
        '<a href="apps-real-estate-agencies-overview.html" class="fw-medium link-primary">#TBA0' +
        e.id +
        "</a>",
      since: e.since,
      agencies_Name:
        '<div class="d-flex align-items-center gap-2">                <img src="' +
        e.agency[0].img +
        '" alt="' +
        e.agency[0].img_alt +
        '" class="avatar-xxs rounded">                <a href="apps-real-estate-agencies-overview.html" class="text-reset text-capitalize">' +
        e.agency[0].name +
        "</a>            </div>",
      address: e.location,
      total_property: e.property,
      employee: e.employee,
      email: e.email,
      contact: e.contact,
    }),
      agencyList.sort("agencies_id", { order: "desc" });
  }),
    agencyList.remove(
      "agencies_id",
      '<a href="apps-real-estate-agencies-overview.html" class="fw-medium link-primary">#TBA001</a>'
    ),
    refreshCallbacks(),
    ischeckboxcheck();
}),
  xhttp.open("GET", "assets/json/agency-list.json"),
  xhttp.send(),
  (isCount = new DOMParser().parseFromString(
    agencyList.items.slice(-1)[0]._values.agencies_id,
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
var sorttableDropdown = document.querySelectorAll(".sortble-dropdown"),
  idFieldInput =
    (sorttableDropdown &&
      sorttableDropdown.forEach(function (n) {
        n.querySelectorAll(".dropdown-menu .dropdown-item").forEach(function (
          t
        ) {
          t.addEventListener("click", function () {
            var e = t.innerHTML;
            n.querySelector(".dropdown-title").innerHTML = e;
          });
        });
      }),
    document.getElementById("id-field")),
  agencyNameInput = document.getElementById("agencies-name-input"),
  sinceInput = document.getElementById("since-input"),
  propertyInput = document.getElementById("property-input"),
  employeeInput = document.getElementById("employee-input"),
  emailInput = document.getElementById("email-input"),
  contactInput = document.getElementById("contact-input"),
  addressInput = document.getElementById("address-input"),
  removeBtns = document.getElementsByClassName("remove-item-btn"),
  editBtns = document.getElementsByClassName("edit-item-btn"),
  count = (flatpickr("#since-input", { enableTime: !1, dateFormat: "Y" }), 14),
  forms = document.querySelectorAll(".tablelist-form");
function ischeckboxcheck() {
  Array.from(document.getElementsByName("chk_child")).forEach(function (n) {
    n.addEventListener("change", function (e) {
      1 == n.checked
        ? e.target.closest("tr").classList.add("table-active")
        : e.target.closest("tr").classList.remove("table-active");
      var t = document.querySelectorAll('[name="chk_child"]:checked').length;
      e.target.closest("tr").classList.contains("table-active"),
        0 < t
          ? document.getElementById("remove-actions").classList.remove("d-none")
          : document.getElementById("remove-actions").classList.add("d-none");
    });
  });
}
function refreshCallbacks() {
  editBtns &&
    Array.from(editBtns).forEach(function (e) {
      e.addEventListener("click", function (e) {
        e.target.closest("tr").children[1].innerText,
          (itemId = e.target.closest("tr").children[1].innerText);
        e = agencyList.get({ agencies_id: itemId });
        Array.from(e).forEach(function (e) {
          var t = (isid = new DOMParser().parseFromString(
            e._values.agencies_id,
            "text/html"
          )).body.firstElementChild.innerHTML;
          t == itemId &&
            ((editList = !0),
            (document.getElementById("addAgencyModalLabel").innerHTML =
              "Edit Agencies Details"),
            (document.getElementById("add-btn").innerHTML = "Update"),
            (idFieldInput.value = t),
            (t = new DOMParser().parseFromString(
              e._values.agencies_Name,
              "text/html"
            )),
            (agencyNameInput.value =
              t.body.querySelector(".text-reset").innerHTML),
            (sinceInput.value = e._values.since),
            (propertyInput.value = e._values.total_property),
            (employeeInput.value = e._values.employee),
            (emailInput.value = e._values.email),
            (contactInput.value = e._values.contact),
            (addressInput.value = e._values.address),
            flatpickr("#since-input", {
              enableTime: !1,
              dateFormat: "Y",
              defaultDate: e._values.date,
            }),
            (document.getElementById("dropzone-preview").innerHTML = ""),
            (e = {
              name: t.body.querySelector("img").getAttribute("alt"),
              size: 12345,
            }),
            dropzone.options.addedfile.call(dropzone, e),
            dropzone.options.thumbnail.call(
              dropzone,
              e,
              t.body.querySelector("img").src
            ));
        });
      });
    }),
    removeBtns &&
      Array.from(removeBtns).forEach(function (e) {
        e.addEventListener("click", function (e) {
          e.target.closest("tr").children[1].innerText,
            (itemId = e.target.closest("tr").children[1].innerText);
          e = agencyList.get({ agencies_id: itemId });
          Array.from(e).forEach(function (e) {
            var e = new DOMParser().parseFromString(
                e._values.agencies_id,
                "text/html"
              ),
              t = e.body.firstElementChild;
            e.body.firstElementChild.innerHTML == itemId &&
              document
                .getElementById("delete-record")
                .addEventListener("click", function () {
                  agencyList.remove("agencies_id", t.outerHTML),
                    document.getElementById("deleteRecord-close").click();
                });
          });
        });
      });
}
function clearFields() {
  (editList = !1),
    (document.getElementById("addAgencyModalLabel").innerHTML = "Add Agencies"),
    (document.getElementById("add-btn").innerHTML = "Add"),
    (idFieldInput.value = ""),
    (document.getElementById("dropzone-preview").innerHTML = ""),
    (agencyNameInput.value = ""),
    (sinceInput.value = ""),
    (propertyInput.value = ""),
    (employeeInput.value = ""),
    (emailInput.value = ""),
    (contactInput.value = ""),
    (addressInput.value = ""),
    flatpickr("#since-input", { enableTime: !1, dateFormat: "Y" });
}
function deleteMultiple() {
  ids_array = [];
  var e,
    t = document.getElementsByName("chk_child");
  for (i = 0; i < t.length; i++)
    1 == t[i].checked &&
      ((e =
        t[i].parentNode.parentNode.parentNode.querySelector("td a").innerHTML),
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
            agencyList.remove(
              "agencies_id",
              `<a href="apps-real-estate-agencies-overview.html" class="fw-medium link-primary">${ids_array[i]}</a>`
            );
          document.getElementById("remove-actions").classList.add("d-none"),
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
            document.querySelectorAll(".dz-image-preview")[0].innerHTML,
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
      : "" == agencyNameInput.value
      ? !(n.innerHTML = "Please enter a agency name")
      : "" == sinceInput.value
      ? !(n.innerHTML = "Please select a since year")
      : "" == propertyInput.value
      ? !(n.innerHTML = "Please enter a no. of property area")
      : "" == employeeInput.value
      ? !(n.innerHTML = "Please enter a no. of employee")
      : emailInput.value.match(e)
      ? "" == contactInput.value
        ? !(n.innerHTML = "Please enter a contact no")
        : "" == addressInput.value
        ? !(n.innerHTML = "Please enter a address")
        : ("" !== agencyNameInput.value &&
          "" !== sinceInput.value &&
          "" !== propertyInput.value &&
          "" !== employeeInput.value &&
          emailInput.value.match(e) &&
          "" !== contactInput.value &&
          "" !== addressInput.value &&
          0 < document.querySelectorAll(".dz-image-preview").length &&
          !editList
            ? (agencyList.add({
                agencies_id:
                  '<a href="apps-real-estate-agencies-overview.html" class="fw-medium link-primary">#TBA0' +
                  count +
                  "</a>",
                since: sinceInput.value,
                agencies_Name:
                  '<div class="d-flex align-items-center gap-2">                    <img src="' +
                  t.src +
                  '" alt="' +
                  t.getAttribute("alt") +
                  '" class="avatar-xxs rounded">                    <a href="apps-real-estate-agencies-overview.html" class="text-reset text-capitalize">' +
                  agencyNameInput.value +
                  "</a>                </div>",
                address: addressInput.value,
                total_property: propertyInput.value,
                employee: employeeInput.value,
                email: emailInput.value,
                contact: contactInput.value,
              }),
              agencyList.sort("agencies_id", { order: "desc" }),
              document
                .getElementById("alert-error-msg")
                .classList.add("d-none"),
              document.getElementById("close-addAgencyModal").click(),
              count++,
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Agency detail inserted successfully!",
                showConfirmButton: !1,
                timer: 2e3,
                showCloseButton: !0,
              }))
            : "" !== agencyNameInput.value &&
              "" !== sinceInput.value &&
              "" !== propertyInput.value &&
              "" !== employeeInput.value &&
              emailInput.value.match(e) &&
              "" !== contactInput.value &&
              "" !== addressInput.value &&
              0 < document.querySelectorAll(".dz-image-preview").length &&
              editList &&
              ((e = agencyList.get({ agencies_id: idFieldInput.value })),
              Array.from(e).forEach(function (e) {
                (isid = new DOMParser().parseFromString(
                  e._values.agencies_id,
                  "text/html"
                )).body.firstElementChild.innerHTML == itemId &&
                  e.values({
                    agencies_id:
                      '<a href="apps-real-estate-agencies-overview.html" class="fw-medium link-primary">' +
                      idFieldInput.value +
                      "</a>",
                    since: sinceInput.value,
                    agencies_Name:
                      '<div class="d-flex align-items-center gap-2">                            <img src="' +
                      t.src +
                      '" alt="' +
                      t.getAttribute("alt") +
                      '" class="avatar-xxs rounded">                            <a href="apps-real-estate-agencies-overview.html" class="text-reset text-capitalize">' +
                      agencyNameInput.value +
                      "</a>                        </div>",
                    address: addressInput.value,
                    total_property: propertyInput.value,
                    employee: employeeInput.value,
                    email: emailInput.value,
                    contact: contactInput.value,
                  });
              }),
              document
                .getElementById("alert-error-msg")
                .classList.add("d-none"),
              document.getElementById("close-addAgencyModal").click(),
              clearFields(),
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Agency Details updated Successfully!",
                showConfirmButton: !1,
                timer: 2e3,
                showCloseButton: !0,
              })),
          !0)
      : !(n.innerHTML = "Please enter valid email address");
  });
}),
  document
    .getElementById("addAgencies")
    .addEventListener("hidden.bs.modal", function () {
      clearFields();
    });
