DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	
	username TEXT NOT NULL,

	password TEXT NOT NULL

);

DROP TABLE IF EXISTS admin_accounts;
CREATE TABLE admin_accounts
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,

	username TEXT NOT NULL,

	password TEXT NOT NULL
);

/* Owner Account */
/* INSERT INTO admin_accounts (username, password)
VALUES () */
