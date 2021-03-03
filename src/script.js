'use strict';
import "./index.css";
import { API } from "./script/API.js";
import { Card } from "./script/Card.js";
import { CardList } from "./script/CardList.js";
import { Popup } from "./script/Popup.js";
import { UserInfo } from "./script/UserInfo.js";
import { FormValidator } from "./script/FormValidator.js";
import { Listen } from "./script/Listen.js";

const placesList = document.querySelector('.places-list');
const popupPlace = document.querySelector('.place');
const popupEdit = document.querySelector('.edit');
const popupPhoto = document.querySelector('.popup__photo');
const popupImg = popupPhoto.querySelector('.popup__img');
const buttonPlace = document.querySelector('.user-info__button');
const buttonEdit = document.querySelector('.user-info__edit');
const buttonClosePlace = document.querySelector('.popup__close_place');
const buttonCloseEdit = document.querySelector('.popup__close_edit');
const buttonClosePhoto = document.querySelector('.popup__close_photo');
const confirmAddPlace = document.querySelector('.popup__button_place');
const confirmAddEdit = document.querySelector('.popup__button_edit');
const formAdd = document.forms.new;
const formEdit = document.forms.edit;
const firstLastName = document.querySelector('#firstLastName');
const about = document.querySelector('#about');
const updateFirstLastName = document.querySelector('.user-info__name');
const updateAbout = document.querySelector('.user-info__job');
const avatar = document.querySelector('.user-info__photo');
const workload = { update: "Обновление", load: "Загрузка", resetPlace: "+", resetEdit: "Сохранить" };

const render = new CardList(placesList);
const togglePopupPlace = new Popup(popupPlace);
const togglePopupEdit = new Popup(popupEdit);
const togglePopupPhoto = new Popup(popupPhoto);
const listenPlace = new Listen(togglePopupPlace);
const listenEdit = new Listen(togglePopupEdit);
const listenPhoto = new Listen(togglePopupPhoto);
const validPlace = new FormValidator(formAdd, confirmAddPlace);
const clearvalidPlace = new Listen(validPlace);
const validEdit = new FormValidator(formEdit, confirmAddEdit);
const clearvalidEdit = new Listen(validEdit);
// Можно лучше
// Даные для соединения лучше вынести в отдельные переменные, так их проще будет редактировать
const apiClass = new API({
  baseUrl: 'https://nomoreparties.co/cohort10',
  headers: {
    authorization: '1c89954d-9b30-48ff-be4d-8a0ee0f6f716',
    'Content-Type': 'application/json'
  }
});
const listenApi = new Listen(apiClass);

const userInfoData = new UserInfo(updateFirstLastName, updateAbout, firstLastName, about);

function loading(isLoading, button, popupToggle, text) {
  if (isLoading) {
    button.textContent = text;
  } else {
    button.textContent = text;
    popupToggle.openClose();
  }
}

function updateEdit(newname, newabout) {
  updateFirstLastName.textContent = newname;
  updateAbout.textContent = newabout;
  firstLastName.setAttribute('value', newname);
  about.setAttribute('value', newabout);
}


apiClass.getCards()
  .then(result => {
    result.forEach(element => {
      const createNewCard = new Card(element.name, element.link);
      render.render(createNewCard, popupImg, togglePopupPhoto);
    });
  }).catch((err) => {
    console.log(err);
  });

apiClass.getUserInfo()
  .then((result) => {
    userInfoData.updateUserInfo(result.name, result.about);
    userInfoData.setAva(avatar, result.avatar);
  }).catch((err) => {
    console.log(err);
  });

formAdd
  .addEventListener('submit', (event) => {
    event.preventDefault();
    loading(true, confirmAddPlace, togglePopupPlace, workload.load);
    apiClass.addCard(event.target.name.value, event.target.link.value)
      .then(() => {
        loading(false, confirmAddPlace, togglePopupPlace, workload.resetPlace);
      })
      .catch((err) => {
        console.log(err);
      });
  });

formEdit
  .addEventListener('submit', (event) => {
    event.preventDefault();
    loading(true, confirmAddEdit, togglePopupEdit, workload.update);
    apiClass.editProfile(event.target.firstLastName.value, event.target.about.value)
      .then((res) => {
        updateEdit(res.name, res.about);
        loading(false, confirmAddEdit, togglePopupEdit, workload.resetEdit);
      })
      .catch((err) => {
        console.log(err);
      });
  });

listenPlace.openClose(buttonPlace);
listenPlace.openClose(buttonClosePlace);
listenEdit.openClose(buttonEdit);
listenEdit.openClose(buttonCloseEdit);
listenPhoto.openClose(buttonClosePhoto);
clearvalidPlace.popupClear(buttonPlace, formAdd, false);
clearvalidEdit.popupClear(buttonEdit, formEdit, true);

placesList.addEventListener('click', (e) => {
  const target = e.target;
  console.log(target)
  if (e.target.classList.contains('place-card__like-icon')) {
    target.classList.toggle('place-card__like-icon_liked')
  }
})