import React, { useContext, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Recipe from './Recipe';
import RecipList from './RecipeList';
import './css/recipeViewer.css';
import AppContext from '../AppContext';


export default function RecipeViewer() {
  const { stateVal, setStateVal } = useContext(AppContext);

  const [displayList, setDisplayList] = useState(!stateVal.currentRecipe)
  
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", 
                    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  return (
    <div>
      <Row>
        <Col md={6} className="d-flex justify-content-center" 
            style={{ backgroundColor: "rgb(232, 232, 232)" }}>
          <div className="recipes py-3">
            {letters.map((letter, index) =>
              <span key={letter + "rViewer"}>
                <button
                  className="letterButton"                  
                  value={letter}
                  onClick={() => {
                    setStateVal({ ...stateVal, currentSearchTearm: letter });
                    setDisplayList(true);
                  }}>
                  <h5>{letter}</h5>
                </button>
                {(index + 1) % 5 === 0 ? <br /> : <></>}
              </span>
            )}
            <button className="all" onClick={() => {
              setStateVal({ ...stateVal, currentSearchTearm: "" });
              setDisplayList(true);
            }}>All</button> &nbsp;
          </div>
        </Col>
        <Col 
          style={{ backgroundColor: "rgb(240, 240, 240)" }}
          className="text-center py-3">
          {displayList ?
          <>
            <RecipList selectRecipe={id => {
              setStateVal({ ...stateVal, currentRecipe: id });
              setDisplayList(false);
            }} /> 
            </>:
            <Recipe goBack={() => {
              setDisplayList(true);
              setStateVal({ ...stateVal, currentRecipe: "" });
            }  } />
          }
        </Col>
      </Row>
    </div>
  )
}