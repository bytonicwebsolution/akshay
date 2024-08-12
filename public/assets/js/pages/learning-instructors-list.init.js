function getChartColorsArray(e) {
  var t = document.getElementById(e);
  if (t) {
    t = t.dataset.colors;
    if (t)
      return JSON.parse(t).map((e) => {
        var t = e.replace(/\s/g, "");
        return t.includes(",")
          ? 2 === (e = e.split(",")).length
            ? `rgba(${getComputedStyle(
                document.documentElement
              ).getPropertyValue(e[0])}, ${e[1]})`
            : t
          : getComputedStyle(document.documentElement).getPropertyValue(t) || t;
      });
    console.warn("data-colors attribute not found on: " + e);
  }
}
var totalInstructorsChart = "",
  totalCoursesChart = "",
  instructorActivityChart = "";
function loadCharts() {
  var e, t;
  (t = getChartColorsArray("total_instructors")) &&
    ((e = {
      series: [84],
      chart: { height: 170, type: "radialBar", sparkline: { enabled: !0 } },
      plotOptions: {
        radialBar: {
          hollow: { margin: 0, size: "75%" },
          track: { margin: 0 },
          dataLabels: { show: !1 },
        },
      },
      stroke: { lineCap: "round" },
      labels: ["Instructor Total"],
      colors: t,
    }),
    "" != totalInstructorsChart && totalInstructorsChart.destroy(),
    (totalInstructorsChart = new ApexCharts(
      document.querySelector("#total_instructors"),
      e
    )).render()),
    (t = getChartColorsArray("total_courses")) &&
      ((e = {
        series: [33],
        chart: { height: 170, type: "radialBar", sparkline: { enabled: !0 } },
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "75%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
        stroke: { lineCap: "round" },
        labels: ["Instructor Total"],
        colors: t,
      }),
      "" != totalCoursesChart && totalCoursesChart.destroy(),
      (totalCoursesChart = new ApexCharts(
        document.querySelector("#total_courses"),
        e
      )).render());
  (t = getChartColorsArray("instuctor_activity")) &&
    ((e = {
      series: [
        {
          name: "New Orders",
          data: [
            32, 18, 13, 17, 26, 34, 47, 51, 59, 63, 44, 38, 53, 69, 72, 83, 90,
            110, 130, 117, 103, 92, 95, 119, 80, 96, 116, 125,
          ],
        },
        {
          name: "Return Orders",
          data: [
            3, 6, 2, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29, 32, 41, 34,
            29, 37, 70, 55, 49, 36, 30, 52, 38, 33,
          ],
        },
      ],
      chart: { height: 190, type: "line", toolbar: { show: !1 } },
      legend: { show: !1, position: "top", horizontalAlign: "right" },
      grid: { yaxis: { lines: { show: !1 } } },
      markers: { size: 0, hover: { sizeOffset: 4 } },
      stroke: { curve: "smooth", width: 2 },
      colors: t,
      xaxis: {
        type: "datetime",
        categories: [
          "02/01/2023 GMT",
          "02/02/2023 GMT",
          "02/03/2023 GMT",
          "02/04/2023 GMT",
          "02/05/2023 GMT",
          "02/06/2023 GMT",
          "02/07/2023 GMT",
          "02/08/2023 GMT",
          "02/09/2023 GMT",
          "02/10/2023 GMT",
          "02/11/2023 GMT",
          "02/12/2023 GMT",
          "02/13/2023 GMT",
          "02/14/2023 GMT",
          "02/15/2023 GMT",
          "02/16/2023 GMT",
          "02/17/2023 GMT",
          "02/18/2023 GMT",
          "02/19/2023 GMT",
          "02/20/2023 GMT",
          "02/21/2023 GMT",
          "02/22/2023 GMT",
          "02/23/2023 GMT",
          "02/24/2023 GMT",
          "02/25/2023 GMT",
          "02/26/2023 GMT",
          "02/27/2023 GMT",
          "02/28/2023 GMT",
        ],
      },
      yaxis: { show: !1 },
    }),
    "" != instructorActivityChart && instructorActivityChart.destroy(),
    (instructorActivityChart = new ApexCharts(
      document.querySelector("#instuctor_activity"),
      e
    )).render());
}
window.addEventListener("resize", function () {
  setTimeout(() => {
    loadCharts();
  }, 250);
}),
  loadCharts();
var previewTemplate,
  dropzone,
  dropzonePreviewNode = document.querySelector("#dropzone-preview-list"),
  checkAll =
    ((dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
      ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
      dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
      (dropzone = new Dropzone(".instrucor-dropzone", {
        url: "https://httpbin.org/post",
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
      }))),
    document.getElementById("checkAll")),
  perPage =
    (checkAll &&
      (checkAll.onclick = function () {
        for (
          var e = document.querySelectorAll(
              '.form-check-all input[type="checkbox"]'
            ),
            t = document.querySelectorAll(
              '.form-check-all input[type="checkbox"]:checked'
            ).length,
            n = 0;
          n < e.length;
          n++
        )
          (e[n].checked = this.checked),
            e[n].checked
              ? e[n].closest("tr").classList.add("table-active")
              : e[n].closest("tr").classList.remove("table-active"),
            e[n].closest("tr").classList.contains("table-active"),
            0 < t
              ? document
                  .getElementById("remove-actions")
                  .classList.add("d-none")
              : document
                  .getElementById("remove-actions")
                  .classList.remove("d-none");
      }),
    10),
  editList = !1,
  options = {
    valueNames: [
      "instructor_id",
      "instructor",
      "courses_total",
      "email",
      "experience",
      "students",
      "contact",
      "rating",
      "status",
    ],
    page: perPage,
    pagination: !0,
    plugins: [ListPagination({ left: 2, right: 2 })],
  },
  instructorList = new List("instructorList", options).on(
    "updated",
    function (e) {
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
          document.querySelector(".pagination-prev").classList.add("disabled"),
        n &&
          document.querySelector(".pagination-next").classList.add("disabled"),
        e.matchingItems.length <= perPage
          ? (document.getElementById("pagination-element").style.display =
              "none")
          : (document.getElementById("pagination-element").style.display =
              "flex"),
        0 < e.matchingItems.length
          ? (document.getElementsByClassName("noresult")[0].style.display =
              "none")
          : (document.getElementsByClassName("noresult")[0].style.display =
              "block");
    }
  );
