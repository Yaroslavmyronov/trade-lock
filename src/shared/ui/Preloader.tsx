export const Preloader = ({
  width = 16,
  height = 16,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <span
      style={{ width: `${width}px`, height: `${height}px` }}
      className="inline-block animate-spin rounded-full border-2 border-current !border-b-transparent"
    ></span>
  );
};
