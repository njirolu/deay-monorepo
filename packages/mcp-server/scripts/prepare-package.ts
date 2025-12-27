import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get package root (scripts folder parent)
const packageRoot = path.resolve(__dirname, '..')
const distDir = path.join(packageRoot, 'dist')

// Copy package.json to dist
const sourcePackageJson = path.join(packageRoot, 'package.json')
const targetPackageJson = path.join(distDir, 'package.json')
fs.copyFileSync(sourcePackageJson, targetPackageJson)

// Copy README.md to dist
const sourceReadme = path.join(packageRoot, 'README.md')
const targetReadme = path.join(distDir, 'README.md')
if (fs.existsSync(sourceReadme)) {
  fs.copyFileSync(sourceReadme, targetReadme)
}

// Read and modify the copied package.json
const packageJson = JSON.parse(fs.readFileSync(targetPackageJson, 'utf-8'))

// Remove scripts from published package
delete packageJson.scripts

// Update files to include all files in dist
packageJson.files = ['.', 'README.md']

// Update bin path to be relative to dist folder
packageJson.bin = { 'deay-mcp': './index.js' }

// Write back to dist/package.json
fs.writeFileSync(targetPackageJson, JSON.stringify(packageJson, null, 2))
