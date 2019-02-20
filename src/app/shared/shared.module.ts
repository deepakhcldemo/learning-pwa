import { ModuleWithProviders, NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProgressCardComponent } from './components/progress-card/progress-card.component';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ArrayBlankPipe } from './pipes/array-blank.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { SplitTitleDirective } from './directives/split-title.directive';
import { IsPropExistPipe } from './pipes/is-prop-exist.pipe';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TruncatePipe } from './pipes/truncate.pipe';
import { GlobalModalComponent } from './components/global-modal';
import { EditNotesComponent } from './components/edit-notes/edit-notes.component';
import { MediaPopupComponent } from './components/media-popup/media-popup.component';
import { ShowObserve } from './pipes/show-observe.pipe';
import { SearchComponent } from './components/search/search.component';
import { CalendarModule } from 'primeng/calendar';
import { UniqueArrayPipe } from './pipes/unique-array.pipe';
import { FooterService } from './components/footer/footer.service';
import { MainPageFocusStatusService } from './mainpage-focus-status.service';
import { TeacherClassComponent } from './components/teacher-class/teacher-class.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ProgramListComponent } from './components/program-list/program-list.component';
import { MediaLibraryComponent } from './components/media-library/media-library.component';
import { CommentPopupComponent } from './components/comment-popup/comment-popup.component';
import { ShowCommentPipe } from './pipes/show-comment.pipe';

@NgModule({
  declarations: [
    TeacherClassComponent,
    HeaderComponent,
    FooterComponent,
    AvatarComponent,
    CarouselComponent,
    ProgressCardComponent,
    RecentActivityComponent,
    ToDoComponent,
    AccordionComponent,
    ArrayBlankPipe,
    DateFormatPipe,
    IsPropExistPipe,
    TruncatePipe,
    ShowObserve,
    GlobalModalComponent,
    EditNotesComponent,
    MediaPopupComponent,
    SearchComponent,
    SplitTitleDirective,
    UniqueArrayPipe,
    ProgramListComponent,
    MediaLibraryComponent,
    CommentPopupComponent,
    ShowCommentPipe
  ],

  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    NgbModule,
    SlickCarouselModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      outerStrokeWidth: 10,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      innerStrokeWidth: 10,
      animateTitle: true,
      animationDuration: 10,
      showUnits: true,
      showSubtitle: true,
      showBackground: false,
      clockwise: true,
      startFromZero: true
    })
  ],
  exports: [
    TeacherClassComponent,
    HeaderComponent,
    FooterComponent,
    AvatarComponent,
    CarouselComponent,
    ProgressCardComponent,
    RecentActivityComponent,
    ToDoComponent,
    AccordionComponent,
    ArrayBlankPipe,
    DateFormatPipe,
    ShowObserve,
    IsPropExistPipe,
    TruncatePipe,
    UniqueArrayPipe,
    GlobalModalComponent,
    EditNotesComponent,
    MediaPopupComponent,
    SearchComponent,
    SplitTitleDirective,
    ProgramListComponent,
    MediaLibraryComponent,
    CommentPopupComponent,
    ShowCommentPipe,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [FooterService, MainPageFocusStatusService]
    };
  }
}
