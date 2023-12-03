import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvAddComponent } from './cv-add.component';

describe('CvAddComponent', () => {
  let component: CvAddComponent;
  let fixture: ComponentFixture<CvAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
