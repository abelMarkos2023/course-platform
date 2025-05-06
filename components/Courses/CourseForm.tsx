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
import { createCourseAction, updateCourseAction } from "@/features/Course/action/course.action";
import { toast } from "sonner";

const CourseForm = ({course}:{course?:{
  id:string,
  name:string,
  description: string
}}) => {
  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: course ?? {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values : z.infer<typeof createCourseSchema>) => {

    const action = course != null ? updateCourseAction.bind(null,course.id) : createCourseAction
     const data = await action(values)
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
              <FormControl className="bg-gray-100">
                <Input  {...field}/>
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
              <FormControl  className="bg-gray-100">
                <Textarea {...field} className="min-h-20 resize-none" />
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
