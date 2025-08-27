export const Preloader = ({
  width = 16,
  height = 16,
  border = 2,
}: {
  width?: number;
  height?: number;
  border?: number;
}) => {
  return (
    <span
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderWidth: `${border}px`,
      }}
      className="inline-block animate-spin rounded-full border-current !border-b-transparent"
    ></span>
  );
};
