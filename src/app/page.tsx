"use client";

import EnergyCalendar from "@/components/Calendar";
import Modal from "react-modal";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          Energy Management Calendar
        </h1>
      </div>
      <div className="w-full mt-10">
        <EnergyCalendar />
      </div>
    </main>
  );
}