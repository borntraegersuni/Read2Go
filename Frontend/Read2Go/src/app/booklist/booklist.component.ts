import { Component } from '@angular/core';
import { BooklistheadComponent } from "../booklisthead/booklisthead.component";
import { BooklistbodyComponent } from "../booklistbody/booklistbody.component";

@Component({
  selector: 'app-booklist',
  imports: [BooklistheadComponent, BooklistbodyComponent],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent {

}
