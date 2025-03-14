import { Component } from '@angular/core';

@Component({
  selector: 'app-booklistsearch',
  imports: [],
  templateUrl: './booklistsearch.component.html',
  styleUrl: './booklistsearch.component.css',
})
export class BooklistsearchComponent {
  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const url = new URL(window.location.href);
    
    // Don't replace spaces with plus signs in the search parameter
    // This preserves spaces in the search term which will be properly encoded by the URL
    url.searchParams.set('search', input.value);
    
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  }
}
