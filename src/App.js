import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewRecipe from './components/NewRecipe';
import RecipeViewer from './components/RecipeViewer';
import TitleBar from './components/TitleBar';
import MyPage from './components/MyPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from './AppContext';
import FullRecipe from "./components/FullRecipe";

let newState = {
  currentUser: "",
  currentRecipe: "",
  currentSearchTearm: ""
}

export default function App() {
  let [stateVal, setStateVal] = useState(newState);

  return (
    <div className="container">
      <Router>
        <AppContext.Provider value={{ stateVal, setStateVal }}>
          <TitleBar />
          <Switch>
            <Route path="/newrecipe">
              <NewRecipe />
            </Route>
            <Route path="/fullrecipe">
              <FullRecipe />
            </Route>
            <Route path='/mypage'>
              <MyPage />
            </Route>
            <Route path="/">
              <RecipeViewer />
            </Route>
          </Switch>
        </AppContext.Provider>
      </Router>
    </div>
  );
}
