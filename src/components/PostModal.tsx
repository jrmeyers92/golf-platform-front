"use client";

import { createPost } from "@/actions/_createPost";
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

interface PostModalProps {
  buttonClasses?: string;
  buttonText: string;
}

const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

const formSchema = z.object({
  title: z.string().min(2).max(255),
  content: z.string().min(2).max(500),
  file: z.any(),
});

const PostModal = ({ buttonClasses, buttonText }: PostModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      file: "",
    },
  });

  const fileRef = form.register("file");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const checksum = await computeSHA256(values.file[0]);

    const signedUrlResult = await createPost(
      values.file[0].type,
      values.file[0].size,
      checksum,
      formData,
    );

    if (signedUrlResult.failure !== undefined) {
      setOpen(false);
      toast({
        title: "Failed to create post",
        description: "Failed to create post, please try again",
      });
      console.error("Failed to get signed url", signedUrlResult.failure);
      return;
    }

    const url = signedUrlResult?.success?.url;

    const response = await fetch(url, {
      method: "PUT",
      body: values.file[0],
      headers: {
        "Content-Type": values.file[0].type,
      },
    });

    if (!response.ok) {
      // handle error
      console.error("Failed to upload file", response.statusText);
      return;
    }

    setOpen(false);
    toast({
      title: "Success",
      description: "Created post successfully!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClasses} variant="primary">
          {buttonText}
        </Button>
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
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="shadcn"
                        {...fileRef}
                        accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
