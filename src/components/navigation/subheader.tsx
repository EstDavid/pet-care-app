export default async function Subheader({
  title,
  children
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full h-subheader absolute left-0 top-header-height bg-brand-bg-100 flex items-center justify-between p-2 px-4 ">
      {title && (
        <h2 className="text-xl font-bold text-brand-bg-500">{title}</h2>
      )}
      {children && <div className="w-auto h-full">{children}</div>}
    </div>
  );
}
