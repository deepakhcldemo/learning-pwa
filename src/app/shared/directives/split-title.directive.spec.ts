// import { async, TestBed, ComponentFixture } from '@angular/core/testing';
// import { SplitTitleDirective } from './split-title.directive';
// import { ElementRef, Injectable, Component, DebugElement, Input } from '@angular/core';
// import { By } from '@angular/platform-browser';

// @Injectable()
// export class MockElementRef {
//   nativeElement: {
//     innerHTML: 'abc|def'
//   };
// }

// @Component({
//   selector: 'app-test-component',
//   template: ``
// })
// class TestSplitTitleComponent {

// }

// describe('SplitTitleDirective', () => {
//   // let directiveInstance: SplitTitleDirective;
//   let fixture: ComponentFixture<TestSplitTitleComponent>;
//   let component1, inputEl1;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [TestSplitTitleComponent, SplitTitleDirective]
//     }).compileComponents();
//     TestBed.overrideComponent(TestSplitTitleComponent, {
//       set: {
//         template: `<p class='outer' [appSplitTitle]= "'abc|xyz'"></p>`
//       }
//     });
//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(TestSplitTitleComponent);
//       component1 = fixture.componentInstance;
//       inputEl1 = fixture.debugElement.query(By.directive(SplitTitleDirective));
//       fixture.detectChanges();
//     });
//   }));

//   it('should have ul element', () => {
//     const ulElement: HTMLElement = fixture.nativeElement;
//     const ul = ulElement.querySelectorAll('ul');
//     expect(ul[0].tagName).toBe('UL');
//   });
//   it('should have ul child elements li', () => {
//     const ulElement: HTMLElement = fixture.nativeElement;
//     const li = ulElement.querySelectorAll('li');
//     expect(li.length).toBe(2);
//   });
//   it('should first li have value', () => {
//     const ulElement: HTMLElement = fixture.nativeElement;
//     const li = ulElement.querySelectorAll('li');
//     expect(li[0].innerHTML).toContain('abc');
//   });
//   it('should blank input value return blank inner html', () => {
//     const ulElement: HTMLElement = fixture.nativeElement;
//     const ptag = ulElement.querySelectorAll('p');
//     ptag[0].innerHTML = '';
//     expect(ptag[0].innerHTML).toBe('');
//   });
// });
