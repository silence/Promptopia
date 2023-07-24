import { PostWithUser } from "@types";
import PromptCard from "./PromptCard";

export const FeedServer = async () => {
  const deployedUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

  const res = await fetch(`http://${deployedUrl}/api/prompt`, {
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
};
