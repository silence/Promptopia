"use client";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Components
import PromptCard from "./PromptCard";

// Types
import { PostWithUser } from "@types";

const Feed = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isServerRendered, setIsServerRendered] = useState(true);
  const originalPosts = useRef<PostWithUser[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
    setPosts(
      originalPosts.current.filter(
        (post) =>
          post.prompt.includes(e.target.value) ||
          post.tag.includes(e.target.value) ||
          post.creator.username.includes(e.target.value)
      )
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      originalPosts.current = data;
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <div className="mt-16 prompt_layout">
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {
              setSearchText(post.tag);
              setPosts(originalPosts.current.filter((p) => p.tag === post.tag));
            }}
            handleProfileClick={(id) => {
              router.push(`/profile/${id}`);
            }}
          />
        ))}
      </div>

      <button onClick={() => setIsServerRendered((prev) => !prev)}>
        Server render component test
      </button>

      {isServerRendered && children}
    </section>
  );
};

export default Feed;
