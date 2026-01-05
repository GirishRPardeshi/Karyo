import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const userData = this.signupForm.value;

      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('User registered:', response);
          this.isLoading = false;
          // Navigate to login
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'Signup failed. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
