import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppContext from '../AppContext';
import "./css/fullrecipe.css";
import { host } from '../host';

export default function FullRecipe() {
  const [ingredientAr, setingredientAr] = useState([]);
  const [instructionsAr, setInstructionsAr] = useState([]);
  const [recipe, setRecipe] = useState();

  const { stateVal } = useContext(AppContext);


  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios(`${host}/recipe?id=${stateVal.currentRecipe}`);

        setRecipe(res.data);

        setInstructionsAr(res.data.instructions.split("."));

        const ingArray = await axios(`${host}/ingbyrecipe?recipeid=${stateVal.currentRecipe}`);

        setingredientAr(ingArray.data);

      } catch (err) {
        console.error(err);
      }
    }

    loadData();
    
  }, [stateVal])


  return (
    <>
      {!ingredientAr || !recipe || !instructionsAr ? <h4>Loading...</h4> :
        <>
          <Row className="pb-1 pt-2" style={{ backgroundColor: "rgb(245,245,245)" }}>
            <Col className="text-center"><h3>{recipe.name}</h3></Col>
          </Row>
          <Row>
            <Col md={4}>
              {ingredientAr.map(r =>
                <>
                  <span key={r.id + "rNm"} className="recipeName">{r.name}</span>
                  <span key={r.id + "amnt"} className="recipeAmount">  &nbsp; {r.amount}</span>
                  <br /><br />
                </>
              )}
              <hr />
            </Col>
            <Col md={8}>
              {instructionsAr.map( (instruction, index) =>
                <p key={index + "ins"}>{instruction}</p>)}
            </Col>
          </Row>
        </>
      }
    </>
  )
}