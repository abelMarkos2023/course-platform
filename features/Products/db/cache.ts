import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache"

export function getProductsGlobalTag(){
    return getGlobalTag('products')
}

export function getProductIdTag(id:string){
    return getIdTag('lessons',id)
}



export function revalidateProductsCache({id}:{id:string}){
    revalidateTag(getProductIdTag(id));
    revalidateTag(getProductsGlobalTag());
}