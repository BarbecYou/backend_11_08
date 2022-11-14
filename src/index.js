"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let books = [];
let booksAmount = 0;
let freeBooksAmount = 0;
let booksPriceTotal = 0;
function testRegex(regex, text) {
    let valid = false;
    valid = regex.test(text);
    return valid;
}
document.getElementById('submit').addEventListener('click', () => {
    document.getElementById('titleInputLabel').classList.remove('wrong-field');
    document.getElementById('priceInputLabel').classList.remove('wrong-field');
    document.getElementById('sizeInputLabel').classList.remove('wrong-field');
    document.getElementById('isbnInputLabel').classList.remove('wrong-field');
    let isEBook = document.querySelector('input[name="bookTypeRadio"]:checked').value == 'paperBook' ? false : true;
    let tempBookTitle = document.getElementById('titleInput').value;
    let tempBookPrice = Number(document.getElementById('priceInput').value);
    let tempBookSize = Number(document.getElementById('sizeInput').value);
    let tempBookISBN = document.getElementById('isbnInput').value;
    let bookNamePattern = /\S+/;
    let isbnPattern = /[0-9]{13}/;
    let nameValid = testRegex(bookNamePattern, tempBookTitle);
    let priceValid = tempBookPrice >= 0;
    let sizeValid = tempBookSize > 0;
    let isbnValid = /* testRegex(isbnPattern, tempBookISBN) */ true;
    const allCorrect = ![nameValid, priceValid, sizeValid, isbnValid].includes(false);
    if (allCorrect) {
        document.getElementById('form-inputs').reset();
        if (!isEBook) {
            let tempBook = { "title": tempBookTitle, "price": tempBookPrice, "weight": tempBookSize, "isbn": tempBookISBN };
            booksInfoCalculate(tempBook);
        }
        else {
            let tempBook = { "title": tempBookTitle, "price": tempBookPrice, "size": tempBookSize, "isbn": tempBookISBN };
            booksInfoCalculate(tempBook);
        }
    }
    else {
        if (!nameValid) {
            document.getElementById('titleInputLabel').classList.add('wrong-field');
        }
        if (!priceValid) {
            document.getElementById('priceInputLabel').classList.add('wrong-field');
        }
        if (!sizeValid) {
            document.getElementById('sizeInputLabel').classList.add('wrong-field');
        }
        if (!isbnValid) {
            document.getElementById('isbnInputLabel').classList.add('wrong-field');
        }
    }
});
function booksInfoCalculate(book) {
    books.push(book);
    booksAmount++;
    document.getElementById('books-amount').textContent = `Könyvek darabszáma: ${booksAmount}`;
    if (book.price == 0) {
        freeBooksAmount++;
    }
    document.getElementById('free-books-amount').textContent = `Ingyenes könyvek darabszáma: ${freeBooksAmount}`;
    booksPriceTotal += book.price;
    document.getElementById('books-price-total').textContent = `Könyvek ára összesen: ${booksPriceTotal}`;
}
