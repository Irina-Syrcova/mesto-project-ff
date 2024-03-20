import { putLikeCard, dislikeCard } from './api.js';
import { userId } from './index.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, openSubmit, like, openImage) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const numbersOfLikes = cardElement.querySelector('.card__likes');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  numbersOfLikes.textContent = cardData.likes.length;
  deleteButton._id = cardData._id;
  likeButton._id = cardData._id;
  numbersOfLikes._id = cardData._id;

  cardElement.querySelector('.card__image').addEventListener('click', openImage);
  likeButton.addEventListener('click', like);

  deleteButton.addEventListener('click', openSubmit);

  if (cardData.owner._id !== userId) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.classList.add('card__delete-button-hidden');
  };

  const likeTrue = cardData.likes.some(function (item) {
    return item._id === userId;;
  })

  if (likeTrue) {
    likeButton.classList.add('card__like-button_is-active')
  };

  return cardElement;
};

export function deleteCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

export function likeCard(event) {
  const likeButton = event.target.closest('.card__like-button');
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLikeCard(likeButton._id)
    .then((res) => {
      const numbersOfLikes = document.querySelectorAll('.card__likes');
      numbersOfLikes.forEach((element) => {
        if (element._id === res._id) {
          element.textContent = res.likes.length
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      likeButton.classList.add('card__like-button_is-active');
    })
  } 
  if (likeButton.classList.contains('card__like-button_is-active')) {
    dislikeCard(likeButton._id)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      const numbersOfLikes = document.querySelectorAll('.card__likes');
      numbersOfLikes.forEach((element) => {
        if (element._id === res._id) {
          element.textContent = res.likes.length
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      likeButton.classList.remove('card__like-button_is-active');
    })
  }
};