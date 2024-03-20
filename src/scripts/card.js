import { putLikeCard, dislikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, openSubmit, like, openImage, userId, cardId) {
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
  cardId = cardData._id;

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
  const numberOfLikes = event.target.closest('.card').querySelector('.card__likes');
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLikeCard(likeButton._id)
      .then((res) => {
        numberOfLikes.textContent = res.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err);
      })
  }
  if (likeButton.classList.contains('card__like-button_is-active')) {
    dislikeCard(likeButton._id)
      .then((res) => {
        numberOfLikes.textContent = res.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err);
      })
  }
};