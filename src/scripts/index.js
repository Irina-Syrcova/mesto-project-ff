import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, closePopupByOverlay } from './modal.js';

const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editCloseButton = editPopup.querySelector('.popup__close');
const cardCloseButton = newCardPopup.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const formEdit = editPopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputUrl = document.querySelector('.popup__input_type_url');
const cardForm = newCardPopup.querySelector('.popup__form');

initialCards.forEach(function (element) {
  placesList.append(createCard(element, deleteCard, likeCard, imageOpen));
});

function imageOpen(event) {
  openModal(imagePopup);
  imagePopup.querySelector('.popup__image').src = event.target.closest('.card__image').src;
  imagePopup.querySelector('.popup__image').alt = event.target.closest('.card__image').alt;
  imagePopup.querySelector('.popup__caption').textContent = event.target.closest('.card').textContent;
}

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

editPopup.addEventListener('click', closePopupByOverlay);

newCardPopup.addEventListener('click', closePopupByOverlay);

imagePopup.addEventListener('click', closePopupByOverlay);

function editFormSubmit(evt) {
  evt.preventDefault();
  closeModal(editPopup);
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
};

formEdit.addEventListener('submit', editFormSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  placesList.append(createCard({ name: inputCardName.value, link: inputUrl.value }, deleteCard, likeCard, imageOpen));
  closeModal(newCardPopup);
  cardForm.reset();
};

cardForm.addEventListener('submit', handleCardSubmit);