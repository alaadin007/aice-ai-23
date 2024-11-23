import React, { useState } from 'react';
import { Upload, Link as LinkIcon } from 'lucide-react';

export function ContentUploader({ onUpload }: { onUpload: (isLong: boolean) => void }) {
  const [activeTab, setActiveTab] = useState('upload');
  const [link, setLink] = useState('');

  const handleLinkSubmit = () => {
    if (link.trim()) {
      onUpload(true); // Simulate a long process for video content
    }
  };

  const handleFileDrop = () => {
    onUpload(false); // Simulate a quick process for PDF/PPT
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-effect rounded-2xl p-3">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            New Upload
          </button>
          <button
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'recent'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
          </button>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-xl">
          <div className="space-y-8">
            {/* Link Input Section */}
            <div className="border-b border-gray-100 pb-8">
              <label className="block text-gray-700 text-sm font-medium mb-3">
                Paste YouTube or Web Link
              </label>
              <div className="flex gap-3">
                <div className="input-group flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="input pl-10"
                  />
                </div>
                <button 
                  className="btn-primary whitespace-nowrap"
                  onClick={handleLinkSubmit}
                >
                  Submit Link
                </button>
              </div>
            </div>

            {/* File Drop Section */}
            <div 
              onClick={handleFileDrop}
              className="border-2 border-dashed border-gray-100 rounded-xl p-10 text-center transition-colors duration-200 hover:border-blue-500 cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200">
                  <Upload className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-600 mb-1">
                    Drop PDF or PPT to earn AiCE Points
                  </p>
                  <p className="text-sm text-gray-400">
                    or click to browse files
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}