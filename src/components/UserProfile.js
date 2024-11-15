import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUserById, updateUser } from "../api";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user token from localStorage
  const token = localStorage.getItem("token");

  // Check if token is a valid string
  const userId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login"); // Redirect to login if no valid token
      return;
    }

    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const response = await getUserById(userId, token);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect to login if there is an error
      }
    };

    fetchUserData();
  }, [userId, token, navigate]);

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true);
      const updatedData = { name: userData.name, email: userData.email };
      if (newPassword) {
        updatedData.password = newPassword;
      }

      await updateUser(userId, updatedData, token);
      alert("Profile updated successfully!");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId, token); // Delete user account
      alert("Account deleted successfully!");
      localStorage.removeItem("token"); // Remove token on account deletion
      navigate("/"); // Redirect to home after deletion
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Email
        </label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Change Password (optional)
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleUpdateUser}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        onClick={() => setShowDeleteModal(true)}
      >
        Delete Account
      </button>
      <Link
        to="/"
        className="mx-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
      >
        Go to Home
      </Link>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">This action cannot be undone.</p>
            <div className="flex justify-end">
              <button
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
