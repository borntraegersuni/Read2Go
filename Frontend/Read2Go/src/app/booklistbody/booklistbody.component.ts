import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BooklistsearchComponent } from "../booklistsearch/booklistsearch.component";
import { BookcardComponent } from "../bookcard/bookcard.component";
import { BooklistfilterComponent } from '../booklistfilter/booklistfilter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booklistbody',
  standalone: true,
  imports: [BooklistsearchComponent, BookcardComponent, BooklistfilterComponent, CommonModule],
  templateUrl: './booklistbody.component.html',
  styleUrls: ['./booklistbody.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BooklistbodyComponent {
  @Input() books!: { id: number, genre: string; title: string, coverUrl: string, link: string, author: string, rating: number }[];
  
}
