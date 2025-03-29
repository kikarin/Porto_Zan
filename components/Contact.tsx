"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import Container from "./Container";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.message.length < 10
    ) {
      setErrors({
        name: formData.name === "",
        email: !validateEmail(formData.email),
        message: formData.message.length < 10,
      });
      return;
    }

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-gray-100 mb-10 rounded-3xl">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="font-gotosans mt-4 text-gray-400 text-lg md:text-xl">
            Let&apos;s discuss your next project!
          </p>
        </motion.div>

        {/* Form Contact */}
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 max-w-2xl mx-auto"
        >
          {/* Input Nama */}
          <div>
            <label className="font-gotosans block text-gray-300 text-lg font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`font-gotosans w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 ${
                errors.name ? "ring-red-500" : "focus:ring-orange-100"
              } outline-none`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required.</p>
            )}
          </div>

          {/* Input Email */}
          <div>
            <label className="font-gotosans block text-gray-300 text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`font-gotosans w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 ${
                errors.email ? "ring-red-500" : "focus:ring-orange-100"
              } outline-none`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Enter a valid email.</p>
            )}
          </div>

          {/* Input Pesan */}
          <div>
            <label className="font-gotosans block text-gray-300 text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`font-gotosans w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 ${
                errors.message ? "ring-red-500" : "focus:ring-orange-100"
              } outline-none`}
              placeholder="Write your message (min. 10 characters)"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                Message must be at least 10 characters.
              </p>
            )}
          </div>

          {/* Tombol Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="font-gotosans w-full py-3 bg-gray-200 text-gray-950 rounded-lg font-medium hover:bg-gray-300 transition-all"
          >
            Send Message
          </motion.button>

          {/* Notifikasi Sukses */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-gotosans text-center mt-4 text-green-400 text-lg"
            >
              ✅ Your message has been sent successfully!
            </motion.div>
          )}
        </motion.form>

        {/* Kontak Langsung dengan Ikon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="font-gotosans mt-8 text-center text-gray-400 space-y-3"
        >
          <p>Or reach me directly:</p>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-lg">
              <HiOutlineMail className="text-gray-400 text-2xl" />
              <a
                href="mailto:milhampauzan@gmail.com"
                className="text-white hover:text-gray-400 transition"
              >
                milhampauzan@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <HiOutlinePhone className="text-gray-400 text-2xl" />
              <a
                href="https://wa.me/6285693531495"
                className="text-white hover:text-gray-400 transition"
              >
                +62 856-9353-1495
              </a>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <HiOutlineLocationMarker className="text-gray-400 text-2xl" />
              <p className="text-white">Kota Bogor, Indonesia</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
