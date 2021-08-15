import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule }from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from './header/header.component';
import { DailyScrumComponent } from './daily-scrum/daily-scrum.component';
import { SprintPlanningMeetingComponent } from './sprint-planning-meeting/sprint-planning-meeting.component';
import { SprintReviewComponent } from './sprint-review/sprint-review.component';
import { RetrospectiveComponent } from './retrospective/retrospective.component';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { LocComponent } from './loc/loc.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DailyScrumComponent,
    SprintPlanningMeetingComponent,
    SprintReviewComponent,
    RetrospectiveComponent,
    SprintDetailsComponent,
    LocComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatToolbarModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
