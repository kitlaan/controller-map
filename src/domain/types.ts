import type { ControllerType } from '../controller'

export type ButtonConfig = {
  id: string
  modifiers: string[]
  description: string
}

export type MappingDocument = {
  version: 2
  name: string
  date: string
  layout: ControllerType
  mapping: ButtonConfig[]
}
