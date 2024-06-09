import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Author {
  firstName: string;
  lastName: string;
}

interface PostProps {
  post: {
    id: number;
    title: string;
    file: string | null;
    content: string;
    author: Author;
    createdAt: Date;
    updatedAt: Date;
  };
}

const Post = ({ post }: PostProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
        <Image
          src={post.file || "/placeholder.png"}
          alt={post.title}
          width={200}
          height={200}
          className=""
        />
      </CardContent>
      <CardFooter>
        {post.author.firstName} {post.author.lastName}
      </CardFooter>
    </Card>
  );
};

export default Post;
