import React from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Notifications({ notifications, onDismiss }) {
  return (
    <div className="fixed top-16 right-4 w-80 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-lg p-4 mb-2 border-l-4 border-blue-500 animate-slide-in"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <BellIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <p className="font-medium text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(notification.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}