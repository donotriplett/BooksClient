import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms"
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  useBtn = false
  createBook: FormGroup
  books = []
  genres = ["Science Fiction", "Satire", "Drama", "Action", "Adventure", "Romance", "Mystery", "Horror", "Self Help", "Health", "Guide", "Travel", "Children", "Religion", "Science", "History", "Math", "Anthology", "Poetry", "Encyclopedias", "Dictionaries", "Comics", "Art", "Cookbooks", "Diaries", "Journals", "Prayer", "Series", "Trilogy", "Biographies", "Autobiographies", "Fantasy"]
  ratings = [
    {value: 1, view: "⭐"},
    {value: 2, view: "⭐⭐"},
    {value: 3, view: "⭐⭐⭐"},
    {value: 4, view: "⭐⭐⭐⭐"},
    {value: 5, view: "⭐⭐⭐⭐⭐"},
  ]


  constructor(private _fb: FormBuilder, private _dbServie: DatabaseService) {
    setTimeout(() => {
      this.useBtn = true
    }, 3000)
  }

  ngOnInit() {
    this.createBook = this._fb.group({
      nameOfBook: new FormControl(),
      author: new FormControl(),
      genre: new FormControl(),
      pubYear: new FormControl(),
      rating: new FormControl()
    })

    this.findBooks()
  }

  onCreateBook(): void {
    console.log(this.books)
    this.books.unshift(this.createBook.value)
    this._dbServie.makeBook(this.books[0]).subscribe(Book => {
      this.books[0] = Book
    })
  }

  findBooks(): void {
    this._dbServie.getBooks().subscribe(Book => {
      this.books = Book
      this.books.reverse()
    })
  }

}
