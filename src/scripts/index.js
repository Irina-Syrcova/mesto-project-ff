import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, closePopupByOverlay } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getCard, setUserNewData, addNewCard, deleteMyCard, updateAvatar } from './api.js';

export const placesList = document.querySelector('.places__list');
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
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDesc = document.querySelector('.profile__description');
export const inputCardName = document.querySelector('.popup__input_type_card-name');
export const inputUrl = document.querySelector('.popup__input_type_url');
const cardForm = newCardPopup.querySelector('.popup__form');
const deletePopup = document.querySelector('.popup_type_delete');
const deleteCloseButton = deletePopup.querySelector('.popup__close')
export const deleteSubmitButton = deletePopup.querySelector('.popup__button');
const updateAvatarButton = document.querySelector('.profile__image-update');
const avatarPopup = document.querySelector('.popup_type_update-avatar');
const avatarCloseButton = avatarPopup.querySelector('.popup__close');
const avatarInput = document.querySelector('.popup__input_type_update-avatar');
export const profileAvatar = document.querySelector('.profile__image');


export function openImage(event) {
  openModal(imagePopup);
  imagePopup.querySelector('.popup__image').src = event.target.closest('.card__image').src;
  imagePopup.querySelector('.popup__image').alt = event.target.closest('.card__image').alt;
  imagePopup.querySelector('.popup__caption').textContent = event.target.closest('.card').querySelector('.card__title').textContent;
}

editButton.addEventListener('click', function () {
  openModal(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  clearValidation(editPopup)
});
addButton.addEventListener('click', function () {
  openModal(newCardPopup);
});
updateAvatarButton.addEventListener('click', function () {
  openModal(avatarPopup);
  clearValidation(avatarPopup);
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
deleteCloseButton.addEventListener('click', function () {
  closeModal(deletePopup);
});
avatarCloseButton.addEventListener('click', function () {
  closeModal(avatarPopup);
});

editPopup.addEventListener('click', closePopupByOverlay);
newCardPopup.addEventListener('click', closePopupByOverlay);
imagePopup.addEventListener('click', closePopupByOverlay);
deletePopup.addEventListener('click', closePopupByOverlay);
avatarPopup.addEventListener('click', closePopupByOverlay);

function editFormSubmit(evt) {
  evt.preventDefault();
  editPopup.querySelector('.popup__button').textContent = 'Сохранение...';
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  setUserNewData();
  closeModal(editPopup);
};

function handleCardSubmit(evt) {
  evt.preventDefault();
  placesList.append(createCard({ name: inputCardName.value, link: inputUrl.value, likes: Array(0), owner: { _id: 'b20be6075b615bb25e391ccf' }, _id: '' }, openSubmit, likeCard, openImage));
  newCardPopup.querySelector('.popup__button').textContent = 'Сохранение...';
  closeModal(newCardPopup);
  addNewCard();
  cardForm.reset();
  clearValidation(cardForm);
};

function newAvatar(evt) {
  evt.preventDefault();
  avatarPopup.querySelector('.popup__button').textContent = 'Сохранение...';
  updateAvatar();
  profileAvatar.style.backgroundImage = `url(${avatarInput.value})`;
  closeModal(avatarPopup);
};

formEdit.addEventListener('submit', editFormSubmit);
cardForm.addEventListener('submit', handleCardSubmit);
avatarPopup.addEventListener('submit', newAvatar);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

export function openSubmit(evt) {
  const deleteButton = evt.target.closest('.card__delete-button');
  openModal(deletePopup);
  const deleteSubmitButton = deletePopup.querySelector('.popup__button');
  deleteSubmitButton.addEventListener('click', function () {
    evt.preventDefault();
    deleteMyCard(deleteButton._id);
    deleteCard(evt);
    closeModal(deletePopup);
  });
};

Promise.all([getUserInfo, getCard])
  .then(([getUserInfo, getCard]) => {
    getUserInfo()
    getCard()
  })
  .catch(error => {
    console.error(error)
  })