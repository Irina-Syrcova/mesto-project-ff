import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';

const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editCloseButton = editPopup.querySelector('.popup__close');
const cardCloseButton = newCardPopup.querySelector('.popup__close');
export const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const formElement = editPopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputUrl = document.querySelector('.popup__input_type_url');
const cardForm = newCardPopup.querySelector('.popup__form');

initialCards.forEach(function (element) {
  placesList.append(createCard(element, deleteCard));
});

editButton.addEventListener('click', function () {
  openModal(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
});

addButton.addEventListener('click', function () {
  openModal(newCardPopup);
});

editCloseButton.addEventListener('click', function () {
  closeModal(editPopup);
});

cardCloseButton.addEventListener('click', function () {
  closeModal(newCardPopup);
});

imageCloseButton.addEventListener('click', function () {
  closeModal(imagePopup);
});

editPopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_type_edit')) {
    closeModal(editPopup);
  };
});

newCardPopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_type_new-card')) {
    closeModal(newCardPopup);
  };
});

imagePopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_type_image')) {
    closeModal(imagePopup);
  };
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  closeModal(document.querySelector('.popup_is-opened'));
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
};

formElement.addEventListener('submit', handleFormSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  placesList.append(createCard({ name: inputCardName.value, link: inputUrl.value }, deleteCard));
  closeModal(document.querySelector('.popup_is-opened'));
  cardForm.reset();
};

cardForm.addEventListener('submit', handleCardSubmit);