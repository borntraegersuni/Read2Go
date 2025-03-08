import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookstatus',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookstatus.component.html',
  styleUrl: './bookstatus.component.css'
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
    3: 'read'
  };
  
  constructor(private el: ElementRef, private auth: AuthService, private router: Router) {}
  
  async ngOnChanges(changes: SimpleChanges) {
    if (changes['initialStatus']) {
      await this.setStatusByNumber(changes['initialStatus'].currentValue);
    }
  }
  
  ngAfterViewInit() {
    // Set initial position
    setTimeout(() => this.updateSliderPosition(), 0);
    
    // Add resize listener to update slider when window size changes
    window.addEventListener('resize', () => this.updateSliderPosition());
  }
  
  ngOnDestroy() {
    // Remove resize listener when component is destroyed
    window.removeEventListener('resize', () => this.updateSliderPosition());
  }
  
  /**
   * Sets status using a number (0 = none, 1 = tbr, 2 = reading, 3 = read)
   * @param statusNumber Number representing the status
   */
  async setStatusByNumber(statusNumber: number): Promise<void> {
    // Convert number to string status
    const status = this.statusMap[statusNumber] || 'none';
    await this.setStatus(status);
  }
  
  async setStatus(status: string): Promise<void> {
    if (status) {
      this.selectedStatus = status;
    } else {
      // Default to 'none' if no status is provided
      this.selectedStatus = 'none';
    }
    this.updateSliderPosition();
    await this.auth.sendBookStatus(this.bookId, this.getStatusNumber());
    //TODO refresh page
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
    const slider = this.el.nativeElement.querySelector('.slider');
    // Ensure we always have a valid status
    if (!this.selectedStatus) {
      this.selectedStatus = 'none';
    }
    const activeButton = this.el.nativeElement.querySelector(`#${this.selectedStatus}`);
    
    if (slider && activeButton) {
      // Get the button's width and position
      const buttonRect = activeButton.getBoundingClientRect();
      
      // Calculate position relative to container
      const left = activeButton.offsetLeft - 4;
      
      // Apply the position and width
      slider.style.width = `${buttonRect.width}px`;
      slider.style.transform = `translateX(${left}px)`;
    }
  }



}
