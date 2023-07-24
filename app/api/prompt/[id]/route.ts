// Models
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Prompt from "@models/prompt";

// Utils
import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// GET (read)
export const GET = async (
  _res: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return NextResponse.json("Prompt not found", { status: 404 });
    }

    return NextResponse.json(prompt, { status: 200 });
  } catch (err) {
    console.log("err: ", err);
    if (err instanceof Error) {
      return NextResponse.json(
        { status: "Failed to fetch prompt", message: err.message },
        { status: 400 }
      );
    }
  }
};

// PATCH (update)
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  if (!prompt || !tag) {
    return NextResponse.json("Please provide a prompt and tag", {
      status: 400,
    });
  }
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return NextResponse.json("Prompt not found", { status: 404 });
    }

    if (existingPrompt.creator.toString() !== session?.user.id) {
      return NextResponse.json("You are not authorized to edit this prompt", {
        status: 401,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return NextResponse.json(existingPrompt, { status: 200 });
  } catch (err) {
    console.log("err: ", err);
    if (err instanceof Error) {
      return NextResponse.json(
        { status: "Failed to update prompt", message: err.message },
        { status: 400 }
      );
    }
  }
};

// DELETE (delete)
export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return NextResponse.json("Prompt not found", { status: 404 });
    }

    if (existingPrompt.creator.toString() !== session?.user.id) {
      return NextResponse.json("You are not authorized to delete this prompt", {
        status: 401,
      });
    }
    await Prompt.findByIdAndDelete(params.id);

    return NextResponse.json("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    console.log("err: ", err);
    if (err instanceof Error) {
      return NextResponse.json(
        { status: "Failed to delete prompt", message: err.message },
        { status: 400 }
      );
    }
  }
};
