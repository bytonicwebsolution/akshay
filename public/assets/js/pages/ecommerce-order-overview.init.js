var map = L.map("map");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
}).addTo(map),
    L.Routing.control({
        waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
        show: !1,
        routeWhileDragging: !0,
    }).addTo(map);
