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
                                    <div  id="loader${j}">
                                    <br>
                                       <div class="lds-ring" id="loader${j}"><div></div><div></div><div></div><div></div></div>
                                       <br>
                                       <br>
                                       <br>
                                       <br>

                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                        // debugger
                        
                        $(`#collapse${j}`).on("show.bs.collapse", function(){
                                    // if its in the local storage, and if it the time that passed is less then 2 minutes it will presnt the info from local storage
                                    //   1. getitem : var = window.localStorage.getItem('') 
                                    // var storedCoinsJson = window.localStorage.getItem('tasks');
                                    // 2. variable = JSON.parse() 
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
                                                
                                // btn.addEventListener('click', function(e){
                                    //   1. getitem : var = window.localStorage.getItem('')  
                                    let storedCoinsJson = window.localStorage.getItem('storedCoinsData');
                                    // 2. variable = JSON.parse() 
                                    let storedCoinsList = []; 
                                    if(storedCoinsJson){
                                        storedCoinsList = JSON.parse(storedCoinsJson);
                                    };
                                    
                            
                                let url2 = `https://api.coingecko.com/api/v3/coins/${coinsData[j].name.replace(' ','-').toLowerCase()}`
                                $.get(url2, status).then(function(coin){
                                console.log(coin);
                                let coinDataObj = {
                                    name: coin.name.toLowerCase(),
                                    usdPrice: coin.market_data.current_price.usd,
                                    euroPrice: coin.market_data.current_price.eur,
                                    ilsPrice: coin.market_data.current_price.ils,
                                    image: coin.image.small,
                                    time: 'time?',
                                };
                                // debugger

                                // 3. arr.push(objet) here is where i stoped!!!!!!!!!! should it be in get?
                            storedCoinsList.push(coinDataObj);
                            // 4. JSON.stringify(arr)
                            let strCoinsList = JSON.stringify(storedCoinsList); 
                            // 5.setitem  window.localStorage.setItem('c');
                        //     window.localStorage.setItem('storedCoinsData', strCoinsList);
                            // end of local storage part

                                $(`#loader${j}`).remove();
                                // $(`collapse${j}`).empty();
                                // console.log(singleCoinData);
                                $(`#collapse${j}`).append(`
                                    <div id="loadedCoinData${j}" >
                                        <br>
                                        <img src="${coinDataObj.image}" class="img-thumbnail" style="width:3rem; height:3rem;"> 
                                        <p>Price by USD: ${coinDataObj.usdPrice}$</p>
                                        <p>Price by EURO: ${coinDataObj.euroPrice}€</p>
                                        <p>Price by NIS: ${coinDataObj.ilsPrice}₪</p>
                                    </div>
                                `);
                            }).fail(function() {
                                $(`#loader${j}`).remove();
                                $(`#collapse${j}`).append(`
                                <div id="loadedCoinData${j}" >
                                    <br>
                                    <p>Oops, something went wrong with the API...</p>
                                </div>
                            `);
                              });
                          });
                        $(`#collapse${j}`).on("hidden.bs.collapse", function(){
                            $(`#loadedCoinData${j}`).remove();
                            $(`#collapse${j}`).append(`
                            <div class="lds-ring" id="loader${j}"><div></div><div></div><div></div><div></div></div>
                            `)
                        })
                    }
                }
    });
    }
    
createCards(urlAll)
$("#search").keyup(data => {
    alert('the search filter is not done yet')
})

// filtering includes clear and creating a new arry and making cards out of it
   