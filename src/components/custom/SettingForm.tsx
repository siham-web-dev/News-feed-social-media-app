const SettingForm = ({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div id={id} className="bg-white p-4 rounded-xl flex flex-col gap-5">
      <h1 className="text-xl font-semibold">{title}</h1>
      {children}
    </div>
  );
};

export default SettingForm;
