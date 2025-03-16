import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookcardComponent } from "../bookcard/bookcard.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booklistbody',
  standalone: true,
  imports: [ BookcardComponent, CommonModule],
  templateUrl: './booklistbody.component.html',
  styleUrls: ['./booklistbody.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BooklistbodyComponent {
  @Input() books!: { id: number; state: string; avgRating: number; description: string; published: number; genre: string; title: string, coverUrl: string, link: string, author: string, rating: number }[];
}
