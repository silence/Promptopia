// Components
import PromptCard from "./PromptCard";

// Types
import { PostWithUser } from "@types";

const Profile = ({
  name,
  description,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string;
  description: string;
  data: PostWithUser[];
  handleEdit?: (post: PostWithUser) => void;
  handleDelete?: (post: PostWithUser) => void;
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
