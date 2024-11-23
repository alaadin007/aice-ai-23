import QRCode from 'qrcode';

export async function generateVerificationQR(certificateId: string): Promise<string> {
  const verificationUrl = `https://aice.edu/verify/${certificateId}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 128,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return qrDataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
}

export function generateCertificateId(details: { fullName: string, email: string }): string {
  // Generate a unique certificate ID based on user details and timestamp
  const timestamp = Date.now();
  return btoa(`${details.email}-${timestamp}`).replace(/[/+=]/g, '').substring(0, 12);
}