"use client";

import React, { useState, useEffect } from "react";

interface ReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationDrawer({ isOpen, onClose }: ReservationDrawerProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("2");
  const [time, setTime] = useState("18:30");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Set default date to tomorrow when open
  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date) return;
    setSubmitted(true);
  };

  const getFormattedDate = () => {
    if (!date) return "";
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleClose = () => {
    onClose();
    // Delay clearing states slightly for exit transition
    setTimeout(() => {
      setName("");
      setEmail("");
      setGuests("2");
      setTime("18:30");
      setSubmitted(false);
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div
      className="drawer-backdrop active"
      onClick={handleClose}
    >
      <div
        className="drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="drawer-close cursor-pointer"
          onClick={handleClose}
        >
          <span className="material-symbols-outlined">close</span>
          Close Window
        </button>

        <div className="drawer-content">
          {!submitted ? (
            <>
              <span className="label-caps text-primary tracking-widest mb-2 block">
                Secure A Table
              </span>
              <h2 className="headline-sm text-on-surface mb-8">
                Book an Experience
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="input-label" htmlFor="res-name">
                    Full Name
                  </label>
                  <input
                    className="input-field input-underline"
                    id="res-name"
                    required
                    type="text"
                    placeholder="E.g. Elias Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label" htmlFor="res-email">
                    Email Address
                  </label>
                  <input
                    className="input-field input-underline"
                    id="res-email"
                    required
                    type="email"
                    placeholder="E.g. elias@sterling.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label" htmlFor="res-guests">
                      Guests
                    </label>
                    <select
                      className="input-field input-underline bg-surface"
                      id="res-guests"
                      required
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8">8 Guests</option>
                    </select>
                  </div>
                  
                  <div className="input-group">
                    <label className="input-label" htmlFor="res-time">
                      Preferred Time
                    </label>
                    <select
                      className="input-field input-underline bg-surface"
                      id="res-time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="17:00">5:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:30">9:30 PM</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="res-date">
                    Preferred Date
                  </label>
                  <input
                    className="input-field input-underline"
                    id="res-date"
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-sharp btn-primary-ember w-full py-4 text-xs font-bold uppercase tracking-widest mt-8 cursor-pointer"
                  type="submit"
                >
                  Confirm Reservation
                </button>
              </form>
            </>
          ) : (
            <div className="space-y-4 text-center mt-12 py-8 px-6 bg-surface-container border border-primary/20">
              <span className="material-symbols-outlined text-primary text-5xl">
                task_alt
              </span>
              <h3 className="font-serif text-xl font-bold">
                Reservation Requested
              </h3>
              <p className="body-md text-sm text-on-surface-variant">
                We have received your request for <span className="text-white font-bold">{guests}</span> guests on{" "}
                <span className="text-white font-bold">{getFormattedDate()}</span> at{" "}
                <span className="text-white font-bold">{time.replace("17:00", "5:00 PM").replace("18:30", "6:30 PM").replace("20:00", "8:00 PM").replace("21:30", "9:30 PM")}</span>.
                An email confirmation has been sent to <span className="text-primary">{email}</span>.
              </p>
              
              <button
                className="btn btn-sharp btn-secondary-ghost w-full py-3 text-xs uppercase tracking-wider mt-8 cursor-pointer"
                onClick={handleClose}
              >
                Close Drawer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
