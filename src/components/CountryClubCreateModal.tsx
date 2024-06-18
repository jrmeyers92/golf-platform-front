"use client";

import { createCountryClub } from "@/actions/_createCountryClub";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";
import { States } from "@/lib/StatesArray";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormFieldInputComponent from "./FormFieldInputComponent";

interface CountryClubCreateModalProps {
  buttonClasses?: string;
  buttonText: string;
}

const formSchema = z.object({
  name: z.string().min(2).max(255),
  city: z.string().min(2).max(255),
  state: z.string().min(2).max(255),
  zipCode: z.number().min(10000).max(99999),
  address: z.string().min(2).max(255),
  phoneNumber: z.string().min(10).max(10),
});

const CountryClubCreateModal = ({
  buttonClasses,
  buttonText,
}: CountryClubCreateModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      state: "",
      zipCode: undefined,
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response = await createCountryClub(formData);

    if ("failure" in response) {
      console.error(response.failure);
      setOpen(false);
      toast({
        title: "failure",
        description: response.failure,
      });
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
            <FormFieldInputComponent
              control={form.control}
              name="name"
              placeholder="Name"
              required={true}
            />
            <FormFieldInputComponent
              control={form.control}
              name="address"
              placeholder="Address"
              type="string"
              required={true}
            />
            <FormFieldInputComponent
              control={form.control}
              name="city"
              placeholder="City"
              required={true}
            />
            <FormFieldInputComponent
              control={form.control}
              name="state"
              placeholder="Select your state"
              type="select"
              selectOptions={States}
              required={true}
            />
            <FormFieldInputComponent
              control={form.control}
              name="zipCode"
              placeholder="Zip Code"
              type="number"
              required={true}
            />
            <FormFieldInputComponent
              control={form.control}
              name="phoneNumber"
              placeholder="Phone Number"
              type="string"
              required={false}
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

export default CountryClubCreateModal;
