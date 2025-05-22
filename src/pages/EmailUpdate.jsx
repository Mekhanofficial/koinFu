import HeaderPage from "../components/Header";

export default function EmailUpdatePage() {
  return (
    <>
      <HeaderPage />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
        <h1 className="text-2xl font-bold mb-4">Update Email</h1>
        <p className="text-gray-600 mb-6">
          Enter your new email address below.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter new email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Confirm new email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Email
          </button>
        </form>
      </div>
    </>
  );
}
