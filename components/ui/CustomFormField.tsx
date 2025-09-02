"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PASSWORD = "password",
}

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  description?: string;
}

export const CustomFormField = <T extends FieldValues>({
  control,
  name,
  fieldType,
  label,
  placeholder,
  description,
}: CustomFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {/* Simplified the rendering logic to avoid potential issues */}
            <Input
              type={fieldType === FormFieldType.PASSWORD ? "password" : "text"}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

