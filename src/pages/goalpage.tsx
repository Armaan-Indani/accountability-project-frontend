import React, { useState, ReactNode } from "react";
import { X, Plus, Edit2 } from "lucide-react";
import NavBar from "../components/NavBar.tsx";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-4/5 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const GoalForm = ({ onSubmit, onClose, initialData = null }) => {
  const [goalData, setGoalData] = useState(
    initialData || {
      title: "",
      deadline: "",
      subgoals: [],
      habits: [],
      smart: {
        specific: "",
        measurable: "",
        achievable: "",
        relevant: "",
        timeBound: "",
      },
      description: "",
    }
  );

  const addSubgoal = () => {
    setGoalData({
      ...goalData,
      subgoals: [
        ...goalData.subgoals,
        { id: Date.now(), text: "", completed: false },
      ],
    });
  };

  const addHabit = () => {
    setGoalData({
      ...goalData,
      habits: [
        ...goalData.habits,
        { id: Date.now(), text: "", completed: false },
      ],
    });
  };

  const deleteSubgoal = (id) => {
    setGoalData({
      ...goalData,
      subgoals: goalData.subgoals.filter((sg) => sg.id !== id),
    });
  };

  const deleteHabit = (id) => {
    setGoalData({
      ...goalData,
      habits: goalData.habits.filter((h) => h.id !== id),
    });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Goal Title"
          className="w-full p-2 border rounded"
          value={goalData.title}
          onChange={(e) => setGoalData({ ...goalData, title: e.target.value })}
        />

        <input
          type="date"
          className="w-full p-2 border rounded"
          value={goalData.deadline}
          onChange={(e) =>
            setGoalData({ ...goalData, deadline: e.target.value })
          }
        />

        <div className="space-y-2">
          <h3 className="font-semibold">Subgoals</h3>
          {goalData.subgoals.map((sg, index) => (
            <div key={sg.id} className="flex gap-2">
              <input
                type="text"
                placeholder={`Subgoal ${index + 1}`}
                className="flex-1 p-2 border rounded"
                value={sg.text}
                onChange={(e) => {
                  const newSubgoals = [...goalData.subgoals];
                  newSubgoals[index].text = e.target.value;
                  setGoalData({ ...goalData, subgoals: newSubgoals });
                }}
              />
              <button
                onClick={() => deleteSubgoal(sg.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={addSubgoal}
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <Plus size={16} /> Add Subgoal
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Habits</h3>
          {goalData.habits.map((habit, index) => (
            <div key={habit.id} className="flex gap-2">
              <input
                type="text"
                placeholder={`Habit ${index + 1}`}
                className="flex-1 p-2 border rounded"
                value={habit.text}
                onChange={(e) => {
                  const newHabits = [...goalData.habits];
                  newHabits[index].text = e.target.value;
                  setGoalData({ ...goalData, habits: newHabits });
                }}
              />
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={addHabit}
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <Plus size={16} /> Add Habit
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">SMART Goal</h3>
          <input
            type="text"
            placeholder="Specific"
            className="w-full p-2 border rounded"
            value={goalData.smart.specific}
            onChange={(e) =>
              setGoalData({
                ...goalData,
                smart: { ...goalData.smart, specific: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Measurable"
            className="w-full p-2 border rounded"
            value={goalData.smart.measurable}
            onChange={(e) =>
              setGoalData({
                ...goalData,
                smart: { ...goalData.smart, measurable: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Achievable"
            className="w-full p-2 border rounded"
            value={goalData.smart.achievable}
            onChange={(e) =>
              setGoalData({
                ...goalData,
                smart: { ...goalData.smart, achievable: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Relevant"
            className="w-full p-2 border rounded"
            value={goalData.smart.relevant}
            onChange={(e) =>
              setGoalData({
                ...goalData,
                smart: { ...goalData.smart, relevant: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Time-bound"
            className="w-full p-2 border rounded"
            value={goalData.smart.timeBound}
            onChange={(e) =>
              setGoalData({
                ...goalData,
                smart: { ...goalData.smart, timeBound: e.target.value },
              })
            }
          />
        </div>

        <div>
          <h3 className="font-semibold">Description</h3>
          <textarea
            placeholder="Description of the goal"
            className="w-full p-2 border rounded h-32"
            value={goalData.description}
            onChange={(e) =>
              setGoalData({ ...goalData, description: e.target.value })
            }
          />
        </div>

        <button
          onClick={() => {
            onSubmit(goalData);
            onClose();
          }}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          {initialData ? "Update Goal" : "Create Goal"}
        </button>
      </div>
    </div>
  );
};

const GoalDetails = ({ goal, onClose, onSubgoalToggle, onEdit }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{goal.title}</h2>
          <button
            onClick={() => onEdit(goal)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <Edit2 size={20} />
          </button>
        </div>

        <div className="text-gray-600">
          Deadline: {new Date(goal.deadline).toLocaleDateString()}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Subgoals</h3>
          {goal.subgoals.map((sg) => (
            <div key={sg.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sg.completed}
                onChange={() => onSubgoalToggle(goal.id, sg.id)}
                className="w-4 h-4 text-indigo-600"
              />
              <span
                className={sg.completed ? "line-through text-gray-500" : ""}
              >
                {sg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Habits</h3>
          {goal.habits.map((habit) => (
            <div key={habit.id} className="p-2 bg-gray-50 rounded">
              {habit.text}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">SMART Goal</h3>
          <div className="space-y-1">
            <p>
              <strong>Specific:</strong> {goal.smart.specific}
            </p>
            <p>
              <strong>Measurable:</strong> {goal.smart.measurable}
            </p>
            <p>
              <strong>Achievable:</strong> {goal.smart.achievable}
            </p>
            <p>
              <strong>Relevant:</strong> {goal.smart.relevant}
            </p>
            <p>
              <strong>Time-bound:</strong> {goal.smart.timeBound}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Description</h3>
          <p className="mt-2 text-gray-600">{goal.description}</p>
        </div>
      </div>
    </div>
  );
};

const GoalsPage = () => {
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [goals, setGoals] = useState([]);

  const handleNewGoal = (goalData) => {
    setGoals([...goals, { ...goalData, id: Date.now(), completed: false }]);
  };

  const handleUpdateGoal = (updatedGoal) => {
    setGoals(
      goals.map((goal) =>
        goal.id === updatedGoal.id ? { ...updatedGoal } : goal
      )
    );
  };

  const toggleGoalComplete = (goalId) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const toggleSubgoal = (goalId, subgoalId) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            subgoals: goal.subgoals.map((sg) =>
              sg.id === subgoalId ? { ...sg, completed: !sg.completed } : sg
            ),
          };
        }
        return goal;
      })
    );
  };

  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setIsEditMode(true);
  };

  const inProgressGoals = goals.filter((g) => !g.completed);
  const accomplishedGoals = goals.filter((g) => g.completed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />

      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          A goal without a plan is only a dream.
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Track, manage, and achieve your goals with our simple yet powerful
          tool.
        </p>

        <button
          onClick={() => setIsNewGoalModalOpen(true)}
          className="mb-8 flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          <Plus size={20} /> New Goal
        </button>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Goals in Progress</h2>
            <div className="space-y-4">
              {inProgressGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-grow">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoalComplete(goal.id)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setIsEditMode(false);
                      }}
                      className="text-left hover:text-indigo-600 flex-grow font-medium"
                    >
                      {goal.title}
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {inProgressGoals.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No goals in progress. Click "New Goal" to get started!
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Accomplished Goals</h2>
            <div className="space-y-4">
              {accomplishedGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-grow">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoalComplete(goal.id)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setIsEditMode(false);
                      }}
                      className="text-left hover:text-indigo-600 flex-grow font-medium"
                    >
                      {goal.title}
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {accomplishedGoals.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  Complete your goals to see them here!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={isNewGoalModalOpen}
          onClose={() => setIsNewGoalModalOpen(false)}
        >
          <GoalForm
            onSubmit={handleNewGoal}
            onClose={() => setIsNewGoalModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={!!selectedGoal}
          onClose={() => {
            setSelectedGoal(null);
            setIsEditMode(false);
          }}
        >
          {selectedGoal && !isEditMode && (
            <GoalDetails
              goal={selectedGoal}
              onClose={() => setSelectedGoal(null)}
              onSubgoalToggle={toggleSubgoal}
              onEdit={handleEdit}
            />
          )}
          {selectedGoal && isEditMode && (
            <GoalForm
              initialData={selectedGoal}
              onSubmit={(updatedGoal) => {
                handleUpdateGoal({
                  ...updatedGoal,
                  id: selectedGoal.id,
                  completed: selectedGoal.completed,
                });
                setIsEditMode(false);
                setSelectedGoal(null);
              }}
              onClose={() => {
                setIsEditMode(false);
                setSelectedGoal(null);
              }}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default GoalsPage;
