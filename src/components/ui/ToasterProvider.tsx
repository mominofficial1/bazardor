'use client';

import { Toaster } from 'react-hot-toast';

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#ffffff',
          color: '#1d271f',
          border: '1px solid #e1e8e1',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-hind-siliguri), sans-serif',
          fontSize: '0.95rem',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: '#05893e',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#d03739',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
