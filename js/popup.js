const addButton = document.querySelector(".add-button");
const popupContainer = document.querySelector(".popup-container");
const popupSlides = document.querySelectorAll(".popup-slide");
const nextButton = document.querySelectorAll(".next");
const prevButton = document.querySelectorAll(".prev");

let currentSlide = 0;

addButton.addEventListener("click", () => {
  popupContainer.style.display = "block";
  showSlide(currentSlide);
});

nextButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide >= popupSlides.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  });
});

prevButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = popupSlides.length - 1;
    }
    showSlide(currentSlide);
  });
});

popupContainer.addEventListener("click", (event) => {
  if (event.target === popupContainer) {
    popupContainer.style.display = "none";
  }
});

function showSlide(slideIndex) {
  for (let i = 0; i < popupSlides.length; i++) {
    popupSlides[i].style.display = "none";
  }
  popupSlides[slideIndex].style.display = "block";
}


// Second pop-up container
const actButton = document.querySelector(".edit-button");
const popupContainer2 = document.querySelector(".popup-container2");
const popupSlides2 = document.querySelectorAll(".popup-slide2");
const nextButton2 = document.querySelectorAll(".next2");
const prevButton2 = document.querySelectorAll(".prev2");

let currentSlide2 = 0;

actButton.addEventListener("click", () => {
  popupContainer2.style.display = "block";
  showSlide2(currentSlide2);
});

nextButton2.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentSlide2++;
    if (currentSlide2 >= popupSlides2.length) {
      currentSlide2 = 0;
    }
    showSlide2(currentSlide2);
  });
});

prevButton2.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentSlide2--;
    if (currentSlide2 < 0) {
      currentSlide2 = popupSlides2.length - 1;
    }
    showSlide2(currentSlide2);
  });
});

popupContainer2.addEventListener("click", (event) => {
  if (event.target === popupContainer2) {
    popupContainer2.style.display = "none";
  }
});

function showSlide2(slideIndex) {
  for (let i = 0; i < popupSlides2.length; i++) {
    popupSlides2[i].style.display = "none";
  }
  popupSlides2[slideIndex].style.display = "block";
}
