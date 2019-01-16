function stepSlides(k) {
  showSlides(slideItem += k);
}

var slideItem = 1;
showSlides(slideItem);


function currentSlide(k) {
  showSlides(slideItem = k);
}

function showSlides(k) {
  var slides = document.getElementsByClassName("slider");
  var button_slide = document.getElementsByClassName("button_slide");
  (k > slides.length) ? slideItem = 1: false;
  (k < 1) ? slideItem = slides.length: false;

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < button_slide.length; i++) {
    button_slide[i].className = button_slide[i].className.replace(" active", "");
  }
  slides[slideItem - 1].style.display = "block";
  button_slide[slideItem - 1].className += " active";
}