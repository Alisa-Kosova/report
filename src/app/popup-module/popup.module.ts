import { NgModule } from '@angular/core';

import { PopupComponent } from './popup.component';
import { PopupDirective } from './popup.directive';

@NgModule({
  declarations: [PopupComponent, PopupDirective],
  exports: [PopupComponent]
})

export class PopupModule {
}