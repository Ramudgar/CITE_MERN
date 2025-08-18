import React from "react";
import { Link,useLocation,useParams } from "react-router-dom";

export default function ServiceDetailsPage() {
  const location = useLocation();
  const { id } = useParams();
  const { service } = location.state || {};
    // 1) Prefer fast path from navigation state if it exists
  // const stateService = location.state?.service;

  // 2) Otherwise look it up from our data source
  // const fileService = servicesData.find((s) => s.id === id);
  // const service = stateService ?? fileService;
   if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-red-600">No service data found</h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50">
      {/* CONTAINER */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Back link */}
        <Link to="/services" className="mb-6 inline-block text-sm text-indigo-600 hover:underline">
          ← Back to Services
        </Link>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {service.title || "Service Title"}
        </h1>

        {/* META (optional) */}
        <div className="mt-2 text-sm text-slate-500">
          <span>Design & Branding</span>
          <span className="px-2">·</span>
          <span>2–4 weeks </span>
        </div>

        {/* COVER IMAGE */}
        <div className="mt-6 overflow-hidden rounded-xl">
          <img
            src={service.image}
            alt={service.title}
            className="h-64 w-full object-cover sm:h-80"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="prose prose-slate mt-6 max-w-none">
          <p>
            {service.description }
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
