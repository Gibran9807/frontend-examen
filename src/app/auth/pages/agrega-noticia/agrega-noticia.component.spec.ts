import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaNoticiaComponent } from './agrega-noticia.component';

describe('AgregaNoticiaComponent', () => {
  let component: AgregaNoticiaComponent;
  let fixture: ComponentFixture<AgregaNoticiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregaNoticiaComponent]
    });
    fixture = TestBed.createComponent(AgregaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
