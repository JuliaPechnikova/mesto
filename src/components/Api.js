import { data } from "jquery";

export default class Api {
  constructor(content) {
    this._baseUrl = content.baseUrl;
    this._headers = content.headers;
  }

  serverResponseChecker(res){
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this.serverResponseChecker)
  }

  setCard(cardName, cardLink){
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(this.serverResponseChecker)
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}users`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this.serverResponseChecker)
  }

  getAllInfo(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  setUserProfile(profileName, profileDescription){
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileDescription
      })
    })
    .then(this.serverResponseChecker)
  }

  // другие методы работы с API
}
