import { useEffect, useRef, useState } from 'react';
import { MonadIcon } from './MonadIcon';

interface FloatInputProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FloatInput = ({ label, value, onChange, id }: FloatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleWheel = (e: WheelEvent) => e.preventDefault();

    input.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      input.removeEventListener('wheel', handleWheel);
    };
  }, []);
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="relative z-0 flex h-12 w-full rounded-[2px] bg-[#35373a] px-2"
    >
      <div className="flex min-h-12 w-full min-w-[25px] items-center pt-5">
        {(isFocused || value !== '') && (
          <span className="mr-0.5">
            <MonadIcon />
          </span>
        )}
        <input
          type="number"
          id={id}
          min={0}
          placeholder=" "
          className="peer [MozAppearance:textfield] h-auto w-full appearance-none bg-[#35373a] text-white caret-[#836EF9] outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          ref={inputRef}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <label
          htmlFor={id}
          className="absolute left-2 text-base font-medium text-gray-400 transition-all peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#836EF9]"
        >
          {label}
        </label>
      </div>
    </div>
  );
};
