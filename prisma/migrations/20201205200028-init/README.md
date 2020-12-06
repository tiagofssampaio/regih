# Migration `20201205200028-init`

This migration has been generated by Tiago Sampaio at 12/5/2020, 8:00:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201128150236-init..20201205200028-init
--- datamodel.dml
+++ datamodel.dml
@@ -3,11 +3,21 @@
 }
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
+model User {
+  id        Int      @id @default(autoincrement())
+  name      String
+  email     String
+  password  String
+  createdAt DateTime @default(now()) @map("created_at")
+
+  @@map("user")
+}
+
 model Client {
   id        Int      @id @default(autoincrement())
   name      String
   vatId     String?  @map("vat_id")
```

