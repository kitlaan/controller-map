import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import { validate } from '../mapping'
import type { MappingDocument } from '../types'

// Compact array format v2: [2, name, layout, [[id, modifiers, description], ...]]
type CompactDocV2 = [2, string, string, [string, string[], string][]]

function toCompact(doc: MappingDocument): CompactDocV2 {
  return [
    2,
    doc.name,
    doc.layout,
    doc.mapping.map(b => [b.id, b.modifiers, b.description]),
  ]
}

function fromCompact(raw: unknown): MappingDocument | null {
  if (!Array.isArray(raw) || raw[0] !== 2) return null
  const [version, name, layout, mapping] = raw as CompactDocV2
  return validate({
    version,
    name,
    date: new Date().toISOString(),
    layout,
    mapping: mapping.map(([id, modifiers, description]) => ({ id, modifiers, description })),
  })
}

export function encodeDocument(doc: MappingDocument): string {
  return compressToEncodedURIComponent(JSON.stringify(toCompact(doc)))
}

export function decodeDocument(encoded: string): MappingDocument | null {
  try {
    const raw = JSON.parse(decompressFromEncodedURIComponent(encoded))
    if (Array.isArray(raw)) return fromCompact(raw)  // compact format (new)
    return validate(raw)                              // object format (old ?d= links)
  } catch {
    return null
  }
}

export function buildShareUrl(doc: MappingDocument): string {
  const url = new URL(window.location.href)
  url.search = ''
  url.hash = encodeDocument(doc)
  return url.toString()
}
