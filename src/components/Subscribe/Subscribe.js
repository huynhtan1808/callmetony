import { useState, useRef } from 'react';
import Link from 'next/link';

import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './Loading';

export default function Subscribe() {
  const [form, setForm] = useState(false);
  const inputEl = useRef(null);
  

  const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: 'loading' });

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: 'error',
        message: error
      });
      return;
    }

    inputEl.current.value = '';
    setForm({
      state: 'success',
      message: `Welcome to the Business Hi-Lite community.`
    });
  };

  return (
    <div id="subscribe" className="max-w-3xl p-6 my-6 bg-blue-100 rounded-lg">
      <p className="font-5 text-lg my-2">
        Sign up for the Business Hi-Lite newsletter for the latest news and analysis delivered straight to your inbox.
      </p>
      <form className="relative my-4 rounded-lg" onSubmit={subscribe}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="Email address"
          type="email"
          autoComplete="email"
          required
          className="font-4 text-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg bg-white text-gray-900"
        />
        <button
          className="flex font-5 text-sm items-center justify-center absolute right-1 top-1 px-4 h-9 bg-blue-600 border border-blue-600 text-white rounded-lg w-28"
          type="submit"
        >
          {form.state === 'loading' ? <LoadingSpinner /> : 'Subscribe'}
        </button>
      </form>
      {form.state === 'error' ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === 'success' ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : (
        <p className="font-4 text-xs">
          By clicking ‘Subscribe’, you agree to receive marketing emails from Business Hi-Lite as well as other partner offers and accept our
           <a href="/terms" className="text-blue-500 border-none">
           &nbsp;Terms of Service 
           </a>
           &nbsp;and
           <a href="/privacy-policy" className="text-blue-500 border-none">
           &nbsp;Privacy Policy
           </a>
           .
        </p>
      )}
    </div>
  );
}