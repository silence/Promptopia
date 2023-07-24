"use client";

// Hooks
import { useState, useEffect } from "react";

// Components
import Profile from "@components/Profile";

// Types
import { PostWithUser } from "@types";

const MyProfile = ({ params }: { params: { id: string } }) => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Profile
      name={posts[0]?.creator.username || "User"}
      description={`Welcome to ${posts[0]?.creator.username} profile page`}
      data={posts}
    />
  );
};

export default MyProfile;
