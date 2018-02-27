//declare Book object
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//declare UI object
function UI() { };
//add book prototype
UI.prototype.addBookToList = function (book) {
    const bookList = document.getElementById("book-list");
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    bookList.appendChild(tr);
}
//clear fields prototype
UI.prototype.clearFields = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}
//remove item prototype
UI.prototype.removeItem = function (target) {
    if (target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
}
// alert prototype
UI.prototype.showAlert = function(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const form = document.querySelector("#book-form");
    const container = document.querySelector(".container");

    container.insertBefore(div, form);

    setTimeout(function() {
        div.style.display = "none";
    }, 3000);
}
//add book event listener
document.querySelector("#book-form").addEventListener("submit", function (e) {
    const title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value

    const book = new Book(title, author, isbn);

    const ui = new UI();
    if (title === "" || author === "" || isbn === "") {
        ui.showAlert(`Please fill in all fields`, `error`);
    } else {
        ui.addBookToList(book);

        ui.clearFields();

        ui.showAlert(`Book added`, `success`);
    }

    
    e.preventDefault();
})
//remove book event listener
document.querySelector("#book-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.removeItem(e.target);
})