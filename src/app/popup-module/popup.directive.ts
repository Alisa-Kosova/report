import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})

export class PopupDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}