// Models
import Prompt from "@models/prompt";

// Utils
import { connectToDatabase } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _res: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return NextResponse.json(prompts, { status: 200 });
  } catch (err) {
    console.log("err: ", err);
    if (err instanceof Error) {
      return NextResponse.json(
        { status: "Failed to fetch all prompts", message: err.message },
        { status: 400 }
      );
    }
  }
};
