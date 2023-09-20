'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function renderCountry(data){
    const html=`
    <article class="country">
          <img class="country__img" src="${data[0].flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data[0].name.common}</h3>
            <h4 class="country__region">${data[0].region}</h4>
            <p class="country__row"><span>👫</span>${data[0].population.toFixed(3)}</p>
            <p class="country__row"><span>🗣️</span>${data[0].languages.hin}</p>
            <p class="country__row"><span>💰</span>${data[0].currencies}</p>
          </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('beforebegin',html)
    countriesContainer.style.opacity=1
}
function countries(coutry){
    const request=new XMLHttpRequest();
    request.open('GET',`https://restcountries.com/v3.1/name/${coutry}`)
    request.send()
    request.addEventListener('load',function(){
        // console.log(this.responseText)
        const data=JSON.parse(this.responseText)
        console.log(data)
        //parent country render
        renderCountry(data)

        //neighbour contry data from parent country
        // console.log(data.borders)
        const neighbour=data[0]?.borders[0];
        // renderCountry(neighbour[0])
        if(!neighbour) return
        else {
            const request2=new XMLHttpRequest();
            request2.open('GET',`https://restcountries.com/v3.1/alpha/${neighbour}`)
            request2.send()
            request2.addEventListener('load',function(){
                const data=JSON.parse(this.responseText)
                console.log(data)
                renderCountry(data)
            })
        }
    
    })
}
countries("Portugal")
// countries("Germany")