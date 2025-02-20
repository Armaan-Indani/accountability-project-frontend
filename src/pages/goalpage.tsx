import React, { useState } from "react";
import { X, Plus, Edit2 } from "lucide-react";
import NavBar from "../components/NavBar.tsx";

// Custom styled components to replace shadcn components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`
      px-2 py-3 ml-2 rounded-md font-medium
      ${
        variant === "primary"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-gray-300 hover:bg-gray-50"
      }
      ${size === "sm" ? "text-sm px-2 py-1" : ""}
      ${className}
    `}
  >
    {children}
  </button>
);

const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
));

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
));

const Checkbox = ({ checked, onCheckedChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="h-4 w-4 rounded border-gray-300"
  />
);

const Dialog = ({ open, children }) =>
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {children}
    </div>
  ) : null;

const DialogContent = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg p-6 w-full mx-4 ${className}`}>
    {children}
  </div>
);

const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

const DialogClose = ({ onClick }) => (
  <button onClick={onClick} className="text-gray-500 hover:text-gray-700">
    &times;
  </button>
);

const GoalManagementApp = () => {
  const [goals, setGoals] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showGoalDetails, setShowGoalDetails] = useState(false);

  const [newGoal, setNewGoal] = useState({
    name: "",
    deadline: "",
    subgoals: [],
    habits: [],
    description: "",
    what: "",
    why: "",
    who: "",
    where: "",
    which: "",
    howMuch: "",
    resources: "",
    alignment: "",
    completed: false,
    subgoalProgress: {},
  });

  const [tempSubgoal, setTempSubgoal] = useState("");
  const [tempHabit, setTempHabit] = useState("");

  const resetNewGoal = () => {
    setNewGoal({
      name: "",
      deadline: "",
      subgoals: [],
      habits: [],
      description: "",
      what: "",
      why: "",
      who: "",
      where: "",
      which: "",
      howMuch: "",
      resources: "",
      alignment: "",
      completed: false,
      subgoalProgress: {},
    });
  };

  const handleAddSubgoal = () => {
    if (tempSubgoal.trim()) {
      setNewGoal({
        ...newGoal,
        subgoals: [...newGoal.subgoals, tempSubgoal.trim()],
        subgoalProgress: {
          ...newGoal.subgoalProgress,
          [tempSubgoal.trim()]: false,
        },
      });
      setTempSubgoal("");
    }
  };

  const handleAddHabit = () => {
    if (tempHabit.trim()) {
      setNewGoal({
        ...newGoal,
        habits: [...newGoal.habits, tempHabit.trim()],
      });
      setTempHabit("");
    }
  };

  const handleCreateGoal = () => {
    if (newGoal.name && newGoal.deadline) {
      if (isEditing) {
        setGoals(
          goals.map((g) => (g.name === selectedGoal.name ? newGoal : g))
        );
        setIsEditing(false);
      } else {
        setGoals([...goals, newGoal]);
      }
      setShowAddGoal(false);
      resetNewGoal();
      setSelectedGoal(null);
    }
  };

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
    setShowGoalDetails(true);
  };

  const handleEditClick = () => {
    setNewGoal(selectedGoal);
    setShowAddGoal(true);
    setIsEditing(true);
    setShowGoalDetails(false);
  };

  const handleGoalCompletion = (goalName, completed) => {
    setGoals(goals.map((g) => (g.name === goalName ? { ...g, completed } : g)));
  };

  const handleSubgoalCompletion = (goalName, subgoal, completed) => {
    setGoals(
      goals.map((g) =>
        g.name === goalName
          ? {
              ...g,
              subgoalProgress: {
                ...g.subgoalProgress,
                [subgoal]: completed,
              },
            }
          : g
      )
    );
  };

  return (
    <div>
      <NavBar />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Goal Management</h1>
          <Button onClick={() => setShowAddGoal(true)} children={undefined}>
            Add New Goal
          </Button>
        </div>

        <Dialog open={showAddGoal} children={undefined}>
          <DialogContent
            className="max-w-[90vw] max-h-[90vh] overflow-y-auto md:max-w-[70vw] xl:max-w-[65vw]"
            children={undefined}
          >
            <DialogHeader children={undefined}>
              <div className="flex justify-between items-center">
                <DialogTitle children={undefined}>
                  {isEditing ? "Edit Goal" : "New Goal"}
                </DialogTitle>
                <DialogClose onClick={() => setShowAddGoal(false)} />
              </div>
            </DialogHeader>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Input
                placeholder="Goal Name"
                value={newGoal.name}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, name: e.target.value })
                }
                className="flex-1"
              />
              <Input
                type="date"
                placeholder="Deadline"
                value={newGoal.deadline}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, deadline: e.target.value })
                }
                className="flex-1"
              />
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
                    <Button
                      size="sm"
                      onClick={handleAddSubgoal}
                      children={undefined}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {newGoal.subgoals.map((subgoal, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span>{subgoal}</span>
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
                    <Button
                      size="sm"
                      onClick={handleAddHabit}
                      children={undefined}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {newGoal.habits.map((habit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span>{habit}</span>
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
                    <h4 className="text-sm font-semibold mb-1 w-max">
                      What, Why, Who, Where, Which?
                    </h4>
                    <Textarea
                      value={newGoal.what}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, what: e.target.value })
                      }
                      className="h-12 resize-none"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-1 w-max">
                      How much, How many?
                    </h4>
                    <Textarea
                      value={newGoal.howMuch}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, howMuch: e.target.value })
                      }
                      className="h-12 resize-none"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-1 w-max">
                      Resources and Skills
                    </h4>
                    <Textarea
                      value={newGoal.resources}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, resources: e.target.value })
                      }
                      className="h-12 resize-none"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-1 w-max">
                      Alignment with long term aim/plan
                    </h4>
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
                  <Button onClick={handleCreateGoal} children={undefined}>
                    {isEditing ? "Save Changes" : "Create Goal"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showGoalDetails} children={undefined}>
          <DialogContent
            className="max-w-[90vw] max-h-[90vh] overflow-y-auto md:max-w-[70vw] xl:max-w-[65vw]"
            children={undefined}
          >
            <DialogHeader children={undefined}>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl font-bold" children={undefined}>
                  {selectedGoal?.name}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    Deadline: {selectedGoal?.deadline}
                  </span>
                  <DialogClose onClick={() => setShowGoalDetails(false)} />
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <hr />

                <div className="mt-4 mb-4">
                  <h3 className="font-semibold mb-2">Subgoals</h3>
                  <div className="max-h-40 overflow-y-auto">
                    {selectedGoal?.subgoals.map((subgoal, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Checkbox
                          checked={
                            selectedGoal.subgoalProgress[subgoal] || false
                          }
                          onCheckedChange={(checked) =>
                            handleSubgoalCompletion(
                              selectedGoal.name,
                              subgoal,
                              checked
                            )
                          }
                        />
                        <span>{subgoal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr />
                <div className="mt-4 mb-4">
                  <h3 className="font-semibold mb-2">Habits</h3>
                  <div className="max-h-40 overflow-y-auto">
                    {selectedGoal?.habits.map((habit, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <span>• {habit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr />
                <div className="mt-4 mb-4">
                  <h3 className="font-semibold mb-4">Description</h3>
                  <div className="max-h-24 overflow-y-auto p-2 border rounded text-left break-words whitespace-pre-wrap">
                    {selectedGoal?.description}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  {selectedGoal?.what && (
                    <div>
                      <h4 className="text-sm font-semibold w-max max-w-fit text-left">
                        What, Why, Who, Where, Which?
                      </h4>
                      <div className="max-h-16 overflow-y-auto p-2 border rounded text-left whitespace-pre-wrap">
                        {selectedGoal.what}
                      </div>
                    </div>
                  )}

                  {selectedGoal?.howMuch && (
                    <div>
                      <h4 className="text-sm font-semibold w-max max-w-fit text-left">
                        How much, How many?
                      </h4>
                      <div className="max-h-16 overflow-y-auto p-2 border rounded text-left whitespace-pre-wrap">
                        {selectedGoal.howMuch}
                      </div>
                    </div>
                  )}

                  {selectedGoal?.resources && (
                    <div>
                      <h4 className="text-sm font-semibold w-max max-w-fit text-left">
                        Resources and Skills
                      </h4>
                      <div className="max-h-16 overflow-y-auto p-2 border rounded text-left whitespace-pre-wrap">
                        {selectedGoal.resources}
                      </div>
                    </div>
                  )}

                  {selectedGoal?.alignment && (
                    <div>
                      <h4 className="text-sm font-semibold w-max max-w-fit text-left">
                        Alignment with long term aim/plan
                      </h4>
                      <div className="max-h-16 overflow-y-auto p-2 border rounded text-left whitespace-pre-wrap">
                        {selectedGoal.alignment}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button onClick={handleEditClick} children={undefined}>
                    <div className="flex items-center justify-center">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Goal
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowGoalDetails(false)}
                    children={undefined}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-2 gap-6">
          <Card children={undefined}>
            <CardHeader children={undefined}>
              <CardTitle children={undefined}>Goals in Progress</CardTitle>
            </CardHeader>
            <CardContent children={undefined}>
              {goals
                .filter((g) => !g.completed)
                .map((goal, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Checkbox
                      checked={goal.completed}
                      onCheckedChange={(checked) =>
                        handleGoalCompletion(goal.name, checked)
                      }
                    />
                    <button
                      onClick={() => handleGoalClick(goal)}
                      className="text-left hover:underline"
                    >
                      {goal.name} - {goal.deadline}
                    </button>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card children={undefined}>
            <CardHeader children={undefined}>
              <CardTitle children={undefined}>Accomplished Goals</CardTitle>
            </CardHeader>
            <CardContent children={undefined}>
              {goals
                .filter((g) => g.completed)
                .map((goal, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Checkbox
                      checked={goal.completed}
                      onCheckedChange={(checked) =>
                        handleGoalCompletion(goal.name, checked)
                      }
                    />
                    <button
                      onClick={() => handleGoalClick(goal)}
                      className="text-left hover:underline"
                    >
                      {goal.name} - {goal.deadline}
                    </button>
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
