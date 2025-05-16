"use server";

import { z } from "zod";

import { getCurrentUser } from "@/services/clerk";
import { createProductSchema } from "./productSchema";
import { canCreateProduct, canDeleteProduct, canUpdateProduct } from "./products.permission";
import { destroyProduct, insertProduct, updateProduct } from "./db/productsTransactions";

export async function createProductAction(unsafeData: z.infer<typeof createProductSchema>) {

    const {success,data} = createProductSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canCreate = canCreateProduct(user)
    console.log(success,data,canCreate,user)

    if(!success || !canCreate ) return {error:true, message:"Course not created"}

    console.log('first')
     const product =  await insertProduct({...data})
     console.log(product)

     if (product == null) return {error:true, message:"Lesson not deleted"}

     return {error:false, message:"Lesson deleted"}
}



export async function updateProductAction(id:string,unsafeData: z.infer< typeof createProductSchema>){

    const {success,data} = createProductSchema.safeParse(unsafeData);

    const user = await getCurrentUser({allData:true})
    const canUpdate = canUpdateProduct(user)
    console.log(success,data,canUpdate)

    if(!success || !canUpdate ) return {error:true, message:"Product not updated"}

    console.log('first')

     const product =   await updateProduct(id,{...data});

     console.log('updated Product', product)
     if (product == null) return {error:true, message:"Lesson not updated"}

     return {error:false, message:"Product updated"}
}

export async function deleteProductAction(id:string) {


    const user = await getCurrentUser({allData:true})
    const canDelete = canDeleteProduct(user)
    // console.log(success,data,canCreate)

    if(!canDelete) return {error:true, message:"Course not created"}

    console.log('first')
    const section = await destroyProduct(id)
    if (section == null) return {error:true, message:"Lesson not deleted"}

    return {error:false, message:"Lesson deleted"}

}

// export async function updateLessonOrderAction(sectionIds:string[]){


//     const user = await getCurrentUser({allData:true})
//     const canUpdate = canUpdateLesson(user)
//     console.log(canUpdate)

//     if(sectionIds.length === 0 || !canUpdate ) return {error:true, message:"Course not updated"}

//     console.log('first')

//     const updatedLesson =  await updateLessonOrder(sectionIds);
    
//     if (updatedLesson == null) return {error:true, message:"Lesson not Updated"}

//     return {error:false, message:"Course updated"}
// }
