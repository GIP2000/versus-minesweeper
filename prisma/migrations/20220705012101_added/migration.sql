-- CreateTable
CREATE TABLE `StaticBoard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `board` BLOB NOT NULL,
    `startX` INTEGER NOT NULL,
    `startY` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BoardInstance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `staticBoardId` INTEGER NOT NULL,
    `clickedMask` BLOB NOT NULL,
    `flaggedMask` BLOB NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
