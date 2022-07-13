//Example 1
//assigning a function to a variable
const foo=function(){
    console.log("Foobar")
}
//calling the function with a variable
foo()


//Example 2
function SayHello(){
    return "Hello";
}
function greeting(hellomessage,name){
    //calling the "SayHello" function
    console.log(hellomessage()+" "+name)
}


//In this we are calling the greeting function with passing the "SayHello" function and a string as a parameter to greeting function
greeting(SayHello,"Aniket")

//Example 3
//returning a function inside another function
const SayHello2=()=>{
    return function(){
        console.log("Hello")
    }
}

//assigning the return value of "SayHello2" function which is a function itself
const greeting2=SayHello2();

//calling the return function of "SayHello2".
greeting2()