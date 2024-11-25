'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import RecipeCard from './RecipeCard';

const RecipeGenerator = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
  const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

  const generateRecipe = async () => {
    try {
      const response = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      if (response.data.hits.length > 0) {
        setRecipes(response.data.hits);
      }
    } catch (error) {
      console.error('Failed to fetch recipe', error);
    }
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    document.getElementById('exampleModal').style.display = 'block';
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    document.getElementById('exampleModal').style.display = 'none';
  };

  return (
    <>
    <Navbar />
    <div className='hero text-center p-3'>
      <h3 className='display-6'>Are you hungry & don&apos;t have any idea what to do?</h3>
      <h3 className='display-5'>Let&apos;s generate your own recipe:</h3>
    </div>
    <div className="container mt-3 text-center">
      <div className="m-3">
        <div className="w-50 mx-auto">
          <textarea placeholder='Ex: Meat, including eggs....' value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" />
        </div>
        <div className="mt-1">
          <button onClick={generateRecipe} className="btn btn-primary py-2 px-3">Quick Generate!</button>
        </div>
      </div>
      
        {recipes.length === 0 ? (
          <p className='display-6 mt-5'>No recipes found. Let&apos;s generate first!</p>
        ) : (
         <RecipeCard recipes={recipes}
         openModal={openModal}
         closeModal={closeModal}
         selectedRecipe={selectedRecipe}
         
         />
        )}
    </div>
    </>
  );
};

export default RecipeGenerator;