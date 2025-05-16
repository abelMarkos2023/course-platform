CREATE TYPE "public"."product_Statuses" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."course_SectionStatus" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TYPE "public"."lesson_Statuses" AS ENUM('public', 'private', 'preview');--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"imageUrl" text NOT NULL,
	"priceInDollars" integer NOT NULL,
	"status" "product_Statuses" DEFAULT 'private' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchase" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pricePaidInCents" integer NOT NULL,
	"productDetails" jsonb NOT NULL,
	"userId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"stripeSessionId" text NOT NULL,
	"refundedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "purchase_stripeSessionId_unique" UNIQUE("stripeSessionId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkUserId" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" "roles" DEFAULT 'user' NOT NULL,
	"imageUrl" text,
	"deletedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerkUserId_unique" UNIQUE("clerkUserId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "userCourseAccess" (
	"courseId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "userCourseAccess_courseId_userId_pk" PRIMARY KEY("courseId","userId")
);
--> statement-breakpoint
CREATE TABLE "courseProduct" (
	"courseId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "courseProduct_courseId_productId_pk" PRIMARY KEY("courseId","productId")
);
--> statement-breakpoint
CREATE TABLE "courseSection" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"courseId" uuid NOT NULL,
	"order" integer NOT NULL,
	"name" text NOT NULL,
	"status" "course_SectionStatus" DEFAULT 'private' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"youtubeVideoId" text,
	"order" integer NOT NULL,
	"status" "lesson_Statuses" DEFAULT 'private' NOT NULL,
	"sectionId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userLessonComplete" (
	"lessonId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "userLessonComplete_lessonId_userId_pk" PRIMARY KEY("lessonId","userId")
);
--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseAccess" ADD CONSTRAINT "userCourseAccess_courseId_courses_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseAccess" ADD CONSTRAINT "userCourseAccess_userId_products_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courseProduct" ADD CONSTRAINT "courseProduct_courseId_courses_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courseProduct" ADD CONSTRAINT "courseProduct_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courseSection" ADD CONSTRAINT "courseSection_courseId_courses_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_sectionId_courseSection_id_fk" FOREIGN KEY ("sectionId") REFERENCES "public"."courseSection"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userLessonComplete" ADD CONSTRAINT "userLessonComplete_lessonId_lesson_id_fk" FOREIGN KEY ("lessonId") REFERENCES "public"."lesson"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userLessonComplete" ADD CONSTRAINT "userLessonComplete_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;