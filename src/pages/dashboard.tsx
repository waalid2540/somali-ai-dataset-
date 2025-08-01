import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    // Redirect to main AI tools page instead of confusing backend dashboard
    window.location.href = '/?access=tools';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your AI tools...</p>
      </div>
    </div>
  );
}