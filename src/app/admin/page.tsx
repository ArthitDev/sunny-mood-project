"use client";

import { useState } from "react";
import Link from "next/link";

interface Visitor {
  timestamp?: string;
  name?: string;
  fullLine: string;
}

interface LogData {
  total: number;
  visitors: Visitor[];
  message?: string;
}

export default function AdminPage() {
  const [logData, setLogData] = useState<LogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    if (password === "sunlovesyou") {
      setIsAuthenticated(true);
      fetchLogs();
    } else {
      alert("รหัสผ่านไม่ถูกต้อง");
    }
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/log");
      const data = await response.json();
      setLogData(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-100 via-red-50 to-rose-200">
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center border-2 border-pink-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            🔐 Admin Panel
          </h1>
          <p className="text-pink-600 mb-4">กรอกรหัสผ่านเพื่อดูรายชื่อผู้เยี่ยมชม</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="รหัสผ่าน..."
            className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-500 focus:outline-none transition text-pink-600 placeholder-pink-400 bg-pink-50 mb-4"
            onKeyPress={(e) => e.key === 'Enter' && checkAuth()}
          />
          <button
            onClick={checkAuth}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-4 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-pink-100 via-red-50 to-rose-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-pink-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              💕 รายชื่อผู้เยี่ยมชม
            </h1>
            <button
              onClick={fetchLogs}
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
            >
              {loading ? "กำลังโหลด..." : "รีเฟรช"}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="flex items-center justify-center gap-2">
                <span className="loading-spinner text-lg">💭</span>
                <span className="loading-text">กำลังโหลดข้อมูล...</span>
              </div>
            </div>
          ) : logData ? (
            <div>
              <div className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-lg font-semibold text-pink-700">
                  📊 สรุป: มีผู้เยี่ยมชมทั้งหมด {logData.total} คน
                </p>
              </div>

              {logData.visitors.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {logData.visitors.map((visitor, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg border border-pink-200 hover:shadow-md transition-shadow"
                    >
                      {visitor.timestamp && visitor.name ? (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <span className="font-medium text-pink-600">
                            💖 {visitor.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {visitor.timestamp}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-600">{visitor.fullLine}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {logData.message || "ยังไม่มีผู้เยี่ยมชม"}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-red-500">
              เกิดข้อผิดพลาดในการโหลดข้อมูล
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
          >
            ← กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </main>
  );
} 