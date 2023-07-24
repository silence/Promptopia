import { PostWithUser } from "@types";
import PromptCard from "./PromptCard";

export const FeedServer = async () => {
  const deployedUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${deployedUrl}/api/prompt`, {
      next: {
        revalidate: 10,
      },
    });
    const posts: PostWithUser[] = await res.json();

    return (
      <div className="mt-16 prompt_layout">
        {posts.map((post) => (
          <PromptCard key={post._id} post={post} />
        ))}
      </div>
    );
  } catch (err) {
    console.log(err);
    return <div>(Server) Something went wrong</div>;
  }
};
