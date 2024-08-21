function searchMessages() {
    var t,
        s = document.getElementById("searchMessage").value.toUpperCase();
    document
        .getElementById("users-conversation")
        .querySelectorAll(".chat-list")
        .forEach(function (e) {
            (t = e.getElementsByTagName("p")[0]
                ? e.getElementsByTagName("p")[0]
                : ""),
                -1 <
                (t.textContent || t.innerText
                    ? t.textContent || t.innerText
                    : ""
                )
                    .toUpperCase()
                    .indexOf(s)
                    ? (e.style.display = "")
                    : (e.style.display = "none");
        });
}
function increment() {
    1 == running &&
        setTimeout(function () {
            Dtime++;
            var e = Math.floor(Dtime / 10 / 3600),
                t = (e <= 9 && (e = "0" + e), Math.floor(Dtime / 10 / 60)),
                s = (t <= 9 && (t = "0" + t), Math.floor(Dtime / 10));
            s <= 9 && (s = "0" + s),
                (document.getElementById("outputt").innerHTML =
                    e + ":" + t + ":" + s),
                increment();
        }, 100);
}
!(function () {
    var a = "assets/images/users/user-dummy-img.jpg",
        n = "assets/images/users/multi-user.jpg",
        l = !1;
    function s() {
        var s = document.querySelectorAll(".user-chat");
        Array.from(document.querySelectorAll(".chat-user-list li a")).forEach(
            function (e) {
                e.addEventListener("click", function (e) {
                    s.forEach(function (e) {
                        e.classList.add("user-chat-show");
                    });
                    var t = document.querySelector(".chat-user-list li.active");
                    t && t.classList.remove("active"),
                        this.parentNode.classList.add("active");
                }),
                    v("users-chat");
            }
        ),
            document
                .querySelectorAll(".user-chat-remove")
                .forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        s.forEach(function (e) {
                            e.classList.remove("user-chat-show");
                        });
                    });
                });
    }
    document.querySelectorAll(".favorite-btn").forEach(function (e) {
        e.addEventListener("click", function (e) {
            this.classList.toggle("active");
        });
    });
    function e(e, t) {
        var s = new XMLHttpRequest();
        s.open("GET", r + e, !0),
            (s.responseType = "json"),
            (s.onload = function () {
                var e = s.status;
                t(200 === e ? null : e, s.response);
            }),
            s.send();
    }
    var c = "users-chat",
        d = "users",
        r = "assets/json/",
        u = "",
        m = 1;
    v(c);
    function p(e, t, s, n, c) {
        var a = '<div class="ctext-wrap">';
        if (null != t)
            a +=
                '<div class="ctext-wrap-content" id=' +
                e +
                '><p class="mb-0 ctext-content">' +
                t +
                "</p></div>";
        else if (s && 0 < s.length) {
            for (
                a += '<div class="message-img mb-0">', i = 0;
                i < s.length;
                i++
            )
                a +=
                    '<div class="message-img-list">                <div>                    <a class="popup-img d-inline-block" href="' +
                    s[i] +
                    '">                        <img src="' +
                    s[i] +
                    '" alt="" class="rounded border">                    </a>                </div>                <div class="message-img-link">                <ul class="list-inline mb-0">                    <li class="list-inline-item dropdown">                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                            <i class="bi bi-three-dots"></i>                        </a>                        <div class="dropdown-menu">                            <a class="dropdown-item" href="' +
                    s[i] +
                    '" download=""><i class="ri-download-2-line me-2 text-muted align-bottom"></i>Download</a>                            <a class="dropdown-item" href="#"><i class="bi bi-reply me-2 text-muted align-bottom"></i>Reply</a>                            <a class="dropdown-item" href="#"><i class="bi bi-share me-2 text-muted align-bottom"></i>Forward</a>                            <a class="dropdown-item" href="#"><i class="bi bi-bookmarks me-2 text-muted align-bottom"></i>Bookmark</a>                            <a class="dropdown-item delete-image" href="#"><i class="bi bi-trash3 me-2 text-muted align-bottom"></i>Delete</a>                        </div>                    </li>                </ul>                </div>            </div>';
            a += "</div>";
        } else
            0 < n.length &&
                (a +=
                    '<div class="ctext-wrap-content">            <div class="p-3 border-primary border rounded-3">            <div class="d-flex align-items-center attached-file">                <div class="flex-shrink-0 avatar-sm me-3 ms-0 attached-file-avatar">                    <div class="avatar-title bg-soft-primary text-primary rounded-circle font-size-20">                        <i class="ri-attachment-2"></i>                    </div>                </div>                <div class="flex-grow-1 overflow-hidden">                    <div class="text-start">                        <h5 class="font-size-14 mb-1">design-phase-1-approved.pdf</h5>                        <p class="text-muted text-truncate font-size-13 mb-0">12.5 MB</p>                    </div>                </div>                <div class="flex-shrink-0 ms-4">                    <div class="d-flex gap-2 font-size-20 d-flex align-items-start">                        <div>                            <a href="#" class="text-muted">                                <i class="bx bxs-download"></i>                            </a>                        </div>                    </div>                </div>            </div>            </div>        </div>');
        return (
            !0 === c &&
                (a +=
                    '<div class="dropdown align-self-start message-box-drop">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    <i class="bi bi-three-dots-vertical"></i>                </a>                <div class="dropdown-menu">                    <a class="dropdown-item reply-message" href="#"><i class="bi bi-reply me-2 text-muted"></i>Reply</a>                    <a class="dropdown-item" href="#"><i class="bi bi-share me-2 text-muted"></i>Forward</a>                    <a class="dropdown-item copy-message" href="#"><i class="bi bi-clipboard-check me-2 text-muted"></i>Copy</a>                    <a class="dropdown-item" href="#"><i class="bi bi-bookmarks me-2 text-muted"></i>Bookmark</a>                    <a class="dropdown-item delete-item" href="#"><i class="bi bi-trash3 me-2 text-muted"></i>Delete</a>                </div>            </div>'),
            (a += "</div>")
        );
    }
    function o() {
        "users" == d
            ? ((document.getElementById("channel-chat").style.display = "none"),
              (document.getElementById("users-chat").style.display = "block"))
            : ((document.getElementById("channel-chat").style.display =
                  "block"),
              (document.getElementById("users-chat").style.display = "none")),
            t(r + "chats.json");
    }
    function t(e) {
        var t, s;
        (e = e),
            (t = function (e, t) {
                var c, a, s, n, r, o;
                null !== e
                    ? console.log("Something went wrong: " + e)
                    : ((c = "users" == d ? t[0].chats : t[0].channel_chat),
                      (document.getElementById(d + "-conversation").innerHTML =
                          ""),
                      (a = 0),
                      c.forEach(function (t, e) {
                          var s, n;
                          0 < a
                              ? (a -= 1)
                              : ((n = t.from_id == m ? " right" : " left"),
                                (s = u.find(function (e) {
                                    return e.id == t.to_id;
                                })),
                                (n =
                                    '<li class="chat-list' +
                                    n +
                                    '" id=' +
                                    t.id +
                                    '>                        <div class="conversation-list">'),
                                m != t.from_id &&
                                    (n +=
                                        '<div class="chat-avatar"><img src="' +
                                        s.profile +
                                        '" alt=""></div>'),
                                (n =
                                    (n += '<div class="user-chat-content">') +
                                    p(
                                        t.id,
                                        t.msg,
                                        t.has_images,
                                        t.has_files,
                                        t.has_dropDown
                                    )),
                                c[e + 1] &&
                                    t.from_id == c[e + 1].from_id &&
                                    ((a = (function (e, t, s) {
                                        for (
                                            var n = 0;
                                            e[t] &&
                                            e[t + 1] &&
                                            e[t + 1].from_id == s;

                                        )
                                            n++, t++;
                                        return n;
                                    })(c, e, t.from_id)),
                                    (n += (function (e, t, s) {
                                        for (
                                            var n = 0;
                                            e[t] &&
                                            e[t + 1] &&
                                            e[t + 1].from_id == s;

                                        )
                                            (n = p(
                                                e[t + 1].id,
                                                e[t + 1].msg,
                                                e[t + 1].has_images,
                                                e[t + 1].has_files,
                                                e[t + 1].has_dropDown
                                            )),
                                                t++;
                                        return n;
                                    })(c, e, t.from_id))),
                                (n =
                                    n +
                                    ('<div class="conversation-name"><span class="d-none name">' +
                                        s.name +
                                        '</span><small class="text-muted time">' +
                                        t.datetime) +
                                    '</small> <span class="text-success check-message-icon"><i class="bx bx-check-double"></i></span></div></div>                </div>            </li>'),
                                (document.getElementById(
                                    d + "-conversation"
                                ).innerHTML += n));
                      })),
                    x.querySelectorAll(".delete-item").forEach(function (e) {
                        e.addEventListener("click", function () {
                            (2 ==
                            e.closest(".user-chat-content").childElementCount
                                ? e.closest(".chat-list")
                                : e.closest(".ctext-wrap")
                            ).remove();
                        });
                    }),
                    S(),
                    w(),
                    (e = x.querySelectorAll(".reply-message")),
                    (s = document.querySelector(".replyCard")),
                    (n = document.querySelector("#close_toggle")),
                    e.forEach(function (t) {
                        t.addEventListener("click", function () {
                            (l = !0),
                                s.classList.add("show"),
                                n.addEventListener("click", function () {
                                    s.classList.remove("show");
                                });
                            var e =
                                    t.closest(".ctext-wrap").children[0]
                                        .children[0].innerText,
                                e =
                                    ((document.querySelector(
                                        ".replyCard .replymessage-block .flex-grow-1 .mb-0"
                                    ).innerText = e),
                                    document.querySelector(
                                        ".user-chat-topbar .text-truncate .username"
                                    ).innerHTML),
                                e =
                                    !t.closest(".chat-list") ||
                                    t
                                        .closest(".chat-list")
                                        .classList.contains("left")
                                        ? e
                                        : "You";
                            document.querySelector(
                                ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
                            ).innerText = e;
                        });
                    }),
                    (t = E.querySelectorAll(".reply-message")),
                    (r = document.querySelector(".replyCard")),
                    (o = document.querySelector("#close_toggle")),
                    t.forEach(function (t) {
                        t.addEventListener("click", function () {
                            (l = !0),
                                r.classList.add("show"),
                                o.addEventListener("click", function () {
                                    r.classList.remove("show");
                                });
                            var e =
                                    t.closest(".ctext-wrap").children[0]
                                        .children[0].innerText,
                                e =
                                    ((document.querySelector(
                                        ".replyCard .replymessage-block .flex-grow-1 .mb-0"
                                    ).innerText = e),
                                    t
                                        .closest(".user-chat-content")
                                        .querySelector(
                                            ".conversation-name .name"
                                        ).innerText),
                                e =
                                    !t.closest(".chat-list") ||
                                    t
                                        .closest(".chat-list")
                                        .classList.contains("left")
                                        ? e
                                        : "You";
                            document.querySelector(
                                ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
                            ).innerText = e;
                        });
                    }),
                    x.querySelectorAll(".copy-message").forEach(function (t) {
                        t.addEventListener("click", function () {
                            var e = t.closest(".ctext-wrap").children[0]
                                ? t.closest(".ctext-wrap").children[0]
                                      .children[0].innerText
                                : "";
                            navigator.clipboard.writeText(e);
                        });
                    }),
                    E.querySelectorAll(".copy-message").forEach(function (t) {
                        t.addEventListener("click", function () {
                            var e = t.closest(".ctext-wrap").children[0]
                                ? t.closest(".ctext-wrap").children[0]
                                      .children[0].innerText
                                : "";
                            navigator.clipboard.writeText(e);
                        });
                    }),
                    document
                        .querySelectorAll(".copy-message")
                        .forEach(function (e) {
                            e.addEventListener("click", function () {
                                (document.getElementById(
                                    "copyClipBoard"
                                ).style.display = "block"),
                                    (document.getElementById(
                                        "copyClipBoardChannel"
                                    ).style.display = "block"),
                                    setTimeout(function () {
                                        (document.getElementById(
                                            "copyClipBoard"
                                        ).style.display = "none"),
                                            (document.getElementById(
                                                "copyClipBoardChannel"
                                            ).style.display = "none");
                                    }, 1e3);
                            });
                        }),
                    v("users-chat"),
                    GLightbox({ selector: ".popup-img", title: !1 });
            }),
            (s = new XMLHttpRequest()).open("GET", e, !0),
            (s.responseType = "json"),
            (s.onload = function () {
                var e = s.status;
                200 === e
                    ? ((document.getElementById("elmLoader").innerHTML = ""),
                      t(null, s.response))
                    : t(e, s.response);
            }),
            s.send();
    }
    function v(s) {
        setTimeout(function () {
            var e = document
                    .getElementById(s)
                    .querySelector(
                        "#chat-conversation .simplebar-content-wrapper"
                    )
                    ? document
                          .getElementById(s)
                          .querySelector(
                              "#chat-conversation .simplebar-content-wrapper"
                          )
                    : "",
                t = document.getElementsByClassName("chat-conversation-list")[0]
                    ? document
                          .getElementById(s)
                          .getElementsByClassName("chat-conversation-list")[0]
                          .scrollHeight -
                      window.innerHeight +
                      335
                    : 0;
            t && e.scrollTo({ top: t, behavior: "smooth" });
        }, 100);
    }
    e("chat-users-list.json", function (e, t) {
        null !== e
            ? console.log("Something went wrong: " + e)
            : (t[0].users.forEach(function (e, t) {
                  var s = e.profile
                          ? '<img src="' +
                            e.profile +
                            '" class="rounded-circle img-fluid userprofile" alt=""><span class="user-status"></span>'
                          : '<div class="avatar-title rounded-circle bg-primary text-white fs-xxs">' +
                            e.nickname +
                            '</div><span class="user-status"></span>',
                      n = e.messagecount
                          ? '<div class="ms-auto"><span class="badge bg-dark-subtle text-dark rounded p-1">' +
                            e.messagecount +
                            "</span></div>"
                          : "",
                      c = e.messagecount
                          ? '<a href="javascript: void(0);" class="unread-msg-user">'
                          : '<a href="javascript: void(0);">',
                      a = 1 === e.id ? "active" : "";
                  document.getElementById("userList").innerHTML +=
                      '<li id="contact-id-' +
                      e.id +
                      '" data-name="direct-message" class="' +
                      a +
                      '">                ' +
                      c +
                      '                 <div class="d-flex align-items-center">                    <div class="flex-shrink-0 chat-user-img ' +
                      e.status +
                      ' align-self-center me-2 ms-0">                        <div class="avatar-xxs">                        ' +
                      s +
                      '                        </div>                    </div>                    <div class="flex-grow-1 overflow-hidden">                        <p class="text-truncate mb-0">' +
                      e.name +
                      "</p>                    </div>                    " +
                      n +
                      "                </div>            </a>        </li>";
              }),
              t[0].channels.forEach(function (e, t) {
                  var s = e.messagecount
                          ? '<div class="flex-shrink-0 ms-2"><span class="badge bg-dark-subtle text-dark rounded p-1">' +
                            e.messagecount +
                            "</span></div>"
                          : "",
                      n =
                          (e.messagecount && e.messagecount,
                          e.messagecount
                              ? '<a href="javascript: void(0);" class="unread-msg-user">'
                              : '<a href="javascript: void(0);">');
                  document.getElementById("channelList").innerHTML +=
                      '<li id="contact-id-' +
                      e.id +
                      '" data-name="channel">            ' +
                      n +
                      '                 <div class="d-flex align-items-center">                    <div class="flex-shrink-0 chat-user-img align-self-center me-2 ms-0">                        <div class="avatar-xxs">                            <div class="avatar-title bg-light rounded-circle text-body">#</div>                        </div>                    </div>                    <div class="flex-grow-1 overflow-hidden">                        <p class="text-truncate mb-0">' +
                      e.name +
                      "</p>                    </div>                    <div>" +
                      s +
                      "</div>                    </div>            </a>        </li>";
              })),
            s(),
            document.querySelectorAll("#userList li").forEach(function (n) {
                n.addEventListener("click", function () {
                    (d = "users"), o(), (c = "users-chat");
                    var t,
                        e = n.getAttribute("id"),
                        s = n.querySelector(".text-truncate").innerHTML;
                    (document.querySelector(
                        "#users-chat .user-chat-topbar .text-truncate .username"
                    ).innerHTML = s),
                        (document.querySelector(
                            ".profile-offcanvas .username"
                        ).innerHTML = s),
                        1 == l &&
                            ((l = !1),
                            document
                                .querySelector(".replyCard")
                                .classList.remove("show")),
                        document.getElementById(e).querySelector(".userprofile")
                            ? ((t = document
                                  .getElementById(e)
                                  .querySelector(".userprofile")
                                  .getAttribute("src")),
                              document
                                  .querySelector(
                                      "#users-chat .user-chat-topbar .avatar-xs"
                                  )
                                  .setAttribute("src", t),
                              document
                                  .querySelector(
                                      ".profile-offcanvas .avatar-lg"
                                  )
                                  .setAttribute("src", t))
                            : (document
                                  .querySelector(
                                      "#users-chat .user-chat-topbar .avatar-xs"
                                  )
                                  .setAttribute("src", a),
                              document
                                  .querySelector(
                                      ".profile-offcanvas .avatar-lg"
                                  )
                                  .setAttribute("src", a)),
                        document
                            .getElementById("users-conversation")
                            .querySelectorAll(".left .chat-avatar")
                            .forEach(function (e) {
                                t
                                    ? e
                                          .querySelector("img")
                                          .setAttribute("src", t)
                                    : e
                                          .querySelector("img")
                                          .setAttribute("src", a);
                            }),
                        document
                            .querySelector(".user-chat .video-content")
                            .classList.contains("d-flex") &&
                            document.body.classList.add("video-content-show"),
                        window.stop();
                });
            }),
            document.querySelectorAll("#channelList li").forEach(function (s) {
                s.addEventListener("click", function () {
                    (c = "channel-chat"), (d = "channel"), o();
                    var e = s.querySelector(".text-truncate").innerHTML,
                        t = document.getElementById("channel-chat");
                    (t.querySelector(
                        ".user-chat-topbar .text-truncate .username"
                    ).innerHTML = e),
                        (document.querySelector(
                            ".profile-offcanvas .username"
                        ).innerHTML = e),
                        t
                            .querySelector(".user-chat-topbar .avatar-xs")
                            .setAttribute("src", n),
                        document
                            .querySelector(".profile-offcanvas .avatar-lg")
                            .setAttribute("src", n),
                        1 == l &&
                            ((l = !1),
                            document
                                .querySelector(".replyCard")
                                .classList.remove("show"));
                });
            });
    }),
        e("chat-contacts-list.json", function (e, t) {
            var n, c;
            null !== e
                ? console.log("Something went wrong: " + e)
                : ((u = t).sort(function (e, t) {
                      return e.name.localeCompare(t.name);
                  }),
                  (c = n = ""),
                  u.forEach(function (e, t) {
                      var s = e.profile
                              ? '<img src="' +
                                e.profile +
                                '" class="img-fluid rounded-circle" alt="">'
                              : '<span class="avatar-title rounded-circle bg-primary fs-xxs">' +
                                e.nickname +
                                "</span>",
                          s =
                              ((n =
                                  '<li>              <div class="d-flex align-items-center">                  <div class="flex-shrink-0 me-2">                      <div class="avatar-xxs">                        ' +
                                  s +
                                  '                      </div>                  </div>                  <div class="flex-grow-1">                  <p class="text-truncate contactlist-name mb-0">' +
                                  e.name +
                                  '</p>                  </div>                  <div class="flex-shrink-0">                      <div class="dropdown">                          <a href="#" class="text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                              <i class="bi bi-three-dots-vertical"></i>                          </a>                          <div class="dropdown-menu dropdown-menu-end">                              <a class="dropdown-item" href="#"><i class="bi bi-pencil text-muted me-2 align-bottom"></i>Edit</a>                              <a class="dropdown-item" href="#"><i class="bi bi-slash-circle text-muted me-2 align-bottom"></i>Block</a>                              <a class="dropdown-item" href="#"><i class="bi bi-trash3 text-muted me-2 align-bottom"></i>Remove</a>                          </div>                      </div>                  </div>              </div>          </li>'),
                              '<div class="mt-3" >              <div class="contact-list-title">' +
                                  e.name.charAt(0).toUpperCase() +
                                  '                </div>                <ul id="contact-sort-' +
                                  e.name.charAt(0) +
                                  '" class="list-unstyled contact-list" >');
                      c != e.name.charAt(0) &&
                          (document.getElementsByClassName(
                              "sort-contact"
                          )[0].innerHTML += s),
                          (document.getElementById(
                              "contact-sort-" + e.name.charAt(0)
                          ).innerHTML =
                              document.getElementById(
                                  "contact-sort-" + e.name.charAt(0)
                              ).innerHTML + n),
                          (c = e.name.charAt(0));
                  })),
                document
                    .querySelectorAll(".sort-contact ul li")
                    .forEach(function (n) {
                        n.addEventListener("click", function (e) {
                            (d = "users"), o();
                            var t,
                                s = n.querySelector(
                                    "li .contactlist-name"
                                ).innerHTML;
                            (document.querySelector(
                                "#users-chat .user-chat-topbar .text-truncate .username"
                            ).innerHTML = s),
                                (document.querySelector(
                                    ".profile-offcanvas .username"
                                ).innerHTML = s),
                                1 == l &&
                                    ((l = !1),
                                    document
                                        .querySelector(".replyCard")
                                        .classList.remove("show")),
                                n
                                    .querySelector(".align-items-center")
                                    .querySelector(".avatar-xxs img")
                                    ? ((t = n
                                          .querySelector(".align-items-center")
                                          .querySelector(
                                              ".avatar-xxs .rounded-circle"
                                          )
                                          .getAttribute("src")),
                                      document
                                          .querySelector(
                                              "#users-chat .user-own-img .avatar-xs"
                                          )
                                          .setAttribute("src", t),
                                      document
                                          .querySelector(
                                              ".profile-offcanvas .profile-img"
                                          )
                                          .setAttribute("src", t))
                                    : (document
                                          .querySelector(
                                              "#users-chat .user-own-img .avatar-xs"
                                          )
                                          .setAttribute("src", a),
                                      document
                                          .querySelector(
                                              ".profile-offcanvas .profile-img"
                                          )
                                          .setAttribute("src", a)),
                                document
                                    .getElementById("users-conversation")
                                    .querySelectorAll(".left .chat-avatar")
                                    .forEach(function (e) {
                                        t
                                            ? e
                                                  .querySelector("img")
                                                  .setAttribute("src", t)
                                            : e
                                                  .querySelector("img")
                                                  .setAttribute("src", a);
                                    }),
                                window.stop();
                        });
                    }),
                s();
        }),
        o();
    var h = document.querySelector("#chatinput-form"),
        f = document.querySelector("#chat-input"),
        g = document.querySelector(".chat-input-feedback");
    function y() {
        var e = 12 <= new Date().getHours() ? "pm" : "am",
            t =
                12 < new Date().getHours()
                    ? new Date().getHours() % 12
                    : new Date().getHours(),
            s =
                new Date().getMinutes() < 10
                    ? "0" + new Date().getMinutes()
                    : new Date().getMinutes();
        return t < 10 ? "0" + t + ":" + s + " " + e : t + ":" + s + " " + e;
    }
    setInterval(y, 1e3);
    var b = 0;
    h &&
        h.addEventListener("submit", function (e) {
            e.preventDefault();
            var e = c,
                t = c,
                s = f.value;
            0 === s.length
                ? (g.classList.add("show"),
                  setTimeout(function () {
                      g.classList.remove("show");
                  }, 2e3))
                : (1 == l ? (L(t, s), (l = !1)) : q(e, s), v(e || t)),
                (f.value = ""),
                document.getElementById("close_toggle").click();
        });
    var x = document.querySelector(".chat-conversation-list");
    function w() {
        x.querySelectorAll(".chat-conversation-list .chat-list").forEach(
            function (e) {
                e.querySelectorAll(".delete-image").forEach(function (e) {
                    e.addEventListener("click", function () {
                        (1 == e.closest(".message-img").childElementCount
                            ? e.closest(".chat-list")
                            : e.closest(".message-img-list")
                        ).remove();
                    });
                });
            }
        );
    }
    w();
    var E = document.querySelector("#channel-conversation");
    function S() {
        (channelChatList = E.querySelectorAll(".delete-item")).forEach(
            function (e) {
                e.addEventListener("click", function () {
                    (2 == e.closest(".user-chat-content").childElementCount
                        ? e.closest(".chat-list")
                        : e.closest(".ctext-wrap")
                    ).remove();
                });
            }
        );
    }
    S();
    var q = function (e, t) {
            b++;
            var s = document
                    .getElementById(e)
                    .querySelector(".chat-conversation-list"),
                n =
                    (null != t &&
                        s.insertAdjacentHTML(
                            "beforeend",
                            '<li class="chat-list right" id="chat-list-' +
                                b +
                                '" >                <div class="conversation-list">                    <div class="user-chat-content">                        <div class="ctext-wrap">                            <div class="ctext-wrap-content">                                <p class="mb-0 ctext-content">                                    ' +
                                t +
                                '                                </p>                            </div>                            <div class="dropdown align-self-start message-box-drop">                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                    <i class="bi bi-three-dots-vertical"></i>                                </a>                                <div class="dropdown-menu">                                    <a class="dropdown-item reply-message" href="#"><i class="bi bi-reply me-2 text-muted align-bottom"></i>Reply</a>                                    <a class="dropdown-item" href="#"><i class="bi bi-share me-2 text-muted align-bottom"></i>Forward</a>                                    <a class="dropdown-item copy-message" href="#""><i class="bi bi-clipboard-check me-2 text-muted align-bottom"></i>Copy</a>                                    <a class="dropdown-item" href="#"><i class="bi bi-bookmarks me-2 text-muted align-bottom"></i>Bookmark</a>                                    <a class="dropdown-item delete-item" href="#"><i class="bi bi-trash3 me-2 text-muted align-bottom"></i>Delete</a>                            </div>                        </div>                    </div>                    <div class="conversation-name">                        <small class="text-muted time">' +
                                y() +
                                '</small>                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    </div>                </div>            </div>        </li>'
                        ),
                    document.getElementById("chat-list-" + b));
            n.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    s.removeChild(n);
                });
            }),
                n.querySelectorAll(".copy-message").forEach(function (e) {
                    e.addEventListener("click", function () {
                        var e =
                            n.childNodes[1].firstElementChild.firstElementChild
                                .firstElementChild.firstElementChild.innerText;
                        navigator.clipboard.writeText(e);
                    });
                }),
                n.querySelectorAll(".copy-message").forEach(function (e) {
                    e.addEventListener("click", function () {
                        (document.getElementById(
                            "copyClipBoard"
                        ).style.display = "block"),
                            setTimeout(function () {
                                document.getElementById(
                                    "copyClipBoard"
                                ).style.display = "none";
                            }, 1e3);
                    });
                }),
                n.querySelectorAll(".reply-message").forEach(function (c) {
                    c.addEventListener("click", function () {
                        var e = document.querySelector(".replyCard"),
                            t = document.querySelector("#close_toggle"),
                            s =
                                c.closest(".ctext-wrap").children[0].children[0]
                                    .innerText,
                            n = document.querySelector(
                                ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
                            ).innerHTML,
                            t =
                                ((l = !0),
                                e.classList.add("show"),
                                t.addEventListener("click", function () {
                                    e.classList.remove("show");
                                }),
                                !c.closest(".chat-list") ||
                                c
                                    .closest(".chat-list")
                                    .classList.contains("left")
                                    ? n
                                    : "You");
                        (document.querySelector(
                            ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
                        ).innerText = t),
                            (document.querySelector(
                                ".replyCard .replymessage-block .flex-grow-1 .mb-0"
                            ).innerText = s);
                    });
                });
        },
        L = function (e, t) {
            var s = document.querySelector(
                    ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
                ).innerHTML,
                n = document.querySelector(
                    ".replyCard .replymessage-block .flex-grow-1 .mb-0"
                ).innerText;
            b++;
            var e = document
                    .getElementById(e)
                    .querySelector(".chat-conversation-list"),
                c =
                    (null != t &&
                        (e.insertAdjacentHTML(
                            "beforeend",
                            '<li class="chat-list right" id="chat-list-' +
                                b +
                                '" >                <div class="conversation-list">                    <div class="user-chat-content">                        <div class="ctext-wrap">                            <div class="ctext-wrap-content">                            <div class="replymessage-block mb-0 d-flex align-items-start">                        <div class="flex-grow-1">                            <h5 class="conversation-name">' +
                                s +
                                '</h5>                            <p class="mb-0">' +
                                n +
                                '</p>                        </div>                        <div class="flex-shrink-0">                            <button type="button" class="btn btn-sm btn-link mt-n2 me-n3 font-size-18">                            </button>                        </div>                    </div>                                <p class="mb-0 ctext-content mt-1">                                    ' +
                                t +
                                '                                </p>                            </div>                            <div class="dropdown align-self-start message-box-drop">                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                    <i class="bi bi-three-dots-vertical"></i>                                </a>                                <div class="dropdown-menu">                                    <a class="dropdown-item reply-message" href="#"><i class="bi bi-reply me-2 text-muted align-bottom"></i>Reply</a>                                    <a class="dropdown-item" href="#"><i class="bi bi-share me-2 text-muted align-bottom"></i>Forward</a>                                    <a class="dropdown-item copy-message" href="#"><i class="bi bi-clipboard-check me-2 text-muted align-bottom"></i>Copy</a>                                    <a class="dropdown-item" href="#"><i class="bi bi-bookmarks me-2 text-muted align-bottom"></i>Bookmark</a>                                    <a class="dropdown-item delete-item" href="#"><i class="bi bi-trash3 me-2 text-muted align-bottom"></i>Delete</a>                            </div>                        </div>                    </div>                    <div class="conversation-name">                        <small class="text-muted time">' +
                                y() +
                                '</small>                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    </div>                </div>            </div>        </li>'
                        ),
                        0),
                    document.getElementById("chat-list-" + b));
            c.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    x.removeChild(c);
                });
            }),
                c.querySelectorAll(".copy-message").forEach(function (e) {
                    e.addEventListener("click", function () {
                        (document.getElementById(
                            "copyClipBoard"
                        ).style.display = "block"),
                            (document.getElementById(
                                "copyClipBoardChannel"
                            ).style.display = "block"),
                            setTimeout(function () {
                                (document.getElementById(
                                    "copyClipBoard"
                                ).style.display = "none"),
                                    (document.getElementById(
                                        "copyClipBoardChannel"
                                    ).style.display = "none");
                            }, 1e3);
                    });
                }),
                c.querySelectorAll(".reply-message").forEach(function (s) {
                    s.addEventListener("click", function () {
                        var e =
                                s.closest(".ctext-wrap").children[0].children[0]
                                    .innerText,
                            t = document.querySelector(
                                ".user-chat-topbar .text-truncate .username"
                            ).innerHTML,
                            e =
                                ((document.querySelector(
                                    ".replyCard .replymessage-block .flex-grow-1 .mb-0"
                                ).innerText = e),
                                !s.closest(".chat-list") ||
                                s
                                    .closest(".chat-list")
                                    .classList.contains("left")
                                    ? t
                                    : "You");
                        document.querySelector(
                            ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
                        ).innerText = e;
                    });
                }),
                c.querySelectorAll(".copy-message").forEach(function (e) {
                    e.addEventListener("click", function () {
                        (isText = e
                            .closest(".ctext-wrap")
                            .querySelector(".ctext-content").innerText),
                            navigator.clipboard.writeText(isText);
                    });
                });
        };
    new FgEmojiPicker({
        trigger: [".emoji-btn"],
        removeOnSelection: !1,
        closeButton: !0,
        position: ["top", "right"],
        preFetch: !0,
        dir: "assets/js/pages/plugins/json",
        insertInto: document.querySelector(".chat-input"),
    });
    document.getElementById("emoji-btn").addEventListener("click", function () {
        setTimeout(function () {
            var e,
                t = document.getElementsByClassName("fg-emoji-picker")[0];
            t &&
                (e = window.getComputedStyle(t)
                    ? window.getComputedStyle(t).getPropertyValue("left")
                    : "") &&
                ((e = e.replace("px", "")), (t.style.left = e = e - 40 + "px"));
        }, 0);
    });
})();
var Dtime = 0,
    running = !1,
    scrollEl =
        (Array.from(document.querySelectorAll(".video-icon")).forEach(function (
            e
        ) {
            e.addEventListener("click", function () {
                document
                    .querySelector(".user-chat .chat-content")
                    .classList.contains("d-lg-flex")
                    ? ((running = !0),
                      document
                          .querySelector(".user-chat .chat-content")
                          .classList.remove("d-lg-flex"),
                      document
                          .querySelector(".user-chat .chat-content")
                          .classList.add("d-none"),
                      document
                          .querySelector(".user-chat .video-content")
                          .classList.remove("d-none"),
                      document
                          .querySelector(".user-chat .video-content")
                          .classList.add("d-flex"),
                      increment())
                    : ((running = !1),
                      document
                          .querySelector(".user-chat .chat-content")
                          .classList.add("d-lg-flex"),
                      document
                          .querySelector(".user-chat .chat-content")
                          .classList.remove("d-none"),
                      document
                          .querySelector(".user-chat .video-content")
                          .classList.remove("d-flex"),
                      document
                          .querySelector(".user-chat .video-content")
                          .classList.add("d-none"));
            });
        }),
        Array.from(document.querySelectorAll(".call-disconnect")).forEach(
            function (e) {
                e.addEventListener("click", function () {
                    document
                        .querySelector(".user-chat .video-content")
                        .classList.contains("d-flex") &&
                        (document
                            .querySelector(".user-chat .video-content")
                            .classList.remove("d-flex"),
                        document
                            .querySelector(".user-chat .video-content")
                            .classList.add("d-none"),
                        document
                            .querySelector(".user-chat .chat-content")
                            .classList.add("d-lg-flex"),
                        document
                            .querySelector(".user-chat .chat-content")
                            .classList.remove("d-none"),
                        (running = !1),
                        (Dtime = 0));
                });
            }
        ),
        new SimpleBar(document.getElementById("chat-conversation")));
scrollEl.getScrollElement().scrollTop =
    document.getElementById("users-conversation").scrollHeight;
