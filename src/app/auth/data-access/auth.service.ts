import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { ILogin, IResultLogin } from '../../shared/interfaces/login';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../shared/data-access/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  private _storageService = inject(StorageService);

  login(data: ILogin): Observable<IResultLogin> {
    return this.http.post<IResultLogin>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((result) => {
        this._storageService.saveToken(result);
      })
    );
  }

  logout(): void {
    this._storageService.removeToken();
  }

  isLoggedIn(): boolean {
    return this._storageService.isSaveToken();
  }

}
