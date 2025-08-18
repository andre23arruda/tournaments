import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada';
  }, []);

  return (
    <div className={`min-h-screen flex justify-center items-center bg-gray-800 text-white`}>
      <h1>
        Ooops, página não encontrada!
      </h1>
    </div>
  )
}