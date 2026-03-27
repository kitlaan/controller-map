import { validate } from '../mapping'
import type { MappingDocument } from '../types'

export function exportJson(doc: MappingDocument): void {
  const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${doc.name || 'controller-map'}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importJson(file: File): Promise<MappingDocument | null> {
  const text = await file.text()
  try {
    return validate(JSON.parse(text))
  } catch {
    return null
  }
}
