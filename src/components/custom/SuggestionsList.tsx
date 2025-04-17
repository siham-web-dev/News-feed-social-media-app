/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UsersList from "./UsersList";
import { getUsersSugesstions } from "@/actions/network.actions";

const SuggestionsList = async () => {
  const sugesstions = await getUsersSugesstions();
  return (
    <div className="flex sm:flex-col gap-3 sm:max-h-[400px] overflow-x-auto md:overflow-x-auto  md:overflow-y-auto">
      {sugesstions ? (
        sugesstions.map((s: any) => (
          <div key={s.users.id}>
            <UsersList
              id={s.users.id}
              avatarUrl={s.profiles.avatarUrl}
              displayName={s.profiles.displayName}
              username={s.users.username}
            />
          </div>
        ))
      ) : (
        <p>No Users to follow</p>
      )}
    </div>
  );
};

export default SuggestionsList;
