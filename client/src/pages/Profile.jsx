import MainLayout from '../layouts/MainLayout.jsx';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  return (
    <MainLayout title="Profile" subtitle="Your account details">
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md space-y-4">
        <div>
          <p className="text-xs text-gray-400">Name</p>
          <p className="text-sm text-gray-800 mt-0.5">{user?.name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Email</p>
          <p className="text-sm text-gray-800 mt-0.5">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Phone</p>
          <p className="text-sm text-gray-800 mt-0.5">{user?.phone || '—'}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
