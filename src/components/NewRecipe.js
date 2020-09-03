import React, { useState, useContext } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import AppContext from '../AppContext';
import axios from 'axios';
import './css/newrecipe.css';
import { host } from '../host';

export default function NewRecipe() {
  const [ingredient, setIngredient] = useState("");
  const [recipeName, setrecipeName] = useState("");
  const [amount, setAmount] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientList, setIngredientList] = useState([])

  const { stateVal } = useContext(AppContext);

  const save = async () => {
    if (!!instructions && ingredientList.length) {
      try {
        const newRecipeId = await axios({
          method: 'post',
          url: host + '/recipe',
          data: {
            name: recipeName,
            instructions: instructions,
            user: stateVal.currentUser
          }
        });

        // ingredients in separate table
        ingredientList.forEach(async (recipe) => {
          await axios({
            method: 'post',
            url: host + '/ingredient',
            data: {
              recipe_id: newRecipeId.data.id,
              name: recipe.ing,
              amount: recipe.amnt
            }
          });
        })

        setIngredient("");
        setrecipeName("");
        setAmount("");
        setInstructions("");
        setIngredientList([]);

        alert("Your recipe has been saved.")
      } catch (err) {
        console.error(err);
        alert("Unable to save...")
      }
    }
  }

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-between pt-3 pb-2" 
            style={{ backgroundColor: "rgb(245, 245, 245)" }}>
          <h3>New Recipe</h3>
          <span>
            <input
              type="text"
              className="titleInput"
              placeholder="egg plant lasagna..."
              value={recipeName}
              onChange={e => setrecipeName(e.target.value)} /> &nbsp;
            <Button className="btn btn-secondary btn-sm" onClick={save}>Save Recipe</Button>
          </span>

        </Col>
      </Row>
      <Row className="pt-4">
        <Col md={6}>
          <div className="border p-2">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Ingredient</Form.Label>
                <Form.Control
                  type="text"
                  value={ingredient}
                  onChange={e => setIngredient(e.target.value)}
                  placeholder="tomato" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="two cans, diced" />
              </Form.Group>
            </Form.Row>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => {
                if (!!ingredient) {
                  setIngredientList([...ingredientList, { ing: ingredient, amnt: amount }]);
                  setIngredient("");
                  setAmount("");
                }
              }}
              block>Add Ingredient</Button>
          </div><br /><br />
          {ingredientList.map(({ ing, amnt }) =>
            <Row key={ing}>
              <Col className="font-weight-bold">
                <button
                  className="deleteButton"
                  onClick={() => setIngredientList(ingredientList.filter(e => e.ing !== ing))}>X </button>
                <span className="ingredients" > &nbsp; {ing}</span>
              </Col>
              <Col>{amnt}
              </Col>
            </Row>
          )} <br /><br />
        </Col>
        <Col md={6}>
          <FormControl
            as="textarea"
            placeholder="Preheat oven to 375. ..."
            rows="20"
            value={instructions}
            onChange={e => setInstructions(e.target.value)} />
        </Col>
      </Row>
    </>
  )
}