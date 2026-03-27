import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'

function presetsPlugin() {
  const virtualId = 'virtual:presets'
  const resolvedId = '\0' + virtualId

  return {
    name: 'presets',
    resolveId(id: string) {
      if (id === virtualId) return resolvedId
    },
    load(id: string) {
      if (id !== resolvedId) return
      const dir = path.resolve(__dirname, 'public/presets')
      const presets = fs.readdirSync(dir)
        .filter(f => f.endsWith('.json'))
        .flatMap(file => {
          try {
            const doc = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'))
            if (!doc.name) return []
            return [{ file, name: doc.name as string }]
          } catch {
            return []
          }
        })
      return `export default ${JSON.stringify(presets)}`
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [presetsPlugin(), tailwindcss(), vue()],
})
