import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiClock, FiCheckCircle, FiPlus } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout.jsx';
import StatCard from '../components/StatCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import useAuth from '../hooks/useAuth';
import { fetchMyStats } from '../services/reportService';
import { formatDate } from '../utils/format';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyStats()
      .then((res) => setStats(res.data.data))
      .catch(() => setError('Could not load your dashboard right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout title={`Welcome, ${user?.name?.split(' ')[0]}`} subtitle="Here's an overview of your reports">
      {loading && <p className="text-sm text-gray-500">Loading your dashboard…</p>}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {stats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard label="Total Reports" value={stats.total} icon={FiFileText} tone="navy" />
            <StatCard label="Under Review" value={stats.underReview} icon={FiClock} tone="amber" />
            <StatCard label="Resolved" value={stats.resolved} icon={FiCheckCircle} tone="green" />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="font-heading font-semibold text-gray-900">Recent Reports</h2>
              <Link
                to="/reports/new"
                className="flex items-center gap-1.5 text-sm font-medium text-white bg-navy-900 hover:bg-navy-800 px-3 py-1.5 rounded-md transition-colors"
              >
                <FiPlus className="w-4 h-4" />
                New Report
              </Link>
            </div>

            {stats.recent.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-gray-500">You haven't filed any reports yet.</p>
                <Link to="/reports/new" className="text-sm font-medium text-action-600 hover:underline mt-1 inline-block">
                  Report your first incident
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {stats.recent.map((r) => (
                  <li key={r._id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50">
                    <Link to={`/reports/${r._id}`} className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{r.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {r.reportId} · {r.incidentType} · {formatDate(r.createdAt)}
                      </p>
                    </Link>
                    <StatusBadge status={r.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Dashboard;
