import {addToCart,totalPrice as Price,totalQuantity} from './shoppingCart.js' //aliasing totalPrice as Price   //named imports
import application from './shoppingCart.js'  //default import
import cloneDeep from "./node_modules/lodash-es/cloneDeep.js"
import * as ShoppingCart from './shoppingCart.js' //importing everything that are exported in shopping cart
console.log("importing module")
addToCart("Mobile",5)
console.log(Price,totalQuantity,application)