console.log("Exporting module")
const shippingCost=10;
const cart=[];

//named exports
export const addToCart=function(product,quantity){
    cart.push(`${product} pushed to cart`)
}
const totalPrice=237;
const totalQuantity=23;
export {totalPrice,totalQuantity}  //named exports

const application=28
export  default  application; //default export

// export default const add=()=>{
//     console.log("added")
// }

//Top level await
const res=await fetch('https://jsonplaceholder.typicode.com/posts')
const data=await res.json()
console.log(data)

const getLastPost=async function(){
const res=await fetch('https://jsonplaceholder.typicode.com/posts')
const data=await res.json()
console.log(data)
return {title:data.at(-1).title,text:data.at(-1).body}
}
const lastPost= getLastPost()
console.log(lastPost)
lastPost.then((data)=>{
    console.log(data)
})
