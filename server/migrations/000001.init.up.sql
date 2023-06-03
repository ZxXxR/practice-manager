CREATE TABLE IF NOT EXISTS "practice_directions" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "roles" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "access_level" INTEGER NOT NULL DEFAULT '0',
    "is_default" BOOLEAN NOT NULL DEFAULT '0'
);

CREATE TABLE IF NOT EXISTS "groups" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "practices" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NULL UNIQUE,
    "direction" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "type" VARCHAR(255) CHECK ("type" IN('education', 'production')) NOT NULL DEFAULT 'education',
    FOREIGN KEY("direction") REFERENCES "practice_directions"("id")
);

CREATE TABLE IF NOT EXISTS "persons" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "second_name" VARCHAR(255) NULL,
    "photo" VARCHAR(255) NULL,
    "phone_number" VARCHAR(255) NULL,
    "email" VARCHAR(255) NULL,
    "position" VARCHAR(255) NOT NULL CHECK ("type" IN('student', 'responsible', 'mentor', 'representative', 'admin')) NOT NULL DEFAULT 'student',
    "group_id" INTEGER NULL,
    "comment" TEXT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY("group_id") REFERENCES "groups"("id")
);

CREATE TABLE IF NOT EXISTS "enterprises" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "representative_id" INTEGER NOT NULL,
    "legal_form" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "ogrn" VARCHAR(255) NULL UNIQUE,
    "inn" VARCHAR(255) NULL UNIQUE,
    "phone_number" VARCHAR(255) NULL,
    "email" VARCHAR(255) NULL,
    "legal_address" VARCHAR(255) NULL,
    "comment" TEXT NULL,
    FOREIGN KEY("representative_id") REFERENCES "persons"("id")
);

CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "person_id" INTEGER NOT NULL,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "login" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL UNIQUE,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    FOREIGN KEY("person_id") REFERENCES "persons"("id")
);

CREATE TABLE IF NOT EXISTS "practice_reports" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "practice_id" INTEGER NOT NULL,
    "mentor_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "estimation" VARCHAR(255) CHECK ("estimation" IN('two', 'three', 'four', 'five', 'absent')) NOT NULL,
    "comment" TEXT NULL,
    FOREIGN KEY("student_id") REFERENCES "persons"("id"),
    FOREIGN KEY("practice_id") REFERENCES "practices"("id"),
    FOREIGN KEY("mentor_id") REFERENCES "persons"("id")
);

CREATE TABLE IF NOT EXISTS "role_assignments" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    CONSTRAINT "role_assignments_pkey" PRIMARY KEY ("user_id","role_id"),
    FOREIGN KEY("user_id") REFERENCES "users"("id"),
    FOREIGN KEY("role_id") REFERENCES "roles"("id")
);

CREATE TABLE IF NOT EXISTS "practice_assignments" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "practice_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "responsible_id" INTEGER NOT NULL,
    "mentor_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "contract_number" VARCHAR(255) NOT NULL,
    UNIQUE("practice_id", "student_id"),
    FOREIGN KEY("enterprise_id") REFERENCES "enterprises"("id"),
    FOREIGN KEY("student_id") REFERENCES "persons"("id"),
    FOREIGN KEY("mentor_id") REFERENCES "persons"("id"),
    FOREIGN KEY("practice_id") REFERENCES "practices"("id"),
    FOREIGN KEY("responsible_id") REFERENCES "persons"("id")
);