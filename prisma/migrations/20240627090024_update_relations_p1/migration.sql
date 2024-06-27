-- DropForeignKey
ALTER TABLE `Subject` DROP FOREIGN KEY `Subject_class_id_fkey`;

-- AlterTable
ALTER TABLE `Subject` MODIFY `class_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`) ON DELETE SET NULL ON UPDATE CASCADE;
