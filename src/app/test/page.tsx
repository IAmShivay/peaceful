export default function TestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AudioStream Pro Test Page
        </h1>
        <p className="text-xl text-gray-600">
          If you can see this, the basic Next.js setup is working!
        </p>
        <div className="mt-8 space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">✅ Next.js is running</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800">✅ Tailwind CSS is working</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-purple-800">✅ TypeScript is compiling</p>
          </div>
        </div>
      </div>
    </div>
  );
}
