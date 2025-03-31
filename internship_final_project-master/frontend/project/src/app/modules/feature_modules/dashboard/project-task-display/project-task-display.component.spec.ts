import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskDisplayComponent } from './project-task-display.component';

describe('ProjectTaskDisplayComponent', () => {
  let component: ProjectTaskDisplayComponent;
  let fixture: ComponentFixture<ProjectTaskDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectTaskDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTaskDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
