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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing {domain}</h2>
          <p className="text-gray-600">Please wait while we test your AI visibility...</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            
            return (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive ? 'bg-blue-50 border border-blue-200' : 
                  isCompleted ? 'bg-green-50 border border-green-200' : 
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  isActive ? 'bg-blue-500 text-white' :
                  isCompleted ? 'bg-green-500 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-sm font-medium ${
                  isActive ? 'text-blue-700' :
                  isCompleted ? 'text-green-700' :
                  'text-gray-500'
                }`}>
                  {step.label}
                </span>
                {isActive && (
                  <div className="ml-auto">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                  </div>
                )}
                {isCompleted && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Bot className="w-4 h-4" />
            <span>Testing across ChatGPT, Claude, and Gemini</span>
          </div>
          <p>Initial results will be ready in 60 seconds</p>
        </div>
      </div>
    </div>
  );
}