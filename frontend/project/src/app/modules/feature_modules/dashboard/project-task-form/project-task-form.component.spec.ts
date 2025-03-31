import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskFormComponent } from './project-task-form.component';

describe('ProjectTaskFormComponent', () => {
  let component: ProjectTaskFormComponent;
  let fixture: ComponentFixture<ProjectTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectTaskFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
