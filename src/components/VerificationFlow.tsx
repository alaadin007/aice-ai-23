import React, { useState } from 'react';
import { Upload, BadgeCheck, Shield, FileText, Phone, ArrowRight, Mail, Camera, X } from 'lucide-react';

interface VerificationFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

export function VerificationFlow({ onComplete, onBack }: VerificationFlowProps) {
  const [step, setStep] = useState<'account' | 'verify' | 'documents'>('account');
  const [verificationMethod, setVerificationMethod] = useState<'phone' | 'documents' | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== fileName));
  };

  if (step === 'documents') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-effect rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Upload Verification Documents</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Please provide the following documents to verify your identity
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass-effect rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-blue-500" />
                Required Documents
              </h3>
              <ul className="space-y-3 text-sm text-gray-400 mb-6">
                <li>• Government-issued ID (Passport or Driver's License)</li>
                <li>• Proof of Address (Utility Bill, Bank Statement)</li>
                <li>• Professional License or Certification</li>
              </ul>

              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div key={file} className="flex items-center justify-between bg-zinc-800 rounded-lg p-3">
                    <span className="text-sm">{file}</span>
                    <button 
                      onClick={() => removeFile(file)}
                      className="p-1 hover:bg-zinc-700 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}

                <label className="block">
                  <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-blue-500 cursor-pointer transition-colors">
                    <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <p className="text-gray-400 mb-1">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep('verify')}
                className="btn-secondary flex-1"
              >
                Back
              </button>
              <button
                onClick={onComplete}
                disabled={uploadedFiles.length === 0}
                className={`btn-primary flex-1 ${
                  uploadedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-effect rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Verify Your Identity</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Choose a verification method to proceed
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setVerificationMethod('phone')}
              className={`p-6 rounded-xl text-left transition-all ${
                verificationMethod === 'phone'
                  ? 'bg-blue-500 text-white'
                  : 'glass-effect hover:bg-zinc-800'
              }`}
            >
              <Phone className="w-6 h-6 mb-3" />
              <h3 className="font-semibold mb-1">Phone Verification</h3>
              <p className="text-sm opacity-80">
                Verify using SMS code
              </p>
            </button>

            <button
              onClick={() => setVerificationMethod('documents')}
              className={`p-6 rounded-xl text-left transition-all ${
                verificationMethod === 'documents'
                  ? 'bg-blue-500 text-white'
                  : 'glass-effect hover:bg-zinc-800'
              }`}
            >
              <FileText className="w-6 h-6 mb-3" />
              <h3 className="font-semibold mb-1">Document Upload</h3>
              <p className="text-sm opacity-80">
                Upload identification documents
              </p>
            </button>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setStep('account')}
              className="btn-secondary flex-1"
            >
              Back
            </button>
            <button
              onClick={() => setStep('documents')}
              disabled={!verificationMethod}
              className={`btn-primary flex-1 ${
                !verificationMethod ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-effect rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <BadgeCheck className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Create Verified Account</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Set up your account to start tracking your certificates and KIU points
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          setStep('verify');
        }}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="input-group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                required
                type="email"
                className="input pl-10 bg-zinc-800 border-zinc-700 text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="input-group">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                required
                type="password"
                className="input pl-10 bg-zinc-800 border-zinc-700 text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onBack}
              className="btn-secondary flex-1"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}