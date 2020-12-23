import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {AuthenticationService} from "../../../_services/authentication.service";
import {Router} from "@angular/router";

declare var $:any;
declare var AOS:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public static updateCurrentUser : Subject<boolean> = new Subject();
  userStatus : boolean = false;
  currentUser : any = {};

  constructor(private authenticationService : AuthenticationService, private router : Router) { }

  ngOnInit() {

    this.Headerpasser();
    this.mobile_nav();
    this.animation();
    this.Scroller();
  }

  Headerpasser()
  {
    HeaderComponent.updateCurrentUser.subscribe((res) => {
      console.log(res);
      this.userStatus = res;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }, err => {

      throw err;
    });

    if(this.currentUser != null){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.currentUser);

    }
  }

  mobile_nav()
  {
      $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true,
        onOpen: function(el) {  },
        onClose: function(el) { }
      }
    );
  }
  animation()
  {
    AOS.init({
      once: true
    });
  }
  Scroller()
  {
    if ($('#back-to-top').length) {
      var scrollTrigger = 100, // px
        backToTop = function() {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
            $('#back-to-top').removeClass('scale-out');
          } else {
            $('#back-to-top').addClass('scale-out');
          }
        };
      backToTop();
      $(window).on('scroll', function() {
        backToTop();
      });

      $('#back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
          scrollTop: 0
        }, 700);
      });
    }
  }
  logoutFunc(){

    this.authenticationService.logout();
    this.userStatus = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
    // window.location.href = 'https://192.168.100.116/static/';
  }


}
