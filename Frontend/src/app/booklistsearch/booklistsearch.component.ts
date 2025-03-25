import { Component } from '@angular/core';

@Component({
  selector: 'app-booklistsearch',
  imports: [],
  templateUrl: './booklistsearch.component.html',
  styleUrl: './booklistsearch.component.css',
})

/**
 * Component for book list search functionality.
 * Handles search input changes by updating URL parameters and refreshing the page.
 */

export class BooklistsearchComponent {
  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const url = new URL(window.location.href);
    
    url.searchParams.set('search', input.value);
    
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  }
}
