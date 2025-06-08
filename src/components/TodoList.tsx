import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "./DeleteIcon";
import CrossIcon from "./CrossIcon";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
  const [lists, setLists] = useState<TodoListType[]>([]);
  const [newListTitle, setNewListTitle] = useState("");

  const fetchToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    return token;
  };

  //Fetching Lists
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = fetchToken();
        const response = await axios.get(`${BACKEND_URL}/api/tasklist/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.data.status === "success") {
          setLists(
            response.data.data.map((list: any) => ({
              id: list.ID.toString(),
              title: list.name,
              items: list.tasks.map((task: any) => ({
                id: task.ID,
                text: task.text,
                completed: task.completed,
                editing: false,
              })),
              editing: false,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);

  const addNewList = async () => {
    if (!newListTitle.trim()) return;

    try {
      const token = fetchToken();
      const response = await axios.post(
        `${BACKEND_URL}/api/tasklist/`,
        { name: newListTitle },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setLists([
          ...lists,
          {
            id: response.data.data.ID.toString(),
            title: newListTitle,
            items: [],
            editing: false,
          },
        ]);
        setNewListTitle("");
      }
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const deleteList = async (listId: string) => {
    try {
      const token = fetchToken();
      const response = await axios.delete(
        `${BACKEND_URL}/api/tasklist/${listId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setLists(lists.filter((list: TodoListType) => list.id !== listId));
      } else {
        console.error("Error deleting list:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const addTask = async (listId: string) => {
    if (listId === "default-habits") return;

    const newTaskText = prompt("Enter task text:");
    if (!newTaskText) return;

    try {
      const token = fetchToken();
      const response = await axios.post(
        `${BACKEND_URL}/api/task/${listId}`,
        { text: newTaskText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        const newTask = {
          id: response.data.data.ID,
          text: newTaskText,
          completed: false,
          editing: false,
        };

        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? { ...list, items: [...list.items, newTask] }
              : list
          )
        );
      } else {
        console.error("Error adding task:", response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding task:", error.message);
      } else {
        console.error("Error adding task:", error);
      }
    }
  };

  const updateItem = async (
    listId: string,
    itemId: number,
    newText: string
  ) => {
    if (listId === "default-habits" || newText.trim() === "") return;

    try {
      const token = fetchToken();
      const response = await axios.patch(
        `${BACKEND_URL}/api/task/${itemId}`,
        { text: newText.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === itemId
                      ? { ...item, text: newText.trim(), editing: false }
                      : item
                  ),
                }
              : list
          )
        );
      } else {
        console.error("Error updating task:", response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating task:", error.message);
      } else {
        console.error("Error updating task:", error);
      }
    }
  };

  const deleteItem = async (listId: string, itemId: number) => {
    if (listId === "default-habits") return;

    try {
      const token = fetchToken();
      const response = await axios.delete(`${BACKEND_URL}/api/task/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.status === "success") {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.filter((item) => item.id !== itemId),
                }
              : list
          )
        );
      } else {
        console.error("Error deleting task:", response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting task:", error.message);
      } else {
        console.error("Error deleting task:", error);
      }
    }
  };

  const toggleComplete = async (listId: string, itemId: number) => {
    try {
      const token = fetchToken();
      const list = lists.find((l) => l.id === listId);
      if (!list) return;
      const task = list.items.find((item) => item.id === itemId);
      if (!task) return;

      const newCompletedStatus = !task.completed;

      const response = await axios.patch(
        `${BACKEND_URL}/api/task/${itemId}/toggle`,
        { completed: newCompletedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === itemId
                      ? { ...item, completed: newCompletedStatus }
                      : item
                  ),
                }
              : list
          )
        );
      } else {
        console.error("Error toggling task status:", response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error toggling task status:", error.message);
      } else {
        console.error("Error toggling task status:", error);
      }
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Input for new list title */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="Enter list title..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:max-w-md lg:max-w-none"
          onKeyDown={(e) => e.key === "Enter" && addNewList()}
        />
        <button
          onClick={addNewList}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto"
        >
          Add List
        </button>
      </div>

      {/* Lists and Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list: TodoListType) => (
          <div
            key={list.id}
            className="bg-white p-6 rounded-lg shadow-lg w-full"
          >
            <div className="flex justify-between items-center mb-5">
              <p className="text-xl font-bold break-words">{list.title}</p>
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
                      className="flex-1 px-2 py-2 border rounded w-full sm:max-w-md lg:max-w-lg"
                      onBlur={(e) =>
                        e.target.value.trim() !== ""
                          ? updateItem(list.id, item.id, e.target.value)
                          : deleteItem(list.id, item.id)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        ((e.target as HTMLInputElement).value.trim() !== ""
                          ? updateItem(
                              list.id,
                              item.id,
                              (e.target as HTMLInputElement).value
                            )
                          : deleteItem(list.id, item.id))
                      }
                    />
                  ) : (
                    /* Display task text */
                    <span
                      className={`flex-1 break-words text-left ${
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
                className="mt-4 w-full sm:w-auto px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
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
