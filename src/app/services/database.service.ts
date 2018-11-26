import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from "../models/book.model"
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private _dbUrl = "http://localhost:3000/books"

  constructor(private _http: HttpClient) { }

  getBooks() : Observable<Book[]> {
    return this._http.get<Book[]>(`${this._dbUrl}/get`)
  }

  makeBook(book: Book) : Observable<Book[]> {
    return this._http.post<Book[]>(`${this._dbUrl}/create`, book, httpOptions)
  }
}
