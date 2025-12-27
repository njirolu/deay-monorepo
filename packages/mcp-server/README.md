# @deay/mcp - MCP Server for @deay/ui

Model Context Protocol (MCP) server that provides AI assistants with comprehensive documentation about @deay/ui components.

## What This Does

This MCP server allows AI coding tools (Claude Desktop, Cursor, Windsurf) to:
- List all available @deay/ui components
- Get detailed component documentation (props, examples, best practices)
- Access Figma design specifications
- Generate accurate code examples

## Installation

### For Development (Local Path)

```json
{
  "mcpServers": {
    "@deay/mcp": {
      "command": "bun",
      "args": ["run", "dev:mcp"],
      "cwd": "/path/to/dai-monorepo"
    }
  }
}
```

### For Production (After npm publish)

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

## Usage

Once configured, ask your AI assistant:
- "How do I use dai-button component?"
- "Create a form with @deay/ui components"
- "What are the available sizes for dai-input?"

## How It Works

1. **Local Execution**: Runs locally on your machine (no server deployment needed)
2. **Stdin/Stdout**: Communicates via stdin/stdout, not HTTP
3. **Offline Ready**: All documentation bundled, works offline after download
4. **Privacy First**: Source code never leaves your machine

## Available Tools

### `list_components`
Lists all components in @deay/ui library.

### `get_component_info`
Get detailed info about a specific component including:
- Props with types and defaults
- Usage examples
- Best practices
- Figma design specifications

## Development

```bash
# Build
bun run build

# Watch mode
bun run dev

# Test
bun test-mcp.js
```

## Contributing

When adding new components to @deay/ui:
1. Update `src/registry.ts` with component documentation
2. Rebuild: `bun run build`
3. Test: `bun test-mcp.js`
4. Republish (if needed): `npm publish`

## License

MIT
