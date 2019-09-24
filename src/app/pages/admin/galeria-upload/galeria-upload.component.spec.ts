import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriaUploadComponent } from './galeria-upload.component';

describe('GaleriaUploadComponent', () => {
  let component: GaleriaUploadComponent;
  let fixture: ComponentFixture<GaleriaUploadComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
