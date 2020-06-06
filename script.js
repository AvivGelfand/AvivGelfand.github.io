const urlAll = "https://api.coingecko.com/api/v3/coins";





const createCards = (url) => {
        $.get(url).then(function(data){
            console.log(data);
            // return data.map(x => {name: x.name});
            let coinsData = data.map(x => ({symbol:x.symbol.toUpperCase(), name: x.name, usdPrice: x.market_data.current_price.usd, euroPrice: x.market_data.current_price.eur, ilsPrice: x.market_data.current_price.ils, image: x.image.small}));
            console.log(coinsData);
            for(let i = 0; i < 3; i++){
                // debugger
                for(let j = i; j < coinsData.length; j+=3){
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
                            <div class="lds-ring" id="loader${j}"><div></div><div></div><div></div><div></div></div>
                            </div>
                            </div>
                        </div>
                        `);
                   
                        $(`#btn${j}` ).click(function() {
                            
                            // if its in the local storage, and if it the time that passed is less then 2 minutes it will presnt the info from local storage
                        //   1. getitem : var = window.localStorage.getItem('') 
                        // var storedCoinsJson = window.localStorage.getItem('tasks');
                        // // 2. variable = JSON.parse() 
                        // var tasks = []; 
                        // if(tasksJson){
                        //     tasks = JSON.parse(tasksJson);
                        //     for (var i = 0; i < tasks.length; i++){
                        //         createNote(tasks[i]);
                        //     }
                        //     counter = tasks.length;
                        // } else {
                        //     var counter = 0;
                        // };

                        // // btn.addEventListener('click', function(e){
                            //   1. getitem : var = window.localStorage.getItem('')  
                            let storedCoinsJson = window.localStorage.getItem('storedCoinsData');
                            // 2. variable = JSON.parse() 
                            let storedCoinsList = []; 
                            if(storedCoinsJson){
                                storedCoinsList = JSON.parse(storedCoinsJson);
                                // debugger
                            };
                        //     // 3. arr.push(objet) here is where i stoped!!!!!!!!!!
                            // var obj = {key1: "value1", key2: "value2"};
                            let DataRequest = {
                                name: coinsData[j].name,
                                time: 'a time'
                        //         index: counter,
                        //         done: false
                            };
                            storedCoinsList.push(DataRequest);
                        //     // 4. JSON.stringify(arr)
                            let strCoinsList = JSON.stringify(storedCoinsList); 
                        //     // 5.setitem  window.localStorage.setItem('c');
                            window.localStorage.setItem('storedCoinsData', strCoinsList);
                            // end of local storage part

                            let url2 = `https://api.coingecko.com/api/v3/coins/${coinsData[j].name.replace(' ','-').toLowerCase()}`
                            $.get(url2).then(function(coin){
                                console.log(coin);
                                let coinData = {
                                    usdPrice: coin.market_data.current_price.usd,
                                    euroPrice: coin.market_data.current_price.eur,
                                    ilsPrice: coin.market_data.current_price.ils,
                                    image: coin.image.small
                                };
                                $(`#loader${j}`).remove();
                                // console.log(singleCoinData);
                                $(`#collapse${j}`).append(`
                                    <br>
                                    <img src="${coinData.image}" class="img-thumbnail" style="width:3rem; height:3rem;"> 
                                    <p>price by USD: ${coinData.usdPrice}$</p>
                                    <p>price by EURO: ${coinData.euroPrice}€</p>
                                    <p>price by NIS: ${coinData.ilsPrice}₪</p>
                                `);
                            });
                          });
                    }}
                   
    });
    }

    
createCards(urlAll)

// filtering includes clear and creating a new arry and making cards out of it
   