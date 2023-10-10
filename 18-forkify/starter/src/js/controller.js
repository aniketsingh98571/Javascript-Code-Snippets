const recipeContainer = document.querySelector('.recipe');
import icons from 'url:../img/icons.svg'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js';
console.log(icons)


//demo recipe - http://localhost:1234/#5ed6604591c37cdc054bc886
const controlRecipe=async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return
    recipeView.renderSpinner(recipeContainer)
    await model.loadRecipe(id)
    console.log("loaded")
    const {recipe}=model.state

    //rendering data
    recipeView.render(model.state.recipe)
}
  catch(err){
    // alert(err)
    recipeView.renderError()
  }
}
const init=function(){
  recipeView.addHandlerRender(controlRecipe)
}
init()
