"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  id: number;
}

const EnergyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalInitialData, setModalInitialData] = useState<Partial<Event> | undefined>(undefined);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedEvent(undefined);
    setModalInitialData({ start, end });
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setModalInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event: Omit<Event, "id"> & { id?: number }) => {
    if (event.id) {
      setEvents(events.map((e) => (e.id === event.id ? { ...event, id: e.id } : e)));
    } else {
      setEvents([...events, { ...event, id: new Date().getTime() }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((e) => e.id !== eventId));
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
      <EventModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        initialData={modalInitialData}
      />
    </div>
  );
};

export default EnergyCalendar;
