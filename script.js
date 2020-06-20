const urlAll = "https://api.coingecko.com/api/v3/coins";
const selectedCrypto = [];

const createCards = (url) => {
        $.get(url).then(function(data){
            // console.log(data);
            // return data.map(x => {name: x.name});
            let coinsData = data.map(x => ({symbol:x.symbol.toUpperCase(), name: x.name, usdPrice: x.market_data.current_price.usd, euroPrice: x.market_data.current_price.eur, ilsPrice: x.market_data.current_price.ils, image: x.image.small, id: x.id}));
            console.log(coinsData);
            for(let i = 0; i < 3; i++){
                // debugger
                for(let j = i; j < coinsData.length; j+=3){
                    coinsData[j].indx= j;
                    // debugger
                    $(`#column${i}`).append(`
                        <div class="card" id=c${j}>
                            <div class="card-body">
                                <!-- toggle switch -->

                                <div 
                                class="custom-control custom-switch incard" id="incard${j}">
                                    <input type="checkbox" class="custom-control-input" id="switch${j}">
                                    <label class="custom-control-label" for="switch${j}" id="label${j}"></label>
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
                            //   1. getitem : let = window.localStorage.getItem('')  
                            let storedCoinsJson = window.localStorage.getItem('storedCoinsData');
                            // 2. variable = JSON.parse() 
                            let storedCoinsArr = []; 
                            if(storedCoinsJson){
                                // debugger
                                storedCoinsArr = JSON.parse(storedCoinsJson);
                                let index = storedCoinsArr.findIndex(a => a.name == coinsData[j].name.toLowerCase())
                                // debugger
                                if(index > -1){
                                    if(Date.now() - storedCoinsArr[index].time >= 120000){
                                        alert('needs a new get request')
                                        let url2 = `https://api.coingecko.com/api/v3/coins/${storedCoinsArr[index].id.toLowerCase()}`
                                        $.get(url2).then(function(coin){
                                            // debugger
                                            let d = new Date();
                                            let n = d.getTime();
                                            // console.log(coin);
                                            let coinDataObj = {
                                                name: coin.name.toLowerCase(),
                                                id: coin.id.toLowerCase(),
                                                usdPrice: coin.market_data.current_price.usd,
                                                euroPrice: coin.market_data.current_price.eur,
                                                ilsPrice: coin.market_data.current_price.ils,
                                                image: coin.image.small,
                                                time: n,
                                            };
                                            // 3. arr.push(objet)
                                            // storedCoinsArr.push(coinDataObj);
                                            storedCoinsArr.splice(index, 1, coinDataObj)
                                            // 4. JSON.stringify(arr)
                                            let strCoinsList = JSON.stringify(storedCoinsArr); 
                                            // 5.setitem  window.localStorage.setItem('c');
                                                window.localStorage.setItem('storedCoinsData', strCoinsList);
                                            // end of local storage part
                                            // debugger

                                            $(`#loader${j}`).remove();
                                            $(`#collapse${j}`).append(`
                                            <div id="loadedCoinData${j}" >
                                                <br>
                                                <img src="${coinDataObj.image}" class="img-thumbnail" style="width:3rem; height:3rem;"> 
                                                <p>USD: ${coinDataObj.usdPrice}$</p>
                                                <p>EURO: ${coinDataObj.euroPrice}€</p>
                                                <p>NIS: ${coinDataObj.ilsPrice}₪</p>
                                            </div>
                                             `);
                                         });
                                    }else{
                                    alert('previous data is still relevant')
                                        // debugger
                                        $(`#loader${j}`).remove();
                                        // debugger
                                        $(`#collapse${j}`).append(`
                                            <div id="loadedCoinData${j}" >
                                                <br>
                                                <img src="${storedCoinsArr[index].image}" class="img-thumbnail" style="width:3rem; height:3rem;"> 
                                                <p>USD: ${storedCoinsArr[index].usdPrice}$</p>
                                                <p>EURO: ${storedCoinsArr[index].euroPrice}€</p>
                                                <p>NIS: ${storedCoinsArr[index].ilsPrice}₪</p>
                                            </div>
                                        `);
                                    }   
                                // debugger
                            }else{
                                    alert('new coin!')
                                    // debugger
                                    let url2 = `https://api.coingecko.com/api/v3/coins/${coinsData[j].id } `
                                    $.get(url2).then(function(coin){
                                        // debugger
                                        let d = new Date();
                                        let n = d.getTime();
                                        // console.log(coin);
                                        let coinDataObj = {
                                            name: coin.name.toLowerCase(),
                                            id: coin.id.toLowerCase(),
                                            usdPrice: coin.market_data.current_price.usd,
                                            euroPrice: coin.market_data.current_price.eur,
                                            ilsPrice: coin.market_data.current_price.ils,
                                            image: coin.image.small,
                                            time: n,
                                        };
                                            // 3. arr.push(objet)
                                            storedCoinsArr.push(coinDataObj);
                                            // 4. JSON.stringify(arr)
                                            let strCoinsList = JSON.stringify(storedCoinsArr); 
                                            // 5.setitem  window.localStorage.setItem('c');
                                                window.localStorage.setItem('storedCoinsData', strCoinsList);
                                            // end of local storage part
                                            // debugger

                                            $(`#loader${j}`).remove();
                                            $(`#collapse${j}`).append(`
                                            <div id="loadedCoinData${j}" >
                                                <br>
                                                <img src="${coinDataObj.image}" class="img-thumbnail" style="width:3rem; height:3rem;"> 
                                                <p>USD: ${coinDataObj.usdPrice}$</p>
                                                <p>EURO: ${coinDataObj.euroPrice}€</p>
                                                <p>NIS: ${coinDataObj.ilsPrice}₪</p>
                                            </div>
                                        `);
                                    });
                                }
                            }else{
                                alert('new coin!')
                                // debugger
                                let url2 = `https://api.coingecko.com/api/v3/coins/${coinsData[j].id } `
                                $.get(url2).then(function(coin){
                                    // debugger
                                    let d = new Date();
                                    let n = d.getTime();
                                    // console.log(coin);
                                    let coinDataObj = {
                                        name: coin.name.toLowerCase(),
                                        id: coin.id.toLowerCase(),
                                        usdPrice: coin.market_data.current_price.usd,
                                        euroPrice: coin.market_data.current_price.eur,
                                        ilsPrice: coin.market_data.current_price.ils,
                                        image: coin.image.small,
                                        time: n,
                                    };
                                        // 3. arr.push(objet)
                                        storedCoinsArr.push(coinDataObj);
                                        // 4. JSON.stringify(arr)
                                        let strCoinsList = JSON.stringify(storedCoinsArr); 
                                        // 5.setitem  window.localStorage.setItem('c');
                                            window.localStorage.setItem('storedCoinsData', strCoinsList);
                                        // end of local storage part
                                        // debugger

                                        $(`#loader${j}`).remove();
                                        $(`#collapse${j}`).append(`
                                        <div id="loadedCoinData${j}" >
                                            <br>
                                            <img src="${coinDataObj.image}" class="img-thumbnail" style="width:3rem; height:3rem;"> 
                                            <p>USD: ${coinDataObj.usdPrice}$</p>
                                            <p>EURO: ${coinDataObj.euroPrice}€</p>
                                            <p>NIS: ${coinDataObj.ilsPrice}₪</p>
                                        </div>
                                    `);
                                });
                            }

                            });
                    $(`#collapse${j}`).on("hidden.bs.collapse", function(){
                        $(`#loadedCoinData${j}`).remove();
                        $(`#collapse${j}`).append(`
                        <div class="lds-ring" id="loader${j}"><div></div><div></div><div></div><div></div></div>
                        `)
                        // debugger
                    });
                    // function for choosing keys and drawing modal:
                    $(`#switch${j}`).change( function(){ //
                        if(this.checked){
                            // alert(`aaa ${j}`)
                            if(selectedCrypto.length < 5){
                                selectedCrypto.push(coinsData[j])
                                // debugger
                            }else{
                                $(`#switch${j}`).prop('checked', false);
                                //MODAL
                                // alert('modal')
                                drawModalContent(coinsData[j])
                                $('#exampleModalCenter').modal('show')
                                handleUpToFive(coinsData[j])
                            }
                    }else{
                        let index = selectedCrypto.findIndex(a => a.name == coinsData[j].name)
                        if(index > -1){
                            selectedCrypto.splice(index, 1)
                        }
                    // debugger
                    }
                    });

             }
            }
            $("#search").keyup(function() {
                //clear 
                console.log(getFilteredCoins(coinsData))
                // $(`#x`).hide();
                // $(`#column1`).empty();
                // $(`#column2`).empty();
                
                let value = $(this).val().toLowerCase();
                $('.card').filter(function(){
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                })
                // if($(`#column1`).children().length() > 1){ alert('check')}
                // alert('the search filter is not done yet')
                // debugger
            })
        });
    }
    
