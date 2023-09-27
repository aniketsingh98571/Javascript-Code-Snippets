'use strict';
const imgPathOne='./img/img-1.jpg'
const imgPathTwo='./img/img-2.jpg'
const imgPathThree='./img/img-3.jpg'
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

//fetch api
const data=fetch("https://restcountries.com/v3.1/name/India")
// console.log(data)

//promises and promise chaining
const getCountryData=function(country){
    const data=fetch(`https://restcountries.com/v3.1/name/${country}`)
    data.then((response)=>response.json()).then((res)=>{
        const data=res[0]?.borders[0]
        return fetch(`https://restcountries.com/v3.1/alpha/${data}`)  //returns another promise
      }).then((response)=>response.json()).then((res)=>console.log(res))
}
getCountryData("Portugal")

//handling error
const data1=fetch(`https://restcountries.com/v3.1/name/India`)
data.then((response)=>response.json()).then((res)=>{console.log(res)}).catch((err)=>console.log(err))


//Coding Challenge
const whereAmI=function(lat,long){
    const geocodingResult=geoCoding(lat,long)
    geocodingResult.then((data)=>{
        console.log(data)
        console.log(`You are in ${data.city}`)
        const data1=fetch(`https://restcountries.com/v3.1/name/${data.country}`)
        return data1
    
    }).then((response)=>response.json()).then((res)=>{
        if(res.status===404){
            throw new Error(" Could not find country") //using Error object to throw error which will be catched by '.catch()' method
        }
    })
    .catch((err)=>console.log(err))
}
const geoCoding=function(lat,long){
    const result=fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    return result.then((response)=>response.json()).then((res)=>res) //returns another promise.
}
whereAmI(19.997454,73.789803)

//Creating a promise
const lotteryPromise=new Promise(function(resolve,reject){
    if(Math.random()>=0.5){
        resolve('You WIN!')
    }
    else {
        reject("You LOSE!")
    }
})
lotteryPromise.then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})

//Promisifying setTimeout
const wait=function(seconds){
    return new Promise(function(resolve){
        setTimeout(()=>resolve(),seconds*1000)
    })
}
wait(2).then(()=>{
    console.log("I ran after 2 secs")
})

//promisifying geolocation web api
const getPosition=function(){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition((position)=>{
            resolve(position)
        },(err)=>{
            reject(err)
        })
    })
}
getPosition().then((data)=>{
    console.log(data)
})

//Coding Challenge 2
const createImage=(path)=>{
    return new Promise((resolve,reject)=>{
        const imgEle=document.createElement('img')
        imgEle.src=path
        imgEle.addEventListener('load',function(){
            // imgEle.classList.add(`class`)
             resolve(imgEle)
        })
    })
}
const showImage=(data)=>{
  document.body.appendChild(data)
}
let currImage;
const arr=[imgPathOne,imgPathTwo,imgPathThree]
let index=0
createImage(imgPathOne).then((data)=>{
    currImage=data
    showImage(data)
    return wait(2)
}).then(()=>{
    currImage.style.display="none"
    return createImage(imgPathTwo)
}).then((img)=>{
    currImage=img
    showImage(img)
    return wait(2)
}).then(()=>{
    currImage.style.display="none"
})

//async/await
const findCountry=async function(country){
    const data1=await fetch(`https://restcountries.com/v3.1/name/${country}`)
    const tempData=await data1.json()
    console.log(tempData)
}
const find=findCountry("India")
console.log(find)

//try & catch with async/await
const catchDemo=async()=>{
    try{
        const data1=await fetch(`https://restcountries.com/v3.1/name/${country}`)
    const tempData=await data1.json()
    console.log(tempData)
    }catch(err){
        console.log(err)
    }
}
catchDemo()

//Returning the data in async/await
const returnDemo=async()=>{
    try{
        const data=await fetch(`https://restcountries.com/v3.1/name/India`)
        const tempData=await data.json()
        return tempData
     }
     catch(err){
        throw err
     }
}
const tempData=returnDemo()
console.log(tempData)
const get3Countries=async()=>{
    try{
        const dataOne=await fetch(`https://restcountries.com/v3.1/name/America`)
        const dataTwo=await fetch(`https://restcountries.com/v3.1/name/Japan`)
        const dataThree=await fetch(`https://restcountries.com/v3.1/name/Canada`)
        const tempDataOne=await dataOne.json()
        const tempDataTwp=await dataTwo.json()
        const tempDataThree=await dataThree.json()
        console.log(tempDataOne," ",tempDataTwp,"  ",tempDataThree)
    }
    catch(err){
        throw err
    }
}
get3Countries()

//Parallel Requests
const getAnotherCountries=async()=>{
    try{
        const data=await Promise.all([ fetch(`https://restcountries.com/v3.1/name/Portugal`), fetch(`https://restcountries.com/v3.1/name/Ukraine`),fetch(`https://restcountries.com/v3.1/name/Russia`)])
        console.log(data)
    }
    catch(err){
        throw err
    }
}
getAnotherCountries()
const getSomeMoreCounties=async()=>{
    const dataOne=fetch(`https://restcountries.com/v3.1/name/America`)
    const dataTwo=fetch(`https://restcountries.com/v3.1/name/Japan`)
    const dataThree=fetch(`https://restcountries.com/v3.1/name/Canada`)
    const tempData=await Promise.all([dataOne,dataTwo,dataThree])
    console.log(tempData)
}
getSomeMoreCounties()

//Coding Challenge 3
 