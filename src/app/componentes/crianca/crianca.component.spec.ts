import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriancaComponent } from './crianca.component';

describe('CriancaComponent', () => {
  let component: CriancaComponent;
  let fixture: ComponentFixture<CriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriancaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
