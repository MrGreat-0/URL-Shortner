const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center p-6">
      <h1 className="text-5xl font-extrabold text-blue-700">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-2">
        Page Not Found
      </h2>
      <p className="mt-4 text-gray-600 text-md max-w-md">
        Sorry, the page you're looking for doesn't exist or may have expired.
      </p>
      <a
        href="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFoundPage;
