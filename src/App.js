import PostService from './API/PostService';
import React, {useState,useEffect} from 'react';
import './style/App.css';
import { useSelector, useDispatch } from "react-redux";

export default () => {
    const [Recipes,setRecipes] = useState([]);
    const dispatch = useDispatch();
    const counter = useSelector(state => state.bascet)
    // console.log(counter);
    
    const AddInBascet = (e) => {
      dispatch({type: "ADD_IN_BUSCET", value: e})
    }
    
      const fetchRecipes = async () => {
        const res = await PostService.getAll();
        console.log(res);
        const fetchedOrders = Object.keys(res).map(id => {
          return {...res[id], id};
        }) 
        setRecipes(fetchedOrders);
      //   console.log(fetchedOrders);
      }

    console.log(Recipes);

    
  useEffect(() => {
    fetchRecipes();
  }, [])

  return (
    
      <div className = 'list'>
      
      {
        Recipes.map(recipe=>{
          return(
            <section key={recipe} className='item'>
              <h3>{recipe.title}</h3>
              <img src={recipe.img} alt = "img" />
              <pre>{recipe.price + " " + "тг."}</pre>
              <button onClick={() => {AddInBascet({title: recipe.title, price: recipe.price, img: recipe.img})}}>в корзину</button>
            </section>
          )
        })
      }
      </div>
  );
}