createCards(urlAll)

function getFilteredCoins(coins) {
	return coins.filter(function(coin) {
		return coin.name.toLowerCase().startsWith($("#search").val());
	});
}

const drawModalContent = (sixth) => {
    // debugger
    // $(".modal-body").empty()   
    for(let i = 0; i < selectedCrypto.length; i++){
        let u = i+100;
        $('#modalBodyFirst').append(`
            <div class="custom-control custom-switch modalSwitch">
                <input type="checkbox" class="custom-control-input" id="switch${u}" checked>
                <label class="custom-control-label" for="switch${u}"></label>
            </div>   
            <h5 class="modalH5" id="symbol${u}">${selectedCrypto[i].symbol}</h5>
        `)    
    }
    $('#modalBodySecond').append(`
    <div class="custom-control custom-switch modalSwitch" id="sixSwitchDiv">
        <input type="checkbox" class="custom-control-input" id="switch${105}">
        <label class="custom-control-label" for="switch${105}"></label>
    </div>   
    <h5 class="modalH5" id="sixSymbol"><mark>${sixth.symbol}</mark></h5>
    `) 
    
}

const handleUpToFive = (sixth) =>{
    //count how many are checkd
    let counter = 5;
    // let status = {}
    // let key = i;
    for(let i = 100; i < 106; i++){
     $(`#switch${i}`).change( function(){
            if(this.checked){
            counter++
            // alert(counter)
            }else{
                counter--;
                // alert(counter)
            }
            if(counter > 5){
                // disable #saveChengesBtn
                $(`#saveChengesBtn`).prop('disabled', true);
                //tooltip that says - "dispose one coin"
                //don't forget
                }else{
                    $(`#saveChengesBtn`).prop('disabled', false);
                }
     });
    }
    // if 6 then inable button of save changes
    // button save changes will aply the change on all the coins
    $(`#saveChengesBtn`).click(function(){
        let temp = [];
        for(let i = 100; i < 106; i++){
            let u = i-100;
            // debugger
            let index = selectedCrypto.findIndex(a => a.symbol == $(`#symbol${i}`).text())
            if($(`#switch${i}`).prop("checked")){
                // alert('checked')
                // debugger
                // debugger
                if(index > -1){
                    temp.push(selectedCrypto[index])
                // debugger
                }else{
                    temp.push(sixth)
                    // debugger
                    $(`#switch${sixth.indx}`).prop('checked', true); //find the real num
                }
                }else{
                    // let n = ;
                    // debugger
                    let index = selectedCrypto.findIndex(a => a.symbol == $(`#symbol${i}`).text())
                    let indx = selectedCrypto[index].index; 
                    $(`#switch${indx}`).prop('checked', false);
                    // selectedCrypto
                    // debugger
                }
            }
            selectedCrypto.length = 0;
            // debugger
            for(let x = 0; x < temp.length; x++){
                selectedCrypto.push(temp[x])
            }
            // debugger
        $('#exampleModalCenter').modal('hide')
        
    });
    $('#exampleModalCenter').on('hidden.bs.modal', function (e) {
        $('#modalBodyFirst').empty()
        $('#modalBodySecond').empty()
    })
}



// filtering includes clear and creating a new arry and making cards out of it
// const userCoinExists = (coinName, array) => {
//     return array.some(function(el) {
//       return el.username === username;
//     }); 
//   }
