USE b98umomb3ttwulvrekcc;

CREATE TABLE Users (
  userID INT PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(50),
  emailAddress VARCHAR(50) NOT NULL UNIQUE,
  userPassword TEXT NOT NULL
);

CREATE TABLE Houses (
  houseID INT PRIMARY KEY AUTO_INCREMENT,
  houseDescription TEXT,
  location VARCHAR(25),
  price DECIMAL(10,2),
  imgURL TEXT,
  userID INT,
  CONSTRAINT FOREIGN KEY (userID) REFERENCES Users(userID)
);

SELECT * FROM Users;
SELECT * FROM Houses;

SELECT u.userID, s.houseID
FROM Users u
INNER JOIN Houses s
ON u.userID = s.userID;

DESC Users;
DESC Houses;
