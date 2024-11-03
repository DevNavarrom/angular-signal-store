import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginForm } from '../../../shared/interfaces/login-form';
import { AuthService } from '../../data-access/auth.service';
import { ILogin } from '../../../shared/interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export default class LoginComponent {

  private _fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this._fb.group<ILoginForm>({
    username: this._fb.nonNullable.control('', Validators.required),
    password: this._fb.nonNullable.control('', Validators.required)
  });


  hasRequiredError(field: string) {
    const control = this.form.get(field);

    return control?.hasError('required') && control.touched;
  }

  onSubmit() {
    if (this.form.valid) {
      const dataLogin: ILogin = {
        username: this.form.get('username')?.value!,
        password: this.form.get('password')?.value!,
      }
      this.authService.login(dataLogin).subscribe(() => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/']);
        }
      })
    }
  }
}
