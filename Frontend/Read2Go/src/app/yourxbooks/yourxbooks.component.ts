import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yourxbooks',
  imports: [CommonModule],
  templateUrl: './yourxbooks.component.html',
  styleUrl: './yourxbooks.component.css'
})
export class YourxbooksComponent implements OnInit {
category: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  books: string[] = [];
}
export default function Bookshelf() {
    const books = [
      "Fiction",
      "Science",
      "History",
      "Philosophy",
      "Mystery"
    ];
  }
