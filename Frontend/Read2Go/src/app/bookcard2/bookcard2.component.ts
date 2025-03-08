import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bookcard2',
  imports: [],
  templateUrl: './bookcard2.component.html',
  styleUrl: './bookcard2.component.css'
})
export class Bookcard2Component {
    @Input() title!: string;
    @Input() coverUrl!: string;
    @Input() link!: string;
    @Input() author!: string;
    @Input() bookId!: number;
    @Input() genre!: string;
}
