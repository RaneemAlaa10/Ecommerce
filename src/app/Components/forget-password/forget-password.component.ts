import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _auth:AuthService,private _Router:Router){}
  //variables
  errorMessage:string="" //to store error messgae if exist

  //form to get email 
  forgotForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  //==========send email to api
  forgotPasswordSubmit(form:FormGroup)
  {
    this._auth.forgotPass(form.value).subscribe({
      next:(data)=>{
        if(data.statusMsg=='success')
        {
          document.querySelector('.code')?.classList.remove('d-none')
          document.querySelector('.forgot')?.classList.add('d-none')
        }
      },
      error:(err)=>{this.errorMessage=err.error.message},
      complete:()=>{}
      
    })
  }

  //to get code that user received on email
  codeForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)])
  })

  //=== send submitted code to api
  codeSubmit(form:FormGroup)
  {
    this._auth.resetCode(form.value).subscribe({
      next:(data)=>{
        //console.log(data);
        this._Router.navigate(['/resetPassword'])
        
      },
      error:(err)=>{
       // console.log(err)
      }
    }
      
    )
  }
}
