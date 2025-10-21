let homeSectionEl = document.getElementById("homeSection");
let contactContainerEl = document.getElementById("contactContainer");
let mobileBtnEl = document.getElementById("mobileBtn");
let pcBtnEl = document.getElementById("pcBtn");
let saveBtnEl = document.getElementById("saveBtn");
let formSectionEl = document.getElementById("formSection");
let updateBtnEl = document.getElementById("updateBtn");
let formNameEl = document.getElementById("formName");
let formNumberEl = document.getElementById("formNumber");
let SearchContactEl = document.getElementById("SearchContact");

let API = "https://phonebook-server-m40k.onrender.com";
let allContacts = [];
let contactId = "";

function toggleElements(element) {
  homeSectionEl.classList.add("text-hide");
  formSectionEl.classList.remove("hide");
  element.classList.add("hide");
}

function getValidInputs(fullName, phoneNumber) {
  let isValidInput = true;
  if (fullName == "" || !isNaN(Number(fullName))) {
    isValidInput = false;
    alert("Please Enter valid Name");
    return isValidInput;
  }

  if (phoneNumber == "" || isNaN(Number(phoneNumber))) {
    isValidInput = false;
    alert("Please Enter valid Number");
    return isValidInput;
  }

  return isValidInput;
}

mobileBtnEl.addEventListener("click", (event) => {
  toggleElements(event.target);
});

pcBtnEl.addEventListener("click", (event) => {
  toggleElements(event.target);
});

function onEditContact(id) {
  contactId = id;
  homeSectionEl.classList.add("text-hide");
  formSectionEl.classList.remove("hide");
  if (window.innerWidth >= 800) {
    pcBtnEl.classList.add("hide");
  } else {
    mobileBtnEl.classList.add("hide");
  }
  saveBtnEl.classList.add("hide");
  updateBtnEl.classList.remove("hide");
  let contact = allContacts.find((item) => item._id === id);
  formNameEl.value = contact.fullName;
  formNumberEl.value = contact.phoneNumber;
}

saveBtnEl.addEventListener("click", async (event) => {
  event.preventDefault();

  const fullName = formNameEl.value;
  const phoneNumber = formNumberEl.value.trim();
  //console.log(phoneNumber);
  //console.log(isNaN(Number(phoneNumber)));
  let isValidInput = getValidInputs(fullName, phoneNumber);

  if (isValidInput) {
    homeSectionEl.classList.remove("text-hide");
    formSectionEl.classList.add("hide");
    if (mobileBtnEl.classList.contains("hide")) {
      mobileBtnEl.classList.remove("hide");
    } else {
      pcBtnEl.classList.remove("hide");
    }
    try {
      const response = await fetch(`${API}/api/save/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, phoneNumber }),
      });
      if (response) {
        const data = await response.json();
        alert(data.message);
        getAllContacts();
        document.querySelector("form").reset();
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
});

async function updateContact(fullName, phoneNumber) {
  try {
    const response = await fetch(`${API}/api/update/contact/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, phoneNumber }),
    });
    if (response) {
      const data = await response.json();
      alert(data.message);
      getAllContacts();
      document.querySelector("form").reset();
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

updateBtnEl.addEventListener("click", (event) => {
  event.preventDefault();
  let contactName = formNameEl.value;
  let contactNumber = formNumberEl.value;
  let isValidInput = getValidInputs(contactName, contactNumber);
  if (isValidInput) {
    homeSectionEl.classList.remove("text-hide");
    formSectionEl.classList.add("hide");
    if (window.innerWidth >= 800) {
      pcBtnEl.classList.remove("hide");
    } else {
      mobileBtnEl.classList.remove("hide");
    }
    saveBtnEl.classList.remove("hide");
    updateBtnEl.classList.add("hide");

    updateContact(contactName, contactNumber);
  }
});

function renderContacts() {
  allContacts.forEach((element) => {
    const name = element.fullName;
    const phoneNumber = element.phoneNumber;
    const elementId = element._id;
    contactContainerEl.innerHTML += `<li class="contact-card">
            <div class="initial">
              <span>${name[0].toUpperCase()}</span>
            </div>
            <div>
              <p class="name">${name}</p>
              <p class="number">${phoneNumber}</p>
            </div>
            <div class="contact-operations-container">
              <button class="operations-btn" onclick=onEditContact('${elementId}')>
                <span class="material-symbols-outlined" > edit </span>
              </button>
              <button class="operations-btn" onclick=onDeleteContact('${elementId}')>
                <span class="material-symbols-outlined"> delete </span>
              </button>
            </div>
          </li>`;
  });
}

async function getAllContacts() {
  try {
    const response = await fetch(`${API}/api/all/contacts`);
    const data = await response.json();
    allContacts = data;

    //console.log(allContacts);
    contactContainerEl.innerHTML = "";
    renderContacts();
  } catch (error) {
    console.error(error);
  }
}

async function onDeleteContact(delId) {
  try {
    const response = await fetch(`${API}/api/delete/contact/${delId}`, {
      method: "DELETE",
    });
    if (response) {
      const data = await response.json();
      alert(data.message);
      getAllContacts();
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

getAllContacts();

SearchContactEl.addEventListener("search", (event) => {
  const searchtext = SearchContactEl.value;
  if (searchtext == "") {
    getAllContacts();
  } else {
    const filteredContacts = allContacts.filter((element) => {
      return (
        element.fullName.toLowerCase().includes(searchtext.toLowerCase()) ||
        element.phoneNumber.toString().includes(searchtext.toLowerCase())
      );
    });
    if (filteredContacts.length !== 0) {
      allContacts = filteredContacts;
      contactContainerEl.innerHTML = "";
      renderContacts();
    } else {
      contactContainerEl.innerHTML = `<li>No Contacts Found</li>`;
    }
  }
});

SearchContactEl.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    getAllContacts();
  }
});

// onDeleteContact("68f78b78b62cc9bb59217c74");
