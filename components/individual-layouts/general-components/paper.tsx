export const Paper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="border dark:border-[#eaeaea] border-[#252525] bg-[#eaeaea] dark:bg-[#252525] p-6">
      {children}
    </div>
  );
};
