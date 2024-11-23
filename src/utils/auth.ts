// Client-side auth utilities
export function isAdminInitialized(): boolean {
  return localStorage.getItem('adminInitialized') === 'true';
}

export function markAdminInitialized(): void {
  localStorage.setItem('adminInitialized', 'true');
}

export function getSecretRoute(): string {
  // Generate a deterministic but obscure route
  const deploymentId = import.meta.env.VITE_DEPLOYMENT_ID || 'development';
  return `/setup-${btoa(deploymentId).substring(0, 8)}`;
}

export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('authToken', token);
}

export function clearAuthToken(): void {
  localStorage.removeItem('authToken');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function getUserRole(): string | null {
  const token = getAuthToken();
  if (!token) return null;
  
  try {
    // Simple JWT payload extraction (for display only, verification happens server-side)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
}