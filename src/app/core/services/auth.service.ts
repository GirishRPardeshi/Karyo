import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface UserWithoutPassword {
  id: number;
  email: string;
  name: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserWithoutPassword | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Signals for reactive auth state
  private currentUserSignal = signal<UserWithoutPassword | null>(null);
  isAuthenticated = computed(() => !!this.currentUserSignal());
  currentUser = computed(() => this.currentUserSignal());

  constructor(private http: HttpClient, private router: Router) {
    // Check for stored user on app start
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSignal.set(user);
      this.currentUserSubject.next(user);
    }
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  authenticateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
    return new Promise((resolve) => {
      this.login(email, password).subscribe({
        next: (users) => {
          const user = users.find(u => u.email === email && u.password === password);
          if (user) {
            // Remove password from stored user object
            const { password: _, ...userWithoutPassword } = user;
            this.currentUserSignal.set(userWithoutPassword);
            this.currentUserSubject.next(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            resolve(userWithoutPassword);
          } else {
            resolve(null);
          }
        },
        error: () => resolve(null)
      });
    });
  }

  register(userData: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', userData);
  }

  logout(): void {
    this.currentUserSignal.set(null);
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): UserWithoutPassword | null {
    return this.currentUserSignal();
  }

  getUserId(): number | null {
    const user = this.currentUserSignal();
    return user ? user.id : null;
  }
}