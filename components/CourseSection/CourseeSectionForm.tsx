"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import RequiredLabelIcon from "../RequiredLabelIcon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createCourseSectionSchema } from "@/features/courseSection/courseSectionSchema";
import  {courseSectionStatus, courseSectionType } from "@/drizzle/schema/courseSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createCourseSectionAction, updateCourseSectionAction } from "@/features/courseSection/action/course.action";

const CourseSectionForm = ({courseId,section,onSuccess}:{courseId: string,section?:{
  id:string,
  name:string,
  status: courseSectionType
}, onSuccess?: () => void}) => {
  const form = useForm<z.infer<typeof createCourseSectionSchema>>({
    resolver: zodResolver(createCourseSectionSchema),
    defaultValues: section ?? {
      name: "",
      status: "public",
    },
  });

  const onSubmit = async (values : z.infer<typeof createCourseSectionSchema>) => {

    const action = section != null ? updateCourseSectionAction.bind(null,section.id) : createCourseSectionAction.bind(null,courseId)
     const data = await action(values)
     if(!data.error) onSuccess?.()
     toast.error(data.message)
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 gap-5">
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
          name="status"
          control={form.control}
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>
                Status
              </FormLabel>
                
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                        {
                            courseSectionStatus.map(status => <SelectItem className="w-full" key={status} value={status}>
                                {status}
                                </SelectItem>
                                )
                        }
                    </SelectContent>
                    </Select>

               
              <FormMessage />

            </FormItem>
          )}
        />
        </div> 
        <div className="self-end">
            <Button type="submit" disabled= {form.formState.isSubmitting}>Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseSectionForm;
