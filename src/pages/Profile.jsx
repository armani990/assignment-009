import { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { showToast } from "../components/Toast";

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ displayName: name, photoURL: photo });
      showToast("success", "Profile updated!");
    } catch (err) {
      showToast("error", "Update failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>
      <img src={user?.photoURL || "https://i.postimg.cc/0jGGGk0L/user.png"} className="w-24 h-24 mx-auto rounded-full" />
      <p className="text-center mt-2 font-semibold">{user?.displayName}</p>
      <p className="text-center text-gray-600">{user?.email}</p>

      <form onSubmit={handleUpdate} className="mt-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 border rounded mb-3"
        />
        <input
          type="url"
          value={photo}
          onChange={e => setPhoto(e.target.value)}
          placeholder="Photo URL"
          className="w-full p-3 border rounded mb-3"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
          Update Profile
        </button>
      </form>
    </div>
  );
}