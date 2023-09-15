'use strict';

// prettier-ignore


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// We use "_" in some function name which denotes, that function is private and can be accessible only by the class since JS doesnt have access modifiers till now
class Workout{
    date=new Date();
    id = (Date.now()+'').slice(-10);
    constructor(coords,distance,duration){
        this.coords=coords;
        this.distance=distance; //in km
        this.duration=duration  // in min
    }
    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}
class Running extends Workout{
    type="running"
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration)
        this.cadence=cadence
        this.calcPace()
        this._setDescription()
    }
    calcPace(){
        //min/km
        this.pace=this.duration/this.distance
        return this.pace
    }
}
class Cycling extends Workout{
    type="cycling"
    constructor(coords,distance,duration,elevation){
         super(coords,distance,duration)
         this.elevation=elevation
         this.calcSpeed()
         this._setDescription()
    }
    calcSpeed(){
        //km/hr
        this.speed=this.distance/(this.duration/60)
        return this.speed
    }
}


//Application Architecture
class App{
    #map;
    #mapEvent;
    #workouts=[]
    constructor(){
        this._getPosition()
        form.addEventListener('submit',this._newWorkout.bind(this))
        inputType.addEventListener('change',this._toggleElevationField)
        containerWorkouts.addEventListener('click',this._moveToPopup)
    }
    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){
                alert("could not fetch location")
                return;
            })
            }
    }
    _loadMap(position){
        const {latitude,longitude}=position.coords
        console.log(latitude,longitude)
        const coords=[latitude,longitude]
        this.#map = L.map('map').setView(coords, 15);
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    
       //handling clicks on map
        this.#map.on('click',this._showForm.bind(this))
        }

        _showForm(mapE){
            this.#mapEvent=mapE
            form.classList.remove('hidden')
            inputDistance.focus()
        }
        _hideForm(){
            inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value=''
            form.style.display='none'
            form.classList.add('hidden')
            setTimeout(()=>{
                form.style.display='grid'
            },1000)
        }
        _toggleElevationField(){
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
        }
        _newWorkout(e){
           e.preventDefault()
            const allPositive=(...inputs)=>{
               return inputs.every((inp)=>{
                   return inp>0
                })
            }

            //get data from form
            const type=inputType.value
            const distance = +inputDistance.value;
            const durantion=+inputDuration.value;
            const {lat,lng}=this.#mapEvent.latlng
           let workout;
           //check if data is valid
            const validInput=(...inputs)=>{
               return inputs.every((inp)=>{
                   return Number.isFinite(inp)
                })
               }

            //if workout is running, create running object
            if(type==='running'){
                const cadence=+inputCadence.value
                if(!validInput(distance,durantion,cadence)|| !allPositive(distance,durantion,cadence)) {
                    return alert('Input have to be positive numbers')
                }
                 workout = new Running([lat,lng],distance,durantion,cadence)
               
            }

            //if workout is cycling, create cycling object
             if(type==='cycling'){
                const elevation=+inputElevation.value
                if(!validInput(distance,durantion,elevation)) {
                    return alert('Input have to be positive numbers')
                }
                workout = new Cycling([lat,lng],distance,durantion,elevation)
             }
             
            
             //add new object to workout array
             this.#workouts.push(workout)
             this._renderWorkout(workout)
            

            //render workout on map as marker
            const newCoords=[lat,lng]
            L.marker(newCoords).addTo(this.#map)
            .bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:false,closeOnClick:false,className:`${type}-popup`}))
            .setPopupContent(`${workout.type==="running"?'🏃‍♂️':'🦶🏼'} ${workout.description}`)
            .openPopup();

            //render workout on list
             console.log(this.#workouts)

             //hide form + clear input fields
             this._hideForm()
       
         }
         _renderWorkout(workout){
            let html = `
                <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                <span class="workout__icon">${workout.type==="running"?'🏃‍♂️':'🦶🏼'}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
                </div>
                 `
            if(workout.type==='running'){
            html+=`
                <div class="workout__details">
                  <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            `
            }
            if(workout.type==='cycling'){
                html+=`
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevation}</span>
                <span class="workout__unit">m</span>
              </div>
                
                `
            }
            form.insertAdjacentHTML('afterend',html)
         }
         _moveToPopup(e){
            const workOutEl=e.target.closest()
         }
}
const app=new App()
