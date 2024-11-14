
const myLibrary = [];


function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}


Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
};


function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  displayBooks();
}


function displayBooks() {
  const libraryDisplay = document.getElementById("libraryDisplay");
  libraryDisplay.innerHTML = ""; 

  myLibrary.forEach((book, index) => {
   
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");

   
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.isRead ? "Read" : "Not Read"}</p>
    `;

    
    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = "Toggle Read Status";
    toggleReadBtn.onclick = () => {
      book.toggleRead();
      displayBooks();
    };
    bookCard.appendChild(toggleReadBtn);

    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.onclick = () => {
      myLibrary.splice(index, 1); 
      displayBooks();
    };
    bookCard.appendChild(removeBtn);

    libraryDisplay.appendChild(bookCard);
  });
}


const formContainer = document.getElementById("formContainer");
const bookForm = document.getElementById("bookForm");
const newBookBtn = document.getElementById("newBookBtn");
const closeForm = document.getElementById("closeForm");


newBookBtn.onclick = () => {
  formContainer.classList.toggle("show");
};


closeForm.onclick = () => {
  formContainer.classList.remove("show");
};


bookForm.onsubmit = (e) => {
  e.preventDefault(); 

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;

  
  addBookToLibrary(title, author, pages, isRead);


  bookForm.reset();
  formContainer.classList.remove("show");
};


addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
displayBooks();
