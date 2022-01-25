import { DisableControlDirective } from './disable-control.directive';
import { CommonModule } from '@angular/common';
import { Directive, NgModule } from "@angular/core";

@NgModule({
  declarations: [DisableControlDirective],
  imports: [CommonModule],
  exports: [DisableControlDirective]
})
export class DisableControlModule {

}
