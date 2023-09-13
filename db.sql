CREATE DATABASE risklick_blog;
USE risklick_blog;

CREATE TABLE blog_comments
(
    blog_id INT NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES blog_posts(bid),
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    creation_date DATETIME NOT NULL
);

CREATE TABLE blog_posts(
    slug VARCHAR(300) NOT NULL,
    title VARCHAR(300) NOT NULL,
    creation_date DATETIME NOT NULL,
    author: VARCHAR(100) NOT NULL,
    short_body TEXT,
    body TEXT NOT NULL,
    picture VARCHAR(300),
    meta_title VARCHAR(300),
    bid INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (OrderID)
);