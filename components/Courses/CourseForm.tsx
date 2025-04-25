"use client";

import { createCourseSchema } from "@/features/Course/Schemal/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import RequiredLabelIcon from "../RequiredLabelIcon";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createCourseAction } from "@/features/Course/action/course.action";
import { toast } from "sonner";

const CourseForm = () => {
  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values : z.infer<typeof createCourseSchema>) => {
     const data = await createCourseAction(values)
     toast.error(data.message)
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          name="name"
          control={form.control}
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>
                <RequiredLabelIcon />
                Name
              </FormLabel>
              <FormControl {...field} className="bg-gray-100">
                <Input />
              </FormControl>
              <FormMessage />

            </FormItem>
          )}
        />
         <FormField
          name="description"
          control={form.control}
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>
                <RequiredLabelIcon />
                Description
              </FormLabel>
              <FormControl {...field} className="bg-gray-100">
                <Textarea className="min-h-20 resize-none" />
              </FormControl>
              <FormMessage />

            </FormItem>
          )}
        />
        <div className="self-end">
            <Button type="submit" disabled= {form.formState.isSubmitting}>Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseForm;
