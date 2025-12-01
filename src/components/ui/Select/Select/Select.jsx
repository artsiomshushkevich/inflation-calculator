import { forwardRef } from 'react';
import { cn } from '../../../../utils';

const baseSelectClasses =
  'flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

export const Select = forwardRef(
  (
    {
      className,
      selectClassName,
      children,
      placeholder,
      value,
      defaultValue,
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const controlled = value !== undefined;

    const selectProps = {
      ...(controlled
        ? { value: value ?? '' }
        : { defaultValue: defaultValue ?? (placeholder ? '' : undefined) }),
    };

    const handleChange = (event) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
    };

    return (
      <div className={cn('relative w-full', className)}>
        <select
          ref={ref}
          className={cn(baseSelectClasses, selectClassName)}
          onChange={handleChange}
          {...selectProps}
          {...props}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    );
  }
);

Select.displayName = 'Select';
