import CourseForm from "@/components/Courses/CourseForm";
import CourseSectionDialog from "@/components/CourseSection/CourseSectionDialog";
import SortableSectionList from "@/components/CourseSection/SortableSectionList";
import LessonDialog from "@/components/Lessons/LessonDialog";
import SortableLessonList from "@/components/Lessons/SortableLessonList";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/drizzle/db";
import { courseTable } from "@/drizzle/schema/cources";
import { courseSectionTable } from "@/drizzle/schema/courseSection";
import { lessonTable } from "@/drizzle/schema/lesson";
import { getCourseIdTag } from "@/features/Course/coursesCache";
import { getCourseSectionsIdTag } from "@/features/courseSection/db/cache";
import { getLessonsIdTag } from "@/features/lessons/db/cache";
import { cn } from "@/lib/utils";
import { asc, eq } from "drizzle-orm";
import { EyeClosedIcon, PlusIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";
import React from "react";

const EditCoursePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const course = await getCourseById(id);

  if (course == null) return notFound();
  return (
    <div className="container py-8">
      <PageHeader title={course.name} />

      <Tabs defaultValue="lessons" className="max-w-4xl mx-auto">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="lessons">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Sections</CardTitle>
              <CourseSectionDialog courseId={course.id}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon /> Nes Section
                  </Button>
                </DialogTrigger>
              </CourseSectionDialog>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <SortableSectionList
                sections={course.courseSections}
                courseId={course.id}
              />
            </CardContent>
          </Card>
          <hr className="my-2" />
          {course.courseSections.map((section) => (
            <Card key={section.id}>
              <CardHeader className="flex items-center justify-between">
                <CardTitle
                  className={cn(
                    "flex items-center gap-2",
                    section.status === "private" && "text-muted-foreground"
                  )}
                >
                  {section.status === "private" && <EyeClosedIcon />}{" "}
                  {section.name}
                </CardTitle>
                <LessonDialog
                  defaultSectionId={section.id}
                  sections={course.courseSections}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <PlusIcon /> Nes Lesson
                    </Button>
                  </DialogTrigger>
                </LessonDialog>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <SortableLessonList
                  lessons={section.lessons}
                  sections={course.courseSections}
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CourseForm course={course}></CourseForm>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

async function getCourseById(id: string) {
  "use cache";
  cacheTag(getCourseIdTag(id), getCourseSectionsIdTag(id), getLessonsIdTag(id));

  return db.query.courseTable.findFirst({
    columns: { name: true, id: true, description: true },
    where: eq(courseTable.id, id),
    with: {
      courseSections: {
        orderBy: asc(courseSectionTable.order),
        columns: { id: true, name: true, status: true },
        with: {
          lessons: {
            orderBy: asc(lessonTable.order),
            columns: {
              id: true,
              name: true,
              status: true,
              sectionId: true,
              youtubeVideoId: true,
              description: true,
            },
          },
        },
      },
    },
  });
}
export default EditCoursePage;
