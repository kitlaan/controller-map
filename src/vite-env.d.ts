/// <reference types="vite/client" />

declare module 'virtual:presets' {
  const presets: { file: string; name: string }[]
  export default presets
}
