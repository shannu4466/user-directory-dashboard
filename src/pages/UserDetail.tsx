import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Building, Calendar, Star } from 'lucide-react';
import { mockUsers } from '../data/mockUsers';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-panel max-w-md w-full p-8 text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-100 mb-3">User not found</h2>
          <p className="text-slate-400 mb-6">The user you are looking for does not exist or has been removed.</p>
          <button 
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-[0_4px_14px_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5"
            onClick={() => navigate('/')}
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(user.lastSeen).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 mb-6 transition-all duration-300 hover:-translate-x-1" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={18} />
        <span>Back to Directory</span>
      </button>

      <div className="glass-panel overflow-hidden">
        <div className="p-8 sm:p-10 bg-gradient-to-b from-indigo-500/10 to-transparent border-b border-slate-700/50">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            <div className="relative shrink-0">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.4)]" 
              />
              <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-slate-800 ${
                user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
              }`}></span>
            </div>
            <div className="flex-1 text-center sm:text-left mt-2">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-3">
                {user.name}
              </h1>
              <div className="inline-flex items-center gap-2 bg-indigo-500/15 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium border border-indigo-500/30">
                <Star size={14} className="text-indigo-400" />
                <span>{user.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 pb-2 border-b border-slate-700/50">
                Contact Information
              </h3>
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-slate-800/50 rounded-lg text-slate-400 flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">Email Address</span>
                  <a href={`mailto:${user.email}`} className="text-lg font-medium text-indigo-300 hover:text-indigo-200 hover:underline transition-colors shrink-0 break-all">
                    {user.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-slate-800/50 rounded-lg text-slate-400 flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">Phone Number</span>
                  <a href={`tel:${user.phone}`} className="text-lg font-medium text-indigo-300 hover:text-indigo-200 hover:underline transition-colors">
                    {user.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 pb-2 border-b border-slate-700/50">
                Corporate Information
              </h3>
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-slate-800/50 rounded-lg text-slate-400 flex items-center justify-center">
                  <Building size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">Company</span>
                  <span className="text-lg font-medium text-slate-100">{user.company}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-slate-800/50 rounded-lg text-slate-400 flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">Last Activity</span>
                  <span className="text-lg font-medium text-slate-100">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 bg-slate-800/40 border-t border-slate-700/50 flex flex-col sm:flex-row justify-end gap-4">
           <button 
             className="px-5 py-2.5 bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-700/50 hover:border-slate-500 rounded-lg font-medium transition-all duration-300"
             onClick={() => alert('Edit feature coming soon!')}
           >
             Edit Profile
           </button>
           <button 
             className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-[0_4px_14px_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5"
             onClick={() => alert('Message feature coming soon!')}
           >
             Send Message
           </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
