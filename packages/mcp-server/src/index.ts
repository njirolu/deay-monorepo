#!/usr/bin/env node
/**
 * @deay/mcp - MCP Server for @deay/ui Component Library
 *
 * This server provides AI assistants with comprehensive documentation
 * about @deay/ui components following Figma design specifications.
 *
 * Run locally: bun run dev:mcp
 * Or after npm publish: npx @deay/mcp
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { getComponentInfo, listComponents, COMPONENT_REGISTRY } from './registry.js';

// Create server instance
const server = new Server(
  {
    name: '@deay/mcp',
    version: '0.0.1',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_component_info',
        description: 'Get information about @deay/ui components including props, usage examples, and best practices',
        inputSchema: {
          type: 'object',
          properties: {
            component: {
              type: 'string',
              description: 'Component name (e.g., "button", "input")',
              enum: ['button', 'input'],
            },
          },
          required: ['component'],
        },
      },
      {
        name: 'list_components',
        description: 'List all available components in @deay/ui',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get_component_info': {
      const componentName = args?.['component'] as string;
      const info = getComponentInfo(componentName);

      if (!info) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${componentName}" not found. Available components: ${listComponents().join(', ')}`,
            },
          ],
        };
      }

      // Format the component info as a detailed markdown response
      let response = `# ${info.name} Component\n\n`;
      response += `**Selector:** \`${info.selector}\`\n\n`;
      response += `**Description:** ${info.description}\n\n`;

      if (info.import) {
        response += `## Import\n\n`;
        response += `\`\`\`typescript\n${info.import}\n\`\`\`\n\n`;
      }

      response += `## Props\n\n`;
      info.props.forEach((prop) => {
        response += `### ${prop.name}\n`;
        response += `- **Type:** \`${prop.type}\`\n`;
        response += `- **Required:** ${prop.required ? 'Yes' : 'No'}\n`;
        response += `- **Default:** \`${prop.default}\`\n`;
        response += `- **Description:** ${prop.description}\n\n`;
      });

      response += `## Usage Examples\n\n`;
      info.examples.forEach((example) => {
        response += `### ${example.title}\n`;
        response += `${example.description}\n\n`;
        response += `\`\`\`html\n${example.code}\n\`\`\`\n\n`;
      });

      response += `## Best Practices\n\n`;
      info.bestPractices.forEach((practice, index) => {
        response += `${index + 1}. ${practice}\n`;
      });

      return {
        content: [
          {
            type: 'text',
            text: response,
          },
        ],
      };
    }

    case 'list_components': {
      const components = listComponents();
      let response = '# Available Components in @deay/ui\n\n';

      components.forEach((name) => {
        const info = COMPONENT_REGISTRY[name];
        response += `## ${info.name}\n`;
        response += `- **Selector:** \`${info.selector}\`\n`;
        response += `- **Description:** ${info.description}\n\n`;
      });

      return {
        content: [
          {
            type: 'text',
            text: response,
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('@deay/mcp server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
