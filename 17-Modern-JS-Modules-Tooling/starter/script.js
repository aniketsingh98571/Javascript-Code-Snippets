import {addToCart,totalPrice as Price,totalQuantity} from './shoppingCart.js' //aliasing totalPrice as Price   //named imports
import application from './shoppingCart.js'  //default import

//If we have not used any bundler then we need to import packages like this
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js"

//If we are using any module bundler like webpack or parcel, we import package like this
import cloneDeep from "lodash-es"
import * as ShoppingCart from './shoppingCart.js' //importing everything that are exported in shopping cart
console.log("importing module")
addToCart("Mobile",5)
console.log(Price,totalQuantity,application)