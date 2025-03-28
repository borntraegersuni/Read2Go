import { Component, Input } from '@angular/core';
import { BooklistheadComponent } from "../booklisthead/booklisthead.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

/**
 * SearchheadComponent provides a filter/navigation interface for book listings.
 * It allows users to filter books by categories (finished, wishlist, reading)
 * and handles the URL query parameters to maintain state. The component also
 * applies visual styling to indicate active category filters.
 */
@Component({
  selector: 'app-searchhead',
  imports: [CommonModule, BooklistheadComponent],
  templateUrl: './searchhead.component.html',
  styleUrl: './searchhead.component.css'
})
export class SearchheadComponent {
  @Input() books!: {
    id: number;
    title: string;
    coverUrl: string;
    link: string;
    author: string;
    rating: number;
  }[];
  @Input() searchUpdate!: (key: string) => void;
  @Input() display: boolean = true;
  queryParams: Params = {};

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
    });
  }

  update(category: string): void {}


  ngOnInit(): void {
    this.updateCategoryStyles();
  }

  onCategoryClick(category: string): void {
    const newCategory =
      this.queryParams['category'] === category ? null : category;
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { category: newCategory },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.route.queryParams.subscribe((params) => {
          this.queryParams = params;
          this.updateCategoryStyles();
          window.location.reload();
        });
      });
  }

  private updateCategoryStyles(): void {
    this.resetCategoryStyles();
    if (this.queryParams['category']) {
      this.applyCategoryStyles(this.queryParams['category']);
      this.searchUpdate(this.queryParams['category']);
    }
  }

  private resetCategoryStyles(): void {
    const categories = ['finished', 'wishlist', 'reading'];
    categories.forEach((cat) => {
      const element = document.getElementById(cat) as HTMLLabelElement;
      if (element) {
        element.style.backgroundColor = '';
        element.style.border = '';
        element.style.color = '';
        element.style.borderRadius = '';
        element.style.transform = '';
      }
    });
  }

  private applyCategoryStyles(category: string): void {
    const element = document.getElementById(category) as HTMLLabelElement;
    if (element) {
      element.style.backgroundColor = '#cfa3d9';
      element.style.border = '0.125rem solid #a55bb8';
      element.style.color = 'white';
      element.style.borderRadius = '1.5rem';
      element.style.transform = 'scale(1.1)';
    }
  }
}
