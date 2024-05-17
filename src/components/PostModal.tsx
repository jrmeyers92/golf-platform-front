"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createPost } from "@/actions/_post";

interface PostModalProps {
  buttonClasses?: string;
  buttonText: string;
}

const PostModal = ({ buttonClasses, buttonText }: PostModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // if (!isLoaded) {
  //   return <div>Loading</div>;
  // }

  const createPostSchema = z.object({
    title: z.string().min(2).max(255),
    content: z.string().min(2).max(500),
    file: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      file: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createPostSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const res = await createPost(formData);
    if (res.success) {
      setOpen(false);
      toast({
        title: "Post created",
        description: "Your post has been created successfully",
      });

      // clear form inputs
      form.reset();
    } else {
      console.log("form submission fialed", res.error);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClasses}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-between flex w-full flex-row items-center">
          <DialogTitle className="mr-auto">Create a post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Picture or Video</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Picture or Video"
                      type="file"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
