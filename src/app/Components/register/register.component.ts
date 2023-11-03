import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //variables
  errorMessage:string=''
  loading:boolean=false

  constructor(private _AuthService:AuthService, private _Router:Router){}
  

  //*REGISTER FORM GROUP AND VALIDATIONS
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    //*  include at least one letter, one digit, and be at least 6 characters long
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9-@]{6,}$/)]),
    rePassword: new FormControl(null),
    //* Egyptian phone number
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  },{validators:this.repsasswordCheck}as FormControlOptions)

//*=======repassword check 
  repsasswordCheck(group: FormGroup): void {
    let password = group.get('password')
    let rePassword = group.get('rePassword')
    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true })
    }
    else if(password?.value!=rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }

  }
  //*========Send Registered user data to api and receive response if success navigate to login page 
  handleRegister(form:FormGroup)
  {
    this.loading=true
    this._AuthService.register(form.value).subscribe({
      next:(response)=>{
        this.loading=false
       //console.log(response);
        
        if(response.message=="success")
        {
          this._Router.navigate(['/login'])
        }
      },
      error:(err)=>{
        this.loading=false
        this.errorMessage=err.error.message
        //console.log(err)
      }
    })
  }
}

