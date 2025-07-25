import React, { useState } from 'react';
import Head from 'next/head';

export default function DebugFix() {
  const [email, setEmail] = useState('waalidlegacy@gmail.com');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const debugAndFix = async () => {
    if (!email) {
      alert('Please enter an email address');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/debug-and-fix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail: email })
      });

      const data = await response.json();
      setResult({ success: response.ok, data });
    } catch (error) {
      setResult({ 
        success: false, 
        data: { 
          message: 'Network Error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        } 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Debug & Fix Stripe Integration</title>
      </Head>

      <div style={{ 
        fontFamily: 'Arial, sans-serif', 
        maxWidth: '800px', 
        margin: '50px auto', 
        padding: '20px' 
      }}>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px',
          color: '#333'
        }}>
          <h1 style={{ color: '#222' }}>🔧 Debug & Fix Stripe Integration</h1>
          <p style={{ color: '#555' }}>This will check why users can't access tools after payment and fix the issue.</p>
          
          <div>
            <label htmlFor="email" style={{ color: '#333', fontWeight: 'bold' }}>User Email:</label><br />
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                padding: '10px', 
                margin: '10px 0', 
                fontSize: '16px', 
                width: '300px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                color: '#333'
              }}
              required 
            />
            <br />
            <button 
              onClick={debugAndFix}
              disabled={loading}
              style={{ 
                padding: '10px', 
                margin: '10px 0', 
                fontSize: '16px',
                background: '#007cba', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              {loading ? '🔄 Processing...' : '🔍 Debug & Fix User'}
            </button>
          </div>

          {loading && (
            <div style={{ padding: '15px', background: '#fff3cd', borderRadius: '4px', marginTop: '20px' }}>
              <p style={{ color: '#856404', margin: 0 }}>🔄 Checking Stripe and Supabase...</p>
            </div>
          )}

          {result && (
            <div style={{ 
              background: 'white', 
              padding: '15px', 
              marginTop: '20px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              backgroundColor: result.success ? '#e6ffe6' : '#ffe6e6',
              borderColor: result.success ? '#99ff99' : '#ff9999'
            }}>
              <h3>{result.success ? '✅' : '❌'} {result.data.message}</h3>
              
              {result.success && (
                <>
                  <p><strong>Stripe Customer ID:</strong> {result.data.stripeCustomer}</p>
                  <p><strong>Subscriptions:</strong> {result.data.subscriptions?.length || 0} found</p>
                  <p><strong>Current Status:</strong> {result.data.updated?.subscription_status}</p>
                </>
              )}
              
              <h4>Full Response:</h4>
              <pre style={{ 
                background: '#f0f0f0', 
                padding: '10px', 
                borderRadius: '4px', 
                overflowX: 'auto',
                fontSize: '12px'
              }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div style={{ marginTop: '30px', padding: '20px', background: '#e8f4fd', borderRadius: '8px' }}>
          <h3>🔗 Quick Links After Fix:</h3>
          <ul>
            <li><a href="/" style={{ color: '#007cba' }}>← Back to Main App</a></li>
            <li><a href="/api/subscription-status?userId=424e7ebf-9471-41d5-b2d0-819cdd473896" style={{ color: '#007cba' }}>Check Subscription Status API</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}