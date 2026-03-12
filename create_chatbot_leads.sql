-- Run this SQL in your MySQL database to create the chatbot_leads table
-- Open MySQL Workbench or phpMyAdmin and run this script

CREATE TABLE IF NOT EXISTS chatbot_leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    plan VARCHAR(255) DEFAULT 'General Enquiry',
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add columns in case the table already existed without them
ALTER TABLE chatbot_leads ADD COLUMN IF NOT EXISTS plan VARCHAR(255) DEFAULT 'General Enquiry' AFTER phone;
ALTER TABLE chatbot_leads ADD COLUMN IF NOT EXISTS message TEXT AFTER plan;

-- Verify it was created
DESCRIBE chatbot_leads;
SELECT 'chatbot_leads table is ready!' AS status;
