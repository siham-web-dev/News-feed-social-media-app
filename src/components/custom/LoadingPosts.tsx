import Image from "next/image";

const LoadingPosts = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Image
        src={"/loadingPosts.svg"}
        width={50}
        height={50}
        alt="loading posts ..."
      />
      <p>loading posts ...</p>
    </div>
  );
};

export default LoadingPosts;
