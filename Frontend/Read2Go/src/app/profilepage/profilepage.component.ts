import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    password: '',
    currentPassword: '',
    newPassword: '',
    deletePassword: ''
  };
  profileImage = './profilepage.jpg';
  showDeleteModal = false;
  deleteError: string = '';
  
  // Field-specific error messages
  fieldErrors = {
    username: '',
    email: '',
    currentPassword: '',
    general: ''
  };
  
  // Toast notifications
  toast = {
    show: false,
    message: '',
    type: 'error',
    timeout: null as any
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Load the currently logged-in user from AuthService
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user.username = currentUser.username;
      this.user.email = currentUser.email;
    } else {
      this.router.navigate(['/login']); // Redirect to login if no user is found
    }
  }

  async saveChanges() {
    // Reset all error messages
    this.resetErrors();
    
    // Validate fields
    let hasErrors = false;
    
    if (!this.user.username) {
      this.fieldErrors.username = 'Username is required';
      hasErrors = true;
    }
    
    if (!this.user.email) {
      this.fieldErrors.email = 'Email is required';
      hasErrors = true;
    }
    
    if (!this.user.currentPassword) {
      this.fieldErrors.currentPassword = 'Password is required to save changes';
      hasErrors = true;
    }
    
    if (hasErrors) {
      this.showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Update user information
    try {
      if(await this.authService.updateUser(this.user)) {
        this.showToast('Profile updated successfully!', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.fieldErrors.general = 'Failed to update profile. Please check your information and try again.';
        this.showToast('Failed to update profile', 'error');
      }
    } catch (error) {
      this.fieldErrors.general = 'An error occurred while updating your profile.';
      this.showToast('An error occurred', 'error');
      console.error('Error updating profile:', error);
    }
  }

  openDeleteModal(form: any) {
    if (!form.valid) {
      this.showToast('Please enter your password to delete your account', 'warning');
      return;
    }
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deleteError = '';
  }

  async confirmDelete() {
    try {
      if (!this.user.deletePassword) {
        this.deleteError = "Please enter your password to confirm deletion.";
        return;
      }
      
      const success = await this.authService.deleteUserAccount(this.user.deletePassword);
      
      if (success) {
        this.closeDeleteModal();
        this.showToast('Your account has been successfully deleted', 'success');
        setTimeout(() => {
          this.router.navigate(['/signup']);
        }, 2000);
      } else {
        this.deleteError = "Failed to delete account. Please check your password and try again.";
      }
    } catch (error) {
      this.deleteError = "An error occurred. Please try again later.";
      console.error("Error deleting account:", error);
    }
  }
  
  // Helper methods for toast notifications
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    // Clear any existing timeout
    if (this.toast.timeout) {
      clearTimeout(this.toast.timeout);
    }
    
    // Set toast properties
    this.toast.show = true;
    this.toast.message = message;
    this.toast.type = type;
    
    // Set timeout to hide toast
    this.toast.timeout = setTimeout(() => {
      this.hideToast();
    }, type === 'error' ? 5000 : 3000); // Show errors longer
  }
  
  hideToast() {
    this.toast.show = false;
  }
  
  resetErrors() {
    this.fieldErrors = {
      username: '',
      email: '',
      currentPassword: '',
      general: ''
    };
  }
}