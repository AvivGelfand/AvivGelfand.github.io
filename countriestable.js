var totalCountries = [];

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
	drawTable(countries);
	totalCountries = countries;
});

var searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', function () {
	clearTbody();
	var filteredCountries = getFilteredCountries(totalCountries, searchInput.value);
	drawTable(filteredCountries);
});

function getFilteredCountries(countries, searchValue) {
	return countries.filter(function(country) {
		return country.name.toLowerCase().startsWith(searchValue);
	});
}

function clearTbody() {
	var tbody = document.getElementById('countries');
	if (tbody) {
		tbody.remove();
	}
}

function drawTable(countries) {
	var tableData = document.createElement('tbody');
	tableData.id = 'countries';
	document.getElementById('countries-table').appendChild(tableData);
	var countriesWithFields = countries.map(function (x) {
		return {
			name: x.name,
			population: x.population,
			area: x.area,
			flag: x.flag
		}
	});
	var tbody = document.getElementById('countries');
	for (var i = 0; i < countriesWithFields.length; i++) {
		var tr = document.createElement('tr');
		for (var key in countriesWithFields[i]) {
			var td = document.createElement('td');
			if (key === 'flag') {
				var img = document.createElement('img');
				img.src = countriesWithFields[i][key];
				img.style.width = '50px';

				var a = document.createElement('a');
				a.href = countriesWithFields[i][key];
				a.target = '_blank';
				a.appendChild(img);

				td.appendChild(a);
				tr.appendChild(td);
			}
			else {
				td.innerText = countriesWithFields[i][key];
				tr.appendChild(td);
			}
		}
		tbody.appendChild(tr);
	}
}
