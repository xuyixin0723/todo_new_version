import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcbviewComponent } from './pcbview.component';

describe('PcbviewComponent', () => {
  let component: PcbviewComponent;
  let fixture: ComponentFixture<PcbviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcbviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcbviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
