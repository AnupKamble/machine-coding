# machine-coding
created short cruid app using Node js, React js and  postgreSQL




To run frontend use 
npm i --legacy-peer-deps


To run backend 
npm i
nodemon index.js




Created 2 tables 

CREATE TABLE students (
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age VARCHAR(255),
    parentId VARCHAR(255)
)

CREATE TABLE marks ( 
    email VARCHAR(255) NOT NULL REFERENCES students(email) ON DELETE CASCADE,
    score INT CHECK (score >= 0 AND score <= 100),
    UNIQUE (email)
)


Email Address Specify the relationships between these tables using foreign key constraints.



Creating a new student record (POST)
http://localhost:3000/students/
Use this JSON in Postman 
{
 "name":"Antra Gaikwad",
 "email":"antra@gmail.com",
 "age":"20",
 "parentId":"1456"
}


Retrieving a list of all students (GET)
http://localhost:3000/students/


for Adding marks in Student marks Table - 
http://localhost:3000/students/marks/
{
  "score" : 55,
  "email": "antra@gmail.com"
}


Retrieving a single student by Email with marks (GET)
http://localhost:3000/students/antra@gmail.com


Updating a student's information (PUT)
http://localhost:3000/students/update
{
 "name":"Antra Gaikwad",
 "email":"antra@gmail.com",
 "age":"22",
}


Deleting a student record
http://localhost:3000/students/delete/antragaikwad@gmail.com



http://localhost:3000/students_paginated


Note - Please check video for better understanding

Thank you so much


