import { useState, useEffect, useMemo } from 'react';
import { Search, Bot, BarChart3, Zap } from 'lucide-react';

interface LoadingAnimationProps {
  domain: string;
}

export function LoadingAnimation({ domain }: LoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = useMemo(() => [
    { icon: Search, label: 'Crawling website content', duration: 800 },
    { icon: Bot, label: 'Testing AI model responses', duration: 1000 },
    { icon: BarChart3, label: 'Analyzing competitor visibility', duration: 700 },
    { icon: Zap, label: 'Calculating GSO metrics', duration: 500 }
  ], []);

  useEffect(() => {
    let totalTime = 0;
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);

    const interval = setInterval(() => {
      totalTime += 50;
      const newProgress = Math.min((totalTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step
      let cumulativeTime = 0;
      for (let i = 0; i < steps.length; i++) {
        cumulativeTime += steps[i].duration;
        if (totalTime <= cumulativeTime) {
          setCurrentStep(i);
          break;
        }
      }

      if (totalTime >= totalDuration) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full mx-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 mb-6">
            <Bot className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">AI Analysis in Progress</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Analyzing {domain}</h2>
          <p className="text-gray-600">Testing your website's visibility across AI systems</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full bg-gray-100 rounded-full h-1 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</span>
            <span className="text-gray-500 ml-1">complete</span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            
            return (
              <div 
                key={index}
                className="flex items-center gap-4 py-3 transition-all"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-blue-600 text-white' :
                  isCompleted ? 'bg-green-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`font-medium ${
                  isActive ? 'text-gray-900' :
                  isCompleted ? 'text-gray-700' :
                  'text-gray-500'
                }`}>
                  {step.label}
                </span>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Testing across ChatGPT, Claude, and Gemini
          </p>
        </div>
      </div>
    </div>
  );
}