import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ProfileEditModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    class: user?.class || '',
    interests: user?.interests || ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    // Normalize interests (trim, remove empty items) and save
    const normalizedInterests = (form.interests || '').split(',').map(s => s.trim()).filter(Boolean).join(', ');
    const updated = { ...user, ...form, interests: normalizedInterests };
    localStorage.setItem('currentUser', JSON.stringify(updated));
    onSave && onSave(updated);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md p-6 rounded-xl bg-gray-900 text-white shadow-xl">
        <h3 className="text-xl font-serif font-bold mb-4">Edit Profile</h3>
        <div className="space-y-3">
          <label className="block text-sm">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
          <label className="block text-sm">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
          <label className="block text-sm">Class</label>
          <input name="class" value={form.class} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
          <label className="block text-sm">Interests (comma separated)</label>
          <input name="interests" value={form.interests} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600">Save</Button>
        </div>
      </div>
    </div>
  );
}
