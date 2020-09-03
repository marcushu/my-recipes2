import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function LoginModal({ show, hideModal, handleLogin }) {
  const [name, setName] = useState("");

  return (
    <Modal size="sm" show={show} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <input 
          type="text" 
          style={{borderRadius: "4px"}}
          value={name} 
          onChange={e => setName(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleLogin(name)}>
          Sign Up/Login
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

LoginModal.prototypes = {
  show: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}