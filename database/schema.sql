-- Create VisitorManagement database
CREATE SCHEMA VisitorManagement;

-- Switch to VisitorManagement schema
USE VisitorManagement;

-- Create Administrators table
CREATE TABLE Administrators (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create Receptionists table
CREATE TABLE Receptionists (
  receptionist_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create Employees table
CREATE TABLE Employees (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL
);

-- Create Visitors table
CREATE TABLE Visitors (
  visitor_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  cnic VARCHAR(13) PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  purpose VARCHAR(255) NOT NULL,
  additional_info TEXT,
  check_in_time DATETIME,
  check_out_time DATETIME,
  receptionist_id INT,
  employee_id INT,
  FOREIGN KEY (receptionist_id) REFERENCES Receptionists(receptionist_id),
  FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

-- Create VisitorBadges table
CREATE TABLE VisitorBadges (
  badge_id INT PRIMARY KEY AUTO_INCREMENT,
  visitor_id INT,
  badge_number VARCHAR(20) NOT NULL,
  access_permissions TEXT,
  validity_start DATETIME,
  validity_end DATETIME,
  FOREIGN KEY (visitor_id) REFERENCES Visitors(visitor_id)
);

-- Create Notifications table
CREATE TABLE Notifications (
  notification_id INT PRIMARY KEY AUTO_INCREMENT,
  recipient_id INT,
  message TEXT NOT NULL,
  timestamp DATETIME,
  FOREIGN KEY (recipient_id) REFERENCES Employees(employee_id)
);

-- Create Reports table
CREATE TABLE Reports (
  report_id INT PRIMARY KEY AUTO_INCREMENT,
  report_name VARCHAR(100) NOT NULL,
  report_description TEXT,
  generated_by INT,
  generated_at DATETIME,
  FOREIGN KEY (generated_by) REFERENCES Administrators(admin_id)
);