ALTER TABLE rooms
  DROP COLUMN IF EXISTS ptId;

drop table if exists patients;