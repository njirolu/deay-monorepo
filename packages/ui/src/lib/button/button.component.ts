import { Component, input, computed } from '@angular/core';
import type { CvButtonVariant, CvButtonSize } from './button.variants';

@Component({
  selector: 'dai-button',
  standalone: true,
  template: `
    <button
      [class]="computedClasses()"
      [disabled]="isDisabled()"
      [attr.aria-disabled]="isDisabled()"
      [attr.aria-busy]="loading()"
    >
      @if (loading()) {
        <span class="dai-spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-weight: 400;
        line-height: 1.5;
        border-radius: 50px;
        cursor: pointer;
        transition: all 150ms ease-in-out;
        border: 1px solid transparent;
        box-sizing: border-box;
      }

      button:focus-visible {
        outline: none;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 1;
      }

      /* Sizes */
      .dai-button-sm {
        padding: 2px 8px;
        height: 24px;
        font-size: 12px;
        line-height: 1.5em;
      }

      .dai-button-md {
        padding: 6px 12px;
        height: 32px;
        font-size: 14px;
        line-height: 1.4285714285714286em;
      }

      .dai-button-lg {
        padding: 8px 16px;
        height: 40px;
        font-size: 16px;
        line-height: 1.375em;
      }

      /* Primary Variant - Default State */
      .dai-button-primary {
        background-color: #2047F4;
        color: #FFFFFF;
      }

      .dai-button-primary:hover:not(:disabled) {
        background-color: #5164F7;
      }

      .dai-button-primary:focus-visible {
        background-color: #2047F4;
        border-color: #112EAC;
        box-shadow: 0 0 0 1px #112EAC;
      }

      .dai-button-primary:disabled,
      .dai-button-primary.dai-button-loading {
        background-color: #9098FA;
      }

      .dai-button-primary.dai-button-loading {
        cursor: wait;
      }

      /* Spinner sizes */
      .dai-button-sm .dai-spinner {
        width: 14px;
        height: 14px;
      }

      .dai-button-md .dai-spinner {
        width: 16px;
        height: 16px;
      }

      .dai-button-lg .dai-spinner {
        width: 22px;
        height: 22px;
      }

      .dai-spinner {
        display: inline-block;
        border: 2px solid #FFFFFF;
        border-right-color: transparent;
        border-radius: 50%;
        animation: dai-spin 0.6s linear infinite;
      }

      /* Full Width Variant */
      .dai-button-fullwidth {
        width: 100%;
      }

      @keyframes dai-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class DeayButtonComponent {
  // Signal Inputs (Angular 19+)
  readonly variant = input<CvButtonVariant>('primary');
  readonly size = input<CvButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);

  // Computed properties for dynamic classes
  protected computedClasses = computed(() => {
    const classes = [
      'dai-button',
      `dai-button-${this.variant()}`,
      `dai-button-${this.size()}`,
    ];

    if (this.loading()) {
      classes.push('dai-button-loading');
    }

    if (this.fullWidth()) {
      classes.push('dai-button-fullwidth');
    }

    return classes.join(' ');
  });

  // Computed disabled state (disabled or loading)
  protected isDisabled = computed(() => this.disabled() || this.loading());
}
