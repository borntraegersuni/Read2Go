import { Component } from '@angular/core';

@Component({
  selector: 'app-booklistfilter',
  imports: [],
  templateUrl: './booklistfilter.component.html',
  styleUrl: './booklistfilter.component.css'
})
export class BooklistfilterComponent {
  selectedFilterOptions: string[] = [];

  updateFilterOptions(category: string): void {
    const filterOptions: { [key: string]: string[] } = {
      author: ["A-Z", "Z-A"],
      genre: ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy"],
      year: ["New-Old", "Old-New"],
    };
  
    this.selectedFilterOptions = filterOptions[category] || [];
  }
  
}
