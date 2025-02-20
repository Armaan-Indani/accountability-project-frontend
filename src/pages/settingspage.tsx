import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import NavBar from "../components/NavBar.tsx";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [theme, setTheme] = useState("light");
  const [isEditing, setIsEditing] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    occupation: "Software Engineer",
    about:
      "Passionate about building great user experiences and solving complex problems.",
  });
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });

  const handleSaveProfile = () => {
    setUserDetails(editedDetails);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedDetails({ ...userDetails });
    setIsEditing(false);
  };

  const handleSavePassword = () => {
    setShowOtpForm(false);
    setPasswordUpdateSuccess(true);
    setTimeout(() => {
      setPasswordUpdateSuccess(false);
    }, 5000);
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Name
            </label>
            <input
              type="text"
              value={editedDetails.name}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Occupation
            </label>
            <input
              type="text"
              value={editedDetails.occupation}
              onChange={(e) =>
                setEditedDetails({
                  ...editedDetails,
                  occupation: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              About
            </label>
            <input
              type="text"
              value={editedDetails.about}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, about: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSaveProfile}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              <Check className="w-4 h-4 inline mr-2" />
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
            >
              <X className="w-4 h-4 inline mr-2" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 flex-row justify-items-start">
          <div className="justify-items-start">
            <label className="block text-sm font-medium text-gray-700 text-left">
              Name
            </label>
            <p className="mt-1 text-gray-900">{userDetails.name}</p>
          </div>
          <div className="justify-items-start">
            <label className="block text-sm font-medium text-gray-700 text-left">
              Occupation
            </label>
            <p className="mt-1 text-gray-900">{userDetails.occupation}</p>
          </div>
          <div className="justify-items-start">
            <label className="block text-sm font-medium text-gray-700 text-left">
              About
            </label>
            <p className="mt-1 text-gray-900">{userDetails.about}</p>
          </div>
          <br />
          <button
            onClick={() => setIsEditing(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 mt-12"
          >
            <Edit2 className="w-4 h-4 inline mr-2" />
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );

  const renderTheme = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
      <div className="space-y-4">
        {["light", "dark", "system default"].map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="radio"
              id={option}
              name="theme"
              value={option}
              checked={theme === option}
              onChange={(e) => setTheme(e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={option}
              className="ml-3 block text-sm font-medium text-gray-700 capitalize"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacySecurity = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
      <div className="justify-items-start">
        <div className="justify-items-start">
          <label className="block text-sm font-medium text-gray-700 text-left">
            Email
          </label>
          <p className="mt-1 text-gray-900">johndoe@example.com</p>
        </div>
        {passwordUpdateSuccess && (
          <p className="text-sm text-green-600">
            Your password has been updated successfully.
          </p>
        )}
        <br />
        {!showOtpForm ? (
          <button
            onClick={() => setShowOtpForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 mt-4"
          >
            Change Password
          </button>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              New Password
            </label>
            <input
              type="password"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-2 border mb-3"
              placeholder="Enter new password"
            />
            <label className="block text-sm font-medium text-gray-700 text-left">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-2 border mb-3"
              placeholder="Confirm new password"
            />
            <button
              onClick={handleSavePassword}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 w-full"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-56 bg-white shadow-sm rounded-lg p-4">
            <nav className="space-y-2">
              {["Profile", "Theme", "Privacy & Security"].map((section) => (
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
            {activeSection === "profile" && renderProfile()}
            {activeSection === "theme" && renderTheme()}
            {activeSection === "privacy & security" && renderPrivacySecurity()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
