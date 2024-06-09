import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import Post from "./Post";

const getPosts = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found.");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId!,
    },
  });

  if (!user) {
    throw new Error("User not found in database.");
  }

  const posts = await db.post.findMany({
    where: {
      authorId: {
        not: user.id,
      },
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return posts;
};

const AllPosts = async () => {
  const posts = await getPosts();

  if (!posts || posts.length === 0) {
    return <p>Error: There was an issue retrieving posts</p>;
  }

  return (
    <div>
      <h2>Others Posts</h2>
      <div className="flex">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
