-- DropForeignKey
ALTER TABLE `StudentOnClass` DROP FOREIGN KEY `StudentOnClass_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `StudentOnClass` DROP FOREIGN KEY `StudentOnClass_student_id_fkey`;

-- AddForeignKey
ALTER TABLE `StudentOnClass` ADD CONSTRAINT `StudentOnClass_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentOnClass` ADD CONSTRAINT `StudentOnClass_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;
