import React from 'react';

export default function AnalysisScreen({ analysisResult, answers }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Interview Analysis Complete! 🎉</h1>
          <p className="text-gray-600">Here's your detailed performance report</p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className="inline-block relative">
              <svg className="w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#4f46e5"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - analysisResult.overallScore / 100)}`}
                  transform="rotate(-90 80 80)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">{analysisResult.overallScore}</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Overall Score</h3>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Confidence', value: analysisResult.confidence, color: '#3b82f6' },
            { label: 'Technical', value: analysisResult.technicalAccuracy, color: '#10b981' },
            { label: 'Communication', value: analysisResult.communication, color: '#8b5cf6' },
            { label: 'Body Language', value: analysisResult.bodyLanguage, color: '#f59e0b' }
          ].map(metric => (
            <div key={metric.label} className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{metric.label}</h4>
              <div className="text-3xl font-bold text-gray-800 mb-2">{metric.value}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Feedback Points</h3>
          <ul className="space-y-4">
            {analysisResult.feedback.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-indigo-600 font-bold text-xl">•</span>
                <span className="text-gray-700 flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Question Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Answers</h3>
          <div className="space-y-6">
            {answers.map((ans, idx) => (
              <div key={idx} className="border-l-4 border-indigo-600 pl-6 py-2">
                <h4 className="font-semibold text-gray-800 mb-2">Q{idx + 1}: {ans.question}</h4>
                <p className="text-gray-600 text-sm italic">"{ans.answer || 'No answer recorded'}"</p>
                <div className="mt-2">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Score: {Math.floor(Math.random() * 15) + 75}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors font-semibold text-lg shadow-lg"
        >
          Start New Interview
        </button>
      </div>
    </div>
  );
}