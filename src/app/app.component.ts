import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'angular-bootstrap-md';
import {MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import {ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import {Schedule} from './schedule';
import {FormControl} from '@angular/forms';
import {IdbService} from './services/idb.service';
import {FirebaseService} from './services/firebase.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild(ModalDirective) modal: ModalDirective;
  modalRef: MDBModalRef;

  timeInput = new FormControl();
  timeStartInput = new FormControl();
  subjectInput = new FormControl();
  locationInput = new FormControl();
  descriptionInput = new FormControl();

  networkMode = 'online';
  items: Observable<Schedule>;

  constructor(
    private modalService: MDBModalService,
    private idbService: IdbService,
    private firebase: FirebaseService,
    private db: AngularFirestore) {
    navigator.onLine === true ? this.networkMode = 'online' : this.networkMode = 'offline';

    this.idbService.connectToIDB();
    let onlineDataLength;

    this.idbService.getAllData('Items').then((items: any) => {
      onlineDataLength = items.length;
      if (this.networkMode === 'online' && onlineDataLength === 0) {
        this.items = this.db.collection<Schedule>('Items', item => item.orderBy('time', 'asc'))
          .snapshotChanges().pipe(map((actions: any) => {
            return actions.map(a => {
              const data = a.payload.doc.data() as any;
              this.idbService.addItems('Items', data);
              return {...data};
            });
          }));
      } else {
        this.items = of(items);
      }

      this.idbService.dataChanged().subscribe((data: any) => {
        this.items = of(data);
      });
    });
  }

  addNewItem() {
    const value: Schedule = {
      id: null,
      time: this.timeInput.value,
      startTime: this.timeStartInput.value,
      subject: this.subjectInput.value,
      location: this.locationInput.value,
      description: this.descriptionInput.value
    };

    if (this.networkMode === 'offline') {
      this.idbService.addItems('Sync-Items', value);
      this.idbService.addItems('Items', value);
    } else if (this.networkMode === 'online') {
      this.idbService.addItems('Items', value);
      this.idbService.getAllData('Items').then((data: any) => {
        this.firebase.addItem({
          id: data.length,
          time: value.time,
          startTime: value.startTime,
          subject: value.subject,
          location: value.location,
          description: value.description
        });
      });
    }

    this.timeInput.setValue('');
    this.timeStartInput.setValue('');
    this.subjectInput.setValue('');
    this.locationInput.setValue('');
    this.descriptionInput.setValue('');

    this.modal.hide();
  }

  onShowDetail(schedule: Schedule){
    this.modalRef = this.modalService.show(ScheduleDetailComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'modal-notify modal-info modal-top-right modal-lg',
        containerClass: 'right',
        animated: true,
        data: schedule,
    });
  }


  getOnlineData() {
    return this.idbService.getAllData('Items');
  }

  getOfflineData() {
    return this.idbService.getAllData('Sync-Items');
  }

  mergeDatabases() {
    let offline;
    let online;

    this.getOfflineData().then((data: any) => {
      offline = data;
    });
    this.getOnlineData().then((data: any) => {
      online = data;
      offline.forEach((el: any, index: number) => {
        if (el == offline[index]) {
          this.firebase.addItem(el);
          this.idbService.addItems('Items', el);
          this.idbService.deleteItems('Sync-Items', el.id);
        }
      });
    });
  }

  ngOnInit() {
    if (this.networkMode === 'online') {
      this.mergeDatabases();
    }
  }

}
