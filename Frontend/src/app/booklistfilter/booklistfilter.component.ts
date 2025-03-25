import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booklistfilter',
  imports: [],
  templateUrl: './booklistfilter.component.html',
  styleUrl: './booklistfilter.component.css'
})
/**
 * Component for filtering and sorting book lists.
 * 
 * This component manages the filtering and sorting options for book lists, allowing users to:
 * - Select different filter criteria (e.g., by title, author, etc.)
 * - Toggle the sort direction between ascending and descending
 * 
 * It interacts with URL search parameters to maintain filter state across page loads
 * and updates the URL when filter options change.
 */
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
