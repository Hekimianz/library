/* eslint-disable no-loop-func */
/* eslint-disable no-alert */
/* eslint-disable func-names */

// DOM Variables
const readCheckboxs = document.getElementsByClassName("readStatus");
const bookCards = document.getElementsByClassName("bookCard");
const newBookBtn = document.querySelector("#addBook-btn");
const mainContainer = document.querySelector("#main");
const form = document.getElementById("form");
const submitForm = document.getElementById("submit-form");
const closeForm = document.getElementById("close-form");
const uTitle = document.getElementById("input-name");
const uAuthor = document.getElementById("input-author");
const uPages = document.getElementById("input-pages");
const uStatus = document.getElementById("input-read");

// array that stores all books objects.
const library = [];

// object constructor for book objects.
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages. ${this.status}`;
};

// add placeholder books.
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", true);

const projectHM = new Book("Project Hail Mary", "Andy Weir", "496", true);

const alice = new Book("Alice in Wonderland", "Lewis Carroll", "83", false);
library.push(theHobbit, projectHM, alice);

// add existing books to DOM

const displayOldBooks = function () {
  for (let i = 0; i < library.length; i += 1) {
    // create cards
    const card = document.createElement("div");
    card.classList.add("bookCard");
    card.setAttribute("data-index", i);
    mainContainer.appendChild(card);
    // create card info
    const pName = document.createElement("p");
    const pAuthor = document.createElement("p");
    const pPages = document.createElement("p");
    const pStatus = document.createElement("p");
    pName.classList.add("bookInfo", "bookName");
    pAuthor.classList.add("bookInfo", "bookAuthor");
    pPages.classList.add("bookInfo", "bookPages");
    pStatus.classList.add("bookInfo", "bookStatus");
    pName.innerText = library[i].title;
    pAuthor.innerText = library[i].author;
    pPages.innerText = `${library[i].pages} pages`;
    card.appendChild(pName);
    card.appendChild(pAuthor);
    card.appendChild(pPages);
    card.appendChild(pStatus);
    const readCheckbox = document.createElement("input");
    readCheckbox.setAttribute("type", "checkbox");
    readCheckbox.classList.add("readStatus");
    if (library[i].status === false) {
      card.style.background =
        "linear-gradient(180deg, rgba(255, 255, 255, 1) 45%, rgba(255, 254, 197, 1) 100%)";
      readCheckbox.checked = false;
    } else if (library[i].status === true) {
      card.style.background =
        "linear-gradient(180deg, rgba(255,255,255,1) 45%, rgba(197,255,207,1) 100%)";
      readCheckbox.checked = true;
    }
    pStatus.innerText = "Read: ";
    pStatus.appendChild(readCheckbox);
    // create del-btn
    const delBtn = document.createElement("img");
    delBtn.classList.add("delete-btn");
    delBtn.setAttribute("src", "delete.svg");
    card.appendChild(delBtn);
    delBtn.addEventListener("click", (e) => {
      const item = e.currentTarget.parentNode;
      const userInput = item.dataset.index;
      item.remove();
      library.splice(userInput, 1);
      for (let k = 0; k < bookCards.length; k += 1) {
        bookCards[k].setAttribute("data-index", k);
      }
    });
    delBtn.addEventListener("mouseenter", () => {
      card.style.background =
        "linear-gradient(180deg, rgba(255,255,255,1) 45%, rgba(255,197,197,1) 100%)";
      delBtn.style.transition = "all .5s";
      delBtn.style.transform = "scale(1.3)";
    });
    delBtn.addEventListener("mouseleave", () => {
      if (readCheckbox.checked === false) {
        card.style.background =
          "linear-gradient(180deg, rgba(255, 255, 255, 1) 45%, rgba(255, 254, 197, 1) 100%)";
      } else if (readCheckbox.checked === true) {
        card.style.background =
          "linear-gradient(180deg, rgba(255,255,255,1) 45%, rgba(197,255,207,1) 100%)";
      }

      delBtn.style.transition = "all .5s";
      delBtn.style.transform = "scale(1)";
    });
    readCheckboxs[i].addEventListener("click", () => {
      if (readCheckbox.checked === false) {
        card.style.background =
          "linear-gradient(180deg, rgba(255, 255, 255, 1) 45%, rgba(255, 254, 197, 1) 100%)";
        library[i].status = false;
      } else if (readCheckbox.checked === true) {
        card.style.background =
          "linear-gradient(180deg, rgba(255,255,255,1) 45%, rgba(197,255,207,1) 100%)";
        library[i].status = true;
      }
    });
  }
};
displayOldBooks();
// add new books from array to DOM
const displayNewBooks = function () {
  // create cards
  const card = document.createElement("div");
  card.classList.add("bookCard");
  card.setAttribute("data-index", library.length - 1);
  mainContainer.appendChild(card);
  // create card info
  const pName = document.createElement("p");
  const pAuthor = document.createElement("p");
  const pPages = document.createElement("p");
  const pStatus = document.createElement("p");
  pName.classList.add("bookInfo", "bookName");
  pAuthor.classList.add("bookInfo", "bookAuthor");
  pPages.classList.add("bookInfo", "bookPages");
  pStatus.classList.add("bookInfo", "bookStatus");
  pName.innerText = library[library.length - 1].title;
  pAuthor.innerText = library[library.length - 1].author;
  pPages.innerText = `${library[library.length - 1].pages} pages`;
  card.appendChild(pName);
  card.appendChild(pAuthor);
  card.appendChild(pPages);
  card.appendChild(pStatus);
  const readCheckbox = document.createElement("input");
  readCheckbox.setAttribute("type", "checkbox");
  readCheckbox.classList.add("readStatus");
  readCheckbox.addEventListener("click", () => {
    if (readCheckbox.checked === false) {
      card.style.background =
        "linear-gradient(180deg, rgba(255, 255, 255, 1) 45%, rgba(255, 254, 197, 1) 100%)";
      library[[library.length - 1]].status = false;
    } else if (readCheckbox.checked === true) {
      card.style.background =
        "linear-gradient(180deg, rgba(255,255,255,1) 45%, rgba(197,255,207,1) 100%)";
      library[[library.length - 1]].status = true;
    }
  });
  if (library[library.length - 1].status === false) {
    card.style.background =
      "linear-gradient(180deg, rgba(255, 255, 255, 1) 45%, rgba(255, 254, 197, 1) 100%)";
    readCheckbox.checked = false;
  } else if (library[library.length - 1].status === true) {
    card.style.background =
      "linear-gradient(180deg, rgba(255,255,255,1) 45%, rgba(197,255,207,1) 100%)";
    readCheckbox.checked = true;
  }
  pStatus.innerText = "Read: ";
  pStatus.appendChild(readCheckbox);
  // create del-btn
  const delBtn = document.createElement("img");
  delBtn.classList.add("delete-btn");
  delBtn.setAttribute("src", "delete.svg");
  card.appendChild(delBtn);
  delBtn.addEventListener("click", (e) => {
    const item = e.currentTarget.parentNode;
    const userInput = item.dataset.index;
    item.remove();
    library.splice(userInput, 1);
    for (let k = 0; k < bookCards.length; k += 1) {
      bookCards[k].setAttribute("data-index", k);
    }
  });
  delBtn.addEventListener("mouseenter", () => {
    card.style.background =
      "linear-gradient(180deg, rgba(255,255,255,1) 45%, rgba(255,197,197,1) 100%)";
    delBtn.style.transition = "all .5s";
    delBtn.style.transform = "scale(1.3)";
  });
  delBtn.addEventListener("mouseleave", () => {
    if (readCheckbox.checked === false) {
      card.style.background =
        "linear-gradient(180deg, rgba(255, 255, 255, 1) 45%, rgba(255, 254, 197, 1) 100%)";
    } else if (readCheckbox.checked === true) {
      card.style.background =
        "linear-gradient(180deg, rgba(255,255,255,1) 45%, rgba(197,255,207,1) 100%)";
    }

    delBtn.style.transition = "all .5s";
    delBtn.style.transform = "scale(1)";
  });
};

// function that takes user input to create new book object
const userBook = () => {
  const uBook = new Book(
    uTitle.value,
    uAuthor.value,
    uPages.value,
    uStatus.checked
  );
  library.push(uBook);
};

// new book button click event
newBookBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

// submit form
submitForm.addEventListener("click", () => {
  if (uTitle.value !== "" && uAuthor.value !== "" && uPages.value !== "") {
    form.style.display = "none";
    userBook();
    displayNewBooks();
    form.reset();
  }
});

closeForm.addEventListener("click", () => {
  form.style.display = "none";
  form.reset();
});
