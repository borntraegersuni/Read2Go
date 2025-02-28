import { Component } from '@angular/core';
import { BooklistsearchComponent } from "../booklistsearch/booklistsearch.component";
import { BookcardComponent } from "../bookcard/bookcard.component";
import { BooklistfilterComponent } from '../booklistfilter/booklistfilter.component';

@Component({
  selector: 'app-booklistbody',
  imports: [BooklistsearchComponent, BookcardComponent,BooklistfilterComponent],
  templateUrl: './booklistbody.component.html',
  styleUrl: './booklistbody.component.css'
})
export class BooklistbodyComponent {

}
