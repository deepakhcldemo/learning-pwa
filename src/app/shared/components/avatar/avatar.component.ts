import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AccessibilityService } from '../../services/accessibility.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { UserService } from 'src/app/auth/user.service';
import { FileConstants } from '../../constants/file-constants';
import { SearchService } from '../search/search.service';
import { TeacherClassService } from '../../services/teacher-class.service';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AvatarComponent implements OnInit, OnDestroy {
  name: string;
  username: string;
  tabindexStatus = false;
  avatarTabIndexStatus = true;
  profileStatus = false;
  currentPopover: any;
  hasClassList = false;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private searchService: SearchService,
    private accessibilityService: AccessibilityService,
    private teacherClassService: TeacherClassService
  ) {
  }

  /**
   * Function used to get the current user name
   */
  ngOnInit() {
    this.hasClassList = this.teacherClassService.hasClassContext();
    const user = this.userService.getCurrentUser();
    if (user) {
      this.name = user.name;
      this.username = user.userName;
      this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
        this.avatarTabIndexStatus = status;
      });
    }

  }

  /**
   * Function Used To Toggle Over The Popup on user profile menu
   *
   * @param popOver toggle over the user profile menu popup
   */
  toggleWithGreeting(popOver?) {
    if (popOver) {
      this.currentPopover = popOver;
    }
    if (this.currentPopover.isOpen()) {
      this.profileStatus = false;
      this.accessibilityService.setTabIndexLevelStatus(true, false, false);
      this.currentPopover.close();
    } else {
      this.currentPopover.open({});
      this.profileStatus = true;
      this.accessibilityService.setTabIndexLevelStatus(false, true, false);
    }
  }

  /**
   * Function Used To Logout From The Current Login And Redirecting To The Login Page
   */
  logout() {
    this.toggleWithGreeting(this.currentPopover);
    this.authenticationService.logout(() => {
      this.router.navigate(['login']);
    });
  }

  /**
   * This function is used to open the search box using observer
   */
  openSearch() {
    this.toggleWithGreeting(this.currentPopover);
    this.searchService.setSearchStatus(true);
    this.accessibilityService.setTabIndexLevelStatus(false, true, false);
    this.accessibilityService.setAvatarTabIndexStatus(false);
  }

  openFaq() {
    // this.router.ngOnDestroy();
    this.toggleWithGreeting(this.currentPopover);
    window.open(environment.faq, '_blank');
  }

  /**
   * Method used to set focus on starting element of page (for cyclic tabbing)
   * @param elementName1, elementName2 : name of element where focus should go.
   */
  setFocus(elementName1, elementName2?) {
    this.accessibilityService.selectFocus(elementName1, elementName2);
  }
  /**
   * Function used to unsubscribe the subscription when component destroys
   */
  ngOnDestroy() {
    this.accessibilityService.setTabIndexLevelStatus(true, false, false);
  }

}
