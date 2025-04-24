import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import AuthService from "@/services/auth.service";
import dayjs from "dayjs";
import UserService from "@/services/user.service";
import { NEXT_PUBLIC_BASE_URL } from "@/lib/constants";

interface FileData {
  name: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

const userService = new UserService();

export const POST = async (req: Request) => {
  const formData: FormData = await req.formData();

  try {
    const { user } = await AuthService.validateSession();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const file: FileData = formData.get("image") as FileData;
    if (!file) {
      return NextResponse.json(
        { error: "No image uploaded." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const now = dayjs().format("YYYY_MM_DD_HH_mm_ss");
    const filename = `avatar_${user?.id}_${now}.${file.name.split(".").pop()}`;

    const relativePath = `public/upload/avatars/${filename}`;

    const url = path.join(process.cwd(), relativePath);

    await writeFile(url, buffer);

    const avatarUrl = `${NEXT_PUBLIC_BASE_URL}/${relativePath}`;

    console.log("avatarUrl  ", avatarUrl);

    await userService.updateAvatarUrl(user?.id as string, avatarUrl);

    return NextResponse.json({ success: "Your avatar was updated" });
  } catch (error) {
    console.log("Error occured ", error);

    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
