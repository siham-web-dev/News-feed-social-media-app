"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { PostSchema } from "@/lib/validators/post.validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostDto } from "@/lib/dtos/post.dto";
import SubmitButton from "./SubmitButton";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "../ui/form";
import { IoAddCircleOutline } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";

export default function PostDialog({
  content,
  onSubmit,
  isPending,
  open,
  setOpen,
}: {
  content?: string | undefined;
  onSubmit: (values: PostDto) => Promise<void>;
  isPending: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<PostDto>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: content || "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {content ? (
          <button
            onClick={() => setOpen(true)}
            className="p-2 hover:font-semibold hover:cursor-pointer"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className=" flex gap-2 lg:w-full justify-start items-center text-[16px] hover:text-black hover:font-medium transition-all"
          >
            <IoAddCircleOutline size={20} />
            <span className="hidden lg:block">Create post</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{content ? "Edit post" : "Create post"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={"content"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      name="content"
                      placeholder="Hi whats up ..."
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <SubmitButton
                width="fit"
                disabled={isPending}
                text={isPending ? "Submitting..." : "Post"}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
