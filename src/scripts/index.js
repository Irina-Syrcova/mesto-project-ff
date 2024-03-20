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
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputUrl = document.querySelector('.popup__input_type_url');
const cardForm = newCardPopup.querySelector('.popup__form');
const deletePopup = document.querySelector('.popup_type_delete');
const deleteSubmitButton = deletePopup.querySelector('.popup__button');
const updateAvatarButton = document.querySelector('.profile__image-update');
const avatarPopup = document.querySelector('.popup_type_update-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = document.querySelector('.popup__input_type_update-avatar');
const profileAvatar = document.querySelector('.profile__image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
let userId;
let cardId;


function openImage(event) {
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
      closeModal(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    })
};

function handleCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  addNewCard(inputCardName.value, inputUrl.value)
    .then((res) => {
      cardId = res._id
      placesList.prepend(createCard({ name: inputCardName.value, link: inputUrl.value, likes: Array(0), _id: cardId, owner: { _id: userId } }, openSubmit, likeCard, openImage, userId, cardId));
      cardForm.reset();
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
      clearValidation(settingsValidation, cardForm);
    })
};

function newAvatar(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  updateAvatar(avatarInput.value)
    .then(() => {
      profileAvatar.style.backgroundImage = `url(${avatarInput.value})`;
      avatarForm.reset();
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    })
};

formEdit.addEventListener('submit', editFormSubmit);
cardForm.addEventListener('submit', handleCardSubmit);
avatarPopup.addEventListener('submit', newAvatar);

enableValidation(settingsValidation);

function openSubmit(evt) {
  evt.preventDefault();
  const deleteButton = evt.target.closest('.card__delete-button');
  openModal(deletePopup);
  deletePopup._id = deleteButton._id;
  deleteSubmitButton.addEventListener('click', function() {
    if (deletePopup._id === deleteButton._id) {
      deleteMyCard(deleteButton._id)
        .then(() => {
          deleteCard(evt);
          closeModal(deletePopup);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  });
};

Promise.all([getUserInfo(), getCard()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDesc.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cards.forEach(function (element) {
      placesList.append(createCard(element, openSubmit, likeCard, openImage, userId, cardId));
    })
  })
  .catch(error => {
    console.error(error)
  })