let homeSectionEl = document.getElementById("homeSection");
let contactContainerEl = document.getElementById("contactContainer");
let mobileBtnEl = document.getElementById("mobileBtn");
let pcBtnEl = document.getElementById("pcBtn");
let saveBtnEl = document.getElementById("saveBtn");
let formSectionEl = document.getElementById("formSection");
let API = "https://phonebook-server-m40k.onrender.com";
let allContacts = [];

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

function renderContacts() {
  allContacts.forEach((element) => {
    let name = element.fullName;
    let phoneNumber = element.phoneNumber;
    contactContainerEl.innerHTML += `<li class="contact-card">
            <div class="initial">
              <span>${name[0].toUpperCase()}</span>
            </div>
            <div>
              <p class="name">${name}</p>
              <p class="number">${phoneNumber}</p>
            </div>
            <div class="contact-operations-container">
              <button class="operations-btn">
                <span class="material-symbols-outlined"> edit </span>
              </button>
              <button class="operations-btn">
                <span class="material-symbols-outlined"> delete </span>
              </button>
            </div>
          </li>`;
  });
}

async function getAllContacts() {
  try {
    let response = await fetch(`${API}/api/all/contacts`);
    let data = await response.json();
    allContacts = data;

    console.log(allContacts);
    renderContacts();
  } catch (error) {
    console.error(error);
  }
}

getAllContacts();
