-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'games'
-- 
-- ---

DROP TABLE IF EXISTS `games`;
        
CREATE TABLE `games` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_1_id` INTEGER NULL DEFAULT NULL,
  `user_2_id` INTEGER NULL DEFAULT NULL,
  `rules_board` TEXT NULL DEFAULT NULL,
  `user_1_board` TEXT NULL DEFAULT NULL,
  `user_2_board` TEXT NULL DEFAULT NULL,
  `winner` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
        
CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` TEXT NULL DEFAULT NULL,
  `salt`     TEXT NULL DEFAULT NULL,
  `password` TEXT NULL DEFAULT NULL,
  `rank` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `games` ADD FOREIGN KEY (user_1_id) REFERENCES `users` (`id`);
ALTER TABLE `games` ADD FOREIGN KEY (user_2_id) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `games` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `games` (`id`,`user_1_id`,`user_2_id`,`rules_board`,`user_1_board`,`user_2_board`,`winner`) VALUES
-- ('','','','','','','');
-- INSERT INTO `users` (`id`,`username`, `salt`, `password`,`rank`) VALUES
-- ('','','','','');