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

@Component({
  selector: 'app-bookstatus',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookstatus.component.html',
  styleUrl: './bookstatus.component.css',
})
export class BookstatusComponent implements AfterViewInit, OnChanges {
  @Input() initialStatus: number = 0; // Allow setting from parent component
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
    
    // Add a DOM content loaded listener to ensure everything is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.updateSliderPosition();
      });
    } else {
      // DOM already loaded, schedule position update
      setTimeout(() => this.updateSliderPosition(), 0);
    }
  }

  ngAfterViewInit() {
    // First attempt with a sequence of increasingly delayed updates
    this.updateSliderPosition();
    
    // Add resize listener using the bound method
    window.addEventListener('resize', this.updateSliderPosition);
    
    // Add a load listener to update when all resources are loaded
    window.addEventListener('load', this.updateSliderPosition);
    
    // More aggressive approach with multiple delayed attempts
    const delayTimes = [0, 50, 100, 250, 500, 1000];
    delayTimes.forEach(delay => {
      setTimeout(() => {
        this.updateSliderPosition();
      }, delay);
    });
  }

  ngOnDestroy() {
    // Remove all event listeners
    window.removeEventListener('resize', this.updateSliderPosition);
    window.removeEventListener('load', this.updateSliderPosition);
  }

  /**
   * Sets status using a number (0 = none, 1 = tbr, 2 = reading, 3 = read)
   * @param statusNumber Number representing the status
   */
  async setStatusByNumber(statusNumber: number): Promise<void> {
    // Convert number to string status
    const status = this.statusMap[statusNumber] || 'none';
    this.selectedStatus = status;
    // Check if the status is actually changing before making API call
    if (this.selectedStatus !== status) {
      await this.setStatus(status);
    }
  }

  async setStatus(status: string): Promise<void> {
    if (status) {
      console.log('Setting status:', status);
      // Store the old status to check if it changed
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
      // Default to 'none' if no status is provided
      this.selectedStatus = 'none';
    }
  }

  /**
   * Gets the currently selected status as string
   * @returns The current status or 'none' if undefined
   */
  getStatus(): string {
    return this.selectedStatus || 'none';
  }

  /**
   * Gets the currently selected status as number
   * @returns The current status number (0, 1, 2, or 3)
   */
  getStatusNumber(): number {
    // Find the number key that corresponds to the current status
    for (const [numKey, strValue] of Object.entries(this.statusMap)) {
      if (strValue === this.selectedStatus) {
        return parseInt(numKey);
      }
    }
    return 0; // Default to 'none' (0)
  }

  private updateSliderPosition() {
    try {
      const slider = this.el.nativeElement.querySelector('.slider');
      // Ensure we always have a valid status
      if (!this.selectedStatus) {
        console.log("none");
        this.selectedStatus = 'none';
      }

      // Remove all status classes from slider
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
        // Get the button's width and position
        const buttonRect = activeButton.getBoundingClientRect();
        
        // Apply the position and width to make it match the button exactly
        const left = activeButton.offsetLeft;
        
        console.log(`Positioning slider for status: ${this.selectedStatus}, left: ${left}px, width: ${buttonRect.width}px`);
        
        // Apply the position and width to make it match the button exactly
        slider.style.width = `${buttonRect.width - 8}px`; // -8px to account for padding
        slider.style.transform = `translateX(${left}px)`;

        // Ensure active class is applied to the correct button
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