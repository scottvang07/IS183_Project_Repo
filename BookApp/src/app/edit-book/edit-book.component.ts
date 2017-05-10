import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from '../books/book.service';

@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: any;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    let bookId = this.activatedRoute.snapshot.params['id'];
    console.log('bookId', bookId);
    this.bookService.getBookById(bookId).then((resp) => {
      this.book = resp;
      console.log('resp from getBookbyId from edit book component', resp);
    });
  }

  editBook(book) {
    let id = book['_id'];
    delete book['_id'];
    delete book['__v'];
    console.log('id', id);
    this.bookService.updateBook(id, book).then((resp) => {
      console.log('resp from edit book comonennet', resp);
      if(resp) {
        this.book = resp;
        this.goToHome();
      }
    });
  }

  goToHome() {
    this.router.navigate(['']);
  };
}
