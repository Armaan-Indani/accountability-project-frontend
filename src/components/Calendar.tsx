import React, { useState, useEffect, ReactNode } from "react";
import { X, Clock, AlignLeft } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4 p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  type Event = {
    id: number;
    title: string;
    time: string;
    description: string;
  };
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    time: "",
    description: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const handleDateClick = (day: number) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    setSelectedDate(dateKey);
    setEventForm({
      title: "",
      time: "",
      description: "",
    });
    setIsOpen(true);
  };

  const handleSaveEvent = () => {
    if (eventForm.title.trim()) {
      setEvents((prev) => ({
        ...prev,
        [selectedDate]: [
          ...(prev[selectedDate] || []),
          {
            id: Date.now(),
            ...eventForm,
          },
        ],
      }));
      setIsOpen(false);
    }
  };

  const handleDeleteEvent = (dateKey: string, eventId: number) => {
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((event) => event.id !== eventId),
    }));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const firstDay = getFirstDayOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const days: any[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 w-16" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
      const dateEvents = events[dateKey] || [];

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className="h-20 border p-2 cursor-pointer relative group rounded-lg hover:shadow-lg transition-shadow"
        >
          <span className="font-medium">{day}</span>

          <div className="mt-1 space-y-1 overflow-hidden h-12">
            {dateEvents.slice(0, 2).map((event, index) => (
              <div
                key={event.id}
                className="text-xs bg-indigo-100 rounded px-1 py-0.5 truncate"
              >
                {event.title}
              </div>
            ))}
            {dateEvents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dateEvents.length - 2} more
              </div>
            )}
          </div>

          {/* Detailed hover view */}
          {dateEvents.length > 0 && (
            <div className="hidden group-hover:block absolute z-20 left-full ml-0 top-0 bg-white p-3 rounded-lg shadow-xl border w-64">
              <h3 className="font-medium mb-2">
                {months[currentDate.getMonth()]} {day}
              </h3>
              <div className="space-y-3">
                {dateEvents.map((event) => (
                  <div key={event.id} className="text-sm">
                    <div className="font-medium">{event.title}</div>
                    {event.time && (
                      <div className="flex items-center text-gray-600 mt-1">
                        <Clock size={12} className="mr-1" />
                        {event.time}
                      </div>
                    )}
                    {event.description && (
                      <div className="flex items-start text-gray-600 mt-1">
                        <AlignLeft size={12} className="mr-1 mt-1" />
                        <div className="text-xs">{event.description}</div>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(dateKey, event.id);
                      }}
                      className="text-xs text-red-600 hover:text-red-800 mt-1"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <select
          value={currentDate.getMonth()}
          onChange={(e) =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), parseInt(e.target.value), 1)
            )
          }
          className="px-4 py-2 border rounded"
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={currentDate.getFullYear()}
          onChange={(e) =>
            setCurrentDate(
              new Date(parseInt(e.target.value), currentDate.getMonth(), 1)
            )
          }
          className="px-4 py-2 border rounded"
        >
          {Array.from(
            { length: 10 },
            (_, i) => currentDate.getFullYear() - 5 + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-7 gap-2 bg-white p-3 rounded-lg ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-gray-600">
            {day}
          </div>
        ))}
        {renderCalendar().map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Add Event</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-2 border rounded"
              placeholder="Enter event title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={eventForm.time}
              onChange={(e) =>
                setEventForm((prev) => ({ ...prev, time: e.target.value }))
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={eventForm.description}
              onChange={(e) =>
                setEventForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter event description..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEvent}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add Event
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
