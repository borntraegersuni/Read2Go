import { Component } from '@angular/core';
import { ReadingcomponentComponent } from "../readingcomponent/readingcomponent.component";
import { TbrcomponentComponent } from "../tbrcomponent/tbrcomponent.component";
import { ReadcomponentComponent } from "../readcomponent/readcomponent.component";

@Component({
  selector: 'app-bookshelf',
  imports: [ReadingcomponentComponent, TbrcomponentComponent, ReadcomponentComponent],
  templateUrl: './bookshelf.component.html',
  styleUrl: './bookshelf.component.css'
})
export class BookshelfComponent {

}
