/**
 * Component Registry for @dai/ui
 *
 * This registry contains comprehensive documentation about all components
 * in the @dai/ui library. It's used by the MCP server to provide AI assistants
 * with accurate information about component usage, props, and best practices.
 */

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default: string | null;
  description: string;
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
}

export interface ComponentInfo {
  name: string;
  selector: string;
  description: string;
  props: ComponentProp[];
  examples: ComponentExample[];
  bestPractices: string[];
}

export const COMPONENT_REGISTRY: Record<string, ComponentInfo> = {
  button: {
    name: 'Button',
    selector: 'dai-button',
    description: 'Primary button component following Figma design specifications. Features three sizes (sm, md, lg), loading state with spinner, and full accessibility support. Built with Angular 19+ signal inputs.',
    props: [
      {
        name: 'variant',
        type: "'primary'",
        required: false,
        default: "'primary'",
        description: 'Visual style variant (only primary available per Figma design)',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: "'md'",
        description: 'Size: Small (24px), Medium (32px), or Large (40px)',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Disables the button with Primary/400 color',
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Shows spinner and disables button with Primary/500 color',
      },
    ],
    examples: [
      {
        title: 'Primary Button - Medium',
        description: 'Standard medium-sized primary button',
        code: `<dai-button size="md">
  Button
</dai-button>`,
      },
      {
        title: 'Button Sizes',
        description: 'All three size variants',
        code: `<dai-button size="sm">Button</dai-button>
<dai-button size="md">Button</dai-button>
<dai-button size="lg">Button</dai-button>`,
      },
      {
        title: 'Loading State',
        description: 'Button with loading spinner',
        code: `<dai-button size="md" [loading]="true">
  Button
</dai-button>`,
      },
      {
        title: 'Disabled State',
        description: 'Disabled button',
        code: `<dai-button size="md" [disabled]="true">
  Button
</dai-button>`,
      },
    ],
    bestPractices: [
      'Use size="sm" for dense UI areas and tables (height: 24px, font: 12px)',
      'Use size="md" for standard buttons (height: 32px, font: 14px)',
      'Use size="lg" for prominent CTAs (height: 40px, font: 16px)',
      'Loading state automatically disables the button and shows spinner',
      'Disabled state uses Primary/400 color (#9098FA)',
      'Hover state uses Primary/600 color (#5164F7)',
      'Focus state shows Primary/800 border (#112EAC)',
      'Font: Poppins, weight 400',
      'Border radius: 50px (fully rounded)',
      'Button is zoneless-ready and uses OnPush change detection',
    ],
  },
  input: {
    name: 'Input',
    selector: 'dai-input',
    description: 'Input component following Figma design specifications. Features three sizes (sm, md, lg), error states, disabled states, and Angular Forms integration via ControlValueAccessor. Uses Poppins font family.',
    props: [
      {
        name: 'label',
        type: 'string',
        required: false,
        default: "''",
        description: 'Label text displayed above the input (16px Poppins)',
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        default: "'Text'",
        description: 'Placeholder text shown when empty',
      },
      {
        name: 'type',
        type: "'text' | 'password' | 'email'",
        required: false,
        default: "'text'",
        description: 'HTML input type',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: "'md'",
        description: 'Size: Small, Medium (44px height), or Large (50px height)',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Disables with gray background (#DFDFDF)',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        default: "''",
        description: 'Error message triggers error styling with red border',
      },
      {
        name: 'value',
        type: 'string (model)',
        required: false,
        default: "''",
        description: 'Two-way bound value (Angular 19+ model)',
      },
    ],
    examples: [
      {
        title: 'Small Input',
        description: 'Compact input for tight spaces',
        code: `<dai-input
  label="Label"
  size="sm"
  placeholder="Text"
/>`,
      },
      {
        title: 'Medium Input (Default)',
        description: 'Standard input size',
        code: `<dai-input
  label="Label"
  size="md"
  placeholder="Text"
/>`,
      },
      {
        title: 'Large Input',
        description: 'Large input for prominence',
        code: `<dai-input
  label="Label"
  size="lg"
  placeholder="Text"
/>`,
      },
      {
        title: 'Error State',
        description: 'Input with validation error',
        code: `<dai-input
  label="Label"
  size="md"
  placeholder="Text"
  [errorMessage]="'Error Message'"
/>`,
      },
      {
        title: 'Disabled State',
        description: 'Disabled input',
        code: `<dai-input
  label="Label"
  size="md"
  placeholder="Text"
  [disabled]="true"
/>`,
      },
      {
        title: 'Two-way Binding',
        description: 'Using Angular 19+ model binding',
        code: `<dai-input
  label="Email"
  size="md"
  placeholder="Text"
  [(value)]="email"
/>`,
      },
      {
        title: 'Reactive Forms',
        description: 'Integration with Angular reactive forms',
        code: `<dai-input
  label="Email"
  size="md"
  [formControl]="emailControl"
  [errorMessage]="emailControl.errors ? 'Error Message' : ''"
/>`,
      },
    ],
    bestPractices: [
      'Label: 16px Poppins, weight 400, line-height 1.5em, color #000000',
      'Input text: 14px Poppins, weight 400, line-height 1.5em',
      'Placeholder color: #ABA7AF',
      'Default border: #E5E0EB (1px)',
      'Focus border sm: #061764 (2px)',
      'Focus border md/lg: #112EAC (1px)',
      'Error border: #D51A52 (2px)',
      'Error text: #D51A52, 14px Poppins',
      'Disabled background and border: #DFDFDF',
      'Border radius: 50px (fully rounded)',
      'Gap between elements: 8px',
      'Padding sm: 8px 12px',
      'Padding md: 12px (height: 44px)',
      'Padding lg: 14px 12px (height: 50px)',
      'Use size="sm" for compact forms',
      'Use size="md" for standard forms (default)',
      'Use size="lg" for prominent inputs',
      'Always provide labels for accessibility',
      'Error messages automatically show with ARIA attributes',
    ],
  },
};

/**
 * Get component information by name
 */
export function getComponentInfo(name: string): ComponentInfo | undefined {
  return COMPONENT_REGISTRY[name.toLowerCase()];
}

/**
 * List all available components
 */
export function listComponents(): string[] {
  return Object.keys(COMPONENT_REGISTRY);
}

/**
 * Get component examples
 */
export function getComponentExamples(name: string): ComponentExample[] {
  const info = getComponentInfo(name);
  return info?.examples || [];
}
