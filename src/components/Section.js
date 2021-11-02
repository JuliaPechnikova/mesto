export default class Section {
  constructor({ renderer }, container){
    this._renderer = renderer; //создание и отрисовка данных на странице
    this._container = container; //контейнер в который добавляем созданные элементы
  }

  addItem(data) {
    this._container.prepend(data);
  }

  renderItem(cards) {
    cards.forEach((data) => {
      this._renderer(data);
    })
  }
}

