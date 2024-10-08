function getChartColorsArray(a) {
    var r = document.getElementById(a);
    if (r) {
        r = r.dataset.colors;
        if (r)
            return JSON.parse(r).map((a) => {
                var r = a.replace(/\s/g, "");
                return r.includes(",")
                    ? 2 === (a = a.split(",")).length
                        ? `rgba(${getComputedStyle(
                              document.documentElement
                          ).getPropertyValue(a[0])}, ${a[1]})`
                        : r
                    : getComputedStyle(
                          document.documentElement
                      ).getPropertyValue(r) || r;
            });
        console.warn("data-colors attribute not found on: " + a);
    }
}
var chartRadarBasicChart = "",
    chartRadarMultiChart = "",
    chartRadarPolyradarChart = "";
function loadCharts() {
    var a, r;
    (r = getChartColorsArray("basic_radar")) &&
        ((a = {
            series: [{ name: "Series 1", data: [80, 50, 30, 40, 100, 20] }],
            chart: { height: 350, type: "radar", toolbar: { show: !1 } },
            colors: r,
            xaxis: {
                categories: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                ],
            },
        }),
        "" != chartRadarBasicChart && chartRadarBasicChart.destroy(),
        (chartRadarBasicChart = new ApexCharts(
            document.querySelector("#basic_radar"),
            a
        )).render()),
        (r = getChartColorsArray("multi_radar")) &&
            ((a = {
                series: [
                    { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                    { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                    { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
                ],
                chart: {
                    height: 350,
                    type: "radar",
                    dropShadow: { enabled: !0, blur: 1, left: 1, top: 1 },
                    toolbar: { show: !1 },
                },
                stroke: { width: 2 },
                fill: { opacity: 0.2 },
                markers: { size: 0 },
                colors: r,
                xaxis: {
                    categories: [
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019",
                    ],
                },
            }),
            "" != chartRadarMultiChart && chartRadarMultiChart.destroy(),
            (chartRadarMultiChart = new ApexCharts(
                document.querySelector("#multi_radar"),
                a
            )).render());
    (r = getChartColorsArray("polygon_radar")) &&
        ((a = {
            series: [{ name: "Series 1", data: [20, 100, 40, 30, 50, 80, 33] }],
            chart: { height: 350, type: "radar", toolbar: { show: !1 } },
            dataLabels: { enabled: !0 },
            plotOptions: { radar: { size: 140 } },
            title: {
                text: "Radar with Polygon Fill",
                style: { fontWeight: 500 },
            },
            colors: r,
            markers: {
                size: 4,
                colors: ["#fff"],
                strokeColor: "#f34e4e",
                strokeWidth: 2,
            },
            tooltip: {
                y: {
                    formatter: function (a) {
                        return a;
                    },
                },
            },
            xaxis: {
                categories: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: function (a, r) {
                        return r % 2 == 0 ? a : "";
                    },
                },
            },
        }),
        "" != chartRadarPolyradarChart && chartRadarPolyradarChart.destroy(),
        (chartRadarPolyradarChart = new ApexCharts(
            document.querySelector("#polygon_radar"),
            a
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
