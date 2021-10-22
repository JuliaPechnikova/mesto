export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
  }

  getUserInfo(usernameInput, descriptionInput) {
    usernameInput.value = this._profileName.textContent;
    descriptionInput.value = this._profileDescription.textContent;
  }

  setUserInfo(profileInputs) {
    this._profileName.textContent = profileInputs.profilename;
    this._profileDescription.textContent = profileInputs.description; 
  }
}
