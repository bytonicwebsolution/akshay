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
var linechartBasicChart = "";
function loadCharts() {
    var e;
    (e = getChartColorsArray("line_chart_basic")) &&
        ((e = {
            series: [
                {
                    name: "Daily Earning",
                    data: [
                        32, 43, 48, 35, 26, 34, 47, 51, 59, 63, 44, 38, 53, 69,
                        72, 83, 90, 110, 130, 117, 111, 97, 89, 119, 80, 96,
                        116, 124,
                    ],
                },
                {
                    name: "Expenses",
                    data: [
                        15, 35, 18, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29,
                        32, 41, 34, 29, 37, 70, 55, 49, 37, 21, 54, 36, 45,
                    ],
                },
            ],
            chart: { height: 350, type: "line", toolbar: { show: !1 } },
            legend: { show: !0, position: "top", horizontalAlign: "right" },
            grid: { yaxis: { lines: { show: !1 } } },
            markers: { size: 0, hover: { sizeOffset: 4 } },
            stroke: { curve: "smooth", width: 2 },
            colors: e,
            xaxis: {
                type: "datetime",
                categories: [
                    "03/01/2023 GMT",
                    "03/02/2023 GMT",
                    "03/03/2023 GMT",
                    "03/04/2023 GMT",
                    "03/05/2023 GMT",
                    "03/06/2023 GMT",
                    "03/07/2023 GMT",
                    "03/08/2023 GMT",
                    "03/09/2023 GMT",
                    "03/10/2023 GMT",
                    "03/11/2023 GMT",
                    "03/12/2023 GMT",
                    "03/13/2023 GMT",
                    "03/14/2023 GMT",
                    "03/15/2023 GMT",
                    "03/16/2023 GMT",
                    "03/17/2023 GMT",
                    "03/18/2023 GMT",
                    "03/19/2023 GMT",
                    "03/20/2023 GMT",
                    "03/21/2023 GMT",
                    "03/22/2023 GMT",
                    "03/23/2023 GMT",
                    "03/24/2023 GMT",
                    "03/25/2023 GMT",
                    "03/26/2023 GMT",
                    "03/27/2023 GMT",
                    "03/28/2023 GMT",
                ],
            },
            yaxis: { show: !1 },
        }),
        "" != linechartBasicChart && linechartBasicChart.destroy(),
        (linechartBasicChart = new ApexCharts(
            document.querySelector("#line_chart_basic"),
            e
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
