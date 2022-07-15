import React, { useState } from "react";
import './style/Bascet.css'
import { useDispatch, useSelector } from "react-redux";
import PostService from './API/PostService';

export default (props) => {
	const recipes = useSelector(state => state.bascet)
	const dispatch = useDispatch();
	var [recipes1, setRecipes] = useState(recipes);
	function filterItems(query) {
  			return recipes.filter(function(el) {
     		return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
 		})
	}
	
	function removeDuplicates(arr) {
    const result = [];
    const duplicatesIndices = [];

    const deleteProduct = (product) => {
  		setRecipes(recipes1.filter(p => p !== product));
	};

    arr.forEach((current, index) => {
    
        if (duplicatesIndices.includes(index)) return;
    
        result.push(current);
    
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
        
            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);
            
 
            if (currentKeys.length !== comparisonKeys.length) continue;     

            const currentKeysString = currentKeys.sort().join("").toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;
            
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if ( current[key] !== comparison[key] ) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);
            
        } 
    });  
    return result;

}
	
	const getPrice = () => 
	{
     	var x = 0;
     	for(var i = 0; i < recipes1.length; i++){
     		x = x + recipes1[i].price;
     	}
     	return x;
     }

	const findDublicates = (find, data) =>{
		var find = 0;

		data.map((index, finds) => {
			if(finds == find){
				find = find + 1
			}
		})

		return find
	}

	const AddRecipes = (e) => {
      dispatch({type: "ADD_IN_BUSCET", value: e})
      setRecipes(recipes);
    }

    const outputChek = () => {
    	PostService.POST_ORDER(recipes1);
    }

	return (
		<div id="container_bascet">
			<h1>Корзина</h1>
			<ul className="bascet">
			    	{
      				  removeDuplicates(recipes1).map(recipe=>{
      				    return(
      				      <li>
      				      <div className='item2'>
      				        <h3>{recipe.title}</h3>
      				        <img src={recipe.img} alt = "img" />
      				        <pre>{recipe.price + "тг."}</pre>
      				        <section>
      				        	<button id = "plus" onClick={() => {AddRecipes({title: recipe.title, price: recipe.price, img: recipe.img})}} >+</button>
      				        	<button id = "minus" onClick ={() => {setRecipes(recipes1.filter(p => p !== recipe)); dispatch({type: "SET_BUSCET", value: recipes1.filter(p => p !== recipe)})}}>X</button>
      				        	<p id="counter">{findDublicates(recipe, recipes1)}</p>
      				        </section>
      				      </div>
      				      </li>
      				    )
      				  })
      				}
      		</ul>

      		<ul className="chek">
      				<h3 style={{'textAlign': 'left'}}>Чек:</h3>
      				{	
      				  		removeDuplicates(recipes1).map(recipe=>{
      				  			return(
      				  			    	<li>
      				  				      	<pre>{recipe.price + "тг." + "	" + recipe.title + " " + 'X' + findDublicates(recipe, recipes1)}</pre>
      				  			    	</li>
      				  			)
      				  		}
      				  	)
      					
      				}
      				<li><pre>-----------------------------------</pre></li>
      				<li><pre>{"Итого:" + 
      					getPrice()
      				 + "тг."}</pre></li>
      				 <li><button style = {{width: '40%', height: '5em', float:'left'}} onClick={outputChek()}>Купить</button></li>

      		</ul>

		</div>
	);
}