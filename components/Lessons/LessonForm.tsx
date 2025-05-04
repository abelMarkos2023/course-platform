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
import  { courseSectionType } from "@/drizzle/schema/courseSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { lessonStatuses, lessonStatusType } from "@/drizzle/schema/lesson";
import { createLessonSchema } from "@/features/lessons/lessonSchema";
import { Textarea } from "../ui/textarea";
import { createLessonAction, updateLessonAction } from "@/features/lessons/action/lesson.action";

const LessonForm = ({defaultSectionId,lesson,sections,onSuccess}:{
  defaultSectionId: string,
  sections:{id:string,name:string,status: courseSectionType}[], 
  lesson: {id:string,name:string,status:lessonStatusType,description:string|null,youtubeVideoId:string|null,sectionId:string}|undefined,
  onSuccess?: () => void
}) => {
  const form = useForm<z.infer<typeof createLessonSchema>>({
    resolver: zodResolver(createLessonSchema),
    defaultValues:  {
      name: lesson?.name ?? "",
      status: lesson?.status ?? "public",
      youtubeVideoId: lesson?.youtubeVideoId ?? "",
      description: lesson?.description ?? null,
      sectionId: lesson?.sectionId ?? defaultSectionId ?? sections[0]?.id ?? "",
    },
  });

  const onSubmit = async (values : z.infer<typeof createLessonSchema>) => {
    
    const action = lesson != null ? updateLessonAction.bind(null,lesson.id) : createLessonAction
     const data = await action(values)
     console.log(data)
     if(!data.error) {
      onSuccess?.()
      toast.success(data.message)
      return
     }
     toast.error(data.message)
  };

  // const youtubeVideoId = form.watch("youtubeVideoId");
  // console.log(youtubeVideoId)
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit,(errors) => console.log("Validation errors:", errors))}
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
              <FormControl className="bg-gray-100">
                <Input  {...field}/>
              </FormControl>
              <FormMessage />

            </FormItem>
          )}
        />
        <FormField
          name="youtubeVideoId"
          control={form.control}
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>
                <RequiredLabelIcon />
                Youtube Video ID
              </FormLabel>
              <FormControl  className="bg-gray-100">
                <Input {...field}/>
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
                            lessonStatuses.map(status => <SelectItem className="w-full" key={status} value={status}>
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
        <FormField
          name="sectionId"
          control={form.control}
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>
                Section
              </FormLabel>
                
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                        {
                            sections.map(section => <SelectItem className="w-full" key={section.id} value={section.id}>
                                {section.name}
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
        <FormField
          name="description"
          control={form.control}
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>
  
                Description
              </FormLabel>
              <FormControl className="bg-gray-100">
                <Textarea  {...field}  className="min-h-20 resize-none" value={field.value ?? ''}/>
              </FormControl>
              <FormMessage />

            </FormItem>
          )}
        />
        <div className="self-end">
            <Button type="submit" className="bg-blue-600 font-semibold cursor-pointer"  disabled= {form.formState.isSubmitting}>Save Lesson</Button>
        </div>
      </form>
    </Form>
  );
};

export default LessonForm;
