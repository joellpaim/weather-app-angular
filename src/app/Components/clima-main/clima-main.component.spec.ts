import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaMainComponent } from './clima-main.component';

describe('ClimaMainComponent', () => {
  let component: ClimaMainComponent;
  let fixture: ComponentFixture<ClimaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimaMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
