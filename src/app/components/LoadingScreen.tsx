"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const loadingSteps = [
    "รอแป๊บนึงนะ... ⭐",
    "กำลังเก็บใจดวงหนึ่ง... 💕",
    "กำลังคิดถึงใครสักคน... 💭",
    "พร้อมแล้ว... 💖"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        } else {
          setShowFinalMessage(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
          clearInterval(timer);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-red-100 to-rose-200 flex items-center justify-center z-50 overflow-hidden">
      {/* Background floating hearts */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <span className="text-pink-400 text-2xl">
              {['💕', '❤️', '💖', '🌸', '⭐'][Math.floor(Math.random() * 5)]}
            </span>
          </div>
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {!showFinalMessage ? (
          <>
            {/* Animated logo/title */}
            <div className="mb-8 animate-bounce">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                💕 รอแป๊บนึง.... 💕
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto rounded-full animate-pulse"></div>
            </div>

            {/* Loading animation */}
            <div className="mb-8">
              <div className="relative w-24 h-24 mx-auto mb-6">
                {/* Spinning heart ring */}
                <div className="absolute inset-0 border-4 border-pink-200 rounded-full animate-spin">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="text-2xl">💖</span>
                  </div>
                </div>
                
                {/* Center pulsing heart */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl animate-pulse">❤️</span>
                </div>
              </div>

              {/* Loading dots */}
              <div className="flex justify-center space-x-2 mb-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '1s'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Loading text */}
            <div className="text-center">
              <p className="text-xl text-gray-700 font-medium animate-fade-in">
                {loadingSteps[currentStep]}
              </p>
              
              {/* Progress bar */}
              <div className="mt-6 w-full bg-pink-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-red-400 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-pink-600 mt-2">
                {Math.round(((currentStep + 1) / loadingSteps.length) * 100)}%
              </p>
            </div>
          </>
        ) : (
          /* Final welcome message */
          <div className="animate-fade-in">
            <div className="text-6xl mb-6 animate-bounce">🌟</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              เย้เข้ามาแล้วว
            </h2>
            <p className="text-lg text-pink-600 mb-6">
              💕 ไปดูกันน 💕
            </p>
            
            {/* Sparkle effects */}
            <div className="relative">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${Math.random() * 40}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  <span className="text-yellow-400">✨</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-4 opacity-30">
          <span className="text-3xl animate-pulse">🌹</span>
          <span className="text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>💐</span>
          <span className="text-3xl animate-pulse" style={{ animationDelay: '1s' }}>🌸</span>
        </div>
      </div>
    </div>
  );
} 