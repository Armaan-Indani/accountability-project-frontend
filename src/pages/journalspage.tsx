import React, { useState } from "react";
import { Plus, Edit2, Trash2, RotateCcw, X, Check, Trash } from "lucide-react";
import NavBar from "../components/NavBar.tsx";

const JournalsPage = () => {
  const [activeSection, setActiveSection] = useState("my journals");
  const [journals, setJournals] = useState([]);
  const [trashBin, setTrashBin] = useState([]);
  const [showNewJournal, setShowNewJournal] = useState(false);
  const [currentJournal, setCurrentJournal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [newJournalData, setNewJournalData] = useState({
    title: "",
    content: "",
  });

  const handleCreateNewJournal = () => {
    const title = newJournalData.title.trim() || "Untitled Journal";
    const newJournal = {
      id: Date.now(),
      title,
      content: newJournalData.content,
      createdAt: new Date().toLocaleDateString(),
    };
    setJournals([...journals, newJournal]);
    setShowNewJournal(false);
    setNewJournalData({ title: "", content: "" });
  };

  const handleViewJournal = (journal) => {
    setCurrentJournal({ ...journal });
    setIsEditing(false);
  };

  const handleEditJournal = (journal) => {
    setCurrentJournal({ ...journal });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedJournals = journals.map((j) =>
      j.id === currentJournal.id ? currentJournal : j
    );
    setJournals(updatedJournals);
    setIsEditing(false);
    setCurrentJournal(null);
  };

  const handleMoveToTrash = (journal) => {
    const updatedJournals = journals.filter((j) => j.id !== journal.id);
    setJournals(updatedJournals);
    setTrashBin([...trashBin, journal]);
    setShowSuccessMessage(`${journal.title} moved to trash`);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const handleRestore = (journal) => {
    const updatedTrash = trashBin.filter((j) => j.id !== journal.id);
    setTrashBin(updatedTrash);
    setJournals([...journals, journal]);
    setShowSuccessMessage(`${journal.title} restored`);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const handleDeletePermanently = (journal) => {
    const updatedTrash = trashBin.filter((j) => j.id !== journal.id);
    setTrashBin(updatedTrash);
    setShowSuccessMessage(`${journal.title} permanently deleted`);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const renderMyJournals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Journals</h2>
        <button
          onClick={() => setShowNewJournal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Journal
        </button>
      </div>

      {showNewJournal && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Journal Title"
            value={newJournalData.title}
            onChange={(e) =>
              setNewJournalData({ ...newJournalData, title: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
          <textarea
            placeholder="Write your thoughts..."
            value={newJournalData.content}
            onChange={(e) =>
              setNewJournalData({ ...newJournalData, content: e.target.value })
            }
            className="w-full p-2 border rounded-md h-64"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleCreateNewJournal}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              <Check className="w-4 h-4 inline mr-2" />
              Save
            </button>
            <button
              onClick={() => {
                setShowNewJournal(false);
                setNewJournalData({ title: "", content: "" });
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
            >
              <X className="w-4 h-4 inline mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {journals.map((journal) => (
          <div key={journal.id} className="border rounded-md p-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleViewJournal(journal)}
                className="text-lg font-medium text-gray-900 hover:text-indigo-600"
              >
                {journal.title}
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditJournal(journal)}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMoveToTrash(journal)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Created: {journal.createdAt}
            </p>
          </div>
        ))}
        {journals.length === 0 && !showNewJournal && (
          <p className="text-gray-500 text-center py-4">No journals yet</p>
        )}
      </div>
    </div>
  );

  const renderTrash = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Trash</h2>
      <div className="space-y-4">
        {trashBin.map((journal) => (
          <div key={journal.id} className="border rounded-md p-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleViewJournal(journal)}
                className="text-lg font-medium text-gray-900 hover:text-indigo-600"
              >
                {journal.title}
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRestore(journal)}
                  className="text-gray-600 hover:text-green-600"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePermanently(journal)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Created: {journal.createdAt}
            </p>
          </div>
        ))}
        {trashBin.length === 0 && (
          <p className="text-gray-500 text-center py-4">Trash is empty</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-4 py-2 rounded-md shadow-md">
          {showSuccessMessage}
        </div>
      )}

      {/* Main Content Area with Sidebar */}
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-56 bg-white shadow-sm rounded-lg p-4">
            <nav className="space-y-2">
              {["My Journals", "Trash"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section.toLowerCase())}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.toLowerCase()
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white shadow-sm rounded-lg p-6">
            {activeSection === "my journals" && renderMyJournals()}
            {activeSection === "trash" && renderTrash()}
          </div>
        </div>
      </main>

      {/* View/Edit Journal Modal */}
      {currentJournal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={currentJournal.title}
                  onChange={(e) =>
                    setCurrentJournal({
                      ...currentJournal,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                />
                <textarea
                  value={currentJournal.content}
                  onChange={(e) =>
                    setCurrentJournal({
                      ...currentJournal,
                      content: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md h-64"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    <Check className="w-4 h-4 inline mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentJournal(null);
                    }}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                  >
                    <X className="w-4 h-4 inline mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  {currentJournal.title}
                </h2>
                <p className="whitespace-pre-wrap">{currentJournal.content}</p>
                <button
                  onClick={() => setCurrentJournal(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalsPage;
