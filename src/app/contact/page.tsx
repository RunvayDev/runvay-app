
import React from "react";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-700">
        Get in Touch
      </h1>

      <p className="text-center text-lg text-gray-600 mb-10">
        Whether you have a question, feedback, or just want to say hello &mdash;
        we&apos;d love to hear from you.
      </p>

      <form className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 text-center text-gray-600">
        <p>
          📍 <strong>Runvay HQ:</strong> Bangalore, India
        </p>
        <p>
          📧 <strong>Email:</strong>{" "}
          <a href="mailto:info@runvay.co.in" className="text-blue-600 hover:underline">
            info@runvay.co.in
          </a>
        </p>
        <p>
          📱 <strong>Phone:</strong> +91-98--------{/* Replace with actual number */}
        </p>
      </div>
    </main>
  );
}
