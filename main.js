(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{gj:()=>_,eM:()=>C,Yb:()=>x,Ou:()=>E,Kk:()=>g,yw:()=>M,oz:()=>N,y8:()=>p,IH:()=>D,wV:()=>j,wh:()=>L});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-9",headers:{authorization:"aa983300-fa7e-4a17-a77d-fcc024d33f1c","Content-Type":"application/json"}};function n(e,t,n,o){var r=_.cloneNode(!0),c=r.querySelector(".card__delete-button"),a=r.querySelector(".card__like-button"),u=r.querySelector(".card__likes");return r.querySelector(".card__image").src=e.link,r.querySelector(".card__image").alt=e.name,r.querySelector(".card__title").textContent=e.name,u.textContent=e.likes.length,c._id=e._id,a._id=e._id,u._id=e._id,r.querySelector(".card__image").addEventListener("click",o),a.addEventListener("click",n),c.addEventListener("click",t),"b20be6075b615bb25e391ccf"!==e.owner._id&&r.querySelector(".card__delete-button").classList.add("card__delete-button-hidden"),e.likes.some((function(e){return"b20be6075b615bb25e391ccf"===e._id}))&&a.classList.add("card__like-button_is-active"),r}function o(e){var n,o=e.target.closest(".card__like-button");o.classList.toggle("card__like-button_is-active"),o.classList.contains("card__like-button_is-active")?(n=o._id,fetch("".concat(t.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){document.querySelectorAll(".card__likes").forEach((function(t){t._id===e._id&&(t.textContent=e.likes.length)}))})).catch((function(e){console.log(e)}))):function(e){fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){document.querySelectorAll(".card__likes").forEach((function(t){t._id===e._id&&(t.textContent=e.likes.length)}))})).catch((function(e){console.log(e)}))}(o._id)}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a),e.querySelector(".popup__button").textContent="Сохранить"}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function u(e){e.target.classList.contains("popup")&&c(e.currentTarget)}function i(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("popup__error_visible"),n.textContent=""}function l(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("form__submit_inactive")):(t.disabled=!0,t.classList.add("form__submit_inactive"))}function s(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");t.forEach((function(t){i(e,t),n.disabled=!0,n.classList.add("form__submit_inactive")}))}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var p=document.querySelector(".places__list"),_=document.querySelector("#card-template").content,f=document.querySelector(".profile__edit-button"),y=document.querySelector(".popup_type_edit"),m=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_new-card"),h=y.querySelector(".popup__close"),b=v.querySelector(".popup__close"),S=document.querySelector(".popup_type_image"),q=S.querySelector(".popup__close"),k=y.querySelector(".popup__form"),g=document.querySelector(".popup__input_type_name"),E=document.querySelector(".popup__input_type_description"),L=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),C=document.querySelector(".popup__input_type_card-name"),x=document.querySelector(".popup__input_type_url"),A=v.querySelector(".popup__form"),w=document.querySelector(".popup_type_delete"),P=w.querySelector(".popup__close"),O=(w.querySelector(".popup__button"),document.querySelector(".profile__image-update")),T=document.querySelector(".popup_type_update-avatar"),U=T.querySelector(".popup__close"),I=document.querySelector(".popup__input_type_update-avatar"),D=document.querySelector(".profile__image");function M(e){r(S),S.querySelector(".popup__image").src=e.target.closest(".card__image").src,S.querySelector(".popup__image").alt=e.target.closest(".card__image").alt,S.querySelector(".popup__caption").textContent=e.target.closest(".card").querySelector(".card__title").textContent}function N(e){var n=e.target.closest(".card__delete-button");r(w),w.querySelector(".popup__button").addEventListener("click",(function(){var o;e.preventDefault(),o=n._id,fetch("".concat(t.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),e.target.closest(".places__item").remove(),c(w)}))}f.addEventListener("click",(function(){r(y),g.value=L.textContent,E.value=j.textContent,s(y)})),m.addEventListener("click",(function(){r(v)})),O.addEventListener("click",(function(){r(T),s(T)})),h.addEventListener("click",(function(){c(y)})),b.addEventListener("click",(function(){c(v)})),q.addEventListener("click",(function(){c(S)})),P.addEventListener("click",(function(){c(w)})),U.addEventListener("click",(function(){c(T)})),y.addEventListener("click",u),v.addEventListener("click",u),S.addEventListener("click",u),w.addEventListener("click",u),T.addEventListener("click",u),k.addEventListener("submit",(function(e){e.preventDefault(),y.querySelector(".popup__button").textContent="Сохранение...",L.textContent=g.value,j.textContent=E.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:g.value,about:E.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),c(y)})),A.addEventListener("submit",(function(e){e.preventDefault(),p.append(n({name:C.value,link:x.value,likes:Array(0),owner:{_id:"b20be6075b615bb25e391ccf"},_id:""},N,o,M)),v.querySelector(".popup__button").textContent="Сохранение...",c(v),fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:C.value,link:x.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),A.reset(),s(A)})),T.addEventListener("submit",(function(e){e.preventDefault(),T.querySelector(".popup__button").textContent="Сохранение...",fetch("https://nomoreparties.co/v1/wff-cohort-9/users/me/avatar",{method:"PATCH",headers:{authorization:"aa983300-fa7e-4a17-a77d-fcc024d33f1c","Content-Type":"application/json"},body:JSON.stringify({avatar:avatarInput.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),D.style.backgroundImage="url(".concat(I.value,")"),c(T)})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");l(t,n),t.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),o.textContent=n,o.classList.add("popup__error_visible")}(e,t,t.validationMessage)}(e,o),l(t,n)}))}))}(e)})),Promise.all([function(){fetch("".concat(t.baseUrl,"/users/me"),{method:"GET",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){L.textContent=e.name,j.textContent=e.about,D.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.log(e)}))},function(){fetch("".concat(t.baseUrl,"/cards"),{method:"GET",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){p.append(n(e,N,o,M))}))})).catch((function(e){console.log(e)}))}]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];r(),c()})).catch((function(e){console.error(e)}))})();