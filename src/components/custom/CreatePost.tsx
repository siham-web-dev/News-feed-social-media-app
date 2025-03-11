import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

const CreatePost = () => {
  return (
    <button className=" flex gap-2 lg:w-full justify-start items-center text-[16px] hover:text-black hover:font-medium transition-all">
      <IoAddCircleOutline size={20} />
      <p className="hidden lg:block">Create post</p>
    </button>
  );
};

export default CreatePost;
