
type Cache_Tag = 'products' | 'users' | 'courses' | 'userCourseAccess' | 'courseSections' | 'lessons';

export function getGlobalTag(tag:Cache_Tag){
    return `global:${tag}` as const;
}

export function getIdTag(tag:Cache_Tag,id:string){
    return `id:${id}-tag:${tag}`
}

export function getUserTag(tag:Cache_Tag,userId:string){
    return `id:${userId}-tag:${tag}`
}

export function getCourseTag(tag:Cache_Tag,courseId:string){
    return `id:${courseId}-tag:${tag}`
}
