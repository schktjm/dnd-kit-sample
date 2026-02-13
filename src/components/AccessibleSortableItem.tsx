import { useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import type { DndItem } from "../types/item";

interface AccessibleSortableItemProps {
  item: DndItem;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export function AccessibleSortableItem({
  item,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
}: AccessibleSortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const dragButtonRef = useRef<HTMLButtonElement>(null);

  // button要素に必要ない属性を渡さないように分割
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { role, tabIndex, ...actualAttributes } = attributes;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // リストアイテム全体でドラッグを開始できるように、イベントをボタンに委譲
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    // ボタン自体がクリックされた場合は何もしない
    if (
      e.target === dragButtonRef.current ||
      dragButtonRef.current?.contains(e.target as Node)
    ) {
      return;
    }

    // ボタンにクリックイベントを転送
    if (dragButtonRef.current) {
      dragButtonRef.current.click();
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 mb-2 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg cursor-grab active:cursor-grabbing has-[.drag-handle:focus-visible]:outline-none has-[.drag-handle:focus-visible]:ring-2 has-[.drag-handle:focus-visible]:ring-blue-500 has-[.drag-handle:focus-visible]:ring-offset-2"
      onClick={handleClick}
    >
      <button
        ref={dragButtonRef}
        type="button"
        className="drag-handle flex items-center justify-center p-1 -m-1 cursor-grab active:cursor-grabbing focus:outline-none focus-visible:outline-none"
        aria-label={`${item.content}をドラッグ`}
        {...actualAttributes}
        {...listeners}
      >
        <FontAwesomeIcon
          icon={faGripVertical}
          className="text-gray-400 text-xl"
          aria-hidden="true"
        />
      </button>
      <div className="flex-1 text-base text-gray-900 dark:text-white font-bold">
        {item.content}
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onMoveUp(item.id)}
          disabled={isFirst}
          className="flex items-center justify-center w-10 h-10 rounded-md bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-600 shadow-sm hover:bg-green-100 hover:border-green-400 dark:hover:bg-green-900/40 dark:hover:border-green-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-50 dark:disabled:hover:bg-green-900/20 disabled:hover:border-green-300 dark:disabled:hover:border-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
          aria-label={`${item.content}を上に移動`}
        >
          <FontAwesomeIcon
            icon={faChevronUp}
            className="text-gray-700 dark:text-gray-200"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          onClick={() => onMoveDown(item.id)}
          disabled={isLast}
          className="flex items-center justify-center w-10 h-10 rounded-md bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-600 shadow-sm hover:bg-green-100 hover:border-green-400 dark:hover:bg-green-900/40 dark:hover:border-green-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-50 dark:disabled:hover:bg-green-900/20 disabled:hover:border-green-300 dark:disabled:hover:border-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
          aria-label={`${item.content}を下に移動`}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-gray-700 dark:text-gray-200"
            aria-hidden="true"
          />
        </button>
      </div>
    </li>
  );
}
