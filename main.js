(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n,r){var o=d.cloneNode(!0),c=o.querySelector(".card__delete-button"),p=o.querySelector(".card__like-button");return o.querySelector(".card__image").src=e.link,o.querySelector(".card__image").alt=e.name,o.querySelector(".card__title").textContent=e.name,o.querySelector(".card__image").addEventListener("click",r),p.addEventListener("click",n),c.addEventListener("click",t),o}function n(e){e.target.closest(".places__item").remove()}function r(e){e.target.closest(".card__like-button").classList.toggle("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",p)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function a(e){e.target.classList.contains("popup")&&c(e.currentTarget)}e.d({},{g:()=>d});var u=document.querySelector(".places__list"),d=document.querySelector("#card-template").content,i=document.querySelector(".profile__edit-button"),l=document.querySelector(".popup_type_edit"),s=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_new-card"),m=l.querySelector(".popup__close"),y=_.querySelector(".popup__close"),v=document.querySelector(".popup_type_image"),f=v.querySelector(".popup__close"),k=l.querySelector(".popup__form"),q=document.querySelector(".popup__input_type_name"),S=document.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),E=document.querySelector(".popup__input_type_card-name"),b=document.querySelector(".popup__input_type_url"),x=_.querySelector(".popup__form");function h(e){o(v),v.querySelector(".popup__image").src=e.target.closest(".card__image").src,v.querySelector(".popup__image").alt=e.target.closest(".card__image").alt,v.querySelector(".popup__caption").textContent=e.target.closest(".card").textContent}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){u.append(t(e,n,r,h))})),i.addEventListener("click",(function(){o(l),q.value=g.textContent,S.value=L.textContent})),s.addEventListener("click",(function(){o(_)})),m.addEventListener("click",(function(){c(l)})),y.addEventListener("click",(function(){c(_)})),f.addEventListener("click",(function(){c(v)})),l.addEventListener("click",a),_.addEventListener("click",a),v.addEventListener("click",a),k.addEventListener("submit",(function(e){e.preventDefault(),c(l),g.textContent=q.value,L.textContent=S.value})),x.addEventListener("submit",(function(e){e.preventDefault(),u.append(t({name:E.value,link:b.value},n,r,h)),c(_),x.reset()}))})();