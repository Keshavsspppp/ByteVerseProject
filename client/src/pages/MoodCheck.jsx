import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const MoodCheck = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emotion, setEmotion] = useState(null);
  const intervalRef = useRef(null); // Add this to store interval reference

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = '/models';
      
      // Wait for models to load
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      
      setIsLoading(false);
      console.log('Models loaded successfully');
    } catch (error) {
      console.error('Error loading models:', error);
      setIsLoading(false);
    }
  };

  const handleStream = async () => {
    if (webcamRef.current && webcamRef.current.video) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      // Wait for video metadata to load
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve();
        };
      });

      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight
      };

      canvas.width = displaySize.width;
      canvas.height = displaySize.height;
      faceapi.matchDimensions(canvas, displaySize);

      // Clear previous interval if exists
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(async () => {
        if (video.readyState === 4) {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

          if (detections && detections.length > 0) {
            const expressions = detections[0].expressions;
            const dominantEmotion = Object.keys(expressions).reduce((a, b) => 
              expressions[a] > expressions[b] ? a : b
            );
            setEmotion(dominantEmotion);

            // Send emotion data to backend
            try {
              await axios.post('/api/reports', {
                emotion: dominantEmotion,
                confidence: expressions[dominantEmotion]
              });
            } catch (error) {
              console.error('Error saving emotion data:', error);
            }

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          }
        }
      }, 100);
    }
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mood Check</h1>
          <p className="mt-2 text-gray-600">Let's analyze your current emotional state</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading emotion detection models...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="relative">
              <Webcam
                ref={webcamRef}
                className="w-full rounded-lg"
                onUserMedia={handleStream}
                mirrored={true}
                videoConstraints={{
                  width: 640,
                  height: 480,
                  facingMode: "user"
                }}
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ transform: 'scaleX(1)' }} // Remove mirroring from canvas
              />
            </div>

            {emotion && (
              <div className="mt-6 text-center">
                <div className={`inline-block px-4 py-2 rounded-full ${getEmotionColor(emotion)}`}>
                  <p className="text-lg font-semibold capitalize">
                    Current Mood: {emotion}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodCheck;


const getEmotionColor = (emotion) => {
  const colorMap = {
    happy: 'bg-yellow-100 text-yellow-800',
    sad: 'bg-blue-100 text-blue-800',
    angry: 'bg-red-100 text-red-800',
    fearful: 'bg-purple-100 text-purple-800',
    disgusted: 'bg-green-100 text-green-800',
    surprised: 'bg-pink-100 text-pink-800',
    neutral: 'bg-gray-100 text-gray-800'
  };
  return colorMap[emotion] || 'bg-gray-100 text-gray-800';
};