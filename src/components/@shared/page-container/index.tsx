const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 pb-12 flex justify-center items-center">
      <div className="max-w-7xl w-full">{children}</div>
    </div>
  );
};

export { PageContainer };
