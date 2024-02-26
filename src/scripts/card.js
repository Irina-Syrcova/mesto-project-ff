import { cardTemplate } from './index.js';

export function createCard(cardData, deleteCallback, like, openImage) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__image').addEventListener('click', openImage);

  likeButton.addEventListener('click', like);

  deleteButton.addEventListener('click', deleteCallback);
  return cardElement;
};

export function deleteCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

export function likeCard(event) {
  const likeButton = event.target.closest('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}