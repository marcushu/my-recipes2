import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/mypages.css';

export default function PrintIngredients({ ingredients, deleteHandler }) {

  return (
    <>
      <Row style={{ backgroundColor: "rgb(235, 235, 235)" }} className="pt-1">
        <Col><h3>Shopping List</h3></Col>
      </Row>
      <Col>
        <div className="smallHeaders">click to delete</div> <br />
        {ingredients.map(ing =>
          <span key={ing.id + "pIng"}>
            <button
              className="recipeButtons"
              onClick={() => deleteHandler(ing)}>{ing.name}
            -
            <span className="amounts">{ing.amount}</span></button>
            <br />
          </span>
        )}
      </Col>

    </>
  )
}

PrintIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
  deleteHandler: PropTypes.func.isRequired
}