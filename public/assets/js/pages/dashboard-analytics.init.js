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
var sessionChart = "",
    visitDurationChart = "",
    impressionsChart = "",
    viewsChart = "",
    barchartChart = "",
    clicksChart = "",
    chartColumnDistributedChart = "",
    salesReportChart = "",
    timeOnSaleChart = "",
    goalCompletionsChart = "",
    bounceRateChart = "",
    newSessionsChart = "",
    pieChart = "";
function loadCharts() {
    getChartColorsArray("session_chart") &&
        ((a = {
            series: [
                {
                    name: "Total Sessions",
                    data: [31, 40, 28, 51, 42, 109, 103],
                },
            ],
            chart: { height: 124, type: "line", toolbar: { show: !1 } },
            legend: { show: !1 },
            dataLabels: { enabled: !1 },
            grid: { show: !1, yaxis: { lines: { show: !1 } } },
            stroke: { width: 2, curve: "smooth" },
            colors: getChartColorsArray("session_chart"),
            xaxis: {
                categories: ["S", "M", "T", "W", "T", "F", "S"],
                labels: { style: { fontSize: "10px" } },
            },
            yaxis: { show: !1 },
        }),
        "" != sessionChart && sessionChart.destroy(),
        (sessionChart = new ApexCharts(
            document.querySelector("#session_chart"),
            a
        )).render()),
        (r = getChartColorsArray("visti_duration_chart")) &&
            ((a = {
                series: [
                    {
                        name: "Avg. Visit Duration",
                        data: [29, 43, 71, 58, 99, 93, 130],
                    },
                ],
                chart: { height: 124, type: "line", toolbar: { show: !1 } },
                legend: { show: !1 },
                dataLabels: { enabled: !1 },
                grid: { show: !1, yaxis: { lines: { show: !1 } } },
                stroke: { width: 2, curve: "smooth" },
                colors: r,
                xaxis: {
                    categories: ["S", "M", "T", "W", "T", "F", "S"],
                    labels: { style: { fontSize: "10px" } },
                },
                yaxis: { show: !1 },
            }),
            "" != visitDurationChart && visitDurationChart.destroy(),
            (visitDurationChart = new ApexCharts(
                document.querySelector("#visti_duration_chart"),
                a
            )).render()),
        (r = getChartColorsArray("impressions_chart")) &&
            ((a = {
                series: [
                    {
                        name: "Impressions",
                        data: [50, 18, 47, 32, 84, 110, 93],
                    },
                ],
                chart: { height: 124, type: "line", toolbar: { show: !1 } },
                legend: { show: !1 },
                dataLabels: { enabled: !1 },
                grid: { show: !1, yaxis: { lines: { show: !1 } } },
                stroke: { width: 2, curve: "smooth" },
                colors: r,
                xaxis: {
                    categories: ["S", "M", "T", "W", "T", "F", "S"],
                    labels: { style: { fontSize: "10px" } },
                },
                yaxis: { show: !1 },
            }),
            "" != impressionsChart && impressionsChart.destroy(),
            (impressionsChart = new ApexCharts(
                document.querySelector("#impressions_chart"),
                a
            )).render()),
        (r = getChartColorsArray("views_chart")) &&
            ((a = {
                series: [
                    {
                        name: "Total Views",
                        data: [72, 58, 30, 51, 42, 95, 119],
                    },
                ],
                chart: { height: 124, type: "line", toolbar: { show: !1 } },
                legend: { show: !1 },
                dataLabels: { enabled: !1 },
                grid: { show: !1, yaxis: { lines: { show: !1 } } },
                stroke: { width: 2, curve: "smooth" },
                colors: r,
                xaxis: {
                    categories: ["S", "M", "T", "W", "T", "F", "S"],
                    labels: { style: { fontSize: "10px" } },
                },
                yaxis: { show: !1 },
            }),
            "" != viewsChart && viewsChart.destroy(),
            (viewsChart = new ApexCharts(
                document.querySelector("#views_chart"),
                a
            )).render()),
        (r = getChartColorsArray("pageviews_overview")) &&
            ((a = {
                series: [
                    {
                        name: "Website",
                        data: [
                            12, 14.65, 28.24, 25.02, 19.65, 23, 21.18, 23.65,
                            20.32, 18, 12.65, 28.32,
                        ],
                    },
                    {
                        name: "Social Media",
                        data: [
                            26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65,
                            27.32, 25, 24.65, 29.32,
                        ],
                    },
                    {
                        name: "Others",
                        data: [
                            -10, -17.32, -15.45, -12.3, -19.15, -15.45, -11,
                            -14.32, -15.67, -10, -17.32, -19.2,
                        ],
                    },
                ],
                chart: {
                    type: "bar",
                    height: 373,
                    stacked: !0,
                    toolbar: { show: !1 },
                },
                stroke: { width: 5, colors: "#000", lineCap: "round" },
                plotOptions: {
                    bar: {
                        columnWidth: "25%",
                        borderRadius: 5,
                        lineCap: "round",
                        borderRadiusOnAllStackedSeries: !0,
                    },
                },
                colors: r,
                fill: { opacity: 1 },
                dataLabels: { enabled: !1, textAnchor: "top" },
                legend: { show: !0, position: "top", horizontalAlign: "right" },
                xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    labels: { rotate: -90 },
                    axisTicks: { show: !0 },
                    axisBorder: { show: !0, stroke: { width: 1 } },
                },
                responsive: [
                    {
                        breakpoint: 992,
                        options: {
                            plotOptions: { bar: { columnWidth: "50px" } },
                        },
                    },
                    {
                        breakpoint: 600,
                        options: {
                            plotOptions: { bar: { columnWidth: "70px" } },
                        },
                    },
                ],
            }),
            "" != barchartChart && barchartChart.destroy(),
            (barchartChart = new ApexCharts(
                document.querySelector("#pageviews_overview"),
                a
            )).render()),
        (r = getChartColorsArray("clicks_Chart")) &&
            ((a = {
                series: [
                    {
                        name: "Website",
                        data: [21, 10, 12, 8, 18, 29, 16, 20, 36, 22, 29, 16],
                    },
                    {
                        name: "Ads Clicks",
                        data: [10, 29, 16, 13, 33, 24, 39, 46, 40, 35, 49, 41],
                    },
                    {
                        name: "Social Media",
                        data: [26, 17, 34, 15, 21, 14, 8, 33, 26, 45, 32, 57],
                    },
                ],
                chart: {
                    type: "line",
                    height: 373,
                    toolbar: { show: !1 },
                    zoom: { enabled: !0 },
                },
                stroke: { width: 3 },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            legend: {
                                position: "bottom",
                                offsetX: -10,
                                offsetY: 0,
                            },
                        },
                    },
                ],
                xaxis: {
                    type: "datetime",
                    categories: [
                        "01/01/2023 GMT",
                        "01/02/2023 GMT",
                        "01/03/2023 GMT",
                        "01/04/2023 GMT",
                        "01/05/2023 GMT",
                        "01/06/2023 GMT",
                        "01/07/2023 GMT",
                        "01/08/2023 GMT",
                        "01/09/2023 GMT",
                        "01/10/2023 GMT",
                        "01/11/2023 GMT",
                        "01/12/2023 GMT",
                    ],
                },
                legend: { position: "top" },
                fill: { opacity: 1 },
                colors: r,
            }),
            "" != clicksChart && clicksChart.destroy(),
            (clicksChart = new ApexCharts(
                document.querySelector("#clicks_Chart"),
                a
            )).render()),
        (r = getChartColorsArray("column_distributed")) &&
            ((a = {
                series: [
                    {
                        data: [
                            30, 57, 25, 33, 20, 39, 47, 36, 22, 51, 38, 27, 38,
                            49, 42, 58, 33, 46, 40, 34, 41, 53, 19, 23, 36, 52,
                            58, 43,
                        ],
                    },
                ],
                chart: { height: 373, type: "bar", toolbar: { show: !1 } },
                colors: r,
                plotOptions: { bar: { columnWidth: "45%", distributed: !0 } },
                dataLabels: { enabled: !1 },
                legend: { show: !1 },
                xaxis: {
                    type: "datetime",
                    categories: [
                        "01/01/2023 GMT",
                        "01/02/2023 GMT",
                        "01/03/2023 GMT",
                        "01/04/2023 GMT",
                        "01/05/2023 GMT",
                        "01/06/2023 GMT",
                        "01/07/2023 GMT",
                        "01/08/2023 GMT",
                        "01/09/2023 GMT",
                        "01/10/2023 GMT",
                        "01/11/2023 GMT",
                        "01/12/2023 GMT",
                        "01/13/2023 GMT",
                        "01/14/2023 GMT",
                        "01/15/2023 GMT",
                        "01/16/2023 GMT",
                        "01/17/2023 GMT",
                        "01/18/2023 GMT",
                        "01/19/2023 GMT",
                        "01/20/2023 GMT",
                        "01/21/2023 GMT",
                        "01/22/2023 GMT",
                        "01/23/2023 GMT",
                        "01/24/2023 GMT",
                        "01/25/2023 GMT",
                        "01/26/2023 GMT",
                        "01/27/2023 GMT",
                        "01/28/2023 GMT",
                    ],
                },
            }),
            "" != chartColumnDistributedChart &&
                chartColumnDistributedChart.destroy(),
            (chartColumnDistributedChart = new ApexCharts(
                document.querySelector("#column_distributed"),
                a
            )).render());
    if ((r = getChartColorsArray("main"))) {
        var e = document.getElementById("main");
        pieChart = echarts.init(e);
        const o = [];
        for (let e = 0; e < 5; ++e) o.push(Math.round(200 * Math.random()));
        function t() {
            for (var e = 0; e < o.length; ++e)
                0.9 < Math.random()
                    ? (o[e] += Math.round(1500 * Math.random()))
                    : (o[e] += Math.round(200 * Math.random()));
            pieChart.setOption({ series: [{ type: "bar", data: o }] });
        }
        (e = {
            grid: {
                left: "0%",
                right: "6%",
                bottom: "0%",
                top: "4%",
                containLabel: !0,
            },
            xAxis: {
                max: "dataMax",
                splitLine: { lineStyle: { color: "rgba(135,136, 138,.1)" } },
            },
            yAxis: {
                type: "category",
                data: ["Canada", "US", "Serbia", "Russia", "Brazil"],
                inverse: !0,
                animationDuration: 300,
                animationDurationUpdate: 300,
            },
            series: [
                {
                    realtimeSort: !0,
                    type: "bar",
                    data: o,
                    label: {
                        color: "#87888a",
                        show: !0,
                        position: "right",
                        valueAnimation: !0,
                    },
                },
            ],
            legend: { show: !1 },
            color: r,
            animationDuration: 0,
            animationDurationUpdate: 3e3,
            animationEasing: "linear",
            animationEasingUpdate: "linear",
        }),
            setTimeout(function () {
                t();
            }, 0),
            setInterval(function () {
                t();
            }, 3e3),
            pieChart.setOption(e);
    }
    (r = getChartColorsArray("sales_Report")) &&
        ((a = {
            series: [
                { name: "This Month", data: [45, 74, 36, 69, 84, 110, 92] },
                { name: "Last Month", data: [11, 18, 20, 32, 46, 65, 73] },
            ],
            chart: { height: 333, type: "area", toolbar: { show: !1 } },
            grid: { padding: { top: 0, right: 2, bottom: 0 } },
            legend: {
                show: !0,
                position: "top",
                horizontalAlign: "right",
                offsetY: "-50px",
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                },
            },
            dataLabels: { enabled: !1 },
            stroke: { curve: "stepline" },
            colors: r,
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
                ],
            },
            yaxis: {
                labels: {
                    show: !0,
                    formatter: function (e) {
                        return e.toFixed(0) + "k";
                    },
                },
            },
        }),
        "" != salesReportChart && salesReportChart.destroy(),
        (salesReportChart = new ApexCharts(
            document.querySelector("#sales_Report"),
            a
        )).render()),
        (e = getChartColorsArray("time_On_Sale")) &&
            ((a = {
                series: [70],
                chart: { width: 50, height: 100, type: "radialBar" },
                plotOptions: {
                    radialBar: {
                        hollow: { size: "45%" },
                        dataLabels: {
                            name: { show: !1 },
                            value: { show: !0, fontSize: "10px", offsetY: 5 },
                        },
                    },
                },
                colors: e,
            }),
            "" != timeOnSaleChart && timeOnSaleChart.destroy(),
            (timeOnSaleChart = new ApexCharts(
                document.querySelector("#time_On_Sale"),
                a
            )).render()),
        (r = getChartColorsArray("goal_Completions")) &&
            ((a = {
                series: [74.52],
                chart: { width: 50, height: 100, type: "radialBar" },
                plotOptions: {
                    radialBar: {
                        hollow: { size: "45%" },
                        dataLabels: {
                            name: { show: !1 },
                            value: { show: !0, fontSize: "10px", offsetY: 5 },
                        },
                    },
                },
                colors: r,
            }),
            "" != goalCompletionsChart && goalCompletionsChart.destroy(),
            (goalCompletionsChart = new ApexCharts(
                document.querySelector("#goal_Completions"),
                a
            )).render()),
        (e = getChartColorsArray("bounce_rate")) &&
            ((a = {
                series: [81.32],
                chart: { width: 50, height: 100, type: "radialBar" },
                plotOptions: {
                    radialBar: {
                        hollow: { size: "45%" },
                        dataLabels: {
                            name: { show: !1 },
                            value: { show: !0, fontSize: "10px", offsetY: 5 },
                        },
                    },
                },
                colors: e,
            }),
            "" != bounceRateChart && bounceRateChart.destroy(),
            (bounceRateChart = new ApexCharts(
                document.querySelector("#bounce_rate"),
                a
            )).render());
    (r = getChartColorsArray("new_Sessions")) &&
        ((a = {
            series: [94.03],
            chart: { width: 50, height: 100, type: "radialBar" },
            plotOptions: {
                radialBar: {
                    hollow: { size: "45%" },
                    dataLabels: {
                        name: { show: !1 },
                        value: { show: !0, fontSize: "10px", offsetY: 5 },
                    },
                },
            },
            colors: r,
        }),
        "" != newSessionsChart && newSessionsChart.destroy(),
        (newSessionsChart = new ApexCharts(
            document.querySelector("#new_Sessions"),
            a
        )).render());
    var a,
        r,
        e = getChartColorsArray("world-map-line-markers");
    e &&
        ((document.getElementById("world-map-line-markers").innerHTML = ""),
        new jsVectorMap({
            map: "world_merc",
            selector: "#world-map-line-markers",
            zoomOnScroll: !1,
            zoomButtons: !1,
            markers: [
                { name: "Canada", coords: [56.1304, -106.3468] },
                { name: "Brazil", coords: [-14.235, -51.9253] },
                { name: "Serbia", coords: [44.0165, 21.0059] },
                { name: "Russia", coords: [61, 105] },
                { name: "United States", coords: [37.0902, -95.7129] },
            ],
            regionStyle: {
                initial: {
                    stroke: "#9599ad",
                    strokeWidth: 0.25,
                    fill: e,
                    fillOpacity: 1,
                },
            },
            labels: {
                markers: {
                    render(e, t) {
                        return e.name || e.labelName || "Not available";
                    },
                },
            },
        }));
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
var options = { valueNames: ["browsers", "click", "pageviews"] },
    contactList = new List("networks", options),
    options = { valueNames: ["activePage", "activePageNo", "pageUsers"] },
    topPages = new List("top-Pages", options),
    sorttableDropdown = document.querySelectorAll(".sortble-dropdown");
sorttableDropdown &&
    sorttableDropdown.forEach(function (a) {
        a.querySelectorAll(".dropdown-menu .dropdown-item").forEach(function (
            t
        ) {
            t.addEventListener("click", function () {
                var e = t.innerHTML;
                a.querySelector(".dropdown-title").innerHTML = e;
            });
        });
    });
