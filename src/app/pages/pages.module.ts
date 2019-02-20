import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '../shared/services/assessment.service';
import { IndexDBResolverService } from '../shared/services/indexDb.resolver.service';
import { AuthGuard } from '../auth/auth.guard';
import { NotesService } from '../shared/services/notes.service';
import { MediaService } from '../shared/services/media.service';
// import { AssessmentKeywordResolverService } from '../shared/services/assessmentkeyword.resolver.service';
import { MediaPopupService } from '../shared/components/media-popup/media-popup.service';
import { NotesPopupService } from '../shared/components/edit-notes/notes-popup.service';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';
import { ToDoService } from '../shared/services/realtime-datalayer/todo-dal.service';
import { NotesDalService } from '../shared/services/realtime-datalayer/notes-dal.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PagesRoutingModule,
    DeviceDetectorModule,
    SharedModule.forRoot()
  ],
  declarations: [PagesComponent],
  providers: [
    AuthGuard,
    // AssessmentKeywordResolverService,
    IndexDBResolverService,
    AssessmentService,
    ToDoService,
    NotesService,
    MediaService,
    MediaPopupService,
    DeviceDetectorService,
    NotesDalService
  ]
})

export class PagesModule { }
