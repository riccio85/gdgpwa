import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ScheduleItemComponent} from './schedule-item/schedule-item.component';
import {ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FirebaseService} from './services/firebase.service';
import {IdbService} from './services/idb.service';

// import social buttons module
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleItemComponent,
    ScheduleDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    JwSocialButtonsModule
  ],
  entryComponents: [ ScheduleDetailComponent ],
  providers: [FirebaseService, IdbService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
