import { openModal } from './modal';
import { imagePopup, cardTemplate } from './index.js';

export function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__image').addEventListener('click', function () {
    openModal(imagePopup);
    imagePopup.querySelector('.popup__image').src = cardData.link;
    imagePopup.querySelector('.popup__caption').textContent = cardData.name;
  });

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', deleteCallback);
  return cardElement;
};

export function deleteCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}