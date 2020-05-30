function fetchAllCountries(callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.status === 200 && this.readyState === 4) {
			callback(JSON.parse(this.responseText));
		}
	}
	xhr.open('get', 'https://restcountries.eu/rest/v2/all')
	xhr.send();
}

fetchAllCountries(function (countries) {
	drawChart(createCountriesData(countries));
});

function createCountriesData(countries) {
	return countries.map(function(country) {
		return {
			name: country.name,
			y: country.population
		};
	});
}

function drawChart(countriesData) {
	Highcharts.chart('container', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Browser market shares in January, 2018'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
			point: {
				valueSuffix: '%'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: countriesData
		}]
	});
}


