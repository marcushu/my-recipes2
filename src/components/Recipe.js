import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../AppContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import PropTypes from 'prop-types';
import './css/recipe.css'
import { host } from '../host';

export default function Recipe({ goBack }) {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([])

  const { stateVal } = useContext(AppContext);

  const navHistory = useHistory();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios(`${host}/recipe?id=${stateVal.currentRecipe}`);

        setRecipe(res.data);

        const ingArray = await axios(`${host}/ingbyrecipe?recipeid=${stateVal.currentRecipe}`);

        setIngredients(ingArray.data);

      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, [stateVal])


  const addFavorite = () => {
    if (!!stateVal.currentUser) {
      axios({
        method: 'post',
        url: host + '/favorite',
        data: {
          user: stateVal.currentUser,
          recipe_id: recipe.id
        }
      })
        .then(() => alert("Added to favorites"))
        .catch(err => {
          console.error(err);
          alert("Error adding to favorites");
        })
    } else {
      alert("Pleas log in.")
    }
  }

  return (
    <>
      {!recipe ? <div>loading...</div> :
        <>
          <Row>
            <Col className="d-flex justify-content-between border-bottom ">
              <span>
                <h3>{recipe.name}</h3>
              </span>
              <span >
                <button className="headerButtons" onClick={() => navHistory.push("/fullrecipe")}> Full Recipe  &nbsp; |</button>
                <button className="headerButtons" onClick={addFavorite}>Favorite</button>
              </span>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <div className="text-left">
                {ingredients.map(ing =>
                  <div key={ing.id + "recip"}>
                    <Row>
                      <Col>{ing.name}</Col>
                      <Col>{ing.amount}</Col>
                    </Row>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row className="pt-3">
            <Col className="text-left">
              <button onClick={goBack} className="bolderButton"> Back </button>
            </Col>
          </Row>
        </>
      }
    </>
  )
}

Recipe.prototypes = {
  goBack: PropTypes.func.isRequired
}