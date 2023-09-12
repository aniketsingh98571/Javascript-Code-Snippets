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


//ES6 Classes

//Class Declaration
class PersonCl{
    constructor(firstName,birthYear){
        this.firstName=firstName,
        this.birthYear=birthYear
    }
    calcAge(){
        console.log(2037-this.birthYear)
    }
    greet(){
        console.log(`hey ${this.firstName}`)
    }

    //getter in classes
    get age(){
        console.log(`your age is ${this.birthYear}`)
    }
    set firstName(name){
        if(name.includes(' ')) this._fullName=name
    }
}
const aniket2=new PersonCl("aniket",2001)
const aniket3=new PersonCl("aniket singh",2001)
console.log(aniket3)
console.log(aniket2)
console.log(PersonCl.prototype)
aniket2.calcAge()
aniket2.greet()
aniket2.age
//class Expression
const PersonClI=class{}

//Getters and Setters in object

//Getter
const account = {
    owner:'Aniket',
    movement:[200,530,120,300],
    get latest(){
        return this.movement[this.movement.length-1]
    }
}
console.log(account.latest)

//Setter
const account1={
    owner:"Aniket",
    movement:[200,530,120,300],
    set latest(mov){
        this.movement.push(mov)
    }
}
account1.latest=50
console.log(account1.movement)

//static vs instance methods
class House{
    //Instance Methods
    constructor(room,people){
        this.room=room,
        this.people=people
    }
    get numberPeople(){
        return this.people
    }
    calcPrice(){
        return this.people*this.room
    }

    //Static Method
    static privateFunction(){
        return  `this is personal to House only`
    }
}
const customerOne=new House(2,3)
console.log(customerOne.calcPrice)
console.log(customerOne)
console.log(House.prototype)

//Object.create()
const PersonProto={
    calcAge(){
        console.log(2021-this.birthYear)
    },
    init(firstName,birthYear){
        this.firstName=firstName,
        this.birthYear=birthYear
    }
}
const steven=Object.create(PersonProto)
console.log(steven)
steven.name="Steven"
steven.city='mumbai'
const sarah=Object.create(PersonProto)
sarah.init('sarah',2005)

//Coding Challenge 2
class CarProto{
    constructor(make,speed){
        this.make=make,
        this.speed=speed
    }
    accelerate(){
        this.speed=10;
        console.log("going at ", this.speed)
    }
    brake(){
        this.speed=5
    }
    get speedUs(){
        return this.speed/1.6
    }
    set speedUs(speed){
        this.speed=speed*1.6
    }
}

//Inheritance in JS using constructor function
const Student=function(firstName,birthYear,course){
    Person.call(this,firstName,birthYear)
    this.course=course
}

//link the prototypes of Student and Person
Student.prototype=Object.create(Person.prototype)
Student.prototype.introduce=function(){
    console.log(`this is ${this.firstName}, I study ${this.course}`)
}
const mike=new Student('mike',2020,'CSE')
mike.introduce()
mike.calcAge()
Student.prototype.constructor=Student

//Coding Challenge 3
const EV=function(make,speed,battery){
    Car.call(this,make,speed)
    this.battery=battery
}
EV.prototype=Object.create(Car.prototype)
EV.prototype.chargeTo=function(charge){
    this.charge=charge
}
const bmw=new EV('bmw',2000,200)
console.log(bmw)
bmw.chargeTo(200)

//overriding parent class function with new one [Polymorphism]
EV.prototype.accelerate=function(){
    this.speed+20
    this.charge-1
}