interface ArrowRightIconProps {
  width?: number;
  height?: number;
  className?: string;
}
export const ArrowRightIcon = ({
  width = 24,
  height = 24,
  className,
}: ArrowRightIconProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.4302 5.92993L20.5002 11.9999L14.4302 18.0699"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 12H20.33"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
