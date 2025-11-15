import React, { useState, useRef, useEffect } from 'react';
import InterviewScreen from './components/InterviewScreen';
import ProcessingScreen from './components/ProcessingScreen';
import AnalysisScreen from './components/AnalysisScreen';
import './App.css';

const CODING_QUESTIONS = [
  "Tell me about yourself and your coding experience.",
  "Explain the difference between var, let, and const in JavaScript.",
  "How would you reverse a string in Python?",
  "What is the time complexity of binary search?",
  "Describe a challenging project you've worked on recently."
];

function App() {
  const [stage, setStage] = useState('interview'); // interview, processing, analysis
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [answers, setAnswers] = useState([]);
  const [processingStep, setProcessingStep] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: false 
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log('Camera error:', err);
      }
    };

    startCamera();

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + ' ';
          }
        }

        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          alert('Microphone permission denied. Please allow microphone access.');
          setIsRecording(false);
        }
      };

      recognition.onend = () => {
        if (isRecording) {
          try {
            recognition.start();
          } catch (err) {
            console.log('Could not restart recognition');
          }
        }
      };

      recognitionRef.current = recognition;
    } else {
      alert('Speech recognition not supported. Please use Chrome or Edge browser.');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.log('Recognition cleanup error');
        }
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    setTranscript('');
    
    if (recognitionRef.current) {
      try {
        await recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        if (err.message.includes('already started')) {
          setIsRecording(true);
        } else {
          alert('Could not start microphone. Please check permissions.');
          console.log('Start recording error:', err);
        }
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.log('Stop recording error:', err);
      }
    }
    setIsRecording(false);
  };

  const handleNextQuestion = () => {
    const currentAnswer = {
      question: CODING_QUESTIONS[currentQuestion],
      answer: transcript,
      timestamp: new Date().toISOString()
    };
    
    setAnswers(prev => [...prev, currentAnswer]);
    setTranscript('');
    stopRecording();

    if (currentQuestion < CODING_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const submitInterview = async () => {
    const currentAnswer = {
      question: CODING_QUESTIONS[currentQuestion],
      answer: transcript,
      timestamp: new Date().toISOString()
    };
    setAnswers(prev => [...prev, currentAnswer]);
    
    stopRecording();
    
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    
    setStage('processing');

    // Processing simulation
    setProcessingStep('Processing your video and audio interview...');
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setProcessingStep('Analyzing body language and confidence levels...');
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setProcessingStep('Evaluating answer quality and technical accuracy...');
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockResults = {
      overallScore: 78,
      confidence: 72,
      technicalAccuracy: 85,
      communication: 75,
      bodyLanguage: 68,
      feedback: [
        "Good technical knowledge demonstrated in your answers",
        "Try to maintain more consistent eye contact during responses",
        "Speak with more confidence and reduce hesitation",
        "Your answers were well-structured and clear",
        "Consider reducing filler words like 'um' and 'like'",
        "Strong understanding of core concepts shown"
      ]
    };

    setAnalysisResult(mockResults);
    setProcessingStep('');
    setStage('analysis');
  };

  if (stage === 'processing') {
    return <ProcessingScreen processingStep={processingStep} />;
  }

  if (stage === 'analysis') {
    return <AnalysisScreen analysisResult={analysisResult} answers={answers} />;
  }

  return (
    <InterviewScreen
      videoRef={videoRef}
      cameraStream={cameraStream}
      isRecording={isRecording}
      currentQuestion={currentQuestion}
      totalQuestions={CODING_QUESTIONS.length}
      question={CODING_QUESTIONS[currentQuestion]}
      transcript={transcript}
      startRecording={startRecording}
      stopRecording={stopRecording}
      handleNextQuestion={handleNextQuestion}
      submitInterview={submitInterview}
    />
  );
}

export default App;