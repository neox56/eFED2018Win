/* eslint-disable linebreak-style */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
const iconArr = document.getElementsByClassName('iconGraph');
const buttonArr = document.getElementsByClassName('clickButton');
const buttonContainer = document.getElementById('buttons_container');

buttonContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('clickButton')){
        index = parseInt(event.target.dataset.btn);
        buttonClick(index);
    }
});

function buttonClick() {
    for (var i = 0; i < iconArr.length; i++) {
        iconArr[i].classList.remove('activeGraph');
    }
    for (var i = 0; i < buttonArr.length; i++) {
        buttonArr[i].classList.remove('activeButton');
    }
    iconArr[index].classList.add('activeGraph');
    buttonArr[index].classList.add('activeButton');
}
