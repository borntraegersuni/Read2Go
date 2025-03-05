import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-readcomponent',
  templateUrl: './readcomponent.component.html',
  imports: [CommonModule],
  styleUrls: ['./readcomponent.component.css']
})
export class ReadcomponentComponent implements OnInit {
  books: { title: string, coverUrl: string, link: string }[] = [];

    constructor(
      private authService: AuthService
    ) {}
  async ngOnInit() {
    const books = await this.authService.getBooks("finished");
    this.books = books.map(b => {
      return {
        coverUrl: "./examplecover.jpg",
        link: b.title.toLowerCase().replaceAll(" ", "+"),
        title: b.title
      }
    })
    
  }
}
