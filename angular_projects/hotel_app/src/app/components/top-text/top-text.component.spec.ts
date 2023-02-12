import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTextComponent } from './top-text.component';

describe('TopTextComponent', () => {
  let component: TopTextComponent;
  let fixture: ComponentFixture<TopTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
