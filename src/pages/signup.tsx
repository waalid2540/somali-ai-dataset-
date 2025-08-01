import { useEffect } from 'react';

export default function Signup() {
  useEffect(() => {
    // Redirect to main page instead of confusing backend signup  
    window.location.href = '/';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to sign up...</p>
      </div>
    </div>
  );
}