// get posts my posts from db
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { Post } from "@prisma/client";

type PostType = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
};

async function getPosts() {
  const { userId } = auth();

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
      authorId: user.id,
    },
  });

  return posts;
}

const MyPosts = async () => {
  let posts: PostType[] = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error(error);
    return <p>Error: There was an issue retrieving posts</p>;
  }

  return (
    <section className="border p-4">
      <h2 className="mb-2 text-center text-2xl">My Posts</h2>
      {posts.length === 0 && (
        <p className="text-center">You don't have any posts yet.</p>
      )}

      <ul className="flex flex-col gap-4">
        {posts &&
          posts.map((post: PostType) => (
            <li key={post.id} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                </CardContent>
              </Card>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default MyPosts;
