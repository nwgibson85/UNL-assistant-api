BEGIN;

TRUNCATE
  nurses,
  techs,
  rooms,
  patients
  RESTART IDENTITY CASCADE;

INSERT INTO nurses (name, phone, voalte, email, standby, tripled, float)
VALUES
('nurseOne', 1234567890, 42001, 'nurse.One@carle.com', '2020/1/1', '2020/1/2', '2020/1/3'),
('nurseTwo', 0123456789, 42002, 'nurse.Two@carle.com', '2019/12/31', '2020/1/1', '2020/1/2'),
('nurseThree', 9012345678, 42003, 'nurse.Three@carle.com', '2019/12/30', '2019/12/31', '2020/1/1'),
('nurseFour', 8901234567, 42004, 'nurse.Four@carle.com', '2019/12/29', '2019/12/30', '2019/12/31'),
('nurseFive', 7890123456, 42005, 'nurse.Five@carle.com', '2019/12/28', '2019/12/29', '2019/12/30'),
('nurseSix', 6789012345, 42006, 'nurse.six@carle.com', '2019/12/27', '2019/12/28', '2019/12/29'),
('nurseSeven', 5678901234, 42007, 'nurse.seven@carle.com', '2019/12/26', '2019/12/27', '2019/12/28'),
('nurseEight', 4567890123, 42008, 'nurse.eight@carle.com', '2019/12/25', '2019/12/26', '2019/12/27'),
('nurseNine', 3456789012, 42009, 'nurse.nine@carle.com', '2019/12/24', '2019/12/25', '2019/12/26'),
('nurseTen', 2345678901, 42010, 'nurse.Ten@carle.com', '2019/12/23', '2019/12/24', '2019/12/25');

INSERT INTO techs (name, phone, voalte, email, standby, float)
VALUES
('techOne', 1234567891, 42011, 'tech.One@carle.com', '2020/1/1', '2020/1/2'),
('techTwo', 1123456789, 42012, 'tech.Two@carle.com', '2019/12/31', '2020/1/1'),
('techThree', 9112345678, 42013, 'tech.Three@carle.com', '2019/12/30', '2019/12/31');

INSERT INTO rooms (number, status, liftRoom, nurseId, techId)
VALUES
(7101, 'clean', 'false', 1, 1),
(7102, 'occupied', 'false', 1, 1),
(7103, 'occupied', 'false', 2, 1),
(7104, 'dirty', 'false', 2, 1),
(7105, 'clean', 'true', 3, 1),
(7106, 'occupied', 'false', 3, 1),
(7107, 'occupied', 'false', 4, 1),
(7108, 'occupied', 'false', 4, 2),
(7109, 'occupied', 'false', 5, 2),
(7110, 'occupied', 'false', 5, 2),
(7111, 'occupied', 'true', 6, 2),
(7112, 'dirty', 'true', 6, 2),
(7113, 'occupied', 'false', 7, 2),
(7114, 'occupied', 'false', 7, 2),
(7115, 'occupied', 'true', 8, 3),
(7116, 'clean', 'false', 8, 3),
(7117, 'occupied', 'false', 9, 3),
(7118, 'occupied', 'false', 9, 3),
(7119, 'occupied', 'true', 10, 3),
(7120, 'occupied', 'false', 10, 3);

INSERT INTO patients (roomNum, name, age, code, level_of_care, diagnosis, resp, comments, down_grade, nurseId, techId)
VALUES
(7102, 'Kaladin Stormblessed', 32, 'full', 'icu', 'too much stormlight', 'vent', 'prop', 'no', 1, 1),
(7103, 'Kalam Mekar', 43, 'full',  'icu', 'polytrauma', 'vent', 'prop', 'no', 2, 1),
(7106, 'Quickben', 45, 'full', 'icu', 'angered shawdowthrone', 'of', 'leech therapy', 'yes', 3, 1),
(7107, 'Wolverine', 84, 'full', 'icu', 'psychosis ams', 'ra', 'leather restraints 1:1', 'no', 4, 1),
(7108, 'Syl Frenna', 119, 'full', 'icu', 'too much stormlight', 'vent', 'prop', 'no', 4, 2),
(7109, 'Hedge', 44, 'full', 'icu', 'polytrauma', 'vent', 'prop q1h neuro', 'no', 5, 2),
(7110, 'Naruto Uzumaki', 24, 'full', 'icu', 'rabdo', 'ra', 'rehydration', 'yes', 5, 2),
(7111, 'Itachi Uchia', 32, 'full', 'icu', 'tb', 'of', 'abx therapy', 'no', 6, 2),
(7113, 'Juggernaut', 40, 'full', 'icu', 'ich', 'vent', 'prop q1h neuro evd ct in am', 'no', 7, 2),
(7114, 'Kelsier Mistborn', 35, 'full', 'icu', 'heavy metal poisoning', 'ra', 'precedex poison control', 'no', 7, 2),
(7115, 'John Smith', 92, 'dnr', 'cc', 'colon cancer', 'nc', 'comfort care', 'yes', 8, 3),
(7117, 'Em12345 X', 130, 'full', 'icu', 'polytrauma', 'vent', 'prop levo vaso neo precedex q1h neuros', 'no', 9, 3),
(7118, 'Boruto Uzumaki', 12, 'full', 'picu', 'accidental overdose', 'nc', 'poison control', 'no', 9, 3),
(7119, 'Dalinar Colin', 50, 'full', 'icu', 'too much stormlight', 'vent', 'prop', 'no', 10, 3),
(7120, 'Spartan 114', 65, 'full', 'icu', 'hypothermia', 'vent', 'prop', 'no', 10, 3);