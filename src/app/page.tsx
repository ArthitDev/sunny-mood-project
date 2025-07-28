"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      alert("กรุณาป้อนชื่อของคุณก่อนนะครับ");
      return;
    }
    setNameSubmitted(true);
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage(data.message);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 12000);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage("ขออภัยนะงับบ ลองใหม่อีกครั้งนะ 💕");
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  
  const handleGenerateClick = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage(data.message);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 12000);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage("ขออภัยนะงับบ ลองใหม่อีกครั้งนะ 💕");
    } finally {
      setLoading(false);
    }
  }

  // สร้างหัวใจกระจายแบบหลายทิศทาง
  const createHearts = () => {
    const hearts = [];
    const animations = ['float-heart', 'float-heart-left', 'float-heart-right', 'float-heart-diagonal'];
    const emojis = [
      '💕', '❤️', '💖', '💗', '💘', '🥰', '😍', '💝', '💓', '💞', '💌', '🌹',
      '💐', '🎀', '💒', '👫', '💏', '💑', '💋', '😘', '😚', '🥺', '🌺', '🌸', 
      '🌷', '🦋', '✨', '⭐', '🌟', '💫', '🎉', '🎊', '🎈', '🍰', '🧁', '🍭', 
      '🍬', '🎁', '💎'
    ];
    
    // สร้างหัวใจระลอกที่ 1 - เยอะมาก
    for (let i = 0; i < 50; i++) {
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const randomDelay = Math.random() * 6;
      const randomSize = 1.0 + Math.random() * 1.8;
      
      // กำหนดตำแหน่งเริ่มต้นแบบกระจายทั่วหน้าจอ
      let startPosition = {};
      if (randomAnimation === 'float-heart') {
        startPosition = {
          left: `${Math.random() * 90 + 5}%`,
          top: `${Math.random() * 90 + 5}%`
        };
      } else if (randomAnimation === 'float-heart-left') {
        startPosition = {
          left: `${Math.random() * 30 + 5}%`,
          top: `${Math.random() * 90 + 5}%`
        };
      } else if (randomAnimation === 'float-heart-right') {
        startPosition = {
          right: `${Math.random() * 30 + 5}%`,
          top: `${Math.random() * 90 + 5}%`
        };
      } else {
        startPosition = {
          left: `${Math.random() * 50 + 25}%`,
          top: `${Math.random() * 90 + 5}%`
        };
      }
      
      hearts.push(
        <div
          key={`heart-wave1-${i}`}
          className={`absolute ${randomAnimation} text-lg sm:text-xl lg:text-2xl`}
          style={{
            ...startPosition,
            animationDelay: `${randomDelay}s`,
            fontSize: `${randomSize}rem`,
            zIndex: 10,
          }}
        >
          {randomEmoji}
        </div>
      );
    }
    
         // สร้างหัวใจระลอกที่ 2 - ช่วงกลาง
     for (let i = 0; i < 40; i++) {
       const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
       const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
       const randomDelay = 4 + Math.random() * 6;
       const randomSize = 1.2 + Math.random() * 1.5;
       
       let startPosition = {};
       if (randomAnimation === 'float-heart') {
         startPosition = {
           left: `${Math.random() * 90 + 5}%`,
           top: `${Math.random() * 90 + 5}%`
         };
       } else if (randomAnimation === 'float-heart-left') {
         startPosition = {
           left: `${Math.random() * 30 + 5}%`,
           top: `${Math.random() * 90 + 5}%`
         };
       } else if (randomAnimation === 'float-heart-right') {
         startPosition = {
           right: `${Math.random() * 30 + 5}%`,
           top: `${Math.random() * 90 + 5}%`
         };
       } else {
         startPosition = {
           left: `${Math.random() * 50 + 25}%`,
           top: `${Math.random() * 90 + 5}%`
         };
       }
      
      hearts.push(
        <div
          key={`heart-wave2-${i}`}
          className={`absolute ${randomAnimation} text-lg sm:text-xl lg:text-2xl`}
          style={{
            ...startPosition,
            animationDelay: `${randomDelay}s`,
            fontSize: `${randomSize}rem`,
            zIndex: 10,
          }}
        >
          {randomEmoji}
        </div>
      );
    }
    
         // สร้างหัวใจระลอกที่ 3 - ช่วงท้าย
     for (let i = 0; i < 30; i++) {
       const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
       const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
       const randomDelay = 8 + Math.random() * 4;
       const randomSize = 1.5 + Math.random() * 1.2;
       
       let startPosition = {};
       if (randomAnimation === 'float-heart') {
         startPosition = {
           left: `${Math.random() * 90 + 5}%`,
           top: `${Math.random() * 90 + 5}%`
         };
       } else if (randomAnimation === 'float-heart-left') {
         startPosition = {
           left: `${Math.random() * 30 + 5}%`,
           top: `${Math.random() * 90 + 5}%`
         };
       } else if (randomAnimation === 'float-heart-right') {
         startPosition = {
           right: `${Math.random() * 30 + 5}%`,
           top: `${Math.random() * 90 + 5}%`
         };
       } else {
         startPosition = {
           left: `${Math.random() * 50 + 25}%`,
           top: `${Math.random() * 90 + 5}%`
         };
       }
      
      hearts.push(
        <div
          key={`heart-wave3-${i}`}
          className={`absolute ${randomAnimation} text-xl sm:text-2xl lg:text-3xl`}
          style={{
            ...startPosition,
            animationDelay: `${randomDelay}s`,
            fontSize: `${randomSize}rem`,
            zIndex: 10,
          }}
        >
          {randomEmoji}
        </div>
      );
    }
    
    return hearts;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-pink-100 via-red-50 to-rose-200 font-sans relative overflow-hidden">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 text-center border-2 border-pink-200">
        <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          💕 เราคิดอะไรอยู่น้าาา... 💕
        </h1>
        <p className="text-sm sm:text-base text-pink-600 mb-4 sm:mb-6">❤️ ลองอ่านดูสิ ❤️</p>

        {!nameSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="คนอ่านชื่ออะไรน้าาา..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-500 focus:outline-none transition text-pink-600 placeholder-pink-400 bg-pink-50"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg hover:from-pink-600 hover:to-red-600 transition-all transform hover:scale-105 disabled:from-pink-300 disabled:to-pink-400 disabled:cursor-not-allowed shadow-lg"
            >
                              {loading ? (
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <span className="loading-spinner text-base sm:text-lg">💭</span>
                    <span className="loading-text text-xs sm:text-sm">ซันคิดอะไรอยู่นะ...</span>
                    <span className="loading-heart text-base sm:text-lg">💕</span>
                  </div>
                ) : "ไปกันเล้ยย 🥰"}
            </button>
          </form> 
        ) : (
          <div>
            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
              ดีงับบ <span className="font-bold text-pink-500">{name}</span> 💕
            </p>
                                      <button
              onClick={handleGenerateClick}
              disabled={loading}
              className="cursor-pointer w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:from-pink-300 disabled:to-pink-400 disabled:cursor-not-allowed shadow-lg"
            >
                                  {loading ? (
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <span className="loading-spinner text-base sm:text-lg">💭</span>
                      <span className="loading-text text-xs sm:text-sm">ซันคิดอะไรอยู่นะ...</span>
                      <span className="loading-heart text-base sm:text-lg">💕</span>
                    </div>
                  ) : "อ่านดูสิ 💖"}
              </button>

                          {message && (
                <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-200 rounded-lg sm:rounded-xl animate-fade-in shadow-inner">
                  <div className="text-center mb-2">
                    <span className="text-pink-500 text-base sm:text-lg">💕 ❤️ 💖 ❤️ 💕</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {message}
                  </p>
                  <div className="text-center mt-2">
                    <span className="text-pink-500 text-base sm:text-lg">💕 ❤️ 💖 ❤️ 💕</span>
                  </div>
                </div>
              )}
          </div>
        )}
              </div>
      
        
        {/* เอฟเฟคหัวใจกระจาย */}
        {showHearts && (
          <div className="fixed inset-0 pointer-events-none z-10">
            <div className="relative w-full h-full">{createHearts()}</div>
          </div>
        )}
      </main>
  );
}