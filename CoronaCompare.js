let countryName1 = '';
let countryName2 = '';
let comperBy = '';

$('#compareBut').click(() => {
    comperBy = $('#inputGroupSelect01').val();
    countryName1 = $('#country1').val();
    countryName2 = $('#country2').val();

    function getCountriesData(url) {
        return new Promise(function (resolve) {
            resolve($.get(url));
        });
    }
    const countriesUrl = `https://corona.lmao.ninja/v2/historical/${countryName1},${countryName2}?lastdays=${$('#numberIn').val()}`;
    getCountriesData(countriesUrl).then(function (data) {
        $('body').append('<div id="container"></div>');
        drawCompare(data[0].timeline[comperBy], data[1].timeline[comperBy]);
    });
});

$('#clear').click(() => {
    $('#country1').val('');
    $('#country2').val('');
    $('#numberIn').val('');
    $('#inputGroupSelect01').val('Compare By...');
});

function drawCompare(first, second) {

    let date = Object.keys(first).map(date => date);
    let firstCompare = Object.values(first).map(index => index);
    let secondCompare = Object.values(second).map(index => index);

    Highcharts.chart('container', {

        title: {
            text: `<b>Compare corona ${comperBy} between: ${countryName1} & ${countryName2}</b>`
        },

        yAxis: {
            title: {
                text: `<b>Quantity of ${comperBy}</b>`
            }
        },

        xAxis: {
            categories: date
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },

        series: [{
            name: countryName1,
            data: firstCompare
        }, {
            name: countryName2,
            data: secondCompare
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}
