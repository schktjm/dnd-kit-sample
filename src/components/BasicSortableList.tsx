import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { DndItem } from '../types/item';
import { BasicSortableItem } from './BasicSortableItem';

interface BasicSortableListProps {
  items: DndItem[];
}

export function BasicSortableList({ items }: BasicSortableListProps) {
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <ul className="flex flex-col w-full max-w-2xl mx-auto list-none p-0">
        {items.map((item) => (
          <BasicSortableItem key={item.id} item={item} />
        ))}
      </ul>
    </SortableContext>
  );
}
