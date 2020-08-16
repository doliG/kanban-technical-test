import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.sass'],
})
export class TagSelectComponent {
  @Input() options: Set<string> = new Set();
  selectedOptions: string[] = [];

  @Output() select = new EventEmitter();
  
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredOptions: Observable<string[]>;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredOptions = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : Array.from(this.options)
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedOptions.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedOptions.indexOf(fruit);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
    this.select.emit(this.selectedOptions);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.push(event.option.viewValue);
    this.select.emit(this.selectedOptions);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const res = [];

    for (const option of this.options) {
      if (option.toLowerCase().indexOf(filterValue) === 0) {
        res.push(option);
      }
    }
    return res;
  }
}
