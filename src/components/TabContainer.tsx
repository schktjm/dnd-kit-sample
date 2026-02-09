import { useState } from 'react';
import type { DndItem } from '../types/item';
import { BasicDndList } from './BasicDndList';
import { AccessibleDndList } from './AccessibleDndList';

type TabType = 'basic' | 'accessible';

interface TabContainerProps {
  initialItems: DndItem[];
}

export function TabContainer({ initialItems }: TabContainerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center gap-2 mb-6 border-b-2 border-gray-200 dark:border-gray-700">
        <button
          className={`px-6 py-3 text-base bg-transparent border-b-4 transition-all -mb-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-t ${
            activeTab === 'basic'
              ? 'text-blue-600 dark:text-blue-500 border-b-blue-600 dark:border-b-blue-500 font-bold'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium'
          }`}
          onClick={() => setActiveTab('basic')}
        >
          Basic
        </button>
        <button
          className={`px-6 py-3 text-base bg-transparent border-b-4 transition-all -mb-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-t ${
            activeTab === 'accessible'
              ? 'text-blue-600 dark:text-blue-500 border-b-blue-600 dark:border-b-blue-500 font-bold'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium'
          }`}
          onClick={() => setActiveTab('accessible')}
        >
          Accessible
        </button>
      </div>

      <div className="py-5">
        {activeTab === 'basic' ? (
          <BasicDndList initialItems={initialItems} />
        ) : (
          <AccessibleDndList initialItems={initialItems} />
        )}
      </div>
    </div>
  );
}
