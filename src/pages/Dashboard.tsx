import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronUp, ChevronDown, User as UserIcon } from 'lucide-react';
import { mockUsers } from '../data/mockUsers';
import type { User } from '../types/user';

type SortField = 'name' | 'company';
type SortOrder = 'asc' | 'desc';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    return mockUsers
      .filter((user) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          user.name.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch)
        );
      })
      .sort((a, b) => {
        const valA = a[sortField].toLowerCase();
        const valB = b[sortField].toLowerCase();
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [searchTerm, sortField, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-1">
            User Directory
          </h1>
          <p className="text-slate-400 text-sm">Manage your team members and their account permissions here.</p>
        </div>
        <div>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-[0_4px_14px_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5"
            onClick={() => alert("Add user feature coming soon!")}
          >
            <UserIcon size={18} />
            <span>Add User</span>
          </button>
        </div>
      </header>

      <main className="glass-panel overflow-hidden">
        <div className="p-5 border-b border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full bg-slate-900/60 border border-slate-700 text-slate-50 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/40 border-b border-slate-700/50">
                <th 
                  onClick={() => handleSort('name')} 
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 cursor-pointer hover:text-slate-200 transition-colors group select-none"
                >
                  <div className="flex items-center gap-2">
                    Name
                    <SortIcon field="name" currentField={sortField} order={sortOrder} />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">Contact</th>
                <th 
                  onClick={() => handleSort('company')} 
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 cursor-pointer hover:text-slate-200 transition-colors group select-none"
                >
                  <div className="flex items-center gap-2">
                    Company
                    <SortIcon field="company" currentField={sortField} order={sortOrder} />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">Role</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredAndSortedUsers.length > 0 ? (
                filteredAndSortedUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => navigate(`/user/${user.id}`)}
                    className="hover:bg-slate-700/30 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 w-max">
                        <img 
                          src={user.avatarUrl} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 group-hover:border-indigo-500/50 transition-colors" 
                        />
                        <div className="font-medium text-slate-100">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5 w-max">
                        <div className="text-sm font-medium text-slate-200">{user.email}</div>
                        <div className="text-xs text-slate-400">{user.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-200 whitespace-nowrap">{user.company}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase border ${
                        user.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

function SortIcon({
  field,
  currentField,
  order,
}: {
  field: SortField;
  currentField: SortField;
  order: SortOrder;
}) {
  if (field !== currentField) {
    return <ChevronDown size={14} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />;
  }
  return order === 'asc' 
    ? <ChevronUp size={14} className="text-indigo-400" /> 
    : <ChevronDown size={14} className="text-indigo-400" />;
}
