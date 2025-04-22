/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import CustomFormField from "./FormField";
import { Form } from "../ui/form";
import { useState } from "react";
import { searchUsers } from "@/actions/user.actions";
import UserItem from "./UserItem";
import { SearchUsersResult } from "@/lib/types/response";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { useSession } from "./SessionProvider";

const SearchForm = () => {
  const { user } = useSession();
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [users, setUsers] = useState<SearchUsersResult["users"]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: any) => {
    const search = values.search;

    setIsLoading(true);
    setUsers([]);

    const result: SearchUsersResult | any = await searchUsers(search, page);
    if (result.error) {
      console.error(result.error);
    } else {
      setUsers(result.users || []);
      setTotalPages(result.pageInfo.totalPages);
    }

    setIsLoading(false);
  };

  const onPreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
    onSubmit({ search: form.getValues("search") });
  };

  const onNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }

    onSubmit({ search: form.getValues("search") });
  };

  return (
    <>
      <div className="bg-white gap-3.5 flex items-center mx-auto w-[700px] p-4 rounded-lg shadow-sm relative">
        <FaSearch size={20} className="text-gray-500" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            action=""
            className="flex-1"
            method="get"
          >
            <CustomFormField
              type="text"
              control={form.control}
              placeholder="Search users and press enter"
              name={"search"}
            />
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-3.5">
        {users.length > 0
          ? users.map((u) => (
              <div
                key={u.id}
                className="w-full p-4 bg-white rounded-lg shadow-sm"
              >
                <UserItem
                  avatarUrl={u.profile?.avatarUrl || ""}
                  displayName={u.profile?.displayName || ""}
                  username={u.profile?.displayName || ""}
                  id={u.id}
                  isCurrentUser={user?.id === u.id}
                />
              </div>
            ))
          : !isLoading && (
              <p className="text-gray-500 text-center">No users found</p>
            )}
        {isLoading && <p>Loading...</p>}
        <div className="flex justify-between items-center absolute bottom-0 gap-4 mb-7 ">
          <Button
            disabled={isLoading || page < 2}
            onClick={onPreviousPage}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Previous
          </Button>
          <Button
            disabled={isLoading || page >= totalPages}
            onClick={onNextPage}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
