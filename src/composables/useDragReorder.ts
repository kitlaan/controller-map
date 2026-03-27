import { ref } from 'vue'

export function useDragReorder(onReorder: (from: number, to: number) => void) {
  const dragOverIndex = ref<number | null>(null)

  function startDrag(evt: DragEvent, idx: number) {
    evt.dataTransfer!.dropEffect = 'move'
    evt.dataTransfer!.effectAllowed = 'move'
    evt.dataTransfer!.setData('itemIdx', String(idx))
  }

  function onDrop(evt: DragEvent, idx: number) {
    const from = parseInt(evt.dataTransfer!.getData('itemIdx'))
    onReorder(from, idx)
    dragOverIndex.value = null
  }

  function onDragEnter(_evt: DragEvent, idx: number) {
    dragOverIndex.value = idx
  }

  function onDragEnd() {
    dragOverIndex.value = null
  }

  return { dragOverIndex, startDrag, onDrop, onDragEnter, onDragEnd }
}
