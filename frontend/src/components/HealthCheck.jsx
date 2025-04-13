import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axioInstance';

/**
 * HealthCheck component to verify API connectivity
 * This can be used to diagnose connection issues
 */
const HealthCheck = () => {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_BASE_URL);

  const checkHealth = async () => {
    setStatus('checking');
    setError(null);
    
    try {
      const startTime = Date.now();
      const response = await axiosInstance.get('/api/health');
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setStatus('success');
      console.log(`API health check successful. Response time: ${responseTime}ms`);
    } catch (error) {
      setStatus('error');
      setError(error.message || 'Unknown error');
      console.error('API health check failed:', error);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="p-4 border rounded-md bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-2">API Health Check</h3>
      <p className="mb-2">API URL: {apiUrl}</p>
      
      <div className="flex items-center mb-2">
        <span className="mr-2">Status:</span>
        {status === 'checking' && (
          <span className="text-yellow-500">Checking...</span>
        )}
        {status === 'success' && (
          <span className="text-green-500">Connected</span>
        )}
        {status === 'error' && (
          <span className="text-red-500">Error</span>
        )}
      </div>
      
      {error && (
        <div className="mb-2">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}
      
      <button 
        onClick={checkHealth}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Check Again
      </button>
    </div>
  );
};

export default HealthCheck; 