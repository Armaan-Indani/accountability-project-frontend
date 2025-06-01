import React, { useState, useEffect } from "react";
import { X, Plus, Edit2 } from "lucide-react";
import NavBar from "../components/NavBar.tsx";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Textarea,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/UIComponents.tsx";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

type Subgoal = {
  ID: number;
  name: string;
  completed: boolean;
};

type Habit = {
  name: string;
  frequency: string;
};

type Goal = {
  ID: number;
  name: string;
  deadline: Date;
  subgoals: Subgoal[];
  habits: Habit[];
  description: string;
  what: string;
  how_much: string;
  resources: string;
  alignment: string;
  completed: boolean;
};

const GoalManagementApp = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showGoalDetails, setShowGoalDetails] = useState(false);

  const [newGoal, setNewGoal] = useState<Omit<Goal, "ID">>({
    name: "",
    deadline: new Date(),
    subgoals: [],
    habits: [],
    description: "",
    what: "",
    how_much: "",
    resources: "",
    alignment: "",
    completed: false,
  });

  const [tempSubgoal, setTempSubgoal] = useState("");
  const [tempHabit, setTempHabit] = useState("");
  const [tempHabitFrequency, setTempHabitFrequency] = useState("");

  const resetNewGoal = () => {
    setNewGoal({
      name: "",
      deadline: new Date(),
      subgoals: [],
      habits: [],
      description: "",
      what: "",
      how_much: "",
      resources: "",
      alignment: "",
      completed: false,
      subgoalProgress: {},
    });
  };

  const fetchToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    return token;
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = fetchToken();
        const response = await axios.get(`${BACKEND_URL}/api/goal/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.data.status === "success") {
          setGoals(
            response.data.data.map((goal: any) => ({
              ID: goal.ID.toString(),
              name: goal.name,
              deadline: goal.deadline,
              subgoals: goal.subgoals.map((subgoal: any) => {
                return {
                  ID: subgoal.ID.toString(),
                  name: subgoal.name,
                  completed: subgoal.completed,
                };
              }),
              habits: goal.habits.map((habit: any) => {
                return { name: habit.name, frequency: habit.frequency };
              }),
              description: goal.description,
              what: goal.what,
              how_much: goal.how_much,
              resources: goal.resources,
              alignment: goal.alignment,
              completed: goal.completed,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  const handleAddSubgoal = () => {
    if (tempSubgoal.trim() !== "") {
      setNewGoal({
        ...newGoal,
        subgoals: [
          ...newGoal.subgoals,
          { name: tempSubgoal.trim(), completed: false },
        ],
      });
      setTempSubgoal("");
    }
  };

  const handleAddHabit = () => {
    if (tempHabit.trim() !== "" && tempHabitFrequency.trim() !== "") {
      setNewGoal({
        ...newGoal,
        habits: [
          ...newGoal.habits,
          { name: tempHabit.trim(), frequency: tempHabitFrequency.trim() },
        ],
      });
      setTempHabit("");
      setTempHabitFrequency("");
    }
  };

  const handleCreateGoal = async () => {
    if (newGoal.name && newGoal.deadline) {
      try {
        const token = fetchToken();
        const response = await axios.post(`${BACKEND_URL}/api/goal/`, newGoal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const createdGoal = response.data.data;
        setGoals([...goals, createdGoal]);
        setShowAddGoal(false);
        resetNewGoal();
        setSelectedGoal(null);
      } catch (error) {
        console.error("Error creating goal:", error);
      }
    } else {
      alert("Please fill in the deadline and title");
    }
  };

  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowGoalDetails(true);
  };

  const handleEditClick = async () => {
    if (selectedGoal) {
      setNewGoal({
        name: selectedGoal.name,
        deadline: selectedGoal.deadline,
        subgoals: selectedGoal.subgoals,
        habits: selectedGoal.habits,
        description: selectedGoal.description,
        what: selectedGoal.what,
        how_much: selectedGoal.how_much,
        resources: selectedGoal.resources,
        alignment: selectedGoal.alignment,
        completed: selectedGoal.completed,
      });
      setShowAddGoal(true);
      setIsEditing(true);
      setShowGoalDetails(false);
    }
  };

  const handleSaveChanges = async () => {
    if (selectedGoal) {
      try {
        const token = fetchToken();
        const response = await axios.put(
          `${BACKEND_URL}/api/goal/${selectedGoal.ID}`,
          newGoal,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const updatedGoal = response.data.data;

        setGoals(
          goals.map((g: Goal) => (g.ID === selectedGoal.ID ? updatedGoal : g))
        );
        setShowAddGoal(false);
        resetNewGoal();
        setSelectedGoal(null);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating goal:", error);
      }
    }
  };

  const handleGoalCompletion = async (goalID: Number, isCompleted: boolean) => {
    try {
      const token = fetchToken();
      await axios.patch(
        `${BACKEND_URL}/api/goal/${goalID}/toggle`,
        { isCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setGoals(
        goals.map((g: Goal) =>
          g.ID === goalID ? { ...g, completed: isCompleted } : g
        )
      );
    } catch (error) {
      console.error("Error toggling goal completion:", error);
    }
  };

  const handleSubgoalCompletion = async (
    goalID: number,
    subgoalID: number,
    isCompleted: boolean
  ) => {
    try {
      const token = fetchToken();
      await axios.patch(
        `${BACKEND_URL}/api/goal/${goalID}/${subgoalID}/toggle`,
        { isCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setGoals(
        goals.map((g: Goal) => {
          if (String(g.ID) === String(goalID)) {
            return {
              ...g,
              subgoals: g.subgoals.map((sg: Subgoal) =>
                String(sg.ID) === String(subgoalID)
                  ? { ...sg, completed: isCompleted }
                  : sg
              ),
            };
          }
          return g;
        })
      );
      // Also update selectedGoal if it's open
      setSelectedGoal((goal: Goal) =>
        goal && String(goal.ID) === String(goalID)
          ? {
              ...goal,
              subgoals: goal.subgoals.map((sg: Subgoal) =>
                String(sg.ID) === String(subgoalID)
                  ? { ...sg, completed: isCompleted }
                  : sg
              ),
            }
          : goal
      );
    } catch (error) {
      console.error("Error toggling subgoal completion:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">
            Arise, awake and stop not till the goal is reached.
          </h1>
          <Button onClick={() => setShowAddGoal(true)}>Add New Goal</Button>
        </div>

        <Dialog open={showAddGoal}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto md:max-w-[70vw] xl:max-w-[65vw]">
            <div className="flex flex-row gap-4 mb-4">
              <Input
                placeholder="Goal Name"
                value={newGoal.name}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, name: e.target.value })
                }
                className="flex-1"
              />
              <DialogClose onClick={() => setShowAddGoal(false)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Subgoals</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      placeholder="Subgoal"
                      value={tempSubgoal}
                      onChange={(e) => setTempSubgoal(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddSubgoal()
                      }
                    />
                    <Button size="sm" onClick={handleAddSubgoal}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 space-y-2 max-h-28 overflow-y-auto">
                    {newGoal.subgoals.map((subgoal: Subgoal, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <span>{subgoal.name}</span>
                        <button
                          onClick={() =>
                            setNewGoal({
                              ...newGoal,
                              subgoals: newGoal.subgoals.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                          className="text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Habits</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      placeholder="Habit"
                      value={tempHabit}
                      onChange={(e) => setTempHabit(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddHabit()}
                    />
                    <Input
                      placeholder="Frequency"
                      value={tempHabitFrequency}
                      onChange={(e) => setTempHabitFrequency(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddHabit()}
                    />
                    <Button size="sm" onClick={handleAddHabit}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 space-y-2 max-h-28 overflow-y-auto">
                    {newGoal.habits.map((habit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span>
                          {habit.name} - {habit.frequency}
                        </span>
                        <button
                          onClick={() =>
                            setNewGoal({
                              ...newGoal,
                              habits: newGoal.habits.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                          className="text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Description</h3>
                </div>
                <Textarea
                  placeholder="Describe your goal..."
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                  className="h-32"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Deadline</h3>
                    </div>
                    <Input
                      type="datetime-local"
                      placeholder="Deadline"
                      value={
                        newGoal.deadline instanceof Date
                          ? new Date(
                              newGoal.deadline.getTime() -
                                newGoal.deadline.getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) => {
                        setNewGoal({
                          ...newGoal,
                          deadline: new Date(e.target.value),
                        });
                      }}
                      className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 h-12 resize-none mb-2"
                    />
                  </div>
                  <div>
                    <div className="relative group flex flex-row justify-between">
                      <h4 className="text-sm font-semibold mb-1 w-max">
                        What, Why, Who, Where, Which?
                      </h4>
                      <i className="ml-1 mr-2 cursor-pointer font-serif relative group">
                        <b>i</b>
                        <div className="absolute w-72 text-justify right-0 top-full mt-1 border border-gray-200 p-2 text-xs text-black bg-gray-50 rounded-md italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                          Answer the applicable wh-words to make the goal more
                          specific, and clearly define what you want to achieve.
                        </div>
                      </i>
                    </div>
                    <Textarea
                      value={newGoal.what}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, what: e.target.value })
                      }
                      className="h-12 resize-none"
                    />
                  </div>

                  <div>
                    <div className="relative group flex flex-row justify-between">
                      <h4 className="text-sm font-semibold mb-1 w-max">
                        How much, How many?
                      </h4>
                      <i className="ml-1 mr-2 cursor-pointer font-serif relative group">
                        <b>i</b>
                        <div className="absolute w-72 text-justify right-0 top-full mt-1 border border-gray-200 p-2 text-xs text-black bg-gray-50 rounded-md italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                          Quantify the goal and decide how much is enough to
                          accomplish the goal. How will success be measured?
                        </div>
                      </i>
                    </div>
                    <Textarea
                      value={newGoal.how_much}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, how_much: e.target.value })
                      }
                      className="h-12 resize-none"
                    />
                  </div>

                  <div>
                    <div className="relative group flex flex-row justify-between">
                      <h4 className="text-sm font-semibold mb-1 w-max">
                        Skills and Resources
                      </h4>
                      <i className="ml-1 mr-2 cursor-pointer font-serif relative group">
                        <b>i</b>
                        <div className="absolute w-72 text-justify right-0 top-full mt-1 border border-gray-200 p-2 text-xs text-black bg-gray-50 rounded-md italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                          What are the required skills and resources? Do I have
                          the required skills and resources? Can I develop and
                          acquire them to achieve the goal?
                        </div>
                      </i>
                    </div>
                    <Textarea
                      value={newGoal.resources}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, resources: e.target.value })
                      }
                      className="h-12 resize-none"
                    />
                  </div>

                  <div>
                    <div className="relative group flex flex-row justify-between">
                      <h4 className="text-sm font-semibold mb-1 w-max">
                        Alignment with long term aim/plan
                      </h4>
                      <i className="ml-1 mr-2 cursor-pointer font-serif relative group">
                        <b>i</b>
                        <div className="absolute w-72 text-justify right-0 top-full mt-1 border border-gray-200 p-2 text-xs text-black bg-gray-50 rounded-md italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                          Think on how the goal aligns with your long-term plans
                          in life, and whether it is meaningful. Does this goal
                          matter to me?
                        </div>
                      </i>
                    </div>
                    <Textarea
                      value={newGoal.alignment}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, alignment: e.target.value })
                      }
                      className="h-12 resize-none"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={isEditing ? handleSaveChanges : handleCreateGoal}
                  >
                    {isEditing ? "Save Changes" : "Create Goal"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showGoalDetails}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto md:max-w-[70vw] xl:max-w-[65vw]">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl font-bold">
                  {/* {selectedGoal?.name} */}
                  {selectedGoal?.name.length > 15
                    ? `${selectedGoal?.name.substring(0, 15)}...`
                    : selectedGoal?.name}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    Deadline:
                    <br className="md:hidden" />{" "}
                    {selectedGoal?.deadline instanceof Date
                      ? selectedGoal.deadline.toLocaleString()
                      : ""}
                  </span>
                  <DialogClose onClick={() => setShowGoalDetails(false)} />
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                {/* <hr /> */}

                <div className="mt-4 mb-4">
                  <h3 className="font-semibold mb-2 text-left">Subgoals</h3>
                  <div className="max-h-28 overflow-y-auto">
                    {selectedGoal?.subgoals.length ? (
                      selectedGoal.subgoals.map((subgoal: Subgoal) => (
                        <div
                          key={subgoal.ID}
                          className="flex items-center gap-2 mb-2"
                        >
                          <Checkbox
                            checked={subgoal.completed}
                            onCheckedChange={(checked: boolean) => {
                              handleSubgoalCompletion(
                                selectedGoal.ID,
                                subgoal.ID,
                                checked
                              );
                            }}
                          />
                          <span>{subgoal.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="italic text-left">No subtasks</div>
                    )}
                  </div>
                </div>

                {/* <hr /> */}
                <div className="mt-4 mb-4">
                  <h3 className="font-semibold mb-2 text-left">Habits</h3>
                  <div className="max-h-28 overflow-y-auto">
                    {selectedGoal?.habits.length ? (
                      selectedGoal.habits.map((habit, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mb-2"
                        >
                          <span>
                            • {habit.name} - {habit.frequency}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="italic text-left">No habits</div>
                    )}
                  </div>
                </div>

                {/* <hr /> */}
                <div className="mt-4 mb-4">
                  <h3 className="font-semibold mb-2 text-left">Description</h3>
                  <div className="max-h-28 overflow-y-auto rounded text-left break-words whitespace-pre-wrap">
                    {selectedGoal?.description ? (
                      selectedGoal.description
                    ) : (
                      <div className="italic text-left">No description</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  {/* <hr /> */}
                  {selectedGoal?.what && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 w-max max-w-fit text-left">
                        What, Why, Who, Where, Which?
                      </h4>
                      <div className="max-h-16 overflow-y-auto mb-2 p-2 rounded text-left whitespace-pre-wrap">
                        {selectedGoal.what}
                      </div>
                      {/* <hr /> */}
                    </div>
                  )}

                  {selectedGoal?.how_much && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 w-max max-w-fit text-left">
                        How much, How many?
                      </h4>
                      <div className="max-h-16 overflow-y-auto mb-2 p-2 rounded text-left whitespace-pre-wrap">
                        {selectedGoal.how_much}
                      </div>
                      {/* <hr /> */}
                    </div>
                  )}

                  {selectedGoal?.resources && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 w-max max-w-fit text-left">
                        Resources and Skills
                      </h4>
                      <div className="max-h-16 overflow-y-auto mb-2 p-2 rounded text-left whitespace-pre-wrap">
                        {selectedGoal.resources}
                      </div>
                      {/* <hr /> */}
                    </div>
                  )}

                  {selectedGoal?.alignment && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 w-max max-w-fit text-left">
                        Alignment with long term aim/plan
                      </h4>
                      <div className="max-h-16 overflow-y-auto mb-2 p-2 rounded text-left whitespace-pre-wrap">
                        {selectedGoal.alignment}
                      </div>
                      {/* <hr /> */}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button onClick={handleEditClick}>
                    <div className="flex items-center justify-center">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Goal
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowGoalDetails(false);
                      // setSelectedGoal(null);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Goals in progress */}
          <Card>
            <CardHeader>
              <CardTitle>Goals in Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {goals
                .filter((g: Goal) => !g.completed)
                .sort(
                  (a: Goal, b: Goal) =>
                    new Date(a.deadline).getTime() -
                    new Date(b.deadline).getTime()
                )
                .map((goal: Goal, index: number) => (
                  <div
                    className="flex justify-between items-center mb-2"
                    key={index}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={goal.completed}
                        onCheckedChange={(checked: boolean) =>
                          handleGoalCompletion(goal.ID, checked)
                        }
                      />
                      <button
                        onClick={() => handleGoalClick(goal)}
                        className="text-left text-xl hover:text-indigo-600 font-semibold"
                      >
                        {goal.name.length > 15
                          ? `${goal.name.substring(0, 15)}...`
                          : goal.name}
                      </button>
                    </div>
                    {new Date(goal.deadline).toLocaleString("en-GB")}
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Accomplished Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Accomplished Goals</CardTitle>
            </CardHeader>
            <CardContent>
              {goals
                .filter((g: Goal) => g.completed)
                .sort(
                  (a: Goal, b: Goal) =>
                    new Date(a.deadline).getTime() -
                    new Date(b.deadline).getTime()
                )
                .map((goal: Goal, index: number) => (
                  <div
                    className="flex justify-between items-center mb-2"
                    key={index}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox
                        checked={goal.completed}
                        onCheckedChange={(checked) =>
                          handleGoalCompletion(goal.ID, checked)
                        }
                      />
                      <button
                        onClick={() => handleGoalClick(goal)}
                        className="text-left text-xl hover:text-indigo-600 font-semibold"
                      >
                        {goal.name.length > 15
                          ? `${goal.name.substring(0, 15)}...`
                          : goal.name}
                      </button>
                    </div>
                    {new Date(goal.deadline).toLocaleDateString("en-GB")}
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GoalManagementApp;
