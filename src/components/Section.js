export default class Section {
  constructor({ items, renderer }, container){
    this._items = items; //данные, добавляемые при инициализации класса на страницу
    this._renderer = renderer; //создание и отрисовка данных на странице
    this._container = container; //контейнер в который добавляем созданные элементы
  }

  addItem(data) {
    this._container.prepend(data);
  }

  renderItem() {
    this._items.forEach((data) => {
      this._renderer(data);
    })
  }
}

