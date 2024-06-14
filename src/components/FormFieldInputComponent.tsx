"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormFieldInputComponent = ({
  control,
  name,
  placeholder,
  type = "text",
  selectOptions = [],
  required,
}: {
  control: any;
  name: string;
  placeholder: string;
  type?: string;
  selectOptions?: string[];
  required?: boolean;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
        <FormControl>
          {type === "select" ? (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              required={required}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(parseInt(e.target.value));
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormFieldInputComponent;
