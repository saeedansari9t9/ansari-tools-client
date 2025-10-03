import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-light)' }}>
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
            <Search className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
            404
          </h1>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
            Page Not Found
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--color-mid-dark)' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: 'var(--color-dark)' }}
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 ml-4"
            style={{ 
              backgroundColor: 'var(--color-mid-light)', 
              borderColor: 'var(--color-mid-dark)', 
              color: 'var(--color-dark)' 
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm" style={{ color: 'var(--color-mid-dark)' }}>
          <p>If you think this is an error, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
