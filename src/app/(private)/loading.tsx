import Image from "next/image";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen mx-auto">
      <Image src="/loading.svg" alt="loading" width={200} height={200} />
    </div>
  );
};

export default loading;
