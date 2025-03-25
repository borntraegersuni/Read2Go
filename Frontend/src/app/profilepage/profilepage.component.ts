import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * ProfilePageComponent provides user profile management functionality.
 * It allows users to view and update their profile information (username, email),
 * change their password, and delete their account. The component includes
 * form validation, error handling, and toast notifications to provide
 * feedback to users about their actions.
 */
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
  
  fieldErrors = {
    username: '',
    email: '',
    currentPassword: '',
    general: ''
  };
  
  toast = {
    show: false,
    message: '',
    type: 'error',
    timeout: null as any
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user.username = currentUser.username;
      this.user.email = currentUser.email;
    } else {
      this.router.navigate(['/login']);
    }
  }

  async saveChanges() {
    this.resetErrors();
    
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
  
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    if (this.toast.timeout) {
      clearTimeout(this.toast.timeout);
    }
    
    this.toast.show = true;
    this.toast.message = message;
    this.toast.type = type;
    
    this.toast.timeout = setTimeout(() => {
      this.hideToast();
    }, type === 'error' ? 5000 : 3000);
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
