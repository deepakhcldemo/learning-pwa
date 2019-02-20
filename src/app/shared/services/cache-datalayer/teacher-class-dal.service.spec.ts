import { TestBed, inject } from '@angular/core/testing';

import { TeacherClassDalService } from './teacher-class-dal.service';

describe('TeacherClassDalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherClassDalService]
    });
  });

  it('should be created', inject([TeacherClassDalService], (service: TeacherClassDalService) => {
    expect(service).toBeTruthy();
  }));
});
