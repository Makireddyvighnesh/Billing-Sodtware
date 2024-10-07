// src/app/page.js

'use client';

import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="mt-6">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Billing Software</h1>
        <p className="text-gray-600">Manage your invoices and items efficiently.</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Link href="/generate-bill" className="flex-1">
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
            Create New Invoice
          </button>
        </Link>
        <Link href="/items" className="flex-1">
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
            Add New Item
          </button>
        </Link>
      </div>

      
    </div>
  );
};

export default Dashboard;
