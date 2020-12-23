import { Component, OnInit } from '@angular/core';
import {CookieService} from "angular2-cookie/core";
import {Router} from "@angular/router";
/* import { AuthService } from '../../_services/auth.service';
import {AuthenticationService} from "../../_services/authentication.service"; */

declare var $:any;
declare var AOS:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _cookieService: CookieService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.animation_parallex();
    // auth
    

  }

  animation_parallex()
  {
    AOS.init({
      once: true
    });
    $(document).ready(function(){
      $('.parallax').parallax();
    });
  }
  

}
