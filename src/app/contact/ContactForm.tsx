"use client";

import React from "react";

export default function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <form className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="inline-flex h-10 items-center rounded-md bg-black text-white px-4 text-sm font-medium hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-black dark:hover:bg-white/90"
        onClick={() => alert("This is a demo form. No submission yet.")}
      >
        Send
      </button>
    </form>
  );
}
