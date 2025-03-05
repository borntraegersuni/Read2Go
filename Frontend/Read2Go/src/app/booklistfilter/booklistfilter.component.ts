import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booklistfilter',
  imports: [],
  templateUrl: './booklistfilter.component.html',
  styleUrl: './booklistfilter.component.css'
})
export class BooklistfilterComponent implements OnInit {
  selectedFilterOption: string = 'title';

  ngOnInit() {
    const url = new URL(window.location.href);
    const filter = url.searchParams.get('filter');
    this.selectedFilterOption = filter ? filter : 'title';
  }

  changeDirection() {
    const url = new URL(window.location.href);
    const direction = url.searchParams.get('direction');
    if (direction === 'asc') {
      url.searchParams.set('direction', 'desc');
    } else {
      url.searchParams.set('direction', 'asc');
    }
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  }

  updateFilterOptions(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const url = new URL(window.location.href);
    url.searchParams.set('filter', value);
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  }
}
