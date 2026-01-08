import React from 'react';
import { Project, ProjectStatus } from '../types';
import { STATUS_COLORS } from './constants';
import { ChevronRight, DollarSign } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const percentageSpent = Math.round((project.expenditure / project.totalBudget) * 100);

  return (
    <div
      onClick={() => onClick(project.id)}
      className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group overflow-hidden relative"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {project.name}
            </h3>
            <span
              className={`inline-block px-3 py-1 mt-2.5 text-xs font-bold rounded-full border ${STATUS_COLORS[project.status]}`}
            >
              {project.status}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all flex-shrink-0 ml-2" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600 font-semibold uppercase tracking-wide">Budget Utilization</span>
            <span className={`font-bold text-white text-xs px-3 py-1.5 rounded-full ${
              percentageSpent > 90
                ? 'bg-red-500'
                : percentageSpent > 70
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}>
              {percentageSpent}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 shadow-sm ${
                percentageSpent > 90
                  ? 'bg-gradient-to-r from-red-400 to-red-600'
                  : percentageSpent > 70
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                  : 'bg-gradient-to-r from-emerald-400 to-emerald-600'
              }`}
              style={{ width: `${Math.min(percentageSpent, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 p-3.5 rounded-lg border border-gray-200 group-hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-gray-600 font-medium">Spent</p>
                <p className="font-bold text-gray-900">${(project.expenditure / 1000000).toFixed(2)}M</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600 font-medium">Budget</p>
              <p className="font-bold text-gray-900">${(project.totalBudget / 1000000).toFixed(2)}M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        
  );
};

export default ProjectCard;