const xhttp = new XMLHttpRequest();
function isStatus(e) {
  switch (e) {
    case "Active":
      return (
        '<span class="badge bg-success-subtle text-success">' + e + "</span>"
      );
    case "Unactive":
      return (
        '<span class="badge bg-danger-subtle text-danger">' + e + "</span>"
      );
  }
}
(xhttp.onload = function () {
  var e = JSON.parse(this.responseText);
  Array.from(e).forEach(function (e) {
    instructorList.add({
      instructor_id:
        '<a href="apps-instructors-overview.html" class="fw-medium link-primary">#TBSI1590' +
        e.id +
        "</a>",
      instructor:
        '<div class="d-flex align-items-center gap-2">                <img src="' +
        e.instructor[0].img +
        '" alt="' +
        e.instructor[0].img_alt +
        '" class="avatar-xxs rounded-circle">                <a href="apps-learning-overview.html" class="text-reset">' +
        e.instructor[0].name +
        "</a>            </div>",
      courses_total: e.total_course,
      email: e.email,
      experience: e.experience,
      students: e.students,
      contact: e.contact,
      rating:
        '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">' +
        e.rating +
        "</span>",
      status: isStatus(e.status),
    }),
      instructorList.sort("instructor_id", { order: "desc" });
  }),
    instructorList.remove(
      "instructor_id",
      '<a href="apps-instructors-overview.html" class="fw-medium link-primary">#TBSI159001</a>'
    ),
    refreshCallbacks(),
    ischeckboxcheck();
}),
  xhttp.open("GET", "assets/json/instructors-list.json"),
  xhttp.send(),
  (isCount = new DOMParser().parseFromString(
    instructorList.items.slice(-1)[0]._values.instructor_id,
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
  instructorNameInput = document.getElementById("instructor-name-input"),
  totalCourseInput = document.getElementById("total-courses-input"),
  emailInput = document.getElementById("email-input"),
  studentsInput = document.getElementById("students-input"),
  experienceInput = document.getElementById("experience-input"),
  contactInput = document.getElementById("contact-input"),
  statusInput = document.getElementById("status-input"),
  removeBtns = document.getElementsByClassName("remove-item-btn"),
  editBtns = document.getElementsByClassName("edit-item-btn"),
  statusVal = new Choices(statusInput, { searchEnabled: !1 }),
  count = (refreshCallbacks(), 14),
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
        e = instructorList.get({ instructor_id: itemId });
        Array.from(e).forEach(function (e) {
          var t,
            n = (isid = new DOMParser().parseFromString(
              e._values.instructor_id,
              "text/html"
            )).body.firstElementChild.innerHTML;
          n == itemId &&
            ((editList = !0),
            (document.getElementById("addInstructorModalLabel").innerHTML =
              "Edit Instructor Details"),
            (document.getElementById("add-btn").innerHTML = "Update"),
            (idFieldInput.value = n),
            (n = new DOMParser().parseFromString(
              e._values.instructor,
              "text/html"
            )),
            (instructorNameInput.value =
              n.body.querySelector(".text-reset").innerHTML),
            (emailInput.value = e._values.email),
            (totalCourseInput.value = e._values.courses_total),
            (experienceInput.value = e._values.experience),
            (studentsInput.value = e._values.students),
            (contactInput.value = e._values.contact),
            (t = new DOMParser().parseFromString(
              e._values.status,
              "text/html"
            )),
            statusVal && statusVal.destroy(),
            (statusVal = new Choices(statusInput, {
              searchEnabled: !1,
            })).setChoiceByValue(t.body.querySelector(".badge").innerHTML),
            (document.getElementById("dropzone-preview").innerHTML = ""),
            (t = {
              name: n.body.querySelector("img").getAttribute("alt"),
              size: 12345,
            }),
            dropzone.options.addedfile.call(dropzone, t),
            dropzone.options.thumbnail.call(
              dropzone,
              t,
              n.body.querySelector("img").src
            ),
            (t = new DOMParser().parseFromString(
              e._values.rating,
              "text/html"
            )),
            (document.getElementById("rating-field").value =
              t.body.querySelector(".rate-value").innerHTML));
        });
      });
    }),
    removeBtns &&
      Array.from(removeBtns).forEach(function (e) {
        e.addEventListener("click", function (e) {
          e.target.closest("tr").children[1].innerText,
            (itemId = e.target.closest("tr").children[1].innerText);
          e = instructorList.get({ instructor_id: itemId });
          Array.from(e).forEach(function (e) {
            var e = new DOMParser().parseFromString(
                e._values.instructor_id,
                "text/html"
              ),
              t = e.body.firstElementChild;
            e.body.firstElementChild.innerHTML == itemId &&
              document
                .getElementById("delete-record")
                .addEventListener("click", function () {
                  instructorList.remove("instructor_id", t.outerHTML),
                    document.getElementById("deleteRecord-close").click();
                });
          });
        });
      });
}
function clearFields() {
  (editList = !1),
    (document.getElementById("addInstructorModalLabel").innerHTML =
      "Add Instructor"),
    (document.getElementById("add-btn").innerHTML = "Add Instructor"),
    (idFieldInput.value = ""),
    (document.getElementById("dropzone-preview").innerHTML = ""),
    (instructorNameInput.value = ""),
    (totalCourseInput.value = ""),
    (emailInput.value = ""),
    (studentsInput.value = ""),
    (experienceInput.value = ""),
    (contactInput.value = ""),
    (statusInput.value = ""),
    (document.getElementById("rating-field").value = ""),
    statusVal && statusVal.destroy(),
    (statusVal = new Choices(statusInput, { searchEnabled: !1 }));
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
            instructorList.remove(
              "instructor_id",
              `<a href="apps-instructors-overview.html" class="fw-medium link-primary">${ids_array[i]}</a>`
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
      : "" == instructorNameInput.value
      ? !(n.innerHTML = "Please enter a instructor name")
      : emailInput.value.match(e)
      ? "" == totalCourseInput.value
        ? !(n.innerHTML = "Please enter a no. of course")
        : "" == experienceInput.value
        ? !(n.innerHTML = "Please enter a no. of experience")
        : "" == studentsInput.value
        ? !(n.innerHTML = "Please enter a no. of students")
        : "" == contactInput.value
        ? !(n.innerHTML = "Please enter a contact no")
        : "" == statusInput.value
        ? !(n.innerHTML = "Please select a status")
        : ("" !== instructorNameInput.value &&
          "" !== totalCourseInput.value &&
          emailInput.value.match(e) &&
          "" !== studentsInput.value &&
          "" !== experienceInput.value &&
          "" !== contactInput.value &&
          "" !== statusInput.value &&
          0 < document.querySelectorAll(".dz-image-preview").length &&
          !editList
            ? (instructorList.add({
                instructor_id:
                  '<a href="apps-instructors-overview.html" class="fw-medium link-primary">#TBSI1590' +
                  count +
                  "</a>",
                instructor:
                  '<div class="d-flex align-items-center gap-2">                    <img src="' +
                  t.src +
                  '" alt="' +
                  t.getAttribute("alt") +
                  '" class="avatar-xxs rounded-circle">                    <a href="apps-instructors-overview.html" class="text-reset">' +
                  instructorNameInput.value +
                  "</a>                </div>",
                courses_total: totalCourseInput.value,
                email: emailInput.value,
                experience: experienceInput.value,
                students: studentsInput.value,
                contact: contactInput.value,
                rating:
                  '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value"> --</span>',
                status: isStatus(statusInput.value),
              }),
              instructorList.sort("instructor_id", { order: "desc" }),
              document
                .getElementById("alert-error-msg")
                .classList.add("d-none"),
              document.getElementById("close-addInstructorModal").click(),
              count++,
              clearFields(),
              refreshCallbacks(),
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Instructors detail inserted successfully!",
                showConfirmButton: !1,
                timer: 2e3,
                showCloseButton: !0,
              }))
            : "" !== instructorNameInput.value &&
              "" !== totalCourseInput.value &&
              emailInput.value.match(e) &&
              "" !== studentsInput.value &&
              "" !== experienceInput.value &&
              "" !== contactInput.value &&
              "" !== statusInput.value &&
              0 < document.querySelectorAll(".dz-image-preview").length &&
              editList &&
              ((e = instructorList.get({ instructor_id: idFieldInput.value })),
              Array.from(e).forEach(function (e) {
                (isid = new DOMParser().parseFromString(
                  e._values.instructor_id,
                  "text/html"
                )).body.firstElementChild.innerHTML == itemId &&
                  e.values({
                    instructor_id:
                      '<a href="javascript:void(0)" class="fw-medium link-primary">' +
                      idFieldInput.value +
                      "</a>",
                    instructor:
                      '<div class="d-flex align-items-center gap-2">                            <img src="' +
                      t.src +
                      '" alt="' +
                      t.getAttribute("alt") +
                      '" class="avatar-xxs rounded-circle">                            <a href="apps-instructors-overview.html" class="text-reset">' +
                      instructorNameInput.value +
                      "</a>                        </div>",
                    courses_total: totalCourseInput.value,
                    email: emailInput.value,
                    experience: experienceInput.value,
                    students: studentsInput.value,
                    contact: contactInput.value,
                    rating:
                      '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">' +
                      document.getElementById("rating-field").value +
                      "</span>",
                    status: isStatus(statusInput.value),
                  });
              }),
              document
                .getElementById("alert-error-msg")
                .classList.add("d-none"),
              document.getElementById("close-addInstructorModal").click(),
              clearFields(),
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Instructors details updated Successfully!",
                showConfirmButton: !1,
                timer: 2e3,
                showCloseButton: !0,
              })),
          !0)
      : !(n.innerHTML = "Please enter valid email address");
  });
}),
  document
    .getElementById("addInstructor")
    .addEventListener("hidden.bs.modal", function () {
      clearFields();
    });
