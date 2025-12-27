import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get package root (scripts folder parent)
const packageRoot = path.resolve(__dirname, '..')
const distDir = path.join(packageRoot, 'dist')

// Read the generated package.json
const packageJsonPath = path.join(distDir, 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

// Add files field to specify what to publish
packageJson.files = [
  'fesm2022',
  'lib',
  '*.d.ts',
  'README.md',
  'package.json'
]

// Write back the modified package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

// Fix .npmignore to only exclude nested package.json files
const npmignorePath = path.join(distDir, '.npmignore')
fs.writeFileSync(npmignorePath, 'lib/*/package.json')

console.log('✓ Postbuild completed successfully')
console.log('  - Added files field to package.json')
console.log('  - Fixed .npmignore to only exclude nested package.json files')
