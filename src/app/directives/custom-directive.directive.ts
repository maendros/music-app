import {Directive, DoCheck, ElementRef, OnInit} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appCustomDirective]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomDirectiveDirective,
      multi: true
    }
  ]
})
export class CustomDirectiveDirective implements Validator {

  validator: ValidatorFn;

  regEx = /^[a-z0-9 ]+$/i;
  test = 'asdf,';
  constructor(private elementRef: ElementRef) {
    this.validator = this.customValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  customValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = this.regEx.test(c.value);
      if (isValid && c.value && c.value.trim().length >= 3 || c.value.trim().length === 0  ) {
        return null;
      } else {
        return {
          appCustomDirective: {
            valid: false
          }
        };
      }
    };
  }

}
