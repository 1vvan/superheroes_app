import React, { useState } from 'react';
import SuperHeroModal from '../SuperHeroModal/SuperHeroModal';
import SuperHeroEditModal from '../SuperHeroEditModal/SuperHeroEditModal';
import EditIcon from '../../assets/icons/edit-icon.png'
import PhotoIcon from "../../assets/icons/photo-icon.png";
import './SuperHeroCard.scss'
import SuperHeroDeleteImageModal from '../SuperHeroDeleteImageModal/SuperHeroDeleteImageModal';

const SuperHeroCard = ({ superHero }) => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleOpenDeleteModal = () => {
      setShowDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
      setShowDeleteModal(false);
    };

    const handleOpenModal = () => {
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleOpenEditModal = () => {
      setShowEditModal(true);
    };
    const handleCloseEditModal = () => {
      setShowEditModal(false);
    };

    return (
      <>
        <div className="hero-card">
          <div className="hero-card__image">
            {superHero.images.length > 0 && (
              <img src={superHero.images[0]} alt="" />
            )}
          </div>
          <div className="hero-card__nickname">{superHero.nickname}</div>
          <div className="hero-card__buttons">
            <div className="hero-card__edit-buttons">
              <button
                onClick={handleOpenEditModal}
                className="hero-card__btn hero-card__edit-btn"
              >
                <img src={EditIcon} alt="" />
              </button>
              <button
                onClick={handleOpenDeleteModal}
                className="hero-card__btn hero-card__delete-btn"
              >
                <img src={PhotoIcon} alt="" />
              </button>
            </div>
            <button onClick={handleOpenModal} className="hero-card__more-btn">
              More info
            </button>
          </div>
        </div>
        <SuperHeroModal
          superHero={superHero}
          showModal={showModal}
          onClose={handleCloseModal}
        />
        <SuperHeroEditModal
          showEditModal={showEditModal}
          onClose={handleCloseEditModal}
          superHero={superHero}
        />
        <SuperHeroDeleteImageModal
          showDeleteModal={showDeleteModal}
          onClose={handleCloseDeleteModal}
          superHero={superHero}
        />
      </>
    );
}

export default SuperHeroCard;
