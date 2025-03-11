import React from "react";

const TopTopics = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Top topics</h1>
      <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-x-hidden p-2">
        <p className="text-[14px]">#Typescript</p>
        <p className="text-[14px]">#Typescript</p>
        <p className="text-[14px]">#Typescript</p>
        <p className="text-[14px]">#Typescript</p>
        <p className="text-[14px]">#Typescript</p>
      </div>
    </div>
  );
};

export default TopTopics;
