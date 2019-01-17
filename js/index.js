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
  if (k > slides.length) {
    slideItem = 1;
  }
  if (k < 1) {
    slideItem = slides.length
  }


  for (i = 0; i < slides.length; i++) {
    if (slides[i].style.display === 'block') {
      slides[i].style.display = "none";
    }
    button_slide[i].classList.remove('active');
  }

  slides[slideItem - 1].style.display = "block";
  button_slide[slideItem - 1].classList.add('active');
}