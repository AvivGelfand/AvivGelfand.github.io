const url = "https://api.coingecko.com/api/v3/coins";




const fetchCoinsData = (url) => {
        $.get(url).then(function(data){
            console.log(data);
            // return data.map(x => {name: x.name});
            let f = data.map(x => ({name: x.name, usdPrice: x.market_data.current_price.usd, euroPrice: x.market_data.current_price.eur, ilsPrice: x.market_data.current_price.ils, image: x.image.small}));
            console.log(f);
    });
    }

fetchCoinsData(url).then(function(data){
    $('body').append('<div id="container"></div>');
})