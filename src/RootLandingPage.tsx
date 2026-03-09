import { useState } from "react";
import emailjs from "@emailjs/browser";
import logoSvg from "./assets/logo.svg";
import demoPng from "./assets/demo.png";

// Make sure to add this to your global CSS:
// @import url('https://fonts.googleapis.com/css2?family=Ovo&display=swap');
// and in tailwind.config.js extend fontFamily with: fontFamily: { ovo: ['Ovo', 'serif'] }

// Initialize EmailJS - Replace with your public key from emailjs.com
emailjs.init("KVKaPmPthzFsJ6z0k");

type SubmitStatus = {
  type: "success" | "error";
  message: string;
} | null;

export default function RootLandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        "service_qmir7ts", // Replace with your service ID
        "template_jnma16x", // Replace with your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "emrymcgill@gmail.com", // Replace with your email
        },
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f4f1ea] text-gray-900 scroll-smooth"
      style={{ fontFamily: "serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 bg-[#f4f1ea] border-b border-[#e6dfd2] z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a
            href="#"
            className="flex items-center gap-3 hover:opacity-60 transition-opacity"
          >
            <img src={logoSvg} alt="root logo" className="w-8 h-8" />
            <h1 className="text-2xl font-semibold tracking-tight">root</h1>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a
              href="#about"
              className="hover:opacity-60"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
              }}
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:opacity-60"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
              }}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center px-6 bg-[#efe9dd]"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              Stay grounded.
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              root is a calm and intuitive way to manage your lists and todos.
              Everything starts from a single place and grows from there.
            </p>
            <div className="flex gap-4">
              <button
                className="px-6 py-3 rounded-2xl bg-[#3b3a36] text-white text-sm font-medium hover:opacity-90 cursor-pointer"
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
                }}
              >
                Download
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img src={demoPng} alt="root demo" className="w-1/2 rounded-2xl" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8">About root</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            root was built with a simple philosophy: organization should feel
            natural, not overwhelming. Inspired by how roots support growth,
            this app helps you build structure from the ground up.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#efe9dd]">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8">Contact</h3>
          <p className="text-gray-600 mb-8">
            Have questions, feedback, or ideas? We'd love to hear from you.
          </p>

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-[#e6dfd2] bg-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3b3a36]"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-[#e6dfd2] bg-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3b3a36]"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
              }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-[#e6dfd2] bg-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3b3a36]"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
              }}
            />
            {submitStatus && (
              <div
                className={`p-4 rounded-2xl text-center text-sm font-medium ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
                }}
              >
                {submitStatus.message}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3b3a36] text-white rounded-2xl py-3 font-medium hover:opacity-90 cursor-pointer disabled:opacity-50"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} root. All rights reserved.
      </footer>
    </div>
  );
}
