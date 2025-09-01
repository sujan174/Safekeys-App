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

// We define an enum for the field types to ensure type safety and provide clear options.
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PASSWORD = "password",
}

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>; // Using FieldPath provides type-checking and autocomplete for field names.
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  iconSrc?: string; // Kept for future use if you want to add icons
  iconAlt?: string; // Kept for future use
}

/**
 * A reusable and type-safe form field component for shadcn/ui and react-hook-form.
 * It dynamically renders the correct input type based on the `fieldType` prop.
 */
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
        <FormItem className="flex-1">
          {label && <FormLabel>{label}</FormLabel>}

          <div className="flex w-full flex-col">
            <FormControl>
              <>
                {(() => {
                  switch (fieldType) {
                    case FormFieldType.PASSWORD:
                      return (
                        <Input
                          type="password"
                          placeholder={placeholder}
                          {...field}
                        />
                      );
                    case FormFieldType.INPUT:
                    default:
                      return (
                        <Input
                          type="text"
                          placeholder={placeholder}
                          {...field}
                        />
                      );
                  }
                })()}
              </>
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage className="text-red-500" />
          </div>
        </FormItem>
      )}
    />
  );
};
