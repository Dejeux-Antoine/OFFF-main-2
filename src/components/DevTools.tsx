import React, { useState } from 'react';
import { Database, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { seedSampleData } from '../lib/seedData';

export const DevTools: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSeedData = async () => {
    setStatus('loading');
    setMessage('Seeding sample data...');

    const result = await seedSampleData();

    if (result.success) {
      setStatus('success');
      setMessage('Sample data seeded successfully! Refresh the page to see the data.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } else {
      setStatus('error');
      setMessage('Error seeding data. Check console for details.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="glass-card rounded-2xl p-4 shadow-2xl max-w-sm">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-primary-500" />
          <span className="font-semibold text-neutral-900">Dev Tools</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleSeedData}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Seeding...' : 'Seed Sample Data'}
        </Button>

        {message && (
          <div
            className={`mt-3 p-3 rounded-lg flex items-start gap-2 text-sm ${
              status === 'success'
                ? 'bg-green-50 text-green-700'
                : status === 'error'
                ? 'bg-red-50 text-red-700'
                : 'bg-blue-50 text-blue-700'
            }`}
          >
            {status === 'success' ? (
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : status === 'error' ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : null}
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
