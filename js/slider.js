var sliderContain = document.querySelector('#sliderContainer');
var buttonSlide = document.getElementsByClassName('button_slide');
var elements = document.getElementsByClassName('slider');

sliderContain.addEventListener('click', function (event) {
    if (event.target.classList.contains('next')) {
        showNext();
    }
    else if (event.target.classList.contains('prev')) {
        showPrev();
    }
    else if (event.target.classList.contains('button_slide')) {
        index = parseInt(event.target.dataset.sld);
        currentDay(index);
    }
})

function currentDay() {
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('currentSlide');
    }
    for (var i = 0; i < buttonSlide.length; i++) {
        buttonSlide[i].classList.remove('active');
    }
    buttonSlide[index].classList.add('active');
    elements[index].classList.add('currentSlide');
}

function showNext() {
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('currentSlide')) {
            elements[i].classList.remove('currentSlide');
            buttonSlide[i].classList.remove('active');
            if (i === elements.length - 1) {
                elements[0].classList.add('currentSlide');
                buttonSlide[0].classList.add('active');
                break;
            }
            elements[i].nextElementSibling.classList.add('currentSlide');
            buttonSlide[i].nextElementSibling.classList.add('active');
            break;
        }
    }
}

function showPrev() {
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('currentSlide')) {
            elements[i].classList.remove('currentSlide');
            buttonSlide[i].classList.remove('active');
            if (i === 0) {
                elements[elements.length - 1].classList.add('currentSlide');
                buttonSlide[elements.length - 1].classList.add('active');
                break;
            }
            elements[i].previousElementSibling.classList.add('currentSlide');
            buttonSlide[i].previousElementSibling.classList.add('active');
            break;
        }
    }
}


