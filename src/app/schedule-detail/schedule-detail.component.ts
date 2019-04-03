import { Component, OnInit ,Input} from '@angular/core';
import {MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import {Schedule} from '../schedule';



@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit {
  id?: string;
  startTime?: string;
  time: string;
  subject: string;
  location?: string;
  description?: string;

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {
  }

  share(){
    alert("da implementare share");

    //this.modalRef.hide();
  }

  // shareOnTwitter(){
  //   alert('twitter share')
  //   const url = 'https://platform.twitter.com/widgets.js';
  //   if (!document.querySelector(`script[src='${url}']`)) {
  //       let script = document.createElement('script');
  //       script.src = url;
  //       document.body.appendChild(script);
  //   }
  // }
  // shareOnFacebook(){
  //   alert('fb share');
  //   if (!window['fbAsyncInit']) {
  //          window['fbAsyncInit'] = function () {
  //              window['FB'].init({
  //                  appId: 'your-app-id',
  //                  autoLogAppEvents: true,
  //                  xfbml: true,
  //                  version: 'v3.0'
  //              });
  //          };
  //      }
  //
  //      // load facebook sdk if required
  //      const url = 'https://connect.facebook.net/en_US/sdk.js';
  //      if (!document.querySelector(`script[src='${url}']`)) {
  //          let script = document.createElement('script');
  //          script.src = url;
  //          document.body.appendChild(script);
  //      }
  // }
}
