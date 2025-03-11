import React from "react";
import SuggestionsList from "./SuggestionsList";

const WhoToFollow = () => {
  return (
    <div className="flex flex-col gap-4 my-3 overflow-x-hidden">
      <h1 className="text-xl font-semibold">Who to follow</h1>
      <SuggestionsList />
    </div>
  );
};

export default WhoToFollow;
