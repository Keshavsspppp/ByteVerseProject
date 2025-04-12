import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: '',
    gender: '',
    phone: '',
  });

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    console.log('Profile update:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-yellow-500 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-yellow-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-yellow-600">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isEditing ? 'border-yellow-300' : 'border-gray-200 bg-gray-50'
                    }`}
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isEditing ? 'border-yellow-300' : 'border-gray-200 bg-gray-50'
                    }`}
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isEditing ? 'border-yellow-300' : 'border-gray-200 bg-gray-50'
                    }`}
                    value={profileData.age}
                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isEditing ? 'border-yellow-300' : 'border-gray-200 bg-gray-50'
                    }`}
                    value={profileData.gender}
                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isEditing ? 'border-yellow-300' : 'border-gray-200 bg-gray-50'
                    }`}
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;