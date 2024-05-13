"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { completeOnboarding } from "../_actions";

const OnboardingForm = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div>Loading</div>;
  }

  const formSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: "First name must be more than two characters" })
      .max(255, { message: "First name must be less than 255 characters" }),
    lastName: z.string().min(3).max(255),
    email: z.string().email(),
    handicap: z.number().min(-36).max(36).optional(),
    birthYear: z.number().min(1900).max(2021).optional(),
    birthMonth: z.number().min(1).max(12).optional(),
    birthDay: z.number().min(1).max(31).optional(),
    gender: z.enum(["male", "female", "nonBinary"]).optional(),
    clerkId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      handicap: undefined,
      birthYear: undefined,
      birthMonth: undefined,
      birthDay: undefined,
      gender: undefined,
      clerkId: user?.id || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const res = await completeOnboarding(formData);
    if (res?.message) {
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      // setError(res?.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-0 flex flex-col sm:flex-row sm:gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="handicap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handicap</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Handicap"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:flex sm:flex-row sm:justify-between">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nonBinary" />
                      </FormControl>
                      <FormLabel className="font-normal">Non-binary</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="max-w-1/2">
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Birth Year"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Month</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Birth Month"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Day</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Birth Day"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* <input type="hidden" name="clerkId" value={user.id} /> */}

        <FormField
          control={form.control}
          name="clerkId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" disabled />
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
  );
};

export default OnboardingForm;
