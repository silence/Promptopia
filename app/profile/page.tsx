"use client";

// Hooks
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Components
import Profile from "@components/Profile";

// Types
import { PostWithUser } from "@types";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [posts, setPosts] = useState<PostWithUser[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleEdit = (post: PostWithUser) => {
    router.push(`/update-prompt?id=${post._id}`);
    return;
  };

  const handleDelete = async (post: PostWithUser) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPosts(posts.filter((p) => p._id !== post._id));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    status === "authenticated" && (
      <Profile
        name="My"
        description="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    )
  );
};

export default MyProfile;
