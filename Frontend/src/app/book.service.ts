import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${query}`);
  }
}