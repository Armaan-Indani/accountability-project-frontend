import React, { useState } from "react";
import DeleteIcon from "./DeleteIcon.tsx";
import CrossIcon from "./CrossIcon.tsx";

// TODO1: Add subtasks

type TodoTask = {
  id: number;
  text: string;
  completed: boolean;
  editing: boolean;
};

type TodoListType = {
  id: string;
  title: string;
  items: TodoTask[];
  editing: boolean;
};

const TodoList = () => {
  // Define the default habits list
  const defaultHabits: TodoListType = {
    id: "default-habits",
    title: "Daily Habits",
    items: [
      { id: 1, text: "Read for 10 mins", completed: false, editing: false },
      { id: 2, text: "Exercise for 40 mins", completed: false, editing: false },
      { id: 3, text: "Meditate for 5 mins", completed: false, editing: false },
      { id: 4, text: "8 glasses of water", completed: false, editing: false },
      { id: 5, text: "7-8 hours of sleep", completed: false, editing: false },
    ],
    editing: false,
  };

  const [lists, setLists] = useState<TodoListType[]>([defaultHabits]);
  const [newListTitle, setNewListTitle] = useState("");

  const addNewList = () => {
    if (newListTitle.trim()) {
      setLists([
        ...lists,
        {
          id: Date.now().toString(),
          title: newListTitle,
          items: [],
          editing: false,
        },
      ]);
      setNewListTitle("");
    }
  };

  const deleteList = (listId: string) => {
    setLists(lists.filter((list: TodoListType) => list.id !== listId));
  };

  const addTask = (listId: string) => {
    if (listId === "default-habits") return;

    setLists(
      lists.map((list: TodoListType) =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                { id: Date.now(), text: "", completed: false, editing: true },
              ],
            }
          : list
      )
    );
  };

  const updateItem = (listId: string, itemId: number, newText: string) => {
    if (listId === "default-habits") return;
    setLists(
      lists.map((list: TodoListType) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item: TodoTask) =>
                item.id === itemId
                  ? {
                      ...item,
                      text: newText.trim() !== "" ? newText : item.text,
                      editing: false,
                    }
                  : item
              ),
            }
          : list
      )
    );
  };

  const deleteItem = (listId: string, itemId: number) => {
    if (listId === "default-habits") return;
    setLists(
      lists.map((list: TodoListType) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item: TodoTask) => item.id !== itemId),
            }
          : list
      )
    );
  };

  const toggleComplete = (listId: string, itemId: number) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : list
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Input for new list title */}
      <div className="flex gap-4">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="Enter list title..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onKeyDown={(e) => e.key === "Enter" && addNewList()}
        />
        <button
          onClick={addNewList}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add List
        </button>
      </div>

      {/* Lists and Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list: TodoListType) => (
          <div key={list.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-5">
              <p className="text-xl font-bold ">{list.title}</p>
              {list.id !== "default-habits" && (
                <button
                  onClick={() => deleteList(list.id)}
                  className="text-gray-500 focus:outline-none"
                >
                  <CrossIcon />
                </button>
              )}
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {list.items.map((item: TodoTask) => (
                <div key={item.id} className="flex items-center gap-3">
                  {/* Checkbox to toggle complete */}
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(list.id, item.id)}
                    className="w-4 h-4 text-indigo-600"
                  />

                  {/* Input field for editing */}
                  {item.editing && list.id !== "default-habits" ? (
                    <input
                      type="text"
                      autoFocus
                      value={item.text}
                      onChange={(e) => {
                        setLists(
                          lists.map((list_1: TodoListType) =>
                            list_1.id === list.id
                              ? {
                                  ...list_1,
                                  items: list_1.items.map((i) =>
                                    i.id === item.id
                                      ? { ...i, text: e.target.value }
                                      : i
                                  ),
                                }
                              : list_1
                          )
                        );
                      }}
                      placeholder="Enter task..."
                      className="flex-1 px-2 py-1 border rounded"
                      onBlur={(e) =>
                        e.target.value.trim() !== ""
                          ? updateItem(list.id, item.id, e.target.value)
                          : deleteItem(list.id, item.id)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.target.value.trim() !== ""
                          ? updateItem(list.id, item.id, e.target.value)
                          : deleteItem(list.id, item.id))
                      }
                    />
                  ) : (
                    /* Display task text */
                    <span
                      className={`flex-1 text-left ${
                        item.completed ? "line-through text-gray-400" : ""
                      } ${
                        list.id !== "default-habits" ? "cursor-pointer" : ""
                      }`}
                      onDoubleClick={() => {
                        if (list.id !== "default-habits") {
                          setLists(
                            lists.map((l: TodoListType) =>
                              l.id === list.id
                                ? {
                                    ...l,
                                    items: l.items.map((i) =>
                                      i.id === item.id
                                        ? { ...i, editing: true }
                                        : i
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
                  {list.id !== "default-habits" && (
                    <button
                      onClick={() => deleteItem(list.id, item.id)}
                      className="text-gray-500 focus:outline-none"
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Task Button */}
            {list.id !== "default-habits" && (
              <button
                onClick={() => addTask(list.id)}
                className="mt-4 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                + Add Task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
