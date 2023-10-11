const recipeContainer = document.querySelector('.recipe');
import icons from 'url:../img/icons.svg'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
if(module.hot){
  module.hot.accept()
}


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
const controlSearchResults=async function(){
  try{
  const query=searchView.getQuery()
   if(!query) return;
   resultsView.renderSpinner()
   searchView.clearInput()
   await model.loadSearchResults(query)
   console.log(model.state.search.results)
   resultsView.render(model.getSearchResultsPage())
    paginationView.render(model.state.search)
  }
  catch(err){
    console.log(err)
  }
}
const controlPagination = function(page){
  console.log("page contr",page)
  resultsView.render(model.getSearchResultsPage(page))
  paginationView.render(model.state.search)
}
controlSearchResults()
const init=function(){
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()
