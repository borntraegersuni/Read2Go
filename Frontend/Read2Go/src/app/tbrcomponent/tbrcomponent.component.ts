import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tbrcomponent',
  imports: [CommonModule],
  templateUrl: './tbrcomponent.component.html',
  styleUrl: './tbrcomponent.component.css',
})
export class TbrcomponentComponent {
  books: { title: string; coverUrl: string; link: string }[] = [];

  constructor(private authService: AuthService) {}
  async ngOnInit() {
    const books = await this.authService.getBooks('wishlist');
    this.books = books.map((b) => {
      return {
        coverUrl: './examplecover.jpg',
        link: b.title.toLowerCase().replaceAll(' ', '+'),
        title: b.title,
      };
    });
  }
}
