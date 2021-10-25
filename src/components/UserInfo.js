export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
  }

  getUserInfo() {
    return {
      usernameInput: this._profileName.textContent,
      descriptionInput: this._profileDescription.textContent
    }
  }

  setUserInfo(profileInputs) {
    this._profileName.textContent = profileInputs.profilename;
    this._profileDescription.textContent = profileInputs.description; 
  }
}
