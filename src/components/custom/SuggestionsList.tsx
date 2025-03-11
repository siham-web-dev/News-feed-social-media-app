import React from "react";
import ProfileSuggestion from "./ProfileSuggestion";

const SuggestionsList = () => {
  return (
    <div className="flex sm:flex-col gap-3 sm:h-[400px] overflow-x-scroll md:overflow-x-auto  md:overflow-y-scroll">
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
      <ProfileSuggestion />
    </div>
  );
};

export default SuggestionsList;
