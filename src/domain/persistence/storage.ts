import { set, get, del, entries, createStore } from 'idb-keyval'
import { validate } from '../mapping'
import type { MappingDocument } from '../types'

const store = createStore('controller-map', 'maps')

export async function saveMap(doc: MappingDocument): Promise<string> {
  const id = `${Date.now()}`
  await set(id, JSON.parse(JSON.stringify(doc)), store)
  return id
}

export async function loadMap(id: string): Promise<MappingDocument | null> {
  try {
    return validate(await get(id, store))
  } catch { return null }
}

export async function listMaps(): Promise<{ id: string; name: string; date: string }[]> {
  const all = await entries<string, MappingDocument>(store)
  return all
    .map(([id, doc]) => ({ id: String(id), name: doc?.name || String(id), date: doc?.date || '' }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export async function deleteMap(id: string): Promise<void> {
  await del(id, store)
}
