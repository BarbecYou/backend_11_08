import {Book} from './IBook';
import {PaperBook} from './PaperBook';
import {EBook} from './EBook';

let books: Book[] = [];
let booksAmount: number = 0;
let freeBooksAmount: number = 0;
let booksPriceTotal: number = 0;

function testRegex(regex: RegExp, text: string): boolean {
    let valid = false;
    valid = regex.test(text);
    return valid;
}

document.getElementById('submit')!.addEventListener('click', () => {

    document.getElementById('titleInputLabel')!.classList.remove('wrong-field');
    document.getElementById('priceInputLabel')!.classList.remove('wrong-field');
    document.getElementById('sizeInputLabel')!.classList.remove('wrong-field');
    document.getElementById('isbnInputLabel')!.classList.remove('wrong-field');

    let isEBook: boolean = (document.querySelector('input[name="bookTypeRadio"]:checked') as HTMLInputElement).value == 'paperBook' ? false : true;
    let tempBookTitle: string = (document.getElementById('titleInput') as HTMLInputElement).value;
    let tempBookPrice: number = Number((document.getElementById('priceInput') as HTMLInputElement).value);
    let tempBookSize: number = Number((document.getElementById('sizeInput') as HTMLInputElement).value);
    let tempBookISBN: string = (document.getElementById('isbnInput') as HTMLInputElement).value;

    let bookNamePattern = /\S+/;
    let isbnPattern = /[0-9]{13}/;

    let nameValid = testRegex(bookNamePattern, tempBookTitle)
    let priceValid = tempBookPrice >= 0;
    let sizeValid = tempBookSize > 0;
    let isbnValid = /* testRegex(isbnPattern, tempBookISBN) */ true;

    const allCorrect: boolean = ![nameValid, priceValid, sizeValid, isbnValid].includes(false)

    if (allCorrect) {
        (document.getElementById('form-inputs') as HTMLFormElement).reset();
        if (!isEBook){
            let tempBook: PaperBook = {"title": tempBookTitle, "price": tempBookPrice, "weight": tempBookSize, "isbn": tempBookISBN} 
            booksInfoCalculate(tempBook);
        }else {
            let tempBook: EBook = {"title": tempBookTitle, "price": tempBookPrice, "size": tempBookSize, "isbn": tempBookISBN} 
            booksInfoCalculate(tempBook);
        }
    }else {
        if (!nameValid){
            document.getElementById('titleInputLabel')!.classList.add('wrong-field');
        }if (!priceValid){
            document.getElementById('priceInputLabel')!.classList.add('wrong-field');
        }if (!sizeValid){
            document.getElementById('sizeInputLabel')!.classList.add('wrong-field');
        }if (!isbnValid){
            document.getElementById('isbnInputLabel')!.classList.add('wrong-field');
        }
    }
}
)

function booksInfoCalculate(book: Book){
    books.push(book);

    booksAmount++;
    document.getElementById('books-amount')!.textContent = `K??nyvek darabsz??ma: ${booksAmount}`;

    if (book.price == 0) {
       freeBooksAmount++;
    }
    document.getElementById('free-books-amount')!.textContent = `Ingyenes k??nyvek darabsz??ma: ${freeBooksAmount}`;

    booksPriceTotal += book.price;
    document.getElementById('books-price-total')!.textContent = `K??nyvek ??ra ??sszesen: ${booksPriceTotal}`;
}