import type { DndItem } from './types/item'
import { TabContainer } from './components/TabContainer'

const initialItems: DndItem[] = [
  { id: '1', content: 'アイテム 1' },
  { id: '2', content: 'アイテム 2' },
  { id: '3', content: 'アイテム 3' },
  { id: '4', content: 'アイテム 4' },
  { id: '5', content: 'アイテム 5' },
]

function App() {
  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-8 text-gray-900 dark:text-white text-center font-bold">dnd-kitの実装サンプル</h1>
        <TabContainer initialItems={initialItems} />
      </div>
    </div>
  )
}

export default App
