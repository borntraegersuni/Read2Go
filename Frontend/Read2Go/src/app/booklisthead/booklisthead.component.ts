import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BooklistsearchComponent } from '../booklistsearch/booklistsearch.component';
import { BooklistfilterComponent } from '../booklistfilter/booklistfilter.component';

@Component({
  selector: 'app-booklisthead',
  imports: [CommonModule, BooklistsearchComponent, BooklistfilterComponent
  ],
  templateUrl: './booklisthead.component.html',
  styleUrl: './booklisthead.component.css',
})
export class BooklistheadComponent {
  @Input() books!: {
    id: number;
    title: string;
    coverUrl: string;
    link: string;
    author: string;
    rating: number;
  }[];
  @Input() display: boolean = true;
  @Input() searchUpdate!: (key: string) => void;
  queryParams: Params = {};

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
    });
  }

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
