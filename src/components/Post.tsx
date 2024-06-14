import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

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
    <Card className="">
      <CardHeader>
        <span>
          {post.author.firstName} {post.author.lastName}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2">{post.title}</CardTitle>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Image
          src={post.file || "/placeholder.png"}
          alt={post.title}
          width={200}
          height={200}
          className="aspect-square w-full object-cover"
        />
        <div className="flex w-full gap-2">
          <Button className="w-1/2" variant={"outline"}>
            Like <ThumbsUp className="ml-2" />
          </Button>
          <Button className="w-1/2" variant={"outline"}>
            Comment <MessageCircle className="ml-2" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
