import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import type { DndItem } from '../types/item';

interface BasicSortableItemProps {
  item: DndItem;
}

export function BasicSortableItem({ item }: BasicSortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 mb-2 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-center">
        <FontAwesomeIcon
          icon={faGripVertical}
          className="text-gray-400 text-xl"
          aria-hidden="true"
        />
      </div>
      <div className="flex-1 text-base text-gray-900 dark:text-white font-bold">
        {item.content}
      </div>
    </li>
  );
}
