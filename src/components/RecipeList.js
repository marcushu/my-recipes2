import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../AppContext';
import axios from 'axios';
import PropTypes from 'prop-types';
import './css/recipeList.css';
import { host } from '../host';

export default function RecipeList( { selectRecipe }) {
  const [data, setData] = useState(null);

  const { stateVal } = useContext(AppContext);

  useEffect(() => {
    let query = stateVal.currentSearchTearm === "" ?
      host + "/recipes" :
      host + "/findbyletter?letter=" + stateVal.currentSearchTearm;

    axios(query)
      .then(result => setData(result.data))
      .catch(err => {
        console.error(err);
        alert("Unable to load Recipes");
      })

  }, [stateVal]);

  return (
    <div>
      {!data ? "Loading..." :
        data.length === 0 ? <h4>No recipes</h4> :
          data.map(d =>
            <div key={d.id + "rList"}>
              <button 
                onClick={() => selectRecipe(d.id)}
                className="recipeList">{d.name}</button>
            </div>
          )}
    </div>
  )
}

RecipeList.prototypes = {
  selectRecipe: PropTypes.func.isRequired
}
