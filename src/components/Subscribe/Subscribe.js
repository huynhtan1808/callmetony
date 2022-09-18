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
    <div id="subscribe" className="textborder border-emerald-100 bg-emerald-50 dark:bg-gray-700 rounded p-6 my-10 w-full dark:border-gray-800">
      <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
      Đăng ký nhận tin.
      </p>
      <p className="text-gray-900 dark:text-white my-1">
      Quan tâm đến việc cải thiện kiến thức của bạn về WordPress, React/NextJs và Marketing online? Đăng ký bản tin để nhận cập nhật miễn phí.
      </p>
      <form className="relative my-4 rounded-lg" onSubmit={subscribe}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="Email address"
          type="email"
          autoComplete="email"
          required
          className="text-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          className="flex font-5 text-sm items-center justify-center absolute right-1 top-1 px-4 h-9 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg w-28"
          type="submit"
        >
          {form.state === 'loading' ? <LoadingSpinner /> : 'Đăng ký'}
        </button>
      </form>
      {form.state === 'error' ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === 'success' ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : (
        <p className="text-xs text-gray-900 dark:text-white ">
          Bằng cách nhấp vào nút 'Đăng ký', bạn đồng ý nhận email tiếp thị từ Tony Huỳnh cũng như các đề nghị của đối tác khác và chấp nhận
           <a href="/chinh-sach-bao-mat" className="text-blue-500 border-none">
           {' '} Chính sách bảo mật {' '}
           </a>
            của tôi.
        </p>
      )}
    </div>
  );
}