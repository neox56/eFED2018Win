function buttonClick(k) {
  showButtons(buttonItem = k);
}

var buttonItem = 1;
showButtons(buttonItem);


function showButtons(k) {
  var buttons = document.getElementsByClassName("myButtons");
  (k > buttons.length) ? buttonItem = 1: false;
  (k < 1) ? buttonItem = button.length: false;
  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
  buttons[buttonItem - 1].style.display = "block";
}