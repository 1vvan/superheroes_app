import React from "react";
import "./SuperHeroModal.scss";
import { Carousel, Modal } from "react-bootstrap";

const SuperHeroModal = ({ showModal, onClose, superHero }) => {

  return (
    <>
      <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>More info about {superHero.nickname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel className="modal-hero__carousel">
            {superHero.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="modal-hero__carousel-image"
                  src={image}
                  alt=""
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <span className="modal-hero__elem-title">Superhero Nickname:</span>
          <p className="modal-hero__nickname">{superHero.nickname}</p>
          <span className="modal-hero__elem-title">
            {superHero.nickname}'s real name:
          </span>
          <p className="modal-hero__real-name">{superHero.real_name}</p>
          <span className="modal-hero__elem-title">
            {superHero.nickname}'s description:
          </span>
          <p className="modal-hero__origin-description">
            {superHero.origin_description}
          </p>
          <ul className="modal-hero__superpowers">
            <span className="modal-hero__elem-title">
              {superHero.nickname}'s superpowers:
            </span>
            {superHero.superpowers.map((superpower, index) => (
              <li key={index} className="modal-hero__superpowers-item">
                -{superpower}
              </li>
            ))}
          </ul>
          <br />
          <span className="modal-hero__elem-title">
            {superHero.nickname}'s catch phrase:
          </span>
          <p className="modal-hero__catch-phrase">{superHero.catch_phrase}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SuperHeroModal;
