import { Component, input, output, model, forwardRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  type ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CvInputSize, CvInputType } from './input.types';

@Component({
  selector: 'dai-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dai-input-wrapper" [class.dai-input-error]="hasError()">
      <label [for]="inputId()" class="dai-input-label">
        {{ label() }}
      </label>

      <input
        [id]="inputId()"
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [disabled]="disabled()"
        [class.dai-input-field]="true"
        [class.dai-input-sm]="size() === 'sm'"
        [class.dai-input-md]="size() === 'md'"
        [class.dai-input-lg]="size() === 'lg'"
        [attr.aria-invalid]="hasError()"
        [attr.aria-describedby]="hasError() ? errorId() : null"
      />

      @if (hasError() && errorMessage()) {
        <span [id]="errorId()" class="dai-input-error-message" role="alert">
          {{ errorMessage() }}
        </span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .dai-input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
      }

      .dai-input-label {
        display: block;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5em;
        color: #000000;
      }

      .dai-input-field {
        width: 100%;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5em;
        color: #000000;
        background-color: #FFFFFF;
        border: 1px solid #E5E0EB;
        border-radius: 50px;
        box-sizing: border-box;
        outline: none;
        transition: all 150ms ease-in-out;
      }

      .dai-input-field::placeholder {
        color: #ABA7AF;
      }

      /* Sizes */
      .dai-input-sm {
        padding: 8px 12px;
      }

      .dai-input-md {
        padding: 12px;
        height: 44px;
      }

      .dai-input-lg {
        padding: 14px 12px;
        height: 50px;
      }

      /* Focus State */
      .dai-input-sm:focus {
        border-color: #061764;
        border-width: 2px;
        padding: 7px 11px; /* Adjust for 2px border */
      }

      .dai-input-md:focus,
      .dai-input-lg:focus {
        border-color: #112EAC;
        border-width: 1px;
      }

      /* Disabled State */
      .dai-input-field:disabled {
        background-color: #DFDFDF;
        border-color: #DFDFDF;
        color: #ABA7AF;
        cursor: not-allowed;
      }

      /* Error State */
      .dai-input-error .dai-input-field {
        border-color: #D51A52;
        border-width: 2px;
      }

      .dai-input-error .dai-input-sm {
        padding: 7px 11px; /* Adjust for 2px border */
      }

      .dai-input-error .dai-input-md {
        padding: 11px; /* Adjust for 2px border */
      }

      .dai-input-error .dai-input-lg {
        padding: 13px 11px; /* Adjust for 2px border */
      }

      .dai-input-error-message {
        display: block;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5em;
        color: #D51A52;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeayInputComponent),
      multi: true,
    },
  ],
})
export class DeayInputComponent implements ControlValueAccessor {
  // Signal Inputs
  readonly label = input<string>('');
  readonly placeholder = input<string>('Text');
  readonly type = input<CvInputType>('text');
  readonly disabled = input<boolean>(false);
  readonly errorMessage = input<string>('');
  readonly size = input<CvInputSize>('md');
  readonly inputId = input<string>(`dai-input-${Math.random().toString(36).substr(2, 9)}`);

  // Model for two-way binding (Angular 19+)
  readonly value = model<string>('');

  // Outputs for custom handling
  readonly valueChange = output<string>();
  readonly blur = output<void>();

  // Internal state
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  // Computed error state
  protected hasError = computed(() => !!this.errorMessage());

  // Unique error message ID
  protected errorId = () => `${this.inputId()}-error`;

  // Handle input changes
  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.value.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handled through the disabled input signal
  }
}
