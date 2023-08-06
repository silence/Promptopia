// Models
import Prompt from "@models/prompt";
import User from "@models/user";

// Utils
import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";
import pino from "pino";

// export const fetchCache = "force-no-store";
// in api router only this config works, this config can disable all caching of `fetch` requests and always revalidating.
// ref: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectToDatabase();

    // store all the prompts in the database
    const originalPrompts = await Prompt.find();
    // store all the users in the database
    const originalUsers = await User.find();

    pino({ name: "prompt", level: "info" }).info({ originalPrompts });
    pino({ name: "prompt", level: "info" }).info({ originalUsers });

    const prompts = await Prompt.find({}).populate({
      path: "creator",
      model: User,
    });

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
