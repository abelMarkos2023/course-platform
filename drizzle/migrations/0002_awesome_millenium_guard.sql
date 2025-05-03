ALTER TABLE "lesson" DROP CONSTRAINT "lesson_courseId_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "lesson" DROP COLUMN "courseId";