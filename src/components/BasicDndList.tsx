import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import type { DndItem } from '../types/item';
import { BasicSortableList } from './BasicSortableList';

interface BasicDndListProps {
  initialItems: DndItem[];
}

export function BasicDndList({ initialItems }: BasicDndListProps) {
  const [items, setItems] = useState<DndItem[]>(initialItems);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <BasicSortableList items={items} />
    </DndContext>
  );
}
