import React from 'react';
import { Upload, BookOpen, Award, Share2, Brain, Users } from 'lucide-react';

export function ProcessSteps() {
  const steps = [
    {
      icon: <Upload className="w-5 h-5 text-white" />,
      title: "Share Content",
      description: "Upload files or share links to articles, videos, or courses"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-white" />,
      title: "Verify Knowledge",
      description: "Complete AI-generated assessments to prove understanding"
    },
    {
      icon: <Award className="w-5 h-5 text-white" />,
      title: "Earn KIU Points",
      description: "Get recognized credits for your learning efforts"
    }
  ];

  const features = [
    {
      icon: <Brain className="w-5 h-5 text-white" />,
      title: "AI-Powered Analysis",
      description: "Our AI evaluates content depth and generates relevant assessments"
    },
    {
      icon: <Award className="w-5 h-5 text-white" />,
      title: "Verified Certificates",
      description: "Download certificates with secure verification QR codes"
    },
    {
      icon: <Users className="w-5 h-5 text-white" />,
      title: "Team Progress",
      description: "Track and manage your team's professional development"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h3 className="text-center text-xl font-medium mb-12 text-white/80">
        How It Works
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-blue-500/30 to-transparent" />
            )}
            
            {/* Step Card */}
            <div className="glass-effect rounded-xl p-6 text-center relative transition-transform duration-300 hover:scale-105">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-blue-500/20 border border-blue-400/20">
                {index + 1}
              </div>
              
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              
              <h4 className="text-lg font-semibold mb-2 text-white">
                {step.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="glass-effect rounded-xl p-6 hover:bg-zinc-800/50 transition-duration-300">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">
              {feature.title}
            </h4>
            <p className="text-gray-400 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}