import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[appDisableControl]'
})
export class DisableControlDirective implements OnChanges {

  @Input() appDisableControl = false;

  constructor(private ngControl: NgControl) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // changes vai ter propriedade com o mesmo nome da propriedade se apenas ela for alterada
    if (changes.appDisableControl) {
      const action = this.appDisableControl ? 'disable' : 'enable';
      this.ngControl.control[action]();
    }
  }
}
