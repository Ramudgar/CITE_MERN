import React from "react";

export default function ServiceDetailsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* CONTAINER */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Back link */}
        <a href="#" className="mb-6 inline-block text-sm text-indigo-600 hover:underline">
          ← Back to Services
        </a>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Premium UI/UX Design Service
        </h1>

        {/* META (optional) */}
        <div className="mt-2 text-sm text-slate-500">
          <span>Design & Branding</span>
          <span className="px-2">·</span>
          <span>2–4 weeks</span>
        </div>

        {/* COVER IMAGE */}
        <div className="mt-6 overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop"
            alt="Service cover"
            className="h-64 w-full object-cover sm:h-80"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="prose prose-slate mt-6 max-w-none">
          <p>
            We help you turn ideas into clean, easy-to-use interfaces. This service
            includes basic research, simple user flows, and a small style guide so
            your team can start building right away.
          </p>
          <p>
            What you get:
          </p>
          <ul>
            <li>Clear screens for mobile and desktop (Figma)</li>
            <li>Clickable prototype for demo</li>
            <li>Exported assets (PNG/SVG)</li>
          </ul>
          <p>
            Simple process: we have a short call, make a draft, review together,
            and finalize the design. If you are a beginner team, we keep language
            simple and explain every step.
          </p>
        </div>

        {/* CTA BUTTONS (optional) */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 sm:w-auto">
            Get Quote
          </button>
          <button className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 hover:bg-slate-50 sm:w-auto">
            Contact Us
          </button>
        </div>

        {/* Small footer note */}
        <p className="mt-6 text-xs text-slate-500">
          Tip: Replace the title, image URL, and text with your real service
          details. You can pass them as props later if you want.
        </p>
      </div>
    </div>
  );
}
