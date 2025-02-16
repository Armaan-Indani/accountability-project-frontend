import React, { useState } from "react";
import { X, Plus, Edit2 } from "lucide-react";

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
      px-4 py-3 ml-2 rounded-md font-medium
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
  <div className={`bg-white rounded-lg p-6 max-w-lg w-full mx-4 ${className}`}>
    {children}
  </div>
);

const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

const DialogClose = ({ children, asChild }) =>
  asChild ? (
    children
  ) : (
    <button className="text-gray-500 hover:text-gray-700">&times;</button>
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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Goal Management</h1>
        <Button
          onClick={() => {
            setShowAddGoal(true);
            setIsEditing(false);
            resetNewGoal();
            setSelectedGoal(null);
          }}
        >
          Add New Goal
        </Button>
      </div>

      {showAddGoal && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Goal" : "New Goal"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
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

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h3 className="font-semibold">Subgoals</h3>
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
                      className="p ml-2"
                      size="sm"
                      onClick={handleAddSubgoal}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 space-y-2">
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
                  <h3 className="font-semibold">Habits</h3>
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      placeholder="Habit"
                      value={tempHabit}
                      onChange={(e) => setTempHabit(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddHabit()}
                    />
                    <Button size="sm" onClick={handleAddHabit}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 space-y-2">
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

                <Textarea
                  placeholder="Description"
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                  className="h-32"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">
                    What, Why, Who, Where, Which?
                  </h4>
                  <Input
                    value={newGoal.what}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, what: e.target.value })
                    }
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1">
                    How much, How many?
                  </h4>
                  <Input
                    value={newGoal.howMuch}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, howMuch: e.target.value })
                    }
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1">
                    Resources and Skills
                  </h4>
                  <Input
                    value={newGoal.resources}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, resources: e.target.value })
                    }
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1">
                    Alignment with long term aim/plan
                  </h4>
                  <Input
                    value={newGoal.alignment}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, alignment: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleCreateGoal}>
                {isEditing ? "Save Changes" : "Create Goal"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={showGoalDetails} onOpenChange={setShowGoalDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                {selectedGoal?.name}
              </DialogTitle>
              <span className="text-gray-600">
                Deadline: {selectedGoal?.deadline}
              </span>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Subgoals</h3>
                {selectedGoal?.subgoals.map((subgoal, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Checkbox
                      checked={selectedGoal.subgoalProgress[subgoal] || false}
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

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Habits</h3>
                {selectedGoal?.habits.map((habit, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <span>• {habit}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <div className="max-h-32 overflow-y-auto p-2 border rounded whitespace-pre-wrap">
                  {selectedGoal?.description}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedGoal?.what && (
                <div>
                  <h4 className="text-sm font-semibold">
                    What, Why, Who, Where, Which?
                  </h4>
                  <p>{selectedGoal.what}</p>
                </div>
              )}

              {selectedGoal?.howMuch && (
                <div>
                  <h4 className="text-sm font-semibold">How much, How many?</h4>
                  <p>{selectedGoal.howMuch}</p>
                </div>
              )}

              {selectedGoal?.resources && (
                <div>
                  <h4 className="text-sm font-semibold">
                    Resources and Skills
                  </h4>
                  <p>{selectedGoal.resources}</p>
                </div>
              )}

              {selectedGoal?.alignment && (
                <div>
                  <h4 className="text-sm font-semibold">
                    Alignment with long term aim/plan
                  </h4>
                  <p>{selectedGoal.alignment}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button onClick={handleEditClick}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Goal
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Goals in Progress</CardTitle>
          </CardHeader>
          <CardContent>
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

        <Card>
          <CardHeader>
            <CardTitle>Accomplished Goals</CardTitle>
          </CardHeader>
          <CardContent>
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
  );
};

export default GoalManagementApp;
