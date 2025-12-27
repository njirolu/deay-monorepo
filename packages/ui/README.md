# @deay/ui

A modern Angular UI component library built with Angular 19+, following Figma design specifications. Features accessible, customizable components with signal inputs and zoneless-ready architecture.

## Features

- Angular 19+ with standalone components
- Signal inputs for reactivity
- Zoneless-ready with OnPush change detection
- Full accessibility support (ARIA)
- Three size variants (sm, md, lg)
- Comprehensive error and disabled states
- Figma design specifications
- TypeScript support

## Installation

```bash
npm install @deay/ui
```

## Requirements

- Angular 19.0.0 or higher
- @angular/common 19.0.0 or higher
- @angular/forms 19.0.0 or higher

## Available Components

### Button Component (`<dai-button>`)

A versatile button component with loading states and multiple sizes.

**Selector:** `dai-button`

**Inputs:**
- `variant`: `'primary'` (default) - Visual style variant
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`) - Button size
- `disabled`: `boolean` (default: `false`) - Disable the button
- `loading`: `boolean` (default: `false`) - Show loading spinner
- `fullWidth`: `boolean` (default: `false`) - Make button span full container width

**Usage:**

```html
<!-- Standard button -->
<dai-button size="md">
  Button
</dai-button>

<!-- All sizes -->
<dai-button size="sm">Button</dai-button>
<dai-button size="md">Button</dai-button>
<dai-button size="lg">Button</dai-button>

<!-- Loading state -->
<dai-button size="md" [loading]="true">
  Button
</dai-button>

<!-- Disabled state -->
<dai-button size="md" [disabled]="true">
  Button
</dai-button>

<!-- Full width button -->
<dai-button size="md" [fullWidth]="true">
  Full Width Button
</dai-button>
```

**Design Specifications:**
- Font: Poppins, weight 400
- Border radius: 50px (fully rounded)
- Size heights: sm (24px, 12px font), md (32px, 14px font), lg (40px, 16px font)
- Hover: Primary/600 (#5164F7)
- Focus: Primary/800 border (#112EAC)
- Disabled: Primary/400 (#9098FA)
- Loading: Primary/500 (#6B7FFF)

### Input Component (`<dai-input>`)

A feature-rich input component with validation states and Angular Forms integration.

**Selector:** `dai-input`

**Inputs:**
- `label`: `string` - Label text displayed above input
- `placeholder`: `string` (default: `'Text'`) - Placeholder text
- `type`: `'text' | 'password' | 'email'` (default: `'text'`) - HTML input type
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`) - Input size
- `disabled`: `boolean` (default: `false`) - Disable the input
- `errorMessage`: `string` - Error message that triggers error styling
- `value`: `string` - Two-way bound value (Angular 19+ model)

**Usage:**

```html
<!-- Basic input -->
<dai-input
  label="Label"
  size="md"
  placeholder="Text"
/>

<!-- All sizes -->
<dai-input label="Small" size="sm" placeholder="Text" />
<dai-input label="Medium" size="md" placeholder="Text" />
<dai-input label="Large" size="lg" placeholder="Text" />

<!-- Error state -->
<dai-input
  label="Email"
  size="md"
  placeholder="Text"
  [errorMessage]="'Invalid email format'"
/>

<!-- Disabled state -->
<dai-input
  label="Label"
  size="md"
  placeholder="Text"
  [disabled]="true"
/>

<!-- Two-way binding -->
<dai-input
  label="Email"
  size="md"
  placeholder="Text"
  [(value)]="email"
/>

<!-- Reactive forms -->
<dai-input
  label="Email"
  size="md"
  [formControl]="emailControl"
  [errorMessage]="emailControl.errors ? 'Error Message' : ''"
/>
```

**Design Specifications:**
- Font: Poppins, weight 400
- Border radius: 50px (fully rounded)
- Label: 16px, color #000000
- Input text: 14px, placeholder #ABA7AF
- Default border: #E5E0EB (1px)
- Focus border sm: #061764 (2px)
- Focus border md/lg: #112EAC (1px)
- Error border: #D51A52 (2px)
- Error text: #D51A52, 14px
- Disabled: #DFDFDF background and border
- Heights: sm (~36px), md (44px), lg (50px)
- Gap between elements: 8px

## Best Practices

### Button
- Use `size="sm"` for dense UI areas and tables
- Use `size="md"` for standard buttons (default)
- Use `size="lg"` for prominent call-to-action buttons
- Use `fullWidth="true"` for buttons that should fill their container width
- Loading state automatically disables the button
- Always provide accessible button text

### Input
- Always provide labels for accessibility
- Use appropriate input types for better mobile experience
- Connect error messages to form validation
- Use size="sm" for compact forms
- Use size="md" for standard forms (default)
- Use size="lg" for prominent inputs

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev
```

## Build Output

The library builds to the `dist/` directory using ng-packagr and includes:
- Angular library format
- TypeScript definitions
- Metadata
- Styles

## Accessibility

All components follow WCAG 2.1 guidelines:
- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Screen reader support
- Semantic HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## Related Packages

- [@deay/mcp](../mcp-server) - MCP server providing AI assistants with @deay/ui component documentation
