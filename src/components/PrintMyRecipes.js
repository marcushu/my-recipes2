import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/mypages.css';

export default function PrintMyRecipes({ clickHandler, myRecipes }) {

  return (
    <>
      <Row style={{ backgroundColor: "rgb(235, 235, 235)" }} className="pt-1">
        <Col><h3>My Recipes</h3></Col>
      </Row>
      <Row>
        <Col>
          <div className="smallHeaders">click to add to favorites...</div> <br />
          {myRecipes.map(recipe =>
            <span key={recipe.id + 'recip'}>
              <button className="recipeButtons"
                onClick={() => clickHandler(recipe)}>{recipe.name}</button>
              <br />
            </span>
          )}
        </Col>
      </Row>


    </>
  )
}

PrintMyRecipes.prototypes = {
  clickHandler: PropTypes.func.isRequired,
  myRecipes: PropTypes.array.isRequired
}