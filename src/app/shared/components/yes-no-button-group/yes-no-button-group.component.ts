import { UniqueIdService } from './services/unique-id/unique-id.service';

import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // Usa forwardRef quando o injection token que a gente precisa referenciar, nesse caso o NG_VALUE_ACCESSOR,
      // é declarado mas não definido. Nesse caso, essa classe (YesNoButtonGroupComponent) não está pronta ainda no registro do form do angular.
      useExisting: forwardRef(() => YesNoButtonGroupComponent)
    }
  ]
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {

  @Input() disabled = false;
  @Input() public value: string = null;
  @Input() public label = '';
  public options = YesNoButtonGroupOptions;
  @Output() public valueChange = new EventEmitter<string>();
  public id: string = null;
  // Precisa ser inicializado
  public onChange = (value:string) => {};
  public onTouched = () => {};

  constructor(uniqueIdService: UniqueIdService) {
    this.id = uniqueIdService.generateUniqueIdWithPrefix('yes-no-button-group');
   }

  ngOnInit(): void {
  }

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(this.value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    // Função que deve ser chamada ao alterar valores
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public activate(value: string): void {
    this.writeValue(value);
  }

}

enum YesNoButtonGroupOptions {
  YES = 'yes',
  NO = 'no'
}
