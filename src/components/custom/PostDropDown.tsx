import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import EditPost from "./EditPost";
import DeletePostDialog from "./DeletePostDialog";

export default function PostDropdownMenu({
  uuid,
  content,
}: {
  uuid: string;
  content: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="flex flex-col gap-1 items-start p-1 text-[14px]">
          <DropdownMenuItem asChild>
            <EditPost uuid={uuid} content={content} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:font-semibold">
            <DeletePostDialog uuid={uuid} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
