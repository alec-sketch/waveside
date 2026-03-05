"use client";

import { useState, FormEvent } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🌊</div>
          <h1 className="text-2xl font-bold text-navy mb-2">You&apos;re on the list!</h1>
          <p className="text-gray-600">
            Thanks for your interest, {name}. We&apos;ll be in touch soon with updates on wave pool opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            Get Started with Waveside
          </h1>
          <p className="text-gray-600 text-lg">
            Interested in building a wave pool? Sign up and we&apos;ll help you explore your options.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy mb-1">
              Message <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-ocean focus:ring-2 focus:ring-ocean/20 outline-none transition-colors resize-none"
              placeholder="Tell us about your wave pool vision..."
            />
          </div>

          {status === "error" && (
            <p className="text-red-600 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-ocean hover:bg-ocean-light text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === "submitting" ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
