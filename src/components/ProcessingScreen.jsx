import React from 'react';

export default function ProcessingScreen({ processingStep }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{processingStep}</h3>
        <p className="text-gray-600">Please wait while AI analyzes your interview</p>
      </div>
    </div>
  );
}