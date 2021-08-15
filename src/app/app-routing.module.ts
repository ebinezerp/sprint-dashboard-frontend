import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyScrumComponent } from './daily-scrum/daily-scrum.component';
import { LocComponent } from './loc/loc.component';
import { RetrospectiveComponent } from './retrospective/retrospective.component';
import { SprintPlanningMeetingComponent } from './sprint-planning-meeting/sprint-planning-meeting.component';
import { SprintReviewComponent } from './sprint-review/sprint-review.component';

const routes: Routes = [
  { path:'', redirectTo:'/daily-scrum',pathMatch:'full'},
  { path:'daily-scrum', component:DailyScrumComponent},
  { path:'sprint-planning-meeting', component: SprintPlanningMeetingComponent},
  { path:'sprint-review', component: SprintReviewComponent},
  { path: 'loc', component: LocComponent},
  { path:'retrospective', component: RetrospectiveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
