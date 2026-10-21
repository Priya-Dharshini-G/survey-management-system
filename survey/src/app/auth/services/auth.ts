import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  /**
   * Variable which is used to store the user id.
   */
  #userId = signal<String | null>(sessionStorage.getItem('userId'));
  /**
   * Variable which is used to store the user id.
   */
  userId = this.#userId.asReadonly();
  /**
   * @param http holds the HttpClient class instance.
   */
  constructor(private http: HttpClient) {}
  /**
   * Method which is used to request the login api and store the details in session storage.
   */
  login(data: any) {
    return this.http.post('http://localhost:8080/api/login', data).pipe(
      tap((res: any) => {
        if (res.success && res.data) {
          sessionStorage.setItem('userId', JSON.stringify(res.data.id));
          sessionStorage.setItem('user', JSON.stringify(res.data));
          this.#userId.set(res.data.id);
        }
      }),
    );
  }
  /**
   * Method which is used to request the sign up api.
   */
  singUp(data: any) {
    return this.http.post('http://localhost:8080/api/createUser', data);
  }
  /**
   * Method which is used to request the forgot mail api.
   */
  forgotPassword(data: any) {
    return this.http.post('http://localhost:8080/api/forgotEmail', data);
  }
}
