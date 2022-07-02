// Складируем все окна и запоминаем нажатие мышки
let Windows = {
  mouse_down    : false,
  element_window: null,
  element_text  : null,
  z_index       : 0,
  list          : []
};

// Создаем класс Window
const Window = class Window {

  constructor(x, y, height, width, text, element, index) {
    this.x       = x || 100;
    this.y       = y || 100;
    this.height  = height || 100;
    this.width   = width  || 100;
    this.text    = text   || "Моё новое окно";
  }

  // ${this.text} - используем es6 string templates
  get template(){
    return `<div class="top">\
              <div class="text">${this.text}</div>\ 
                <div class="close" title="Закрыть окно"></div>\
              </div>\
            <div class="content"></div>`;
  }

};

// Ждем когда загрузиться страница и будет готова
document.addEventListener('DOMContentLoaded', function(){ 
  
  // Слушаем эвент перемещение курсора
  document.addEventListener("mousemove", function onMouseMove(event){

    if (Windows.mouse_down === true && Windows.element_window !== null) {
      let width  = Windows.element_text.offsetWidth / 2;
      let height = Windows.element_text.offsetHeight / 2;

      Windows.element_window.style.left = event.clientX - width+"px";
      Windows.element_window.style.top  = event.clientY - height+"px";
    };

  });

  // Слушаем эвент нажитие ЛКМ
  document.addEventListener("mousedown", function onMouseDown(event){
    Windows.mouse_down = true;

    let element = event.target || event.srcElement;
    let isText  = element.classList.contains('text'); // Ищем класс text у элемента

    if (isText === true) {

      Windows.z_index++;

      // мы знаем что элемент с классом text вложен в 2 родительских элемента
      Windows.element_window = element.parentNode.parentNode;
      Windows.element_text   = element;
      Windows.element_window.style["z-index"] = Windows.z_index;
      return
    };

    let isClose = element.classList.contains('close'); 

    if (isClose === true) {
      delElement(element.parentNode.parentNode);
    };

  });

  // Слушаем эвент отжатие ЛКМ
  document.addEventListener("mouseup", function onMouseUp(event){
    Windows.mouse_down     = false;
    Windows.element_window = null;
    Windows.element_text   = null;
  });

});
 
// Добавляем окно
function addWindow(text){
  const newWindow = new Window(100, 100, 200, 300, text); // Инициируем новое окно
  let wrapper     = document.getElementById("wrapper");
  let frame       = document.createElement('div');

  frame.classList.add("window"); // Добавляем css класс к окну
  frame.innerHTML += newWindow.template;

  frame.style["z-index"] = Windows.z_index;

  wrapper.appendChild(frame); // Добавляем окно в DOM дерево
};

// Функция удаления окошка
function delElement(element){
  let wrapper = document.getElementById("wrapper");

  wrapper.removeChild(element);
};

/*
  P.S. Хотел заморочиться сделать аналог рабочего стола MacOS :)
*/