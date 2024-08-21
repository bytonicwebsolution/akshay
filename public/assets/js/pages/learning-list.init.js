var previewTemplate,
    dropzone,
    dropzonePreviewNode = document.querySelector("#dropzone-preview-list"),
    checkAll =
        ((dropzonePreviewNode.id = ""),
        dropzonePreviewNode &&
            ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
            dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
            (dropzone = new Dropzone(".course-dropzone", {
                url: "https://httpbin.org/post",
                method: "post",
                previewTemplate: previewTemplate,
                previewsContainer: "#dropzone-preview",
            }))),
        document.getElementById("checkAll"));
function rangeSlider() {
    var n,
        s,
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
        (n = document.getElementById("minCost")),
        (s = document.getElementById("maxCost")),
        e.noUiSlider.on("update", function (e, t) {
            t ? (s.value = e[t]) : (n.value = e[t]);
            s.value.substr(2), n.value.substr(2);
        }),
        n.addEventListener("change", function () {
            e.noUiSlider.set([null, this.value]);
        }),
        s.addEventListener("change", function () {
            e.noUiSlider.set([null, this.value]);
        }));
}
checkAll &&
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
                    : e[n].closest("tr").classList.remove("table-active");
        0 < t
            ? document.getElementById("remove-actions").classList.add("d-none")
            : document
                  .getElementById("remove-actions")
                  .classList.remove("d-none");
    }),
    rangeSlider();
