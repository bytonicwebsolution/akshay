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
var chartScatterBasicChart = "",
    chartScatterDateTimeChart = "",
    chartScatterImagesChart = "";
function loadCharts() {
    function e(e, t, a) {
        for (var r = 0, s = []; r < t; ) {
            var o = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
            s.push([e, o]), (e += 864e5), r++;
        }
        return s;
    }
    (a = getChartColorsArray("basic_scatter")) &&
        ((t = {
            series: [
                {
                    name: "SAMPLE A",
                    data: [
                        [16.4, 5.4],
                        [21.7, 2],
                        [25.4, 3],
                        [19, 2],
                        [10.9, 1],
                        [13.6, 3.2],
                        [10.9, 7.4],
                        [10.9, 0],
                        [10.9, 8.2],
                        [16.4, 0],
                        [16.4, 1.8],
                        [13.6, 0.3],
                        [13.6, 0],
                        [29.9, 0],
                        [27.1, 2.3],
                        [16.4, 0],
                        [13.6, 3.7],
                        [10.9, 5.2],
                        [16.4, 6.5],
                        [10.9, 0],
                        [24.5, 7.1],
                        [10.9, 0],
                        [8.1, 4.7],
                        [19, 0],
                        [21.7, 1.8],
                        [27.1, 0],
                        [24.5, 0],
                        [27.1, 0],
                        [29.9, 1.5],
                        [27.1, 0.8],
                        [22.1, 2],
                    ],
                },
                {
                    name: "SAMPLE B",
                    data: [
                        [36.4, 13.4],
                        [1.7, 11],
                        [5.4, 8],
                        [9, 17],
                        [1.9, 4],
                        [3.6, 12.2],
                        [1.9, 14.4],
                        [1.9, 9],
                        [1.9, 13.2],
                        [1.4, 7],
                        [6.4, 8.8],
                        [3.6, 4.3],
                        [1.6, 10],
                        [9.9, 2],
                        [7.1, 15],
                        [1.4, 0],
                        [3.6, 13.7],
                        [1.9, 15.2],
                        [6.4, 16.5],
                        [0.9, 10],
                        [4.5, 17.1],
                        [10.9, 10],
                        [0.1, 14.7],
                        [9, 10],
                        [12.7, 11.8],
                        [2.1, 10],
                        [2.5, 10],
                        [27.1, 10],
                        [2.9, 11.5],
                        [7.1, 10.8],
                        [2.1, 12],
                    ],
                },
                {
                    name: "SAMPLE C",
                    data: [
                        [21.7, 3],
                        [23.6, 3.5],
                        [24.6, 3],
                        [29.9, 3],
                        [21.7, 20],
                        [23, 2],
                        [10.9, 3],
                        [28, 4],
                        [27.1, 0.3],
                        [16.4, 4],
                        [13.6, 0],
                        [19, 5],
                        [22.4, 3],
                        [24.5, 3],
                        [32.6, 3],
                        [27.1, 4],
                        [29.6, 6],
                        [31.6, 8],
                        [21.6, 5],
                        [20.9, 4],
                        [22.4, 0],
                        [32.6, 10.3],
                        [29.7, 20.8],
                        [24.5, 0.8],
                        [21.4, 0],
                        [21.7, 6.9],
                        [28.6, 7.7],
                        [15.4, 0],
                        [18.1, 0],
                        [33.4, 0],
                        [16.4, 0],
                    ],
                },
            ],
            chart: {
                height: 350,
                type: "scatter",
                zoom: { enabled: !0, type: "xy" },
                toolbar: { show: !1 },
            },
            xaxis: {
                tickAmount: 10,
                labels: {
                    formatter: function (e) {
                        return parseFloat(e).toFixed(1);
                    },
                },
            },
            yaxis: { tickAmount: 7 },
            colors: a,
        }),
        "" != chartScatterBasicChart && chartScatterBasicChart.destroy(),
        (chartScatterBasicChart = new ApexCharts(
            document.querySelector("#basic_scatter"),
            t
        )).render());
    var t, a;
    (a = getChartColorsArray("datetime_scatter")) &&
        ((t = {
            series: [
                {
                    name: "TEAM 1",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "TEAM 2",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "TEAM 3",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 30, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "TEAM 4",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 10, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "TEAM 5",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 30, {
                        min: 10,
                        max: 60,
                    }),
                },
            ],
            chart: {
                height: 350,
                type: "scatter",
                zoom: { type: "xy" },
                toolbar: { show: !1 },
            },
            dataLabels: { enabled: !1 },
            grid: {
                xaxis: { lines: { show: !0 } },
                yaxis: { lines: { show: !0 } },
            },
            xaxis: { type: "datetime" },
            yaxis: { max: 70 },
            colors: a,
        }),
        "" != chartScatterDateTimeChart && chartScatterDateTimeChart.destroy(),
        (chartScatterDateTimeChart = new ApexCharts(
            document.querySelector("#datetime_scatter"),
            t
        )).render());
    (a = getChartColorsArray("images_scatter")) &&
        ((t = {
            series: [
                {
                    name: "User A",
                    data: [
                        [16.4, 5.4],
                        [21.7, 4],
                        [25.4, 3],
                        [19, 2],
                        [10.9, 1],
                        [13.6, 3.2],
                        [10.9, 7],
                        [10.9, 8.2],
                        [16.4, 4],
                        [13.6, 4.3],
                        [13.6, 12],
                        [29.9, 3],
                        [10.9, 5.2],
                        [16.4, 6.5],
                        [10.9, 8],
                        [24.5, 7.1],
                        [10.9, 7],
                        [8.1, 4.7],
                    ],
                },
                {
                    name: "User B",
                    data: [
                        [6.4, 5.4],
                        [11.7, 4],
                        [15.4, 3],
                        [9, 2],
                        [10.9, 11],
                        [20.9, 7],
                        [12.9, 8.2],
                        [6.4, 14],
                        [11.6, 12],
                    ],
                },
            ],
            chart: {
                height: 350,
                type: "scatter",
                animations: { enabled: !1 },
                zoom: { enabled: !1 },
                toolbar: { show: !1 },
            },
            colors: a,
            xaxis: { tickAmount: 10, min: 0, max: 40 },
            yaxis: { tickAmount: 7 },
            markers: { size: 20 },
            fill: {
                type: "image",
                opacity: 1,
                image: {
                    src: [
                        "assets/images/users/avatar-1.jpg",
                        "assets/images/users/avatar-2.jpg",
                    ],
                    width: 40,
                    height: 40,
                },
            },
            legend: {
                labels: { useSeriesColors: !0 },
                markers: {
                    customHTML: [
                        function () {
                            return "";
                        },
                        function () {
                            return "";
                        },
                    ],
                },
            },
        }),
        "" != chartScatterImagesChart && chartScatterImagesChart.destroy(),
        (chartScatterImagesChart = new ApexCharts(
            document.querySelector("#images_scatter"),
            t
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
