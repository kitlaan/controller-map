import xboxone from './assets/controllers/xboxone.json'
import switchpro from './assets/controllers/switchpro.json'

export enum ControllerType {
  XboxOne = "xboxone",
  SwitchPro = "switchpro",
}

export type Uri = string

export enum LayoutTarget {
  AboveLeftOuter = 'above-left-outer',
  AboveLeftInner = 'above-left-inner',
  AboveRightInner = 'above-right-inner',
  AboveRightOuter = 'above-right-outer',
  LeftTop = 'left-top',
  LeftBottom = 'left-bottom',
  RightTop = 'right-top',
  RightBottom = 'right-bottom',
  BelowLeft = 'below-left',
  BelowRight = 'below-right',
}

export enum ButtonType {
  Stick = 'stick',
  Button = 'button',
  Analog = 'analog',
}

export type ControllerButton = {
  name: string
  type?: ButtonType
  icon: Uri
  position: {
    x: number
    y: number
  }
  target?: LayoutTarget
  features?: { [key: string]: ControllerButton }
}

export type ControllerMap = {
  id: string
  name: string
  image: {
    uri: Uri
    dimensions: {
      width: number
      height: number
    }
  }
  features: { [key: string]: ControllerButton }
}

export const layouts: { [key in ControllerType]: ControllerMap } = {
  "xboxone": xboxone as any,   // NOTE: `as any` to coerce string into enum
  "switchpro": switchpro as any,
}

export function getImage(layout: ControllerType): Uri {
  const controller = layouts[layout]
  if (!controller) return ''
  const asset = controller.image?.uri
  return asset ? new URL(`./assets/controllers/${controller.id}/${asset}`, import.meta.url).href : ''
}

export function getIcon(layout: ControllerType, name: string): Uri {
  const controller = layouts[layout]
  if (!controller) return ''

  const ids = name.split('.')
  let asset: string

  if (ids.length > 1) {
    const feature = controller.features[ids[0]]
    if (!feature?.features) return ''
    asset = feature.features[ids[1]]?.icon ?? ''
  } else {
    asset = controller.features[name]?.icon ?? ''
  }

  return asset ? new URL(`./assets/controllers/${controller.id}/${asset}`, import.meta.url).href : ''
}
