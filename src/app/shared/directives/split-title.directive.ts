import { Directive, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[appSplitTitle]'
})
export class SplitTitleDirective {

  constructor(private element: ElementRef) { }

  private _appSplitTitle: string;

  @Input('appSplitTitle')
  set appSplitTitle(inputString) {
    if (inputString) {
      this._appSplitTitle = inputString;
      this.orderedListByString();
    }
  }

  /**
   * This function is used to split the string into ordered list string
   */
  orderedListByString() {
    const splitAssessmentTitle = this._appSplitTitle.split('|');
    let listTitle = '<ul class="ul-list-style-type ul-padding-left">';
    if (splitAssessmentTitle && splitAssessmentTitle.length > 0) {
      splitAssessmentTitle.forEach((splitedString) => {
        // regex used to identify the string between ~
        const regex = /\~(.*?)\~/g;
        const matchRegexArray = regex.exec(splitedString);
        if (matchRegexArray && matchRegexArray.length > 0) {
          // remove the string between ~ from assessment title.
          const stringWithoutBold = splitedString.replace(matchRegexArray[0], '');
          // make  the string bold.
          listTitle += '<li class="padding-top"><b>' + matchRegexArray[1] + '</b>' + stringWithoutBold + '</li>';
        } else {
          listTitle += '<li class="padding-top">' + splitedString + '</li>';
        }
      });
    } else {
      listTitle += '<li>' + this._appSplitTitle + '</li>';
    }
    listTitle += '</ul>';
    this.element.nativeElement.innerHTML = listTitle;
  }
}
