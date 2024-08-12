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
          : getComputedStyle(document.documentElement).getPropertyValue(t) || t;
      });
    console.warn("data-colors attribute not found on: " + e);
  }
}
var sessionChart = "",
  visitDurationChart = "",
  impressionsChart = "",
  viewsChart = "",
  areachartmini6Chart = "",
  areachartmini7Chart = "",
  areachartmini8Chart = "",
  areachartmini9Chart = "",
  salesReportChart = "",
  syncStatusBreakdownChart = "",
  realizedRateChart = "",
  emailSentChart = "";
function loadCharts() {
  getChartColorsArray("session_chart") &&
    ((e = {
      series: [
        { name: "Total Sessions", data: [31, 40, 28, 51, 42, 109, 103] },
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
      e
    )).render()),
    (t = getChartColorsArray("visti_duration_chart")) &&
      ((e = {
        series: [
          { name: "Avg. Visit Duration", data: [29, 43, 71, 58, 99, 93, 130] },
        ],
        chart: { height: 124, type: "line", toolbar: { show: !1 } },
        legend: { show: !1 },
        dataLabels: { enabled: !1 },
        grid: { show: !1, yaxis: { lines: { show: !1 } } },
        stroke: { width: 2, curve: "smooth" },
        colors: t,
        xaxis: {
          categories: ["S", "M", "T", "W", "T", "F", "S"],
          labels: { style: { fontSize: "10px" } },
        },
        yaxis: { show: !1 },
      }),
      "" != visitDurationChart && visitDurationChart.destroy(),
      (visitDurationChart = new ApexCharts(
        document.querySelector("#visti_duration_chart"),
        e
      )).render()),
    (t = getChartColorsArray("impressions_chart")) &&
      ((e = {
        series: [{ name: "Impressions", data: [50, 18, 47, 32, 84, 110, 93] }],
        chart: { height: 124, type: "line", toolbar: { show: !1 } },
        legend: { show: !1 },
        dataLabels: { enabled: !1 },
        grid: { show: !1, yaxis: { lines: { show: !1 } } },
        stroke: { width: 2, curve: "smooth" },
        colors: t,
        xaxis: {
          categories: ["S", "M", "T", "W", "T", "F", "S"],
          labels: { style: { fontSize: "10px" } },
        },
        yaxis: { show: !1 },
      }),
      "" != impressionsChart && impressionsChart.destroy(),
      (impressionsChart = new ApexCharts(
        document.querySelector("#impressions_chart"),
        e
      )).render()),
    (t = getChartColorsArray("views_chart")) &&
      ((e = {
        series: [{ name: "Total Views", data: [72, 58, 30, 51, 42, 95, 119] }],
        chart: { height: 124, type: "line", toolbar: { show: !1 } },
        legend: { show: !1 },
        dataLabels: { enabled: !1 },
        grid: { show: !1, yaxis: { lines: { show: !1 } } },
        stroke: { width: 2, curve: "smooth" },
        colors: t,
        xaxis: {
          categories: ["S", "M", "T", "W", "T", "F", "S"],
          labels: { style: { fontSize: "10px" } },
        },
        yaxis: { show: !1 },
      }),
      "" != viewsChart && viewsChart.destroy(),
      (viewsChart = new ApexCharts(
        document.querySelector("#views_chart"),
        e
      )).render()),
    (t = getChartColorsArray("mini-chart-6")) &&
      ((t = {
        series: [{ data: [50, 15, 35, 62, 23, 56, 44, 12] }],
        chart: { type: "line", height: 50, sparkline: { enabled: !0 } },
        colors: t,
        stroke: { curve: "smooth", width: 1 },
        tooltip: {
          fixed: { enabled: !1 },
          x: { show: !1 },
          y: {
            title: {
              formatter: function (e) {
                return "";
              },
            },
          },
          marker: { show: !1 },
        },
      }),
      "" != areachartmini6Chart && areachartmini6Chart.destroy(),
      (areachartmini6Chart = new ApexCharts(
        document.querySelector("#mini-chart-6"),
        t
      )).render()),
    (t = getChartColorsArray("mini-chart-7")) &&
      ((t = {
        series: [{ data: [50, 15, 20, 34, 23, 56, 65, 75] }],
        chart: { type: "line", height: 50, sparkline: { enabled: !0 } },
        colors: t,
        stroke: { curve: "smooth", width: 1 },
        tooltip: {
          fixed: { enabled: !1 },
          x: { show: !1 },
          y: {
            title: {
              formatter: function (e) {
                return "";
              },
            },
          },
          marker: { show: !1 },
        },
      }),
      "" != areachartmini7Chart && areachartmini7Chart.destroy(),
      (areachartmini7Chart = new ApexCharts(
        document.querySelector("#mini-chart-7"),
        t
      )).render()),
    (t = getChartColorsArray("mini-chart-8")) &&
      ((t = {
        series: [{ data: [32, 18, 29, 31, 46, 33, 39, 46] }],
        chart: { type: "line", height: 50, sparkline: { enabled: !0 } },
        colors: t,
        stroke: { curve: "smooth", width: 1 },
        tooltip: {
          fixed: { enabled: !1 },
          x: { show: !1 },
          y: {
            title: {
              formatter: function (e) {
                return "";
              },
            },
          },
          marker: { show: !1 },
        },
      }),
      "" != areachartmini8Chart && areachartmini8Chart.destroy(),
      (areachartmini8Chart = new ApexCharts(
        document.querySelector("#mini-chart-8"),
        t
      )).render()),
    (t = getChartColorsArray("mini-chart-9")) &&
      ((t = {
        series: [{ data: [36, 25, 18, 34, 39, 30, 34, 42] }],
        chart: { type: "line", height: 50, sparkline: { enabled: !0 } },
        colors: t,
        stroke: { curve: "smooth", width: 1 },
        tooltip: {
          fixed: { enabled: !1 },
          x: { show: !1 },
          y: {
            title: {
              formatter: function (e) {
                return "";
              },
            },
          },
          marker: { show: !1 },
        },
      }),
      "" != areachartmini9Chart && areachartmini9Chart.destroy(),
      (areachartmini9Chart = new ApexCharts(
        document.querySelector("#mini-chart-9"),
        t
      )).render()),
    (t = getChartColorsArray("sales_Report")) &&
      ((e = {
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
        colors: t,
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
        e
      )).render()),
    (t = getChartColorsArray("syncStatusBreakdown")) &&
      ((e = {
        series: [
          { name: "Synced", data: [44, 55, 41, 37, 22, 43, 21] },
          { name: "Sync Needed", data: [53, 32, 33, 52, 13, 43, 32] },
          { name: "Never Synced", data: [12, 17, 11, 9, 15, 11, 20] },
          { name: "Review Needed", data: [9, 7, 5, 8, 6, 9, 4] },
        ],
        chart: { type: "bar", height: 365, stacked: !0, toolbar: { show: !1 } },
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
      )).render()),
    (t = getChartColorsArray("realized_rate")) &&
      ((e = {
        series: [
          { name: "Read", data: [80, 50, 30, 40, 100, 20] },
          { name: "Delivery", data: [20, 30, 40, 80, 20, 80] },
          { name: "Failed", data: [44, 76, 78, 13, 43, 10] },
        ],
        chart: { height: 360, type: "radar", toolbar: { show: !1 } },
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
        xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023"] },
      }),
      "" != realizedRateChart && realizedRateChart.destroy(),
      (realizedRateChart = new ApexCharts(
        document.querySelector("#realized_rate"),
        e
      )).render());
  (t = getChartColorsArray("emailSent")) &&
    ((e = {
      series: [63, 87, 33],
      chart: { height: 390, type: "radialBar" },
      plotOptions: {
        radialBar: {
          track: { background: t, opacity: 0.15 },
          dataLabels: {
            name: { fontSize: "22px" },
            value: { fontSize: "16px" },
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
    )).render());
  var e,
    t = getChartColorsArray("world-map-line-markers");
  t &&
    ((document.getElementById("world-map-line-markers").innerHTML = ""),
    new jsVectorMap({
      map: "world_merc",
      selector: "#world-map-line-markers",
      zoomOnScroll: !1,
      zoomButtons: !1,
      markers: [
        { name: "Greenland", coords: [72, -42] },
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
          fill: t,
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
  sorttableDropdown = document.querySelectorAll(".sortble-dropdown");
sorttableDropdown &&
  sorttableDropdown.forEach(function (t) {
    t.querySelectorAll(".dropdown-menu .dropdown-item").forEach(function (e) {
      e.addEventListener("click", function () {
        t.querySelector(".dropdown-title").innerHTML = e.innerHTML;
      });
    });
  });
