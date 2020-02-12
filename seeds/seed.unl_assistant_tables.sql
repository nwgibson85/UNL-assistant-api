BEGIN;

TRUNCATE
  nurses,
  techs,
  rooms,
  patients
  RESTART IDENTITY CASCADE;

INSERT INTO nurses (id, name, nick_name, phone, voalte, email, standby, tripled, float)
VALUES
(1, 'nurseOne', 'One', 1234567890, 42001, 'nurse.One@carle.com', '2020/01/01', '2020/01/02', '2020/01/03'),
(2, 'nurseTwo', 'Two', 0123456789, 42002, 'nurse.Two@carle.com', '2019/12/31', '2020/01/01', '2020/01/02'),
(3, 'nurseThree', 'Three', 9012345678, 42003, 'nurse.Three@carle.com', '2019/12/30', '2019/12/31', '2020/01/01'),
(4, 'nurseFour', 'Four', 8901234567, 42004, 'nurse.Four@carle.com', '2019/12/29', '2019/12/30', '2019/12/31'),
(5, 'nurseFive', 'Five', 7890123456, 42005, 'nurse.Five@carle.com', '2019/12/28', '2019/12/29', '2019/12/30'),
(6, 'nurseSix', 'Six', 6789012345, 42006, 'nurse.six@carle.com', '2019/12/27', '2019/12/28', '2019/12/29'),
(7, 'nurseSeven', 'Seven', 5678901234, 42007, 'nurse.seven@carle.com', '2019/12/26', '2019/12/27', '2019/12/28'),
(8, 'nurseEight', 'Eight', 4567890123, 42008, 'nurse.eight@carle.com', '2019/12/25', '2019/12/26', '2019/12/27'),
(9, 'nurseNine', 'Nine', 3456789012, 42009, 'nurse.nine@carle.com', '2019/12/24', '2019/12/25', '2019/12/26'),
(10, 'nurseTen', 'Ten', 2345678901, 42010, 'nurse.Ten@carle.com', '2019/12/23', '2019/12/24', '2019/12/25');

INSERT INTO techs (id, name, nick_name, phone, voalte, email, standby, float)
VALUES
(1, 'techOne', 'tOne', 1234567891, 42011, 'tech.One@carle.com', '2020/01/01', '2020/01/02'),
(2, 'techTwo', 'tTwo', 1123456789, 42012, 'tech.Two@carle.com', '2019/12/31', '2020/01/01'),
(3, 'techThree', 'tThree', 9112345678, 42013, 'tech.Three@carle.com', '2019/12/30', '2019/12/31');

INSERT INTO rooms (id, number, phone, status, lift_room, nurse_id, tech_id)
VALUES
(1, 7101, 2179047583, 'clean', 'false', 1, 1),
(2, 7102, 2179047582, 'occupied', 'false', 1, 1),
(3, 7103, 2179047581, 'occupied', 'false', 2, 1),
(4, 7104, 2179047580, 'dirty', 'false', 2, 1),
(5, 7105, 2179047579, 'clean', 'true', 3, 1),
(6, 7106, 2179047578, 'occupied', 'false', 3, 1),
(7, 7107, 2179047577, 'occupied', 'false', 4, 1),
(8, 7108, 2179047576, 'occupied', 'false', 4, 2),
(9, 7109, 2179047575, 'occupied', 'false', 5, 2),
(10, 7110, 2179047574, 'occupied', 'false', 5, 2),
(11, 7111, 2179047573, 'occupied', 'true', 6, 2),
(12, 7112, 2179047572, 'dirty', 'true', 6, 2),
(13, 7113, 2179047571, 'occupied', 'false', 7, 2),
(14, 7114, 2179047570, 'occupied', 'false', 7, 2),
(15, 7115, 2179047569, 'occupied', 'true', 8, 3),
(16, 7116, 2179047568, 'clean', 'false', 8, 3),
(17, 7117, 2179047567, 'occupied', 'false', 9, 3),
(18, 7118, 2179047566, 'occupied', 'false', 9, 3),
(19, 7119, 2179047565, 'occupied', 'true', 10, 3),
(20, 7120, 2179047564, 'occupied', 'false', 10, 3);