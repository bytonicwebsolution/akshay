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
                    : getComputedStyle(
                          document.documentElement
                      ).getPropertyValue(t) || t;
            });
        console.warn("data-colors attribute not found on: " + e);
    }
}
var chartPieBasicChart = "",
    chartDonutBasicChart = "",
    chartDonutupdatingchart = "",
    chartPieGradientChart = "",
    chartPiePatternChart = "",
    chartPieImageChart = "",
    monochromePieChart = "";
function loadCharts() {
    (e = getChartColorsArray("simple_pie_chart")) &&
        ((t = {
            series: [44, 55, 13, 43, 22],
            chart: { height: 300, type: "pie" },
            labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
            legend: { position: "bottom" },
            dataLabels: { dropShadow: { enabled: !1 } },
            colors: e,
        }),
        "" != chartPieBasicChart && chartPieBasicChart.destroy(),
        (chartPieBasicChart = new ApexCharts(
            document.querySelector("#simple_pie_chart"),
            t
        )).render()),
        (e = getChartColorsArray("simple_dount_chart")) &&
            ((t = {
                series: [44, 55, 41, 17, 15],
                chart: { height: 300, type: "donut" },
                legend: { position: "bottom" },
                dataLabels: { dropShadow: { enabled: !1 } },
                colors: e,
            }),
            "" != chartDonutBasicChart && chartDonutBasicChart.destroy(),
            (chartDonutBasicChart = new ApexCharts(
                document.querySelector("#simple_dount_chart"),
                t
            )).render());
    (e = getChartColorsArray("updating_donut_chart")) &&
        ((t = {
            series: [44, 55, 13, 33],
            chart: { height: 280, type: "donut" },
            dataLabels: { enabled: !1 },
            legend: { position: "bottom" },
            colors: e,
        }),
        "" != chartDonutupdatingchart && chartDonutupdatingchart.destroy(),
        (chartDonutupdatingchart = new ApexCharts(
            document.querySelector("#updating_donut_chart"),
            t
        )).render(),
        document
            .querySelector("#randomize")
            .addEventListener("click", function () {
                chartDonutupdatingchart.updateSeries(
                    chartDonutupdatingchart.w.globals.series.map(function () {
                        return Math.floor(100 * Math.random()) + 1;
                    })
                );
            }),
        document.querySelector("#add").addEventListener("click", function () {
            var e;
            chartDonutupdatingchart.updateSeries(
                ((e = chartDonutupdatingchart.w.globals.series.slice()).push(
                    Math.floor(100 * Math.random()) + 1
                ),
                e)
            );
        }),
        document
            .querySelector("#remove")
            .addEventListener("click", function () {
                var e;
                chartDonutupdatingchart.updateSeries(
                    ((e =
                        chartDonutupdatingchart.w.globals.series.slice()).pop(),
                    e)
                );
            }),
        document.querySelector("#reset").addEventListener("click", function () {
            chartDonutupdatingchart.updateSeries(t.series);
        }));
    var e, t;
    (e = getChartColorsArray("gradient_chart")) &&
        ((t = {
            series: [44, 55, 41, 17, 15],
            chart: { height: 300, type: "donut" },
            plotOptions: { pie: { startAngle: -90, endAngle: 270 } },
            dataLabels: { enabled: !1 },
            fill: { type: "gradient" },
            legend: { position: "bottom" },
            title: {
                text: "Gradient Donut with custom Start-angle",
                style: { fontWeight: 500 },
            },
            colors: e,
        }),
        "" != chartPieGradientChart && chartPieGradientChart.destroy(),
        (chartPieGradientChart = new ApexCharts(
            document.querySelector("#gradient_chart"),
            t
        )).render()),
        (e = getChartColorsArray("pattern_chart")) &&
            ((t = {
                series: [44, 55, 41, 17, 15],
                chart: {
                    height: 300,
                    type: "donut",
                    dropShadow: {
                        enabled: !0,
                        color: "#111",
                        top: -1,
                        left: 3,
                        blur: 3,
                        opacity: 0.2,
                    },
                },
                stroke: { width: 0 },
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: !0,
                                total: { showAlways: !0, show: !0 },
                            },
                        },
                    },
                },
                labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
                dataLabels: { dropShadow: { blur: 3, opacity: 0.8 } },
                fill: {
                    type: "pattern",
                    opacity: 1,
                    pattern: {
                        enabled: !0,
                        style: [
                            "verticalLines",
                            "squares",
                            "horizontalLines",
                            "circles",
                            "slantedLines",
                        ],
                    },
                },
                states: { hover: { filter: "none" } },
                theme: { palette: "palette2" },
                title: {
                    text: "Favorite Movie Type",
                    style: { fontWeight: 500 },
                },
                legend: { position: "bottom" },
                colors: e,
            }),
            "" != chartPiePatternChart && chartPiePatternChart.destroy(),
            (chartPiePatternChart = new ApexCharts(
                document.querySelector("#pattern_chart"),
                t
            )).render()),
        getChartColorsArray("image_pie_chart") &&
            ((t = {
                series: [44, 33, 54, 45],
                chart: { height: 300, type: "pie" },
                colors: ["#93C3EE", "#E5C6A0", "#669DB5", "#94A74A"],
                fill: {
                    type: "image",
                    opacity: 0.85,
                    image: {
                        src: [
                            "assets/images/small/img-1.jpg",
                            "assets/images/small/img-2.jpg",
                            "assets/images/small/img-3.jpg",
                            "assets/images/small/img-4.jpg",
                        ],
                        width: 25,
                        imagedHeight: 25,
                    },
                },
                stroke: { width: 4 },
                dataLabels: {
                    enabled: !0,
                    style: { colors: ["#111"] },
                    background: {
                        enabled: !0,
                        foreColor: "#fff",
                        borderWidth: 0,
                    },
                },
                legend: { position: "bottom" },
            }),
            "" != chartPieImageChart && chartPieImageChart.destroy(),
            (chartPieImageChart = new ApexCharts(
                document.querySelector("#image_pie_chart"),
                t
            )).render());
    getChartColorsArray("monochrome_pie_chart") &&
        ((t = {
            series: [25, 15, 44, 55, 41, 17],
            chart: { height: 300, type: "pie" },
            labels: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            theme: {
                monochrome: {
                    enabled: !0,
                    color: "#3762ea",
                    shadeTo: "light",
                    shadeIntensity: 0.6,
                },
            },
            plotOptions: { pie: { dataLabels: { offset: -5 } } },
            title: { text: "Monochrome Pie", style: { fontWeight: 500 } },
            dataLabels: {
                formatter: function (e, t) {
                    return [
                        t.w.globals.labels[t.seriesIndex],
                        e.toFixed(1) + "%",
                    ];
                },
                dropShadow: { enabled: !1 },
            },
            legend: { show: !1 },
        }),
        "" != monochromePieChart && monochromePieChart.destroy(),
        (monochromePieChart = new ApexCharts(
            document.querySelector("#monochrome_pie_chart"),
            t
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
