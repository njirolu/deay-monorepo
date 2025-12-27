# Deay Monorepo

A modern monorepo containing an Angular UI component library (`@deay/ui`) and an MCP (Model Context Protocol) server (`@deay/mcp`) that provides AI assistants with comprehensive documentation about the components.

## Overview

This monorepo is designed to streamline the development and distribution of reusable Angular components while enabling AI-powered development workflows through MCP server integration.

## Packages

### [`@deay/ui`](./packages/ui)

An Angular component library built with Angular 19, featuring:
- Reusable UI components (Button, Input, and more)
- TypeScript with strict mode enabled
- Tree-shakeable library distribution via ng-packagr
- Figma design specifications integration

### [`@deay/mcp`](./packages/mcp-server)

Model Context Protocol server that enables AI coding tools (Claude Desktop, Cursor, Windsurf) to:
- List all available `@deay/ui` components
- Get detailed component documentation (props, examples, best practices)
- Access Figma design specifications
- Generate accurate code examples

## Prerequisites

- **Bun** >= 1.0.0 (package manager and runtime)
- **Node.js** >= 18.0.0 (for Angular CLI compatibility)

## Getting Started

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Run MCP server in watch mode
bun run dev:mcp

# Build UI library
bun run build:ui

# Build MCP server
bun run build:mcp

# Build all packages
bun run build:all
```

### MCP Server Configuration

#### Local Development

Add to your Claude Desktop config (or other MCP-compatible tool):

```json
{
  "mcpServers": {
    "@deay/mcp": {
      "command": "bun",
      "args": ["run", "dev:mcp"],
      "cwd": "/absolute/path/to/deay-monorepo"
    }
  }
}
```

#### Production Usage

After publishing to npm:

```json
{
  "mcpServers": {
    "@deay/mcp": {
      "command": "npx",
      "args": ["-y", "@deay/mcp"]
    }
  }
}
```

## Publishing

### Publish All Packages

```bash
bun run publish:all
```

### Publish Individual Packages

```bash
# Publish only @deay/ui
bun run publish:ui

# Publish only @deay/mcp
bun run publish:mcp
```

## Project Structure

```
deay-monorepo/
├── packages/
│   ├── ui/                    # Angular component library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── button/
│   │   │   │   ├── input/
│   │   │   │   └── ...
│   │   │   └── public-api.ts
│   │   ├── ng-package.json
│   │   └── package.json
│   │
│   └── mcp-server/            # MCP server
│       ├── src/
│       │   ├── index.ts
│       │   └── registry.ts
│       ├── package.json
│       └── README.md
│
├── package.json               # Root package.json (workspaces)
├── tsconfig.base.json         # Base TypeScript configuration
├── tsconfig.json              # Root TypeScript configuration
└── bun.lock                   # Bun lockfile
```

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 19.2.17 | UI framework |
| TypeScript | 5.6.3 | Programming language |
| Bun | Latest | Package manager & runtime |
| ng-packagr | 19.2.2 | Angular library packaging |
| @modelcontextprotocol/sdk | 0.6.0 | MCP server implementation |

## Development Workflow

1. **Make changes** to components in `packages/ui/src/lib/`
2. **Build the UI library**: `bun run build:ui`
3. **Update MCP registry** in `packages/mcp-server/src/registry.ts`
4. **Build MCP server**: `bun run build:mcp`
5. **Test** the MCP server: `bun run dev:mcp`
6. **Publish** when ready: `bun run publish:all`

## Available Components

Currently available in `@deay/ui`:
- `dai-button` - Button component with multiple variants
- `dai-input` - Input component with various sizes

See [packages/ui/README.md](./packages/ui/README.md) for detailed component documentation.

## MCP Tools

The MCP server provides the following tools:

### `list_components`
Lists all components available in the `@deay/ui` library.

### `get_component_info`
Get detailed information about a specific component including:
- Props with types and defaults
- Usage examples
- Best practices
- Figma design specifications

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
