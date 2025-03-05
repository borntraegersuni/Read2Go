import { Component } from '@angular/core';
import { Bookcard2Component } from '../bookcard2/bookcard2.component';
import { BookratingComponent } from '../bookrating/bookrating.component';
import { BookstatusComponent } from "../bookstatus/bookstatus.component";
import { BookprogressComponent } from "../bookprogress/bookprogress.component";

@Component({
  selector: 'app-bookoverview',
  imports: [Bookcard2Component, BookratingComponent, BookstatusComponent, BookprogressComponent],
  templateUrl: './bookoverview.component.html',
  styleUrl: './bookoverview.component.css'
})
export class BookoverviewComponent {

}
