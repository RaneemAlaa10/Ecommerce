import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  //variables
  errorMessage: String = ""
  constructor(private _authService: AuthService, private _router: Router) { }
  
  //New Password form controls
  resetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,8}/)]),
  })
  //========New Password submit function 
  resetSubmit(form: FormGroup) {
    this._authService.resetPass(form.value).subscribe({
      next: (data) => {
        //console.log(data);
        if (data.token) {
          this._router.navigate(['/login'])
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message
        //console.log(err.error.message);

      },
      complete: () => {
      }
    })
  }
}
