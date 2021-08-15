import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintPlanningMeetingComponent } from './sprint-planning-meeting.component';

describe('SprintPlanningMeetingComponent', () => {
  let component: SprintPlanningMeetingComponent;
  let fixture: ComponentFixture<SprintPlanningMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintPlanningMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintPlanningMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
