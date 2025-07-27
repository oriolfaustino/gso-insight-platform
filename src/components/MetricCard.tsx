import { useState, useEffect } from 'react';
import { Lock, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { MetricResult } from '@/lib/mockData';

interface MetricCardProps {
  title: string;
  subtitle: string;
  metric: MetricResult;
  isLocked: boolean;
  onUnlock?: () => void;
}

export function MetricCard({ title, subtitle, metric, isLocked, onUnlock }: MetricCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'poor': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'excellent': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-red-600';
    if (score < 50) return 'text-orange-600';
    if (score < 70) return 'text-yellow-600';
    if (score < 85) return 'text-green-600';
    return 'text-emerald-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!mounted) {
    return <div className="bg-white rounded-lg shadow-md p-6 border h-64 animate-pulse"></div>;
  }

  if (isLocked) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border relative overflow-hidden">
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
            <p className="text-gray-600 font-medium mb-4">Unlock Full Analysis</p>
            <button 
              onClick={onUnlock}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Get Complete Report
            </button>
          </div>
        </div>
        
        {/* Blurred content behind */}
        <div className="filter blur-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold text-gray-900">{title}</h4>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            <div className="text-2xl font-bold text-gray-400">--</div>
          </div>
          <div className="h-20 bg-gray-100 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            {getTrendIcon(metric.trend)}
          </div>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(metric.score)}`}>
            {metric.score}
          </div>
          <div className="text-sm text-gray-500">/100</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            metric.score < 30 ? 'bg-red-500' :
            metric.score < 50 ? 'bg-orange-500' :
            metric.score < 70 ? 'bg-yellow-500' :
            metric.score < 85 ? 'bg-green-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${metric.score}%` }}
        />
      </div>
      
      {/* Status badge */}
      <div className="mb-4">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(metric.status)}`}>
          {metric.status.toUpperCase()}
        </span>
      </div>
      
      {/* Key insights */}
      <div className="space-y-3">
        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
            <Info className="w-4 h-4" />
            Key Insights
          </h5>
          <div className="space-y-1">
            {metric.insights.slice(0, 2).map((insight, index) => (
              <p key={index} className="text-xs text-gray-600 leading-relaxed">
                • {insight}
              </p>
            ))}
          </div>
        </div>
        
        {metric.competitorComparison && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              <span className="font-medium">Competitive Position:</span> #{metric.competitorComparison.position} of {metric.competitorComparison.totalCompetitors}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Behind: {metric.competitorComparison.topCompetitors.slice(0, 2).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}