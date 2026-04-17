-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Characteristic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `Characteristic_name_categoryId_key`(`name`, `categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `sku` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `image_url` TEXT NULL,
    `category_id` INTEGER NULL,

    UNIQUE INDEX `Product_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` TEXT NOT NULL,
    `productId` INTEGER NOT NULL,
    `characteristicId` INTEGER NOT NULL,

    UNIQUE INDEX `ProductValue_productId_characteristicId_key`(`productId`, `characteristicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Characteristic` ADD CONSTRAINT `Characteristic_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductValue` ADD CONSTRAINT `ProductValue_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductValue` ADD CONSTRAINT `ProductValue_characteristicId_fkey` FOREIGN KEY (`characteristicId`) REFERENCES `Characteristic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
