"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gray-300 z-50 flex flex-col items-center justify-center">
      <div className="hand-loader mb-4">
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="palm"></div>
        <div className="thumb"></div>
      </div>
      <p className="mt-10 text-xl font-semibold text-gray-700 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
