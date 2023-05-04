const chatIcon = document.getElementById("chat-icon");
const chatPopup = document.getElementById("chat-popup");
const exitButton = document.getElementById("exit-btn");
const faqButtons = document.querySelectorAll(".faq-btn");
const slides = chatPopup.querySelectorAll(".chat-slide");
const backButtons = document.querySelectorAll(".back-btn");

const previousSlides = []; // array to keep track of previous slides

// Open chat pop-up when chat icon is clicked
chatIcon.addEventListener("click", () => {
  chatPopup.style.display = "block";
});

// Close chat pop-up when close button is clicked
exitButton.addEventListener("click", () => {
  chatPopup.style.display = "none";
});

// Close chat pop-up when user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === chatPopup) {
    chatPopup.style.display = "none";
  }
});

// Add click event listener to FAQ buttons
faqButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const slideId = button.dataset.slide;
    const slide = chatPopup.querySelector(
      `.chat-slide[data-id="${slideId}"]`
    );
    if (slide) {
      // hide all slides
      slides.forEach((s) => s.classList.remove("active"));
      // show the selected slide
      slide.classList.add("active");
      // show the second level of faq buttons if applicable
      if (slideId === "1") {
        const secondFaqButton = slide.querySelector(
          ".user-message:nth-child(2) .faq-btn"
        );
        if (secondFaqButton) {
          secondFaqButton.style.display = "block";
        }
      }
      // add current slide to previousSlides array
      previousSlides.push(slide);
    }
  });
});

// Add click event listener to back buttons
backButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    // remove current slide from previousSlides array
    previousSlides.pop();
    // get previous slide
    const previousSlide = previousSlides.pop();
    if (previousSlide) {
      // hide all slides
      slides.forEach((s) => s.classList.remove("active"));
      // show the previous slide
      previousSlide.classList.add("active");
    } else {
      // if there's no previous slide, it means we're on the first slide (i.e., homepage)
      // so hide all slides and display the homepage slide
      slides.forEach((s) => s.classList.remove("active"));
      chatPopup.querySelector('.chat-slide[data-id="1"]').classList.add("active");
    }
    // check if the previous slide is the homepage
    if (previousSlides.length > 0 && previousSlides[previousSlides.length - 1].id === "1") {
      // remove all previous slides from the array
      previousSlides.length = 0;
    }
  });
});

