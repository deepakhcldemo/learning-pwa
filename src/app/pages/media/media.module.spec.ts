import { TestBed } from '@angular/core/testing';
import { MediaModule } from './media.module';
describe('MediaModule', () => {
  let mediaModule: MediaModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MediaModule] });
    mediaModule = TestBed.get(MediaModule);
  });
  it('should create an instance', () => {
    expect(mediaModule).toBeTruthy();
  });
});
