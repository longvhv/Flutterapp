import React from 'react';
import { Check } from 'lucide-react';

export interface VHVStep {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  content: React.ReactNode;
  isActive?: boolean;
  state?: 'indexed' | 'editing' | 'complete' | 'disabled' | 'error';
}

interface VHVStepperProps {
  steps: VHVStep[];
  currentStep?: number;
  onStepTapped?: (index: number) => void;
  type?: 'horizontal' | 'vertical';
  physics?: 'scrollable' | 'clamping';
  controlsBuilder?: (context: { currentStep: number; onStepContinue?: () => void; onStepCancel?: () => void }) => React.ReactNode;
  className?: string;
}

export const VHVStepper: React.FC<VHVStepperProps> = ({
  steps,
  currentStep = 0,
  onStepTapped,
  type = 'horizontal',
  physics,
  controlsBuilder,
  className = '',
}) => {
  const getStepColor = (index: number, step: VHVStep) => {
    if (step.state === 'error') return 'bg-red-500';
    if (step.state === 'complete' || index < currentStep) return 'bg-green-500';
    if (index === currentStep) return 'bg-blue-500';
    return 'bg-gray-300 dark:bg-gray-600';
  };

  const getStepIcon = (index: number, step: VHVStep) => {
    if (step.state === 'complete' || index < currentStep) {
      return <Check size={16} className="text-white" />;
    }
    return <span className="text-white text-sm">{index + 1}</span>;
  };

  if (type === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                onClick={() => onStepTapped?.(index)}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${getStepColor(index, step)}
                  ${onStepTapped ? 'cursor-pointer' : ''}
                `}
              >
                {getStepIcon(index, step)}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-600 my-2" />
              )}
            </div>
            
            <div className="flex-1 pb-8">
              <div className="font-medium mb-1">{step.title}</div>
              {step.subtitle && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{step.subtitle}</div>
              )}
              {index === currentStep && (
                <div className="mt-4">{step.content}</div>
              )}
            </div>
          </div>
        ))}
        
        {controlsBuilder && (
          <div className="mt-4">
            {controlsBuilder({ currentStep })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                onClick={() => onStepTapped?.(index)}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${getStepColor(index, step)}
                  ${onStepTapped ? 'cursor-pointer' : ''}
                `}
              >
                {getStepIcon(index, step)}
              </div>
              <div className="mt-2 text-sm font-medium text-center max-w-[100px]">
                {step.title}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-8">
        {steps[currentStep]?.content}
      </div>
      
      {controlsBuilder && (
        <div className="mt-4">
          {controlsBuilder({ currentStep })}
        </div>
      )}
    </div>
  );
};
