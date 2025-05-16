"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import RequiredLabelIcon from "../RequiredLabelIcon";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ProductStatus, productStatuses } from "@/drizzle/schema/product";
import { createProductSchema } from "@/features/Products/productSchema";
import {
  createProductAction,
  updateProductAction,
} from "@/features/Products/products.action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MultiSelect } from "../ui/Custome/MultiSelect";

const ProductForm = ({
  courses,
  product,
}: {
  courses: {
    id: string;
    name: string;
  }[];
  product?: {
    id: string;
    name: string;
    description: string;
    priceInDollars: number;
    coursesCount?: number;
    customersCount?: number;
    status: ProductStatus;
    imageUrl: string;
    courseIds: string[];
  };
}) => {
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: product ?? {
      name: "",
      description: "",
      priceInDollars: 0,
      imageUrl: "",
      status: "private",
      courseIds: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    const action =
      product != null
        ? updateProductAction.bind(null, product.id)
        : createProductAction;
    const data = await action(values);
    toast.error(data.message);
  };

  console.log(form.getValues('courseIds'))
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabelIcon />
                Name
              </FormLabel>
              <FormControl  className="bg-gray-100">
                <Input {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="priceInDollars"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabelIcon />
                Price In Dollars
              </FormLabel>
              <FormControl  className="bg-gray-100">
                <Input {...field} type="number" step={1} min={0} onChange={e => field.onChange(e.target.valueAsNumber)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="imageUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabelIcon />
                Image URL
              </FormLabel>
              <FormControl  className="bg-gray-100">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          
       
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
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

<FormField
          name="status"
          control={form.control}
          
          render={({ field }) => (
            <FormItem  >
              <FormLabel>
                Status
              </FormLabel>
                
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl className=" w-full shadow rounded">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent className="">
                        {
                            productStatuses.map(status => <SelectItem className="w-full" key={status} value={status}>
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

        <FormField
          name="courseIds"
          control={form.control}
          
          render={({ field }) => (
            <FormItem  >
              <FormLabel>
                Included Courses
              </FormLabel>
                
               
                <FormControl className=" w-full shadow rounded">
                   <MultiSelect 
                   options={courses}
                   searchPlaceHolder='Select Courses'
                   selectPlaceHolder='Search Courses'
                   getLabel={(option) => option.name}
                   getValue={(option) => option.id}
                   selectedValues={field.value}
                   onSelectedValuesChange={field.onChange}
                   /> 
                </FormControl>
                  
               
              <FormMessage />

            </FormItem>
          )}
          
        />
        <div className="self-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
