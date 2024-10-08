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
var balanceOverviewChart = "",
    realizedRateChart = "",
    emailSentChart = "",
    usersActivityChart = "",
    syncStatusBreakdownChart = "";
function loadCharts() {
    var e, t;
    (t = getChartColorsArray("balance_overview")) &&
        ((e = {
            series: [
                {
                    name: "Total Revenue",
                    data: [
                        49, 62, 55, 67, 73, 89, 110, 120, 115, 129, 123, 133,
                    ],
                },
                {
                    name: "Total Expense",
                    data: [62, 76, 67, 49, 63, 77, 70, 86, 92, 103, 87, 93],
                },
                {
                    name: "Profit Ratio",
                    data: [12, 36, 29, 33, 37, 42, 58, 67, 49, 33, 24, 18],
                },
            ],
            chart: {
                height: 300,
                type: "line",
                toolbar: { show: !1 },
                dropShadow: {
                    enabled: !0,
                    enabledOnSeries: void 0,
                    top: 0,
                    left: 0,
                    blur: 3,
                    color: t,
                    opacity: 0.25,
                },
            },
            markers: {
                size: 0,
                strokeColors: t,
                strokeWidth: 2,
                strokeOpacity: 0.9,
                fillOpacity: 1,
                radius: 0,
                hover: { size: 5 },
            },
            grid: { show: !0, padding: { top: -20, right: 0, bottom: 0 } },
            legend: { show: !1 },
            dataLabels: { enabled: !1 },
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
            stroke: { width: [2, 2, 2], curve: "smooth" },
            colors: t,
        }),
        "" != balanceOverviewChart && balanceOverviewChart.destroy(),
        (balanceOverviewChart = new ApexCharts(
            document.querySelector("#balance_overview"),
            e
        )).render()),
        (t = getChartColorsArray("realized_rate")) &&
            ((e = {
                series: [
                    { name: "Read", data: [80, 50, 30, 40, 100, 20] },
                    { name: "Delivery", data: [20, 30, 40, 80, 20, 80] },
                    { name: "Failed", data: [44, 76, 78, 13, 43, 10] },
                ],
                chart: { height: 403, type: "radar", toolbar: { show: !1 } },
                stroke: { width: 1 },
                fill: { opacity: 0.2 },
                markers: { size: 3, hover: { size: 4 } },
                tooltip: {
                    y: {
                        formatter: function (e) {
                            return e;
                        },
                    },
                },
                colors: t,
                xaxis: {
                    categories: [
                        "2018",
                        "2019",
                        "2020",
                        "2021",
                        "2022",
                        "2023",
                    ],
                },
            }),
            "" != realizedRateChart && realizedRateChart.destroy(),
            (realizedRateChart = new ApexCharts(
                document.querySelector("#realized_rate"),
                e
            )).render()),
        (t = getChartColorsArray("emailSent")) &&
            ((e = {
                series: [63, 87, 33],
                chart: { height: 363, type: "radialBar" },
                plotOptions: {
                    radialBar: {
                        track: { background: t, opacity: 0.15 },
                        dataLabels: {
                            name: { fontSize: "22px" },
                            value: { fontSize: "16px", color: "#87888a" },
                            total: {
                                show: !0,
                                label: "Total",
                                formatter: function (e) {
                                    return 1793;
                                },
                            },
                        },
                    },
                },
                legend: { show: !0, position: "bottom" },
                labels: ["Sent", "Received", "Failed"],
                colors: t,
            }),
            "" != emailSentChart && emailSentChart.destroy(),
            (emailSentChart = new ApexCharts(
                document.querySelector("#emailSent"),
                e
            )).render()),
        (t = getChartColorsArray("usersActivity")) &&
            ((e = {
                series: [
                    { name: "Activ User", data: [44, 55, 41, 67, 22, 43] },
                    { name: "New Users", data: [13, 23, 20, 8, 13, 27] },
                ],
                chart: {
                    type: "bar",
                    height: 330,
                    stacked: !0,
                    toolbar: { show: !1 },
                    zoom: { enabled: !0 },
                },
                plotOptions: { bar: { horizontal: !1, columnWidth: "40%" } },
                dataLabels: { enabled: !1 },
                xaxis: { categories: ["S", "M", "T", "W", "T", "F", "S"] },
                grid: { show: !0, padding: { top: -18, right: 0, bottom: 0 } },
                legend: { position: "bottom" },
                fill: { opacity: 1 },
                colors: t,
            }),
            "" != usersActivityChart && usersActivityChart.destroy(),
            (usersActivityChart = new ApexCharts(
                document.querySelector("#usersActivity"),
                e
            )).render());
    (t = getChartColorsArray("syncStatusBreakdown")) &&
        ((e = {
            series: [
                { name: "Synced", data: [44, 55, 41, 37, 22, 43, 21] },
                { name: "Sync Needed", data: [53, 32, 33, 52, 13, 43, 32] },
                { name: "Never Synced", data: [12, 17, 11, 9, 15, 11, 20] },
                { name: "Review Needed", data: [9, 7, 5, 8, 6, 9, 4] },
            ],
            chart: {
                type: "bar",
                height: 350,
                stacked: !0,
                toolbar: { show: !1 },
            },
            plotOptions: { bar: { horizontal: !0, columnHight: "40%" } },
            grid: { show: !0, padding: { top: -20, right: 0, bottom: -10 } },
            dataLabels: { enabled: !1 },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            },
            yaxis: { title: { text: void 0 } },
            fill: { opacity: 1 },
            legend: { show: !1 },
            colors: t,
        }),
        "" != syncStatusBreakdownChart && syncStatusBreakdownChart.destroy(),
        (syncStatusBreakdownChart = new ApexCharts(
            document.querySelector("#syncStatusBreakdown"),
            e
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
var options = new List("leadsList", {
        valueNames: [
            "contact_name",
            "phone_number",
            "leads_score",
            "location",
            "create_date",
        ],
        page: 5,
        pagination: !0,
    }),
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
