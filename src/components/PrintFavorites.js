import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/mypages.css';

export default function PrintFavorites({ fRecipes, deleteHandler, addHandler }) {

  return (
    <>
      <Row style={{ backgroundColor: "rgb(245, 245, 245)" }} className="pt-1">
        <Col><h3>Favorites</h3></Col>
      </Row>
      <Row>
        <Col>
          <div className="smallHeaders">click to add to shopping list...</div> <br />
          {fRecipes.map(recipe =>
            <span key={recipe.id + "pFav"}>
              <button
                className="deleteButtons"
                onClick={() => deleteHandler(recipe.id)}>X</button>
              <button
                className="recipeButtons"
                onClick={() => addHandler(recipe.id)}> {recipe.name} </button>
              <br />
            </span>
          )}
        </Col>
      </Row>


    </>
  )
}

PrintFavorites.prototype = {
  fRecipe: PropTypes.array.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired
}