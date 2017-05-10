import { Component, OnInit } from '@angular/core';
import { BookService} from '../books/book.service';

@Component({
  selector: 'new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  book:any;

  constructor(private bookService:BookService) { }

  ngOnInit() {

    this.book = {};
  
  }

  addBook(book:any) {
    console.log('book',book);
    this.bookService.addBook(book).then((resp) => {
      console.log('response from addBook....', resp);
    if(resp) {
      this.book.resp;
    }
    });
  }

}
