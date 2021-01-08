CREATE TABLE SystemUsers (
  Id        serial,
  Login     varchar(64) NOT NULL,
  Password  varchar(255) NOT NULL,
  FullName  varchar(255)
);

ALTER TABLE SystemUsers ADD CONSTRAINT pkSystemUsers PRIMARY KEY (Id);
CREATE UNIQUE INDEX akSystemUsersLogin ON SystemUsers (Login);

CREATE TABLE Sessions (
  Id      serial,
  UserId  integer NOT NULL,
  Token   varchar(64) NOT NULL,
  Data    text
);

ALTER TABLE Sessions ADD CONSTRAINT pkSessions PRIMARY KEY (Id);
CREATE UNIQUE INDEX akSessions ON Sessions (Token);
ALTER TABLE Sessions ADD CONSTRAINT fkSessionsUserId FOREIGN KEY (UserId) REFERENCES SystemUsers (Id) ON DELETE CASCADE;

CREATE TABLE Posts (
  Id      serial,
  UserId  integer NOT NULL,
  Data    text,
  Subject   varchar(64) NOT NULL
);

ALTER TABLE Posts ADD CONSTRAINT pkPosts PRIMARY KEY (Id);
ALTER TABLE Posts ADD CONSTRAINT fkPostsUserId FOREIGN KEY (UserId) REFERENCES SystemUsers (Id) ON DELETE CASCADE;
CREATE UNIQUE INDEX akPosts ON Posts (Data);
