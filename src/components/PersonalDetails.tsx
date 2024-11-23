import React, { useState, useEffect } from 'react';
import { User, Mail, Building, BadgeCheck, AlertCircle } from 'lucide-react';
import { generateVerificationQR, generateCertificateId } from '../utils/certificate';

interface UserDetails {
  fullName: string;
  email: string;
  organization: string;
  certificateId?: string;
}

interface PersonalDetailsProps {
  onComplete: (details: UserDetails) => void;
}

const CertificateDisplay = ({ details, qrCode, className = "" }: { 
  details: UserDetails; 
  qrCode: string;
  className?: string;
}) => (
  <div className={`aspect-[1/1.4142] bg-white text-black rounded-xl shadow-2xl overflow-hidden ${className}`}>
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-4xl font-bold text-white">
            AiCE
          </div>
          <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
        </div>
        <div className="text-right text-white">
          <div className="text-lg font-medium">
            Smarter, Unbiased,
          </div>
          <div>
            Ever-Evolving Equivalency
          </div>
        </div>
      </div>
    </div>

    {/* Certificate Content */}
    <div className="p-8 relative">
      {/* Not Verified Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
        <AlertCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">(Not ID Verified)</span>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Completion</h1>
        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Masseter Botox Treatment Update
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Advanced injection techniques and patient management strategies for optimal facial aesthetics and bruxism treatment outcomes. Covers safety protocols and best practices for long-term results.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          KIU Points Allocated: 1
        </h3>
        <p className="text-sm text-gray-600">
          1 KIU (Knowledge Impact Unit) = 1 hour equivalent to worldwide standards:
          CPD, CME, CE, CLE, PDUs, CPE + more
        </p>
      </div>

      <div className="text-center mb-8">
        <p className="text-xl text-gray-700 mb-6">This certifies that</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">{details.fullName}</h2>
        <p className="text-xl text-gray-700">{details.organization}</p>
      </div>

      {/* Footer with QR and Certificate ID */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" />
              Certificate ID: {details.certificateId}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString()}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src={qrCode} 
              alt="Verification QR Code" 
              className="w-20 h-20"
            />
            <span className="text-xs text-gray-500 mt-1">Scan to verify</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function PersonalDetails({ onComplete }: PersonalDetailsProps) {
  const [details, setDetails] = useState<UserDetails>({
    fullName: '',
    email: '',
    organization: '',
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const certificateId = generateCertificateId(details);
    const updatedDetails = { ...details, certificateId };
    const qrCodeData = await generateVerificationQR(certificateId);
    setQrCode(qrCodeData);
    setDetails(updatedDetails);
    setShowCertificate(true);
    onComplete(updatedDetails);
  };

  if (showCertificate) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="glass-effect rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Your Certificate</h2>
            <p className="text-gray-400">Here's your certificate of completion</p>
          </div>

          <CertificateDisplay 
            details={details} 
            qrCode={qrCode} 
            className="mx-auto mb-8"
          />

          <div className="flex justify-center gap-4">
            <button className="btn-primary flex items-center gap-2">
              Email Certificate
            </button>
            <button className="btn-secondary flex items-center gap-2">
              Login/Register For ID Verified Certs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-effect rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Complete Your Certificate</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <div className="input-group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                required
                type="text"
                value={details.fullName}
                onChange={e => setDetails(prev => ({ ...prev, fullName: e.target.value }))}
                className="input pl-10 bg-zinc-800 border-zinc-700 text-white"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="input-group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                required
                type="email"
                value={details.email}
                onChange={e => setDetails(prev => ({ ...prev, email: e.target.value }))}
                className="input pl-10 bg-zinc-800 border-zinc-700 text-white"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Organization
            </label>
            <div className="input-group">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                required
                type="text"
                value={details.organization}
                onChange={e => setDetails(prev => ({ ...prev, organization: e.target.value }))}
                className="input pl-10 bg-zinc-800 border-zinc-700 text-white"
                placeholder="Company or Institution"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3"
          >
            Generate Certificate
          </button>
        </form>
      </div>
    </div>
  );
}