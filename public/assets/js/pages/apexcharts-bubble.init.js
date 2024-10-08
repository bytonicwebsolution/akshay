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
var chartBubbleSimpleChart = "",
    chartBubbleChart = "";
function loadCharts() {
    function e(e, t, a) {
        for (var r = 0, l = []; r < t; ) {
            var n = Math.floor(750 * Math.random()) + 1,
                o = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min,
                m = Math.floor(61 * Math.random()) + 15;
            l.push([n, o, m]), r++;
        }
        return l;
    }
    var t, a;
    (a = getChartColorsArray("simple_bubble")) &&
        ((t = {
            series: [
                {
                    name: "Bubble1",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "Bubble2",
                    data: e(new Date("12 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "Bubble3",
                    data: e(new Date("13 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "Bubble4",
                    data: e(new Date("14 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
            ],
            chart: { height: 350, type: "bubble", toolbar: { show: !1 } },
            dataLabels: { enabled: !1 },
            fill: { opacity: 0.8 },
            title: { text: "Simple Bubble Chart", style: { fontWeight: 500 } },
            xaxis: { tickAmount: 12, type: "category" },
            yaxis: { max: 70 },
            colors: a,
        }),
        "" != chartBubbleSimpleChart && chartBubbleSimpleChart.destroy(),
        (chartBubbleSimpleChart = new ApexCharts(
            document.querySelector("#simple_bubble"),
            t
        )).render());
    (a = getChartColorsArray("bubble_chart")) &&
        ((t = {
            series: [
                {
                    name: "Product1",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "Product2",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "Product3",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
                {
                    name: "Product4",
                    data: e(new Date("11 Feb 2017 GMT").getTime(), 20, {
                        min: 10,
                        max: 60,
                    }),
                },
            ],
            chart: { height: 350, type: "bubble", toolbar: { show: !1 } },
            dataLabels: { enabled: !1 },
            fill: { type: "gradient" },
            title: { text: "3D Bubble Chart", style: { fontWeight: 500 } },
            xaxis: { tickAmount: 12, type: "datetime", labels: { rotate: 0 } },
            yaxis: { max: 70 },
            theme: { palette: "palette2" },
            colors: a,
        }),
        "" != chartBubbleChart && chartBubbleChart.destroy(),
        (chartBubbleChart = new ApexCharts(
            document.querySelector("#bubble_chart"),
            t
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
