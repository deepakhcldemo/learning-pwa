import { trigger, transition, animate, style, AnimationTriggerMetadata } from '@angular/animations';

export class SlideInOutAnimation {
    // Create static animations for direct call this animation class
    // static animations = SlideInOutAnimation.getAnimations(width as string);

    // Static method for direct call
    static getAnimations(width: string): Array<AnimationTriggerMetadata> {
        return [
            trigger('slideInOut', [
                transition(':enter', [
                    style({transform: `translateX(${width})`}),
                    animate('500ms ease-in-out', style({transform: 'translateX(0%)'}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0%)'}),
                    animate('500ms ease-in-out', style({transform: `translateX(${width})`}))
                ])
            ])
        ];
    }
}
