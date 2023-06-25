import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const SuperHeroEditModal = ({ showEditModal, onClose, superHero }) => {
  const [editedSuperHero, setEditedSuperHero] = useState({ ...superHero });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "superpower") {
      const updatedSuperpowers = [...editedSuperHero.superpowers];
      updatedSuperpowers[index] = value;

      setEditedSuperHero({
        ...editedSuperHero,
        superpowers: updatedSuperpowers,
      });
    } else {
      setEditedSuperHero({
        ...editedSuperHero,
        [name]: value,
      });
    }
  };

  const handleSaveChanges = () => {
    const updatedSuperHero = {
      ...editedSuperHero,
    };

    fetch(`http://localhost:3001/api/superheroes/${superHero._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSuperHero),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Superhero updated:", data);
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating superhero:", error);
      });
  };

  return (
    <>
      <Modal show={showEditModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {superHero.nickname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                value={editedSuperHero.nickname}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Real Name:</Form.Label>
              <Form.Control
                type="text"
                name="real_name"
                value={editedSuperHero.real_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Origin Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="origin_description"
                value={editedSuperHero.origin_description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Superpowers:</Form.Label>
              {editedSuperHero.superpowers.map((superpower, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  name={`superpower-${index}`}
                  value={superpower}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Catch Phrase:</Form.Label>
              <Form.Control
                type="text"
                name="catch_phrase"
                value={editedSuperHero.catch_phrase}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button
              className="mt-2"
              onClick={handleSaveChanges}
              variant="success"
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SuperHeroEditModal;
