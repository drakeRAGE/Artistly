"use client";

import { useState, useEffect } from 'react';
import { Eye, Edit3, Trash2, MoreVertical } from 'lucide-react';
import { fetchSubmissions } from '../utils/api';

const ActionDropdown = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-xl w-44 z-50 animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              console.log('View:', item);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Eye size={16} className="text-blue-500" /> View
          </button>
          <button
            onClick={() => {
              console.log('Edit:', item);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 text-sm text-gray-700"
          >
            <Edit3 size={16} className="text-green-500" /> Edit
          </button>
          <hr className="my-1 border-gray-100" />
          <button
            onClick={() => {
              console.log('Delete:', item);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-red-50 text-sm text-red-600"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default function SimpleArtistTable() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function loadSubmissions() {
      const data = await fetchSubmissions();
      setSubmissions(data || []);
    }
    loadSubmissions();
  }, []);

  return (
    <div className="w-full overflow-x-auto rounded-2xl shadow border border-gray-200 bg-white">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-2xl">
        <h2 className="text-lg font-semibold text-gray-800">Artist Submissions</h2>
        <p className="text-sm text-gray-500 mt-1">Review and manage all incoming profiles</p>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
          <tr>
            <th className="px-6 py-4 text-left">#</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Fee</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white text-sm">
          {submissions.length > 0 ? (
            submissions.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">₹ {item.fee}</td>
                <td className="px-6 py-4 text-right">
                  <ActionDropdown item={item} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                No artist submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
