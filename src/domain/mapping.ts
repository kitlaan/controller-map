import { z } from 'zod'
import { ControllerType } from '../controller'
import type { MappingDocument } from './types'

const ButtonConfigSchema = z.object({
  id: z.string(),
  modifiers: z.array(z.string()),
  description: z.string(),
})

const MappingDocumentSchema = z.object({
  version: z.literal(2),
  name: z.string(),
  date: z.string(),
  layout: z.nativeEnum(ControllerType),
  mapping: z.array(ButtonConfigSchema),
})

function migrate(raw: unknown): unknown {
  if (typeof raw === 'object' && raw !== null && (raw as Record<string, unknown>).version === 1) {
    return { ...raw as object, version: 2 }
  }
  return raw
}

export function validate(raw: unknown): MappingDocument | null {
  const result = MappingDocumentSchema.safeParse(migrate(raw))
  return result.success ? result.data : null
}

export function validateWithError(raw: unknown): { doc: MappingDocument | null; error: string | null } {
  const result = MappingDocumentSchema.safeParse(migrate(raw))
  if (result.success) return { doc: result.data, error: null }
  const first = result.error.issues[0]
  const path = first.path.length ? ` (${first.path.join('.')})` : ''
  return { doc: null, error: `${first.message}${path}` }
}
