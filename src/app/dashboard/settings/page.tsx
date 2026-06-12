"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    siteName: "AFS Dashboard",
    siteUrl: "https://afs.rw",
    adminEmail: "admin@afs.rw",
    language: "en",
    notifications: true,
    twoFactor: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  return (
    <div className="p-6 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-[#8ba8c4] text-sm mt-1">Manage your site configuration and preferences.</p>
      </div>

      {/* General */}
      <section className="bg-[#112236] border border-[#1e3a5f]/40 rounded-xl p-6 space-y-5">
        <h2 className="text-white font-semibold text-sm uppercase tracking-wider">General</h2>

        {[
          { label: "Site Name", name: "siteName", type: "text" },
          { label: "Site URL", name: "siteUrl", type: "url" },
          { label: "Admin Email", name: "adminEmail", type: "email" },
        ].map(({ label, name, type }) => (
          <div key={name} className="space-y-1.5">
            <label className="block text-sm text-[#8ba8c4]">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name as keyof typeof form] as string}
              onChange={handleChange}
              className="w-full bg-[#0d1b2a] border border-[#1e3a5f]/40 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7fff00]/50"
            />
          </div>
        ))}

        <div className="space-y-1.5">
          <label className="block text-sm text-[#8ba8c4]">Language</label>
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full bg-[#0d1b2a] border border-[#1e3a5f]/40 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7fff00]/50"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="rw">Kinyarwanda</option>
          </select>
        </div>
      </section>

      {/* Security */}
      <section className="bg-[#112236] border border-[#1e3a5f]/40 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Security & Notifications</h2>

        {[
          { label: "Email Notifications", name: "notifications", description: "Receive alerts for new articles and user activity." },
          { label: "Two-Factor Authentication", name: "twoFactor", description: "Add an extra layer of security to your account." },
        ].map(({ label, name, description }) => (
          <div key={name} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white text-sm font-medium">{label}</p>
              <p className="text-[#5a7fa0] text-xs mt-0.5">{description}</p>
            </div>
            <button
              onClick={() => setForm((prev) => ({ ...prev, [name]: !prev[name as keyof typeof form] }))}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${
                form[name as keyof typeof form] ? "bg-[#7fff00]" : "bg-[#1e3a5f]"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ${
                  form[name as keyof typeof form] ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </section>

      {/* Save */}
      <button className="flex items-center gap-2 bg-[#7fff00] hover:bg-[#6ee600] text-[#0d1b2a] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
        <Save size={16} />
        Save Changes
      </button>
    </div>
  );
}