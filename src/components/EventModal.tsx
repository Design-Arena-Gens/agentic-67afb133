"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface Event {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  id?: number;
}

interface EventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (event: Event) => void;
  onDelete: (eventId: number) => void;
  event?: Event;
  initialData?: Partial<Event>;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  onDelete,
  event,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start);
      setEnd(event.end);
      setDescription(event.description || "");
    } else if (initialData) {
      setTitle("");
      setStart(initialData.start || new Date());
      setEnd(initialData.end || new Date());
      setDescription("");
    } else {
      setTitle("");
      setStart(new Date());
      setEnd(new Date());
      setDescription("");
    }
  }, [event, initialData, isOpen]);

  const handleSave = () => {
    onSave({ title, start, end, description, id: event?.id });
  };

  const handleDelete = () => {
    if (event?.id) {
      onDelete(event.id);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Modal"
      className="bg-white rounded-lg p-6 max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">
        {event ? "Edit Event" : "Add Event"}
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={start.toISOString().substring(0, 16)}
          onChange={(e) => setStart(new Date(e.target.value))}
          className="p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={end.toISOString().substring(0, 16)}
          onChange={(e) => setEnd(new Date(e.target.value))}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
        {event && (
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        )}
        <button onClick={onRequestClose} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EventModal;
