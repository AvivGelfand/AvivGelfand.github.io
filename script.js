const urlAll = "https://api.coingecko.com/api/v3/coins";





const createCards = (url) => {
        $.get(url).then(function(data){
            console.log(data);
            // return data.map(x => {name: x.name});
            let coinsData = data.map(x => ({symbol:x.symbol.toUpperCase(), name: x.name, usdPrice: x.market_data.current_price.usd, euroPrice: x.market_data.current_price.eur, ilsPrice: x.market_data.current_price.ils, image: x.image.small}));
            console.log(coinsData);
            for(let i = 0; i < 3; i++){
                // debugger
                for(let j = i ; j<coinsData.length; j+=3){
                    $(`#column${i}`).append(`
                        <div class="card" id=c${j}>
                            <div class="card-body">
                            <!-- toggle switch -->
                            <div class="custom-control custom-switch" >
                            <input type="checkbox" class="custom-control-input" id="switch${j}">
                            <label class="custom-control-label" for="switch${j}"></label>
                            </div>
                            <h5 class="card-title">${coinsData[j].symbol}</h5>
                            <p class="card-text">${coinsData[j].name}</p>
                            <button class="btn btn-primary" id="btn${j}" data-toggle="collapse" href="#collapse${j}" role="button" aria-expanded="false" aria-controls="collapse${j}">More Info</button>
                            <div class="collapse" id="collapse${j}">
                            <br>
                                <img src="${coinsData[j].image}" class="img-thumbnail" style="width:3rem; height:3rem;"> 
                                <p>price by USD: ...$</p>
                                <p>price by EURO: ...€</p>
                                <p>price by NIS: ...₪</p>
                            </div>
                            </div>
                        </div>
                        `);
                    }}

    });
    }
    createCards(urlAll)

    $( "btn btn-primary" ).click(function(x) {
        alert( "Handler for .click() called." );
      });
      