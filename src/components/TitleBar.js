import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../AppContext';
import './css/titleBar.css'
import LoginModal from './LoginModal';

export default function TitleBar() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showModal, setShowModal] = useState(false);

  const { stateVal, setStateVal } = useContext(AppContext);

  const navHistory = useHistory();

  const handleLogin = async loginName => {
    if (!!loginName) {
      setShowModal(false);

      setStateVal({ ...stateVal, currentUser: loginName });
      setCurrentPage("mypage");

      navHistory.push('/mypage');
    } else {
      alert("Please enter a name")
    }
  }

  return (
    <div>
      <h2>Recipes</h2>
      <hr />
      <div className="d-flex justify-content-around">
        <div>
          <Link
            to="/"
            className={currentPage === "home" ? 'here' : 'notHere'}
            onClick={() => setCurrentPage("home")}>Find</Link>
        </div>
        <div>
          <Link
            to="/newrecipe"
            className={currentPage === "newrecipe" ? 'here' : 'notHere'}
            onClick={() => setCurrentPage("newrecipe")}>Add Recipe</Link>
        </div>
        <div>
          {!stateVal.currentUser ?
            <>
              <button className="login" onClick={() => setShowModal(true)}>login</button>
              <LoginModal
                show={showModal}
                hideModal={() => setShowModal(false)}
                handleLogin={(loginName) => handleLogin(loginName)} />
            </> :
            <Link
              to="/mypage"
              className={currentPage === "mypage" ? 'here' : 'notHere'}
              onClick={() => setCurrentPage("mypage")}
            >My Page</Link>
          }
        </div>
      </div>
      <hr />
    </div>
  )
}