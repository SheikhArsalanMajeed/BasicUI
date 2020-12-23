import { UserVerificationComponent } from './../../user-verification/user-verification.component';
import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from "../../../_services/api-request.service";

@Component({
  selector: 'app-sendemail',
  providers: [ApiRequestService],
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent implements OnInit {


  afterResponse : any = {};
  userEmail : string = "";
  loading: boolean = false;

  constructor(private userservice : ApiRequestService) { }

  ngOnInit() {
  }

  sendEmail(email){
    this.loading = true;
      console.log(email);
      let data = {
        email : email,
        action : "sendforgetemail"
      }

      this.userservice.userApiFunction(data).subscribe(data => {
        console.log(data);
        this.loading = false;
         if(data.status == 'False'){

           console.log(data.msg);
           this.afterResponse.status = false;

         }
         else if(data.status == 'True'){

           this.afterResponse.status = true;
         }

      });
  }

}
