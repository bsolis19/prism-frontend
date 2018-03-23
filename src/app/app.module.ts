import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReversePipe } from './../pipe_manipulation';

import { CollegesComponent } from './colleges/colleges.component';
import { CommitteeComponent } from './committee/committee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent} from './colleges/departments/department.component';
import { DocumentComponent } from './document/document.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MinutesComponent } from './minutes/minutes.component';
import { ResourcesComponent } from './resources/resources.component';
import { ReviewComponent } from './review/review.component';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import { ProgramsComponent } from './colleges/departments/programs/programs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectizeModule } from 'ng-selectize';

import { LoginComponent } from './login/login.component';
import { PublicComponent } from './layout/public/public.component';
import { PrivateComponent } from './layout/private/private.component';

import { CollegesService } from './colleges/colleges.service';
import { DashboardService } from './dashboard/dashboard.service';
import { DocumentService } from './document/document.service';
import { DepartmentService } from './colleges/departments/department.service';
import { GroupManagerService } from './group-manager/group-manager.service';
import { ProgramService } from './colleges/departments/programs/program.service';
import { ReviewService } from './review/review.service';

import { AuthInterceptor } from './login/auth.interceptor';
import { AuthGuard } from './login/auth.guard';
import { AuthService } from './login/auth.service';

import { SettingsService } from './settings/settings.service';
import { SharedService } from './shared/shared.service';
import { TemplateManagerService } from './template-manager/template-manager.service';
import { UserSelectorService } from './user-selector/user-selector.service';

import { Globals } from './shared/app.global';
import { TemplateManagerComponent } from './template-manager/template-manager.component';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { ReviewListComponent } from './review-list/review-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CollegesComponent,
    CommitteeComponent,
    DashboardComponent,
    DepartmentComponent,
    DocumentComponent,
    GroupManagerComponent,
    LoginComponent,
    MinutesComponent,
    PageNotFoundComponent,
    ProgramsComponent,
    ResourcesComponent,
    ReviewComponent,
    ReviewListComponent,
    SettingsComponent,
    TemplateManagerComponent,
    UserSelectorComponent,
    PrivateComponent,
    PublicComponent,
    ReversePipe,
  ],
  imports: [
    NgbModule.forRoot(),
    NgSelectizeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    HttpClientModule,
    CollegesService,
    DashboardService,
    DocumentService,
    DepartmentService,
    Globals,
    GroupManagerService,
    ReviewService,
    ProgramService,
    SettingsService,
    SharedService,
    TemplateManagerService,
    UserSelectorService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function(router: Router) {
        return new AuthInterceptor(router);
      },
      multi: true,
      deps: [Router]
    },
    { provide: 'Window', useValue: window },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
