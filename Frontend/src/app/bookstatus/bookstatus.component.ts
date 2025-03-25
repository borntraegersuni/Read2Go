import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

/**
 * BookstatusComponent handles the reading status of books (none, to be read, reading, or read).
 * It displays an interactive status slider that allows users to change a book's status, 
 * updates the UI accordingly, and persists changes through the AuthService.
 * The component is responsive and ensures the slider position is correctly updated on various UI events.
 */
@Component({
  selector: 'app-bookstatus',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookstatus.component.html',
  styleUrl: './bookstatus.component.css',
})
export class BookstatusComponent implements AfterViewInit, OnChanges {
  @Input() initialStatus: number = 0;
  selectedStatus: string = 'none';
  @ViewChildren('statusButton') buttons!: QueryList<ElementRef>;
  @Input() bookId!: number;
  private statusMap: { [key: number]: string } = {
    0: 'none',
    1: 'tbr',
    2: 'reading',
    3: 'read',
  };

  constructor(
    private el: ElementRef,
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['initialStatus']) {
      await this.setStatusByNumber(changes['initialStatus'].currentValue);
    }
  }

  ngOnInit() {
    console.log('init', this.initialStatus);
    this.setStatusByNumber(this.initialStatus);
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.updateSliderPosition();
      });
    } else {
      setTimeout(() => this.updateSliderPosition(), 0);
    }
  }

  ngAfterViewInit() {
    this.updateSliderPosition();
    
    window.addEventListener('resize', this.updateSliderPosition);
    
    window.addEventListener('load', this.updateSliderPosition);
    
    const delayTimes = [0, 50, 100, 250, 500, 1000];
    delayTimes.forEach(delay => {
      setTimeout(() => {
        this.updateSliderPosition();
      }, delay);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateSliderPosition);
    window.removeEventListener('load', this.updateSliderPosition);
  }

  async setStatusByNumber(statusNumber: number): Promise<void> {
    const status = this.statusMap[statusNumber] || 'none';
    this.selectedStatus = status;
    if (this.selectedStatus !== status) {
      await this.setStatus(status);
    }
  }

  async setStatus(status: string): Promise<void> {
    if (status) {
      console.log('Setting status:', status);
      const oldStatus = this.selectedStatus;
      this.selectedStatus = status;

      const books = await this.auth.getBooks('');
      const book = books.find((b) => b.id === this.bookId);
      if(!book) {
        console.error('Book not found:', this.bookId);
        
      }
      this.updateSliderPosition();
      console.log("Setting to status: ", status);
      if (oldStatus !== status && this.bookId) {
        await this.auth.sendBookStatus(book ? book.bookid : this.bookId, this.getStatusNumber());
      }
    } else {
      this.selectedStatus = 'none';
    }
  }

  getStatus(): string {
    return this.selectedStatus || 'none';
  }

  getStatusNumber(): number {
    for (const [numKey, strValue] of Object.entries(this.statusMap)) {
      if (strValue === this.selectedStatus) {
        return parseInt(numKey);
      }
    }
    return 0;
  }

  private updateSliderPosition() {
    try {
      const slider = this.el.nativeElement.querySelector('.slider');
      if (!this.selectedStatus) {
        console.log("none");
        this.selectedStatus = 'none';
      }

      if (slider) {
        slider.classList.remove('none', 'tbr', 'reading', 'read');
        slider.classList.add(this.selectedStatus);
      }

      const activeButton = this.el.nativeElement.querySelector(
        `#${this.selectedStatus}`
      );

      if (!activeButton) {
        console.error(`Button with ID #${this.selectedStatus} not found`);
        return;
      }

      if (slider && activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        
        const left = activeButton.offsetLeft;
        
        console.log(`Positioning slider for status: ${this.selectedStatus}, left: ${left}px, width: ${buttonRect.width}px`);
        
        slider.style.width = `${buttonRect.width - 8}px`;
        slider.style.transform = `translateX(${left}px)`;

        const buttons = this.el.nativeElement.querySelectorAll('button');
        buttons.forEach((btn: HTMLElement) => {
          btn.classList.remove('active');
        });
        activeButton.classList.add('active');
      }
    } catch (error) {
      console.error('Error updating slider position:', error);
    }
  }
}
