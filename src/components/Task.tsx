import React from "react";
import DeleteIcon from "./DeleteIcon.tsx";

type TaskProps = {
  listId: string;
  item: {
    id: number;
    text: string;
    completed: boolean;
    editing: boolean;
  };
  toggleComplete: (listId: string, itemId: number) => void;
  updateItem: (listId: string, itemId: number, newText: string) => void;
  deleteItem: (listId: string, itemId: number) => void;
  setLists: React.Dispatch<React.SetStateAction<any>>;
  lists: any;
};

const Task: React.FC<TaskProps> = ({
  listId,
  item,
  toggleComplete,
  updateItem,
  deleteItem,
  setLists,
  lists,
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Checkbox to toggle complete */}
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleComplete(listId, item.id)}
        className="w-4 h-4 text-indigo-600"
      />

      {/* Input field for editing */}
      {item.editing && listId !== "default-habits" ? (
        <input
          type="text"
          autoFocus
          value={item.text}
          onChange={(e) => {
            setLists(
              lists.map((list: any) =>
                list.id === listId
                  ? {
                      ...list,
                      items: list.items.map((i: any) =>
                        i.id === item.id ? { ...i, text: e.target.value } : i
                      ),
                    }
                  : list
              )
            );
          }}
          placeholder="Enter task..."
          className="flex-1 px-2 py-1 border rounded"
          onBlur={(e) =>
            e.target.value.trim() !== ""
              ? updateItem(listId, item.id, e.target.value)
              : deleteItem(listId, item.id)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (e.target.value.trim() !== ""
              ? updateItem(listId, item.id, e.target.value)
              : deleteItem(listId, item.id))
          }
        />
      ) : (
        /* Display task text */
        <span
          className={`flex-1 text-left ${
            item.completed ? "line-through text-gray-400" : ""
          } ${listId !== "default-habits" ? "cursor-pointer" : ""}`}
          onDoubleClick={() => {
            if (listId !== "default-habits") {
              setLists(
                lists.map((l: any) =>
                  l.id === listId
                    ? {
                        ...l,
                        items: l.items.map((i: any) =>
                          i.id === item.id ? { ...i, editing: true } : i
                        ),
                      }
                    : l
                )
              );
            }
          }}
        >
          {item.text}
        </span>
      )}

      {/* Delete Bin Icon */}
      {listId !== "default-habits" && (
        <button
          onClick={() => deleteItem(listId, item.id)}
          className="text-gray-500 focus:outline-none"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default Task;
