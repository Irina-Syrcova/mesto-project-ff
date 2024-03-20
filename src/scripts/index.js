import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation, settingsValidation } from './validation.js';
import { getUserInfo, getCard, setUserNewData, addNewCard, deleteMyCard, updateAvatar } from './api.js';

export const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const formEdit = editPopup.querySelector('.popup__form');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDesc = document.querySelector('.profile__description');
export const inputCardName = document.querySelector('.popup__input_type_card-name');
export const inputUrl = document.querySelector('.popup__input_type_url');
const cardForm = newCardPopup.querySelector('.popup__form');
const deletePopup = document.querySelector('.popup_type_delete');
export const deleteSubmitButton = deletePopup.querySelector('.popup__button');
const updateAvatarButton = document.querySelector('.profile__image-update');
const avatarPopup = document.querySelector('.popup_type_update-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
export const avatarInput = document.querySelector('.popup__input_type_update-avatar');
export const profileAvatar = document.querySelector('.profile__image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
export let userId;


export function openImage(event) {
  openModal(imagePopup);
  popupImage.src = event.target.closest('.card__image').src;
  popupImage.alt = event.target.closest('.card__image').alt;
  popupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
}

editButton.addEventListener('click', function () {
  openModal(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  clearValidation(settingsValidation, formEdit);
});
addButton.addEventListener('click', function () {
  openModal(newCardPopup);
});
updateAvatarButton.addEventListener('click', function () {
  openModal(avatarPopup);
  clearValidation(settingsValidation, avatarForm);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    };
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    };
  });
});

function editFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  setUserNewData(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDesc.textContent = jobInput.value;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
      closeModal(editPopup);
    })
};

function handleCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  addNewCard(inputCardName.value, inputUrl.value)
    .then(() => {
      placesList.append(createCard({ name: inputCardName.value, link: inputUrl.value, likes: Array(0), owner: { _id: 'b20be6075b615bb25e391ccf' }, _id: '' }, openSubmit, likeCard, openImage));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
      cardForm.reset();
      clearValidation(settingsValidation, cardForm);
      closeModal(newCardPopup);
    })
};

function newAvatar(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  updateAvatar(avatarInput.value)
    .then(() => {
      profileAvatar.style.backgroundImage = `url(${avatarInput.value})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
      avatarForm.reset();
      closeModal(avatarPopup);
    })
};

formEdit.addEventListener('submit', editFormSubmit);
cardForm.addEventListener('submit', handleCardSubmit);
avatarPopup.addEventListener('submit', newAvatar);

enableValidation(settingsValidation);

export function openSubmit(evt) {
  evt.preventDefault();
  const deleteButton = evt.target.closest('.card__delete-button');
  openModal(deletePopup);
  deletePopup._id = deleteButton._id;
  const deleteSubmitButton = deletePopup.querySelector('.popup__button');
  deleteSubmitButton.addEventListener('click', function () {
    if (deletePopup._id === deleteButton._id) {
      deleteMyCard(deleteButton._id)
        .then(() => {
          deleteCard(evt);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          closeModal(deletePopup);
        })
    }
  });
};

Promise.all([getUserInfo, getCard])
  .then(([getUserInfo, getCard]) => {
    getUserInfo()
      .then((res) => {
        profileTitle.textContent = res.name;
        profileDesc.textContent = res.about;
        profileAvatar.style.backgroundImage = `url(${res.avatar})`;
        userId = res._id;
      })
      .catch((err) => {
        console.log(err);
      })
    getCard()
      .then((res) => {
        res.forEach(function (element) {
          placesList.append(createCard(element, openSubmit, likeCard, openImage));
        })
      })
      .catch((err) => {
        console.log(err);
      })
  })
  .catch(error => {
    console.error(error)
  })