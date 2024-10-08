function getChartColorsArray(a) {
    var t = document.getElementById(a);
    if (t) {
        t = t.dataset.colors;
        if (t)
            return JSON.parse(t).map((a) => {
                var t = a.replace(/\s/g, "");
                return t.includes(",")
                    ? 2 === (a = a.split(",")).length
                        ? `rgba(${getComputedStyle(
                              document.documentElement
                          ).getPropertyValue(a[0])}, ${a[1]})`
                        : t
                    : getComputedStyle(
                          document.documentElement
                      ).getPropertyValue(t) || t;
            });
        console.warn("data-colors attribute not found on: " + a);
    }
}
var chartHeatMapBasicChart = "",
    chartHeatMapMultipleChart = "",
    chartHeatMapChart = "",
    chartHeatMapShadesChart = "";
function loadCharts() {
    function a(a, t) {
        for (var e = 0, r = []; e < a; ) {
            var m = (e + 1).toString(),
                n = Math.floor(Math.random() * (t.max - t.min + 1)) + t.min;
            r.push({ x: m, y: n }), e++;
        }
        return r;
    }
    (r = getChartColorsArray("basic_heatmap")) &&
        ((t = {
            series: [
                { name: "Metric1", data: a(18, { min: 0, max: 90 }) },
                { name: "Metric2", data: a(18, { min: 0, max: 90 }) },
                { name: "Metric3", data: a(18, { min: 0, max: 90 }) },
                { name: "Metric4", data: a(18, { min: 0, max: 90 }) },
                { name: "Metric5", data: a(18, { min: 0, max: 90 }) },
                { name: "Metric6", data: a(18, { min: 0, max: 90 }) },
                { name: "Metric7", data: a(18, { min: 0, max: 90 }) },
                { name: "Metric8", data: a(18, { min: 0, max: 90 }) },
                { name: "Metric9", data: a(18, { min: 0, max: 90 }) },
            ],
            chart: { height: 450, type: "heatmap", toolbar: { show: !1 } },
            dataLabels: { enabled: !1 },
            colors: [r[0]],
            title: {
                text: "HeatMap Chart (Single color)",
                style: { fontWeight: 500 },
            },
            stroke: { colors: [r[1]] },
        }),
        "" != chartHeatMapBasicChart && chartHeatMapBasicChart.destroy(),
        (chartHeatMapBasicChart = new ApexCharts(
            document.querySelector("#basic_heatmap"),
            t
        )).render());
    var t,
        e,
        r = [
            { name: "W1", data: a(8, { min: 0, max: 90 }) },
            { name: "W2", data: a(8, { min: 0, max: 90 }) },
            { name: "W3", data: a(8, { min: 0, max: 90 }) },
            { name: "W4", data: a(8, { min: 0, max: 90 }) },
            { name: "W5", data: a(8, { min: 0, max: 90 }) },
            { name: "W6", data: a(8, { min: 0, max: 90 }) },
            { name: "W7", data: a(8, { min: 0, max: 90 }) },
            { name: "W8", data: a(8, { min: 0, max: 90 }) },
            { name: "W9", data: a(8, { min: 0, max: 90 }) },
            { name: "W10", data: a(8, { min: 0, max: 90 }) },
            { name: "W11", data: a(8, { min: 0, max: 90 }) },
            { name: "W12", data: a(8, { min: 0, max: 90 }) },
            { name: "W13", data: a(8, { min: 0, max: 90 }) },
            { name: "W14", data: a(8, { min: 0, max: 90 }) },
            { name: "W15", data: a(8, { min: 0, max: 90 }) },
        ];
    r.reverse(),
        [
            "#f7cc53",
            "#f1734f",
            "#663f59",
            "#6a6e94",
            "#4e88b4",
            "#00a7c6",
            "#18d8d8",
            "#a9d794",
            "#46aF78",
            "#a93f55",
            "#8c5e58",
            "#2176ff",
            "#5fd0f3",
            "#74788d",
            "#51d28c",
        ].reverse(),
        (e = getChartColorsArray("multiple_heatmap")) &&
            ((t = {
                series: r,
                chart: { height: 450, type: "heatmap", toolbar: { show: !1 } },
                dataLabels: { enabled: !1 },
                colors: [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]],
                xaxis: {
                    type: "category",
                    categories: [
                        "10:00",
                        "10:30",
                        "11:00",
                        "11:30",
                        "12:00",
                        "12:30",
                        "01:00",
                        "01:30",
                    ],
                },
                title: {
                    text: "HeatMap Chart (Different color shades for each series)",
                    style: { fontWeight: 500 },
                },
                grid: { padding: { right: 20 } },
                stroke: { colors: [e[8]] },
            }),
            "" != chartHeatMapMultipleChart &&
                chartHeatMapMultipleChart.destroy(),
            (chartHeatMapMultipleChart = new ApexCharts(
                document.querySelector("#multiple_heatmap"),
                t
            )).render()),
        (r = getChartColorsArray("color_heatmap")) &&
            ((t = {
                series: [
                    { name: "Jan", data: a(20, { min: -30, max: 55 }) },
                    { name: "Feb", data: a(20, { min: -30, max: 55 }) },
                    { name: "Mar", data: a(20, { min: -30, max: 55 }) },
                    { name: "Apr", data: a(20, { min: -30, max: 55 }) },
                    { name: "May", data: a(20, { min: -30, max: 55 }) },
                    { name: "Jun", data: a(20, { min: -30, max: 55 }) },
                    { name: "Jul", data: a(20, { min: -30, max: 55 }) },
                    { name: "Aug", data: a(20, { min: -30, max: 55 }) },
                    { name: "Sep", data: a(20, { min: -30, max: 55 }) },
                ],
                chart: { height: 350, type: "heatmap", toolbar: { show: !1 } },
                plotOptions: {
                    heatmap: {
                        shadeIntensity: 0.5,
                        radius: 0,
                        useFillColorAsStroke: !0,
                        colorScale: {
                            ranges: [
                                { from: -30, to: 5, name: "Low", color: r[0] },
                                {
                                    from: 6,
                                    to: 20,
                                    name: "Medium",
                                    color: r[1],
                                },
                                { from: 21, to: 45, name: "High", color: r[2] },
                                {
                                    from: 46,
                                    to: 55,
                                    name: "Extreme",
                                    color: r[3],
                                },
                            ],
                        },
                    },
                },
                dataLabels: { enabled: !1 },
                stroke: { width: 1 },
                title: {
                    text: "HeatMap Chart with Color Range",
                    style: { fontWeight: 500 },
                },
            }),
            "" != chartHeatMapChart && chartHeatMapChart.destroy(),
            (chartHeatMapChart = new ApexCharts(
                document.querySelector("#color_heatmap"),
                t
            )).render());
    (e = getChartColorsArray("shades_heatmap")) &&
        ((t = {
            series: [
                { name: "Metric1", data: a(20, { min: 0, max: 90 }) },
                { name: "Metric2", data: a(20, { min: 0, max: 90 }) },
                { name: "Metric3", data: a(20, { min: 0, max: 90 }) },
                { name: "Metric4", data: a(20, { min: 0, max: 90 }) },
                { name: "Metric5", data: a(20, { min: 0, max: 90 }) },
                { name: "Metric6", data: a(20, { min: 0, max: 90 }) },
                { name: "Metric7", data: a(20, { min: 0, max: 90 }) },
                { name: "Metric8", data: a(20, { min: 0, max: 90 }) },
                { name: "Metric8", data: a(20, { min: 0, max: 90 }) },
            ],
            chart: { height: 350, type: "heatmap", toolbar: { show: !1 } },
            stroke: { width: 0 },
            plotOptions: {
                heatmap: {
                    radius: 30,
                    enableShades: !1,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 50, color: e[0] },
                            { from: 51, to: 100, color: e[1] },
                        ],
                    },
                },
            },
            dataLabels: { enabled: !0, style: { colors: ["#fff"] } },
            xaxis: { type: "category" },
            title: {
                text: "Rounded (Range without Shades)",
                style: { fontWeight: 500 },
            },
        }),
        "" != chartHeatMapShadesChart && chartHeatMapShadesChart.destroy(),
        (chartHeatMapShadesChart = new ApexCharts(
            document.querySelector("#shades_heatmap"),
            t
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
