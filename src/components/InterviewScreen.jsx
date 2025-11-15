import React from 'react';
import { Mic, Square, Send, User, CheckCircle } from 'lucide-react';

export default function InterviewScreen({
  videoRef,
  cameraStream,
  isRecording,
  currentQuestion,
  totalQuestions,
  question,
  transcript,
  startRecording,
  stopRecording,
  handleNextQuestion,
  submitInterview
}) {
  const [recordingStopped, setRecordingStopped] = React.useState(false);

  const handleStopRecording = () => {
    stopRecording();
    setRecordingStopped(true);
  };

  const handleSubmitAnswer = () => {
    handleNextQuestion();
    setRecordingStopped(false);
  };

  const handleFinalSubmit = () => {
    submitInterview();
    setRecordingStopped(false);
  };

  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container">
        <div className="grid grid-2">
          {/* Camera View */}
          <div className="card">
            <div className="video-container">
              {cameraStream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="text-center">
                    <div className="avatar-mock">
                      <User size={64} />
                    </div>
                    <p className="text-gray-300 text-lg font-semibold">Camera View</p>
                    <p className="text-gray-400 text-sm mt-2">Allow camera access to see yourself</p>
                  </div>
                </div>
              )}
              
              {isRecording && (
                <div className="badge-recording">
                  <div className="w-3 h-3" style={{ backgroundColor: 'white', borderRadius: '9999px' }} />
                  <span className="font-semibold">Recording</span>
                </div>
              )}
            </div>

            {/* Recording Controls */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex gap-3 justify-center flex-col">
                {!isRecording && !recordingStopped && (
                  <button onClick={startRecording} className="btn btn-green">
                    <Mic size={20} />
                    Start Recording
                  </button>
                )}

                {isRecording && (
                  <button onClick={handleStopRecording} className="btn btn-red">
                    <Square size={20} />
                    Stop Recording
                  </button>
                )}

                {recordingStopped && transcript && (
                  <>
                    <div className="flex items-center gap-2 justify-center text-green-600 mb-2">
                      <CheckCircle size={24} />
                      <span className="font-semibold">Recording Saved!</span>
                    </div>
                    
                    {!isLastQuestion ? (
                      <button onClick={handleSubmitAnswer} className="btn btn-indigo">
                        <Send size={20} />
                        Submit & Next Question
                      </button>
                    ) : (
                      <button onClick={handleFinalSubmit} className="btn btn-green btn-full">
                        <Send size={20} />
                        Submit Interview
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Question & Transcript */}
          <div className="space-y-6">
            <div className="card p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="badge-question">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">
                {question}
              </h3>
            </div>

            <div className="card p-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Mic size={20} className={isRecording ? "text-red-600 animate-pulse" : "text-gray-400"} />
                Your Answer
              </h4>
              <div className="transcript-box">
                {transcript ? (
                  <p className="transcript-text">
                    {transcript}
                    {isRecording && <span className="cursor-blink" />}
                  </p>
                ) : (
                  <div className="transcript-empty">
                    <Mic size={48} className={isRecording ? "text-red-500 animate-pulse mb-4" : "text-gray-300 mb-4"} />
                    <p>
                      {isRecording ? "Listening... Start speaking now!" : "Click 'Start Recording' to begin"}
                    </p>
                    <p className="subtitle">
                      {isRecording ? "Your words will appear here in real-time" : "Allow microphone access when prompted"}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Info */}
              {transcript && !recordingStopped && isRecording && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-700 text-center">
                  Click "Stop Recording" when you finish speaking
                </div>
              )}

              {recordingStopped && transcript && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-800 text-center">
                  ✓ Answer recorded successfully! Click submit to continue.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}