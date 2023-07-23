// Types
import { Post } from "@types";

// Models
import Prompt from "@models/prompt";
import { NextRequest, NextResponse } from "next/server";

// Utils
import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth/next";

// Constants
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  // If the user is not authenticated, return a 401
  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { prompt, tag } = (await req.json()) as Post;
  try {
    await connectToDatabase();
    const newPrompt = await Prompt.create({
      creator: session?.user.id,
      prompt,
      tag,
    });
    console.log("newPrompt: ", newPrompt);
    await newPrompt.save();

    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    console.log("error: ", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "Failed to create a new prompt", message: error.message },
        { status: 400 }
      );
    }
  }
};
