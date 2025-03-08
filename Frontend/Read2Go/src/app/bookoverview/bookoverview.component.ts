import { Component, Input } from '@angular/core';
import { Bookcard2Component } from '../bookcard2/bookcard2.component';
import { BookratingComponent } from '../bookrating/bookrating.component';
import { BookstatusComponent } from '../bookstatus/bookstatus.component';
import { BookprogressComponent } from '../bookprogress/bookprogress.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookoverview',
  imports: [
    Bookcard2Component,
    BookratingComponent,
    BookstatusComponent,
    BookprogressComponent,
    CommonModule,
  ],
  templateUrl: './bookoverview.component.html',
  styleUrl: './bookoverview.component.css',
})
export class BookoverviewComponent {
  @Input() title!: string;
  @Input() coverUrl!: string;
  @Input() link!: string;
  @Input() author!: string;
  @Input() rating!: number;
  @Input() bookId!: number;
  @Input() genre!: string;

  ngOnInit() {
    console.log('title for popup:', this.title);
  }
}