var perPage = 10,
    editList = !1,
    options = {
        valueNames: [
            "id",
            "category",
            "course_Name",
            "instructor",
            "lessons",
            "duration",
            "students",
            "fees",
            "rating",
            "status",
        ],
        page: perPage,
        pagination: !0,
        plugins: [ListPagination({ left: 2, right: 2 })],
    },
    courseList = new List("coursesList", options).on("updated", function (e) {
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
        case "Open":
            return (
                '<span class="badge bg-info-subtle text-info">' + e + "</span>"
            );
        case "Close":
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
        courseList.add({
            id:
                '<a href="javascript:void(0)" class="fw-medium link-primary">' +
                e.id +
                "</a>",
            category:
                '<a href="apps-learning-grid.html" class="text-reset">' +
                e.category +
                "</a>",
            course_Name:
                '<div class="d-flex align-items-center gap-2">                <img src="' +
                e.course[0].img +
                '" alt="' +
                e.course[0].img_alt +
                '" class="avatar-xxs rounded">                <a href="apps-learning-overview.html" class="text-reset">' +
                e.course[0].name +
                "</a>            </div>",
            instructor: e.instructor,
            lessons: e.lessons,
            duration: e.duration,
            students: e.students,
            fees: '<span class="fw-medium">' + e.fees + "</span>",
            rating:
                '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">' +
                e.rating +
                "</span>",
            status: isStatus(e.status),
        }),
            courseList.sort("id", { order: "desc" });
    }),
        courseList.remove(
            "id",
            '<a href="javascript:void(0)" class="fw-medium link-primary">#TBS001</a>'
        ),
        refreshCallbacks(),
        ischeckboxcheck();
}),
    xhttp.open("GET", "assets/json/courses-list.json"),
    xhttp.send(),
    (isCount = new DOMParser().parseFromString(
        courseList.items.slice(-1)[0]._values.id,
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
    courseTitleInput = document.getElementById("course-title-input"),
    categoryInput = document.getElementById("course-category-input"),
    instructorInput = document.getElementById("instructor-input"),
    lessonsInput = document.getElementById("lessons-input"),
    studentsInput = document.getElementById("students-input"),
    durationInput = document.getElementById("duration-input"),
    feesInput = document.getElementById("fees-input"),
    statusInput = document.getElementById("status-input"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn"),
    categoryVal = new Choices(categoryInput),
    statusVal = new Choices(statusInput, { searchEnabled: !1 }),
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
    editBtns &&
        Array.from(editBtns).forEach(function (e) {
            e.addEventListener("click", function (e) {
                e.target.closest("tr").children[1].innerText,
                    (itemId = e.target.closest("tr").children[1].innerText);
                e = courseList.get({ id: itemId });
                Array.from(e).forEach(function (e) {
                    var t,
                        n = (isid = new DOMParser().parseFromString(
                            e._values.id,
                            "text/html"
                        )).body.firstElementChild.innerHTML;
                    n == itemId &&
                        ((editList = !0),
                        (document.getElementById(
                            "addCourseModalLabel"
                        ).innerHTML = "Edit Course Details"),
                        (document.getElementById("add-btn").innerHTML =
                            "Update"),
                        (idFieldInput.value = n),
                        (n = new DOMParser().parseFromString(
                            e._values.course_Name,
                            "text/html"
                        )),
                        (courseTitleInput.value =
                            n.body.querySelector(".text-reset").innerHTML),
                        (instructorInput.value = e._values.instructor),
                        (lessonsInput.value = e._values.lessons),
                        (studentsInput.value = e._values.students),
                        (durationInput.value = e._values.duration),
                        "$" ==
                        (t = new DOMParser()
                            .parseFromString(e._values.fees, "text/html")
                            .body.querySelector(".fw-medium").innerHTML).charAt(
                            0
                        )
                            ? (feesInput.value = t.split("$")[1])
                            : (feesInput.value = t),
                        (t = new DOMParser().parseFromString(
                            e._values.category,
                            "text/html"
                        )),
                        categoryVal && categoryVal.destroy(),
                        (categoryVal = new Choices(
                            categoryInput
                        )).setChoiceByValue(
                            t.body.querySelector(".text-reset").innerHTML
                        ),
                        (t = new DOMParser().parseFromString(
                            e._values.status,
                            "text/html"
                        )),
                        statusVal && statusVal.destroy(),
                        (statusVal = new Choices(statusInput, {
                            searchEnabled: !1,
                        })).setChoiceByValue(
                            t.body.querySelector(".badge").innerHTML
                        ),
                        (document.getElementById("dropzone-preview").innerHTML =
                            ""),
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
                    e = courseList.get({ id: itemId });
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
                                    courseList.remove("id", t.outerHTML),
                                        document
                                            .getElementById(
                                                "deleteRecord-close"
                                            )
                                            .click();
                                });
                    });
                });
            });
}
function clearFields() {
    (editList = !1),
        (document.getElementById("addCourseModalLabel").innerHTML =
            "Add Course"),
        (document.getElementById("add-btn").innerHTML = "Add Course"),
        (idFieldInput.value = ""),
        (document.getElementById("dropzone-preview").innerHTML = ""),
        (courseTitleInput.value = ""),
        (categoryInput.value = ""),
        (instructorInput.value = ""),
        (lessonsInput.value = ""),
        (studentsInput.value = ""),
        (durationInput.value = ""),
        (feesInput.value = ""),
        (statusInput.value = ""),
        (document.getElementById("rating-field").value = ""),
        categoryVal && categoryVal.destroy(),
        (categoryVal = new Choices(categoryInput)),
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
                      courseList.remove(
                          "id",
                          `<a href="javascript:void(0)" class="fw-medium link-primary">${ids_array[i]}</a>`
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
            n = document.getElementById("alert-error-msg");
        return (
            n.classList.remove("d-none"),
            setTimeout(() => n.classList.add("d-none"), 2e3),
            0 == document.querySelectorAll(".dz-image-preview").length
                ? !(n.innerHTML = "Please select a image")
                : "" == courseTitleInput.value
                ? !(n.innerHTML = "Please enter a course title")
                : "" == categoryInput.value
                ? !(n.innerHTML = "Please select a course category")
                : "" == instructorInput.value
                ? !(n.innerHTML = "Please enter a instructor name")
                : "" == lessonsInput.value
                ? !(n.innerHTML = "Please enter a no. of lessons")
                : "" == studentsInput.value
                ? !(n.innerHTML = "Please enter a no. of student")
                : "" == durationInput.value
                ? !(n.innerHTML = "Please enter a duration")
                : "" == feesInput.value
                ? !(n.innerHTML = "Please enter a fees amount")
                : "" == statusInput.value
                ? !(n.innerHTML = "Please select a status")
                : ("" !== courseTitleInput.value &&
                      "" !== categoryInput.value &&
                      "" !== instructorInput.value &&
                      "" !== lessonsInput.value &&
                      "" !== studentsInput.value &&
                      "" !== durationInput.value &&
                      "" !== feesInput.value &&
                      "" !== statusInput.value &&
                      0 <
                          document.querySelectorAll(".dz-image-preview")
                              .length &&
                      !editList &&
                      (courseList.add({
                          id:
                              '<a href="javascript:void(0)" class="fw-medium link-primary">' +
                              count +
                              "</a>",
                          category:
                              '<a href="apps-learning-grid.html" class="text-reset">' +
                              categoryInput.value +
                              "</a>",
                          course_Name:
                              '<div class="d-flex align-items-center gap-2">                    <img src="' +
                              t.src +
                              '" alt="' +
                              t.getAttribute("alt") +
                              '" class="avatar-xxs rounded">                    <a href="apps-learning-overview.html" class="text-reset">' +
                              courseTitleInput.value +
                              "</a>                </div>",
                          instructor: instructorInput.value,
                          lessons: lessonsInput.value,
                          duration: durationInput.value,
                          students: studentsInput.value,
                          fees:
                              '<span class="fw-medium">' +
                              feesInput.value +
                              "</span>",
                          rating: '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">--</span>',
                          status: isStatus(statusInput.value),
                      }),
                      courseList.sort("id", { order: "desc" }),
                      document
                          .getElementById("alert-error-msg")
                          .classList.add("d-none"),
                      document.getElementById("close-addCourseModal").click(),
                      count++,
                      clearFields(),
                      refreshCallbacks(),
                      Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Course details inserted successfully!",
                          showConfirmButton: !1,
                          timer: 2e3,
                          showCloseButton: !0,
                      })),
                  "" !== courseTitleInput.value &&
                      "" !== categoryInput.value &&
                      "" !== instructorInput.value &&
                      "" !== lessonsInput.value &&
                      "" !== studentsInput.value &&
                      "" !== durationInput.value &&
                      "" !== feesInput.value &&
                      "" !== statusInput.value &&
                      0 <
                          document.querySelectorAll(".dz-image-preview")
                              .length &&
                      editList &&
                      ((e = courseList.get({ id: idFieldInput.value })),
                      Array.from(e).forEach(function (e) {
                          (isid = new DOMParser().parseFromString(
                              e._values.id,
                              "text/html"
                          )).body.firstElementChild.innerHTML == itemId &&
                              e.values({
                                  id:
                                      '<a href="javascript:void(0)" class="fw-medium link-primary">' +
                                      idFieldInput.value +
                                      "</a>",
                                  category:
                                      '<a href="apps-learning-grid.html" class="text-reset">' +
                                      categoryInput.value +
                                      "</a>",
                                  course_Name:
                                      '<div class="d-flex align-items-center gap-2">                            <img src="' +
                                      t.src +
                                      '" alt="' +
                                      t.getAttribute("alt") +
                                      '" class="avatar-xxs rounded">                            <a href="apps-learning-overview.html" class="text-reset">' +
                                      courseTitleInput.value +
                                      "</a>                        </div>",
                                  instructor: instructorInput.value,
                                  lessons: lessonsInput.value,
                                  duration: durationInput.value,
                                  students: studentsInput.value,
                                  fees:
                                      '<span class="fw-medium"> $' +
                                      feesInput.value +
                                      "</span>",
                                  rating:
                                      '<i class="bi bi-star-fill text-warning align-baseline me-1"></i> <span class="rate-value">' +
                                      document.getElementById("rating-field")
                                          .value +
                                      "</span>",
                                  status: isStatus(statusInput.value),
                              });
                      }),
                      document
                          .getElementById("alert-error-msg")
                          .classList.add("d-none"),
                      document.getElementById("close-addCourseModal").click(),
                      clearFields(),
                      Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Course details updated Successfully!",
                          showConfirmButton: !1,
                          timer: 2e3,
                          showCloseButton: !0,
                      })),
                  !0)
        );
    });
}),
    document
        .getElementById("addCourse")
        .addEventListener("hidden.bs.modal", function () {
            clearFields();
        });
