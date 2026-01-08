import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface KPIProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
}

const KPI: React.FC<KPIProps> = ({ label, value, icon: Icon, color, trend }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</p>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors duration-300 font-sans">
              {value}
            </h3>
          </div>
          <div className={`p-3.5 rounded-lg ${color} flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" />
              {trend}
            </div>
            <span className="text-gray-500 font-medium">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPI;
