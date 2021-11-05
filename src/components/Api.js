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

  setCard(cardLink, cardName){
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        link: cardLink,
        name: cardName
      })
    })
    .then(this.serverResponseChecker)
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}users/me`, {
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

  putCardLikes(cardID) {
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardID
      })
    })
    .then(this.serverResponseChecker)
  }

  deleteCardLikes(likeID) {
    return fetch(`${this._baseUrl}cards/likes/${likeID}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: likeID
      })
    })
    .then(this.serverResponseChecker)
  }

  setUserAvatar(userPhoto) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userPhoto
      })
    })
    .then(this.serverResponseChecker)
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardID
      })
    })
    .then(this.serverResponseChecker)
  }
}
