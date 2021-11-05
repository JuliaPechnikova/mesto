export default class ProfilePhoto {
  constructor(profilePhotoSelector) {
    this._profilePhoto = document.querySelector(profilePhotoSelector);
  }

  setUserPhoto(profileInputs) {
    this._profilePhoto.src = profileInputs.avatar;
  }
}
