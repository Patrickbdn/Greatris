-- création des tables et ajout des contraintes d'intégrité --
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 24 oct. 2024 à 11:33
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tetris`
--

-- --------------------------------------------------------

--
-- Structure de la table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `Id_games_Games` bigint NOT NULL AUTO_INCREMENT,
  `score_Games` bigint DEFAULT NULL,
  `duration_Games` time DEFAULT NULL,
  `Id_players_Users` bigint DEFAULT NULL,
  PRIMARY KEY (`Id_games_Games`),
  KEY `FK_Games_Id_players_Users` (`Id_players_Users`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `Id_players_Users` bigint NOT NULL AUTO_INCREMENT,
  `username_Users` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email_Users` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_hash_Users` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `first_log_Users` date DEFAULT NULL,
  `last_log_Users` date DEFAULT NULL,
  `personal_best_Users` bigint DEFAULT NULL,
  `failed_attempts_Users` tinyint(1) NOT NULL,
  `is_locked_Users` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id_players_Users`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `FK_Games_Id_players_Users` FOREIGN KEY (`Id_players_Users`) REFERENCES `users` (`Id_players_Users`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Insertion de quelques données bidons dans les tables Users et Games--

INSERT INTO Users (username_Users, email_Users, password_hash_Users, first_log_Users, last_log_Users, personal_best_Users, failed_attempts_Users, is_locked_Users)
VALUES 
('player01', 'player01@example.com', 'hashed_password_1', '2018-11-11', '2022-11-11', 1500, 0, FALSE),
('player02', 'player02@example.com', 'hashed_password_2', '2018-12-06', '2018-12-06', 2000, 1, FALSE),
('player03', 'player03@example.com', 'hashed_password_3', '2019-03-01', '2024-10-17', 1800, 0, FALSE),
('player04', 'player04@example.com', 'hashed_password_4', '2019-04-24', '2023-02-18', 2500, 2, FALSE),
('player05', 'player05@example.com', 'hashed_password_5', '2019-05-12', '2024-10-23', 2200, 1, FALSE),
('player06', 'player06@example.com', 'hashed_password_6', '2019-09-23', '2023-11-25', 3000, 0, FALSE),
('player07', 'player07@example.com', 'hashed_password_7', '2020-01-02', '2024-09-19', 1700, 1, FALSE),
('player08', 'player08@example.com', 'hashed_password_8', '2021-01-21', '2024-10-08', 2100, 0, FALSE),
('player09', 'player09@example.com', 'hashed_password_9', '2021-07-18', '2021-07-18', 1600, 1, FALSE),
('player10', 'player10@example.com', 'hashed_password_10', '2021-08-05', '2022-06-05', 2400, 2, FALSE),
('player11', 'player11@example.com', 'hashed_password_11', '2022-02-07', '2024-09-25', 1900, 0, FALSE),
('player12', 'player12@example.com', 'hashed_password_12', '2022-10-12', '2024-10-19', 2050, 1, FALSE),
('player13', 'player13@example.com', 'hashed_password_13', '2023-05-13', '2023-05-13', 2300, 0, FALSE),
('player14', 'player14@example.com', 'hashed_password_14', '2024-01-24', '2024-10-17', 1950, 1, FALSE),
('player15', 'player15@example.com', 'hashed_password_15', '2024-10-15', '2024-10-20', 2100, 0, FALSE);

INSERT INTO Games (score_Games, duration_Games, Id_players_Users)
VALUES 
(1500, '00:10:00', 1),
(2000, '00:12:00', 1),
(1800, '00:11:30', 3),
(2500, '00:15:00', 5),
(2200, '00:14:45', 7),
(3000, '00:20:00', 7),
(1700, '00:09:30', 7),
(2100, '00:12:10', 8),
(1600, '00:11:00', 8),
(2400, '00:15:50', 11),
(1900, '00:10:30', 12),
(2050, '00:12:40', 12),
(2300, '00:13:00', 12),
(1950, '00:10:50', 12),
(2100, '00:12:20', 15);

-- création des utilisateurs !!ATTENTION REMPLACER DONNEES PLACEHOLDER!! --
CREATE USER 'admin_tetris'@'localhost' IDENTIFIED BY 'admin_tetris_password'; 
GRANT ALL PRIVILEGES ON tetris.* TO 'admin_tetris'@'localhost';

CREATE USER 'player_tetris'@'localhost' IDENTIFIED BY 'player__tetris_password'; 
GRANT SELECT, INSERT, UPDATE ON tetris.Users TO 'player_tetris'@'localhost';


-- Requêtes SQL  (plus tard utilisées par des formulaires) --

-- inscription : -- 
INSERT INTO Users (username_Users, email_Users, password_hash_Users, first_log_Users, last_log_Users, personal_best_Users, failed_attempts_Users, is_locked_Users)
VALUES ('nouveau_joueur', 'joueur@example.com', 'hash_mdp', CURDATE(), CURDATE(), 0, 0, FALSE);

-- connexion : -- 
SELECT * FROM Users 
WHERE username_Users = 'joueur' AND password_hash_Users = 'hash_mdp';

-- enregistrement partie si fin de partie : --
INSERT INTO Games (score_Games, duration_Games, Id_players_Users)
VALUES ('6850560', '00:38:23', (SELECT Id_players_Users FROM Users WHERE username_Users = 'joueur'))

-- modification données persos : --
UPDATE Users 
SET email_Users = 'nouvelle_adresse@example.com' 
WHERE username_Users = 'player01';

UPDATE Users 
SET password_hash_Users = 'nouveau_hash_mdp' 
WHERE username_Users = 'player01';

-- oubli mdp : --
UPDATE Users 
SET password_hash_Users = 'nouveau_hash_mdp' 
WHERE email_Users = 'player02@example.com';

-- affichage des 10 meilleurs scores pour le leaderboard --
SELECT score_Games
FROM games
ORDER BY score_Games DESC
LIMIT 10;

-- suppression des données d'un utilisateurs si pas connecté depuis 1an --
DELETE FROM Games 
WHERE Id_players_Users IN (
    SELECT Id_players_Users 
    FROM Users 
    WHERE last_log_Users < NOW() - INTERVAL 1 YEAR
);

DELETE FROM Users 
WHERE last_log_Users < NOW() - INTERVAL 1 YEAR;