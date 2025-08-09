import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function TestDB() {
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setLoading(true);
      setError('');

      // Test 1: Basic connection
      const { data: healthData, error: healthError } = await supabase
        .from('users')
        .select('count(*)')
        .limit(1);

      setResults(prev => [...prev, {
        test: 'Database Connection',
        status: healthError ? 'Failed' : 'Success',
        data: healthData,
        error: healthError?.message
      }]);

      // Test 2: Check users table structure
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .limit(5);

      setResults(prev => [...prev, {
        test: 'Users Table Query',
        status: userError ? 'Failed' : 'Success',
        data: userData,
        error: userError?.message
      }]);

      // Test 3: Test auth
      const { data: authData, error: authError } = await supabase.auth.getUser();

      setResults(prev => [...prev, {
        test: 'Auth Service',
        status: authError ? 'Failed' : 'Success',
        data: authData?.user ? 'User logged in' : 'No user logged in',
        error: authError?.message
      }]);

      if (healthError || userError || authError) {
        setError('Some tests failed. Check console for details.');
      }

    } catch (err: any) {
      setError(`Connection test failed: ${err.message}`);
      console.error('Database test error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testSignup = async () => {
    try {
      const testEmail = `test+${Date.now()}@example.com`;
      const testPassword = 'testpassword123';

      console.log('Testing signup with:', testEmail);

      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: 'Test User',
            company_name: 'Test Company'
          }
        }
      });

      setResults(prev => [...prev, {
        test: 'Test Signup',
        status: error ? 'Failed' : 'Success',
        data: data?.user ? 'User created' : 'No user returned',
        error: error?.message
      }]);

    } catch (err: any) {
      console.error('Signup test error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
        
        {loading && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800">Testing database connection...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          {results.map((result, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              result.status === 'Success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <h3 className={`font-semibold ${
                result.status === 'Success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.test}: {result.status}
              </h3>
              {result.error && (
                <p className="text-red-600 text-sm mt-2">{result.error}</p>
              )}
              {result.data && (
                <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>

        <div className="space-x-4">
          <button
            onClick={testConnection}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Re-test Connection
          </button>
          <button
            onClick={testSignup}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Test Signup Process
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Environment Variables:</h3>
          <p className="text-sm">
            <strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
          </p>
          <p className="text-sm">
            <strong>Supabase Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
          </p>
        </div>
      </div>
    </div>
  );
}