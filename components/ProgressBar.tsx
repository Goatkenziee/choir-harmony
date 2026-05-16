'use client';

interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'large';
}

export default function ProgressBar({
  completed,
  total,
  label,
  showPercentage = true,
  variant = 'default',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const isLarge = variant === 'large';

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className={`font-medium ${isLarge ? 'text-lg' : 'text-sm'} text-gray-700`}>
            {label}
          </span>
          {showPercentage && (
            <span className={`font-bold ${isLarge ? 'text-lg' : 'text-sm'} text-choir-purple`}>
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${isLarge ? 'h-4' : 'h-2'}`}>
        <div
          className="bg-gradient-to-r from-choir-purple via-choir-pink to-choir-blue h-full progress-fill rounded-full flex items-center justify-center transition-all duration-500"
          style={{ width: `${percentage}%` }}
        >
          {isLarge && percentage > 10 && (
            <span className="text-white text-xs font-bold">{completed}/{total}</span>
          )}
        </div>
      </div>

      {isLarge && !label && (
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{completed} of {total}</span>
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  );
}
