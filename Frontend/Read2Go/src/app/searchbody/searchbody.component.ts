import { Component, Input } from '@angular/core';
import { BookcardComponent } from "../bookcard/bookcard.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbody',
  imports: [BookcardComponent, CommonModule],
  templateUrl: './searchbody.component.html',
  styleUrl: './searchbody.component.css'
})
export class SearchbodyComponent {
@Input() books!: { id: number, title: string, coverUrl: string, link: string, author: string, rating: number }[];
}
