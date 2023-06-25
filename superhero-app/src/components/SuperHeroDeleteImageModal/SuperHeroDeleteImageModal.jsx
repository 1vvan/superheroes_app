import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./SuperHeroDeleteImageModal.scss";

const SuperHeroDeleteImageModal = ({ showDeleteModal, onClose, superHero }) => {
  const [heroImage, setHeroImage] = useState("");

  const handleDeleteImage = (index) => {
    const updatedImages = [...superHero.images];
    updatedImages.splice(index, 1);

    fetch(`http://localhost:3001/api/superheroes/${superHero._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images: updatedImages }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Superhero image deleted:", data);
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting superhero image:", error);
      });
  };

  const addImageToSuperHero = () => {
    const updatedSuperHero = {
      ...superHero,
      images: [...superHero.images, heroImage],
    };

    // Отправляем запрос к серверу для обновления супергероя
    fetch(`http://localhost:3001/api/superheroes/${superHero._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSuperHero),
    })
      .then((response) => response.json())
      .then((data) => {
        // Обработка успешного ответа от сервера
        console.log("Superhero updated:", data);
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        // Обработка ошибок
        console.error("Error updating superhero:", error);
      });
  };

  const convertToBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setHeroImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  return (
    <>
      <Modal show={showDeleteModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {superHero.nickname}'s Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="delete-modal__image-list">
            {superHero.images.map((image, index) => (
              <li key={index} className="delete-modal__image-item">
                <div className="delete-modal__image">
                  <img src={image} alt={superHero.nickname} />
                </div>
                <Button
                  className="delete-modal__image-btn"
                  variant="danger"
                  onClick={() => handleDeleteImage(index)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <span className="modal-hero__elem-title">
            Add a photo for {superHero.nickname}:
          </span>
          <input type="file" accept="image/" onChange={convertToBase64} />
          {heroImage === "" || heroImage === null ? (
            ""
          ) : (
            <div>
              <img className="modal-hero__added-image" src={heroImage} alt="" />
              <Button
                onClick={addImageToSuperHero}
                className="modal-hero__add-image-btn"
                variant="success"
              >
                Add image to {superHero.nickname}'s info
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuperHeroDeleteImageModal;
