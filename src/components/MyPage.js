import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../AppContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrintMyRecipes from './PrintMyRecipes';
import axios from 'axios';
import PrintFavorites from './PrintFavorites';
import PrintIngredients from './PrintIngredients';
import { host } from '../host';

export default function MyPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);

  const { stateVal, setStateVal } = useContext(AppContext);


  useEffect(() => {
    let mounted = true;

    if (mounted) {
      try {
        const loadData = async () => {
          const myRecipes = await axios(`${host}/findByUser?user=${stateVal.currentUser}`);
          setUserRecipes(myRecipes.data);

          const favorites = await axios(`${host}/findfavorites?user=${stateVal.currentUser}`);
          setFavoriteRecipes(favorites.data);

          const shoppingList = await axios(`${host}/shoppinglist?user=${stateVal.currentUser}`);

          let ingredientsAr = []
          for (const ret of shoppingList.data) {
            const res = await axios(`${host}/ingredient?id=${ret.ingredient_id}`);
            ingredientsAr.push({ ...res.data, shopping_id: ret.id });
          }

          setIngredients(ingredientsAr)
        }

        loadData();
      } catch (err) {
        alert("Unable to retrieve your recipes.")
        console.error(err);
      }
    }

    return () => mounted = false;
  }, [stateVal])


  const deleteFave = async toDeleteId => {
    try {
      const favorites = await axios(`${host}/favorites?user=${stateVal.currentUser}`);

      const favorite = favorites.data.find(({ recipe_id }) => recipe_id === toDeleteId)

      await axios.delete(`${host}/favorite?id=${favorite.id}`);

      setFavoriteRecipes(favoriteRecipes.filter(({ id }) => id !== toDeleteId))

    } catch (err) {
      console.error(err);
    }
  }


  const addToShoppingList = async recipeId => {
    try {
      const ingredientAr = await axios(`${host}/ingbyrecipe?recipeid=${recipeId}`);

      let temp = []
      for (const ingredient of ingredientAr.data) {
        let newI = await axios({
          method: 'post',
          url: host + '/shoppinglist',
          data: {
            user: stateVal.currentUser,
            ingredient_id: ingredient.id,
            done: false
          }
        });

        temp.push({ ...ingredient, shopping_id: newI.data.id })
      }
      setIngredients(ingredients.concat(temp));

    } catch (err) {
      alert("Error adding ingredients.")
      console.error(err);
    }
  }

  // TODO: check to avoid duplicates (here? db?)
  const addFavorite = recipe => {
    axios({
      method: 'post',
      url: host + '/favorite',
      data: {
        user: stateVal.currentUser,
        recipe_id: recipe.id
      }
    }).catch(err => {
      console.error(err);
    });
    setFavoriteRecipes([...favoriteRecipes, recipe]);
  }


  const deleteFromSlist = sListId => {
    axios.delete(`${host}/shoppinglist?id=${sListId.shopping_id}`)
      .catch(er => { console.error(er); });

    setIngredients(ingredients.filter(({ id }) => id !== sListId.id));
  }


  return (
    <>
      {!!stateVal.currentUser ?
        <>
          <Row>
            <Col className="text-right">
              <button 
                style={{borderRadius: "5px", border: "none", backgroundColor: "white"}} 
                onClick={() => setStateVal({ ...stateVal, currentUser: "" })}>
              logout
          </button>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="pb-4">
              {!userRecipes ? <h5>Loading...</h5> :
                <PrintMyRecipes
                  myRecipes={userRecipes}
                  clickHandler={(rec) => addFavorite(rec)} />}
            </Col>
            <Col md={4} className="pb-4 border-left">
              {!favoriteRecipes ? <h5>Loading...</h5> :
                <PrintFavorites
                  fRecipes={favoriteRecipes}
                  deleteHandler={id => deleteFave(id)}
                  addHandler={id => addToShoppingList(id)} />}
            </Col>
            <Col md={4} className="border-left">
              {!ingredients ? <h5>Loading...</h5> :
                <PrintIngredients
                  ingredients={ingredients}
                  deleteHandler={id => deleteFromSlist(id)} />}
            </Col>
          </Row>
        </> :
        <Row>
          <Col>
            <h3>Logged Out</h3>
          </Col>
        </Row>
      }
    </>
  )
}