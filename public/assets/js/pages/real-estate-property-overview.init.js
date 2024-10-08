function toggleElementClass(e, t) {
    e = document.getElementById(e);
    e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t);
}
document.getElementById("agent-chat").addEventListener("click", function () {
    toggleElementClass("emailchat-detailElem", "d-block");
}),
    document
        .getElementById("emailchat-btn-close")
        .addEventListener("click", function () {
            toggleElementClass("emailchat-detailElem", "d-block");
        });
var swiper = new Swiper(".property-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: !0,
        pagination: { el: ".swiper-pagination", clickable: !0 },
    }),
    cities = L.layerGroup(),
    mbAttr =
        (L.marker([39.61, -105.02])
            .bindPopup("This is Littleton, CO.")
            .addTo(cities),
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'),
    mbUrl =
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
    grayscale = L.tileLayer(mbUrl, {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1,
        attribution: mbAttr,
    }),
    streets = L.tileLayer(mbUrl, {
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        attribution: mbAttr,
    }),
    layerGroupControlMap = L.map("leaflet-map-group-control", {
        center: [39.73, -104.99],
        zoom: 10,
        layers: [streets, cities],
    }),
    baseLayers = { Grayscale: grayscale, Streets: streets },
    overlays = { Cities: cities };
L.control.layers(baseLayers, overlays).addTo(layerGroupControlMap);
