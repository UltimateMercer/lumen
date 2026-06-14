export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-[#eaeaea] bg-[#252525] dark:text-[#252525] dark:bg-[#eaeaea] p-2 mb-4 text-xl font-bold text-center uppercase">
      {children}
    </h2>
  );
};
