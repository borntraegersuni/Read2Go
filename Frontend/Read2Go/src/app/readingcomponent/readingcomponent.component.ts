import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-readingcomponent',
  imports: [CommonModule],
  templateUrl: './readingcomponent.component.html',
  styleUrl: './readingcomponent.component.css',
})
export class ReadingcomponentComponent {
  books: { title: string; coverUrl: string; link: string }[] = [];

  constructor(private authService: AuthService) {}
  async ngOnInit() {
    const books = await this.authService.getBooks('reading');
    this.books = books.map((b) => {
      return {
        coverUrl: './examplecover.jpg',
        link: b.title.toLowerCase().replaceAll(' ', '+'),
        title: b.title,
      };
    });
  }
}
