import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGuastoComponent } from './modal-guasto.component';

describe('ModalGuastoComponent', () => {
  let component: ModalGuastoComponent;
  let fixture: ComponentFixture<ModalGuastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGuastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGuastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
