let homeSectionEl = document.getElementById("homeSection");
let mobileBtnEl = document.getElementById("mobileBtn");
let pcBtnEl = document.getElementById("pcBtn");
let saveBtnEl = document.getElementById("saveBtn");
let formSectionEl = document.getElementById("formSection");

function toggleElements(element) {
  homeSectionEl.classList.add("text-hide");
  formSectionEl.classList.remove("hide");
  element.classList.add("hide");
}

mobileBtnEl.addEventListener("click", (event) => {
  toggleElements(event.target);
});

pcBtnEl.addEventListener("click", (event) => {
  toggleElements(event.target);
});

saveBtnEl.addEventListener("click", (event) => {
  event.preventDefault();
  homeSectionEl.classList.remove("text-hide");
  formSectionEl.classList.add("hide");
  if (mobileBtnEl.classList.contains("hide")) {
    mobileBtnEl.classList.remove("hide");
  } else {
    pcBtnEl.classList.remove("hide");
  }
});
