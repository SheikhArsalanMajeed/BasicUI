import { HeaderComponent } from './../components_includes/header/header.component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from "../../_utilities/PasswordValidation";
import { AppConfig } from "../../_utilities/app-config";
import { AuthenticationService } from "../../_services/authentication.service";
import { ApiRequestService } from "../../_services/api-request.service";
import { CookieService } from "angular2-cookie/core";
import { Router } from "@angular/router";

declare var AOS: any;
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  responseStatus: any = {};
  loading: boolean = false;
  currentUser: any = {};
  registerModalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private _cookieService: CookieService, private apirequest: ApiRequestService, private router: Router) {

  }


  ngOnInit() {

    this.CreateRegisterForm();
    this.animation();
  }


  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConfig.emailPattern)])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  register(formValue: any) {
    formValue.action = "register";
    console.log(formValue);
    this.responseStatus = {};
    this.loading = true;
    this.authenticationService.registerUser(formValue).subscribe((res) => {

      console.log(res);
      this.loading = false;
      if (res.status == 'True') {
        this.responseStatus.status = true;
        this.responseStatus.message = "Successfully registered";
        //this.verify(formValue.email, formValue.password);
        this.registerModalActions.emit({action: "modal", params: ['open']});
      }
      else if (res.status == 'False') {
        this.responseStatus.status = true;
        this.responseStatus.msg = "Email or username already registered";
      }

    });

  }

  verify(email, password) {

    this.loading = true;
    this.responseStatus = {};
    console.log(email, password);

    this.authenticationService.login(email, password).subscribe((res) => {
      this.loading = false;
      console.log(res);
      if (res === true) {

        this.apirequest.getUserDetails().subscribe((data) => {
          this.loading = false;
          this.currentUser = data;
          HeaderComponent.updateCurrentUser.next(true);
          //location.reload();
          this.router.navigate(['/user/dashboard']);


        });

      }




    }, (err) => {
      this.loading = false;
      this.responseStatus.status = err.statusText;
      this.responseStatus.msg = "Invalid username or password";
      console.log(err);
    });
  }

  gotoSignIn(){
    this.registerModalActions.emit({action: "modal", params: ['close']});
    this.router.navigate(['login']);
  }

  animation() {
    AOS.init({
      once: true
    });
  }
}
