-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'BLOCKED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `otp_varify` BOOLEAN NOT NULL DEFAULT false,
    `phone_number` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_email_fkey` FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
