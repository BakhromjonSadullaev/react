import React, { useState, useEffect } from 'react';
import Recipe from "./recipe";
import './App.css';

const App = () => {

  const APP_ID = '0c529b7e';
  const APP_KEY = 'de513d29dfeeadb1bce898e0245dda91'
  
  const[recipes, setrecipes] = useState([]);
  const[search,setsearch] = useState("");
  const[query,setquery] =useState("chicken")

  useEffect(()=>{
    getRecipes();
  },[query]);


  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setrecipes(data.hits);
    console.log(data.hits)
  }

  const updateSearch = e =>{
    setsearch(e.target.value);
  };

  const getSearch = e =>{
    e.preventDefault();
    setquery(search);
    setsearch("");
  };
  


  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(<Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>))}
      </div>
    </div>
  );

  
};


export default App;
