import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { DndItem } from '../types/item';
import { AccessibleSortableItem } from './AccessibleSortableItem';

interface AccessibleSortableListProps {
  items: DndItem[];
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export function AccessibleSortableList({ items, onMoveUp, onMoveDown }: AccessibleSortableListProps) {
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <ul className="flex flex-col w-full max-w-2xl mx-auto list-none p-0">
        {items.map((item, index) => (
          <AccessibleSortableItem
            key={item.id}
            item={item}
            isFirst={index === 0}
            isLast={index === items.length - 1}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
          />
        ))}
      </ul>
    </SortableContext>
  );
}
