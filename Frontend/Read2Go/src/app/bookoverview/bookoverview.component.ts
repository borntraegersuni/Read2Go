import { Component, Input } from '@angular/core';
import { Bookcard2Component } from '../bookcard2/bookcard2.component';
import { BookratingComponent } from '../bookrating/bookrating.component';
import { BookstatusComponent } from '../bookstatus/bookstatus.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bookoverview',
  imports: [
    Bookcard2Component,
    BookratingComponent,
    BookstatusComponent,
    CommonModule,
  ],
  templateUrl: './bookoverview.component.html',
  styleUrl: './bookoverview.component.css',
})
export class BookoverviewComponent {
  constructor(public authService: AuthService) {}
  @Input() title!: string;
  @Input() coverUrl!: string;
  @Input() link!: string;
  @Input() author!: string;
  @Input() rating!: number;
  @Input() bookId!: number;
  @Input() genre!: string;
  @Input() description!: string;
  @Input() published!: number;
  @Input() state!: string;
  @Input() display: boolean = true;
  @Input() avgRating!: number;
  status: number = 0;
  ngOnInit() {
    console.log('title for popup:', this.title);
    console.log('Status', this.state);
    if (this.state === 'reading') {
      this.status = 2;
    } else if (this.state === 'finished') {
      this.status = 3;
    } else if (this.state === 'wishlist') {
      this.status = 1;
    }
  }
}
