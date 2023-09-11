'use strict';
const objectTemp={
    city:'Madrid',
    greet(){
        console.log(`this is ${this.city}`)
    }
}
console.log(Object.getPrototypeOf(objectTemp))
console.log(objectTemp)

//Arrays also have a prototype object, which we can use to access inbuilt methods like map, filter etc
const a=[1,2,3]

//constructor function
const Person=function(firstName,birthYear){
    this.firstName=firstName
    this.birthYear=birthYear

    //never create method inside of a constructor function,cz it will be createed for every object instantiation
    // this.calcAge=function(){
    //     console.log(this.birthYear*2)
    // }
}
//prototypes
Person.prototype.calcAge=function(){
    console.log(this.birthYear*2)
}
const personOne=new Person("Aniket",2001)

personOne.calcAge()
console.log(personOne instanceof Person)

//prototype of personOne
console.log(personOne.__proto__)
console.log(Person.prototype===personOne.__proto__)

//we can create properties also as the prototype
Person.prototype.city='nashik'
console.log(personOne)
console.log(personOne.hasOwnProperty('firstName'))
console.log(personOne.hasOwnProperty('city')) //this will be false because city is part of Person prototype
console.log(personOne.__proto__)
console.log(personOne.__proto__.__proto__)
console.log(personOne.__proto__.__proto__.__proto__)

//prototypes of array
const arr2=[1,2,3,2,4,6,5,1]
console.log(arr2.__proto__)
console.log(arr2.__proto__.__proto__)
console.log(arr2.__proto__===Array.prototype)

//adding a new method to the prototype object of array
Array.prototype.unique=function(){
    return [...new Set(this)]
}
console.log(arr2.unique())

//Coding Challenge.
const Car= function(make,speed){
    this.make=make
    this.speed=speed
}
Car.prototype.accelerate=function(){
    return this.speed+10
}
Car.prototype.brake=function(){
    return this.speed-5
}
console.log(Car.prototype)
const carOne=new Car("BMW",120)
const carTwo=new Car("Audi",130)
console.log(carOne)
console.log(carOne.accelerate())
console.log(carOne.brake())



