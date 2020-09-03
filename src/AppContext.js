import React from 'react';


let appState = {
    currentUser: "",
    currentRecipe: "",
    currentSearchTearm: ""
  }

const AppContext = React.createContext(appState);

export default AppContext