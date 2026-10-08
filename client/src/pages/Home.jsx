import { Link } from 'react-router-dom';
import { FiShield, FiFileText, FiClock, FiCheckCircle } from 'react-icons/fi';

const Home = () => (
  <div className="min-h-screen bg-navy-900 text-white flex flex-col">
    <header className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <FiShield className="w-6 h-6 text-amber-500" />
        <span className="font-heading font-bold text-lg">CyberSafe</span>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/login" className="text-sm font-medium text-blue-100/80 hover:text-white">Sign In</Link>
        <Link to="/register" className="text-sm font-medium bg-white text-navy-900 px-4 py-2 rounded-md hover:bg-blue-50">
          Register
        </Link>
      </div>
    </header>

    <main className="flex-1 flex items-center px-8">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-16">
        <div>
          <h1 className="font-heading text-4xl font-bold leading-tight">
            Report a cyber incident. Track it to resolution.
          </h1>
          <p className="text-blue-100/70 mt-4 max-w-md">
            Scams, UPI fraud, phishing, fake accounts, hacking, and online harassment —
            file a report in minutes and follow every status update in one place.
          </p>
          <Link
            to="/register"
            className="inline-block mt-8 bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Report an Incident
          </Link>
        </div>

        <div className="space-y-4">
          {[
            { icon: FiFileText, label: 'File a detailed report', desc: 'Incident type, description, evidence — all in one form' },
            { icon: FiClock, label: 'Track every status change', desc: 'Reported → Under Review → Investigating → Resolved' },
            { icon: FiCheckCircle, label: 'Get admin remarks', desc: 'See exactly what action was taken on your case' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
              <Icon className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">{label}</p>
                <p className="text-blue-100/60 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default Home;
