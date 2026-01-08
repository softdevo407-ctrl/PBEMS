import React from 'react';
import { Project, ProjectCategory, ProjectStatus } from '../types';
import { CATEGORY_ICONS, STATUS_COLORS } from './constants';
import { 
  Plus, 
  BarChart3, 
  PieChart as PieChartIcon, 
  DollarSign, 
  Target, 
  Briefcase,
  ExternalLink,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import KPI from './KPI';

interface DashboardProps {
  projects: Project[];
  onCategoryClick: (category: ProjectCategory) => void;
  onAddProject: (category: ProjectCategory) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onCategoryClick, onAddProject }) => {
  const categories = Object.values(ProjectCategory);

  const statsByCat = categories.map(cat => {
    const catProjects = projects.filter(p => p.category === cat);
    return {
      name: cat.split(' ').slice(0, 2).join(' '),
      budget: catProjects.reduce((s, p) => s + p.totalBudget, 0) / 1000000,
      expenditure: catProjects.reduce((s, p) => s + p.expenditure, 0) / 1000000,
    };
  });

  const statusData = [
    { name: 'On Track', value: projects.filter(p => p.status === ProjectStatus.ON_TRACK).length, color: '#10b981' },
    { name: 'At Risk', value: projects.filter(p => p.status === ProjectStatus.AT_RISK).length, color: '#f59e0b' },
    { name: 'Delayed', value: projects.filter(p => p.status === ProjectStatus.DELAYED).length, color: '#ef4444' },
    { name: 'Completed', value: projects.filter(p => p.status === ProjectStatus.COMPLETED).length, color: '#3b82f6' },
  ];

  const totalBudget = projects.reduce((s, p) => s + p.totalBudget, 0);
  const totalExp = projects.reduce((s, p) => s + p.expenditure, 0);
  const utilization = Math.round((totalExp / totalBudget) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="mb-8 animate-in fade-in duration-500">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Budget Dashboard</h1>
            <p className="text-gray-600 font-medium">Real-time overview of project budgets and expenditures</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
            <Plus className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - Power BI Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPI 
          label="Total Budget Allocation" 
          value={`$${(totalBudget / 1000000).toFixed(1)}M`} 
          icon={DollarSign} 
          color="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600"
          trend="+4.2%"
        />
        <KPI 
          label="Actual Expenditure" 
          value={`$${(totalExp / 1000000).toFixed(1)}M`} 
          icon={Briefcase} 
          color="bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600"
        />
        <KPI 
          label="Budget Utilization" 
          value={`${utilization}%`} 
          icon={Target} 
          color="bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600"
        />
        <KPI 
          label="On-Track Projects" 
          value={projects.filter(p => p.status === ProjectStatus.ON_TRACK).length} 
          icon={BarChart3} 
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Budget vs Expenditure</h3>
              <p className="text-sm text-gray-600 mt-1">Analysis by Sector (in Millions)</p>
            </div>
            <div className="flex gap-2">
              <button className="text-xs font-semibold text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-colors">3M</button>
              <button className="text-xs font-semibold text-blue-600 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200">6M</button>
              <button className="text-xs font-semibold text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-colors">1Y</button>
            </div>
          </div>
          <div className="h-80 -mx-4 px-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsByCat} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: '#f0f9ff' }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e0e7ff',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                    padding: '12px'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                <Bar dataKey="budget" name="Planned Budget" fill="url(#colorBudget)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenditure" name="Actual Expenditure" fill="url(#colorExp)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Project Status</h3>
            <p className="text-sm text-gray-600 mt-1">Health Overview</p>
          </div>
          <div className="h-64 -mx-4 px-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-2.5">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-700 font-semibold">{s.name}</span>
                </div>
                <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-xs">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sector Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Project Sectors</h2>
          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">{categories.length} Sectors</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const catProjects = projects.filter((p) => p.category === cat);
            const catBudget = catProjects.reduce((s, p) => s + p.totalBudget, 0);
            const catExp = catProjects.reduce((s, p) => s + p.expenditure, 0);
            const progress = catBudget > 0 ? Math.round((catExp / catBudget) * 100) : 0;
            const variance = catBudget > 0 ? Math.round(((catBudget - catExp) / catBudget) * 100) : 0;
            const atRiskProjects = catProjects.filter(p => p.status === ProjectStatus.AT_RISK || p.status === ProjectStatus.DELAYED).length;

            return (
              <div
                key={cat}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => onCategoryClick(cat)}
              >
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-blue-100 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white rounded-lg shadow-md border border-gray-200 group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        {CATEGORY_ICONS[cat]}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">{cat}</h4>
                        <p className="text-xs text-gray-600 mt-0.5">{catProjects.length} projects</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
                <div className="p-5 space-y-5">
                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3.5 border border-blue-200">
                      <p className="text-xs text-blue-700 font-bold uppercase tracking-wider">Utilization</p>
                      <p className="text-2xl font-bold text-blue-900 mt-1">{progress}%</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3.5 border border-emerald-200">
                      <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Reserve</p>
                      <p className="text-2xl font-bold text-emerald-900 mt-1">{variance}%</p>
                    </div>
                    <div className={`rounded-lg p-3.5 border ${atRiskProjects > 0 ? 'bg-orange-50 border-orange-200' : 'bg-emerald-50 border-emerald-200'}`}>
                      <p className={`text-xs font-bold uppercase tracking-wider ${atRiskProjects > 0 ? 'text-orange-700' : 'text-emerald-700'}`}>Risk</p>
                      <p className={`text-2xl font-bold mt-1 ${atRiskProjects > 0 ? 'text-orange-900' : 'text-emerald-900'}`}>{atRiskProjects}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-700">Budget Progress</span>
                      <span className="text-xs font-bold text-gray-900">${(catExp / 1000000).toFixed(1)}M / ${(catBudget / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-sm">
                      <div
                        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-full rounded-full transition-all duration-1000 shadow-sm"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-center">
                      <p className="text-xs text-gray-600 font-medium">On Track</p>
                      <p className="text-lg font-bold text-emerald-600 mt-0.5">{catProjects.filter(p => p.status === ProjectStatus.ON_TRACK).length}</p>
                    </div>
                    <div className="flex-1 bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-center">
                      <p className="text-xs text-gray-600 font-medium">Completed</p>
                      <p className="text-lg font-bold text-blue-600 mt-0.5">{catProjects.filter(p => p.status === ProjectStatus.COMPLETED).length}</p>
                    </div>
                    {atRiskProjects > 0 && (
                      <div className="flex-1 bg-orange-50 p-2.5 rounded-lg border border-orange-200 text-center">
                        <p className="text-xs text-orange-700 font-medium">At Risk</p>
                        <p className="text-lg font-bold text-orange-600 mt-0.5">{atRiskProjects}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
