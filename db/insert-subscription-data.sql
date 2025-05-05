-- Insert subscription plans
INSERT INTO subscription_plans (name, description, price, billing_cycle) VALUES
('Free', 'Basic healthcare services with limited features', 0.00, 'monthly'),
('Standard', 'Comprehensive healthcare services for individuals', 29.99, 'monthly'),
('Family', 'Complete healthcare coverage for families', 49.99, 'monthly'),
('Premium', 'Premium healthcare services with priority access', 99.99, 'monthly'),
('Enterprise', 'Custom healthcare solutions for organizations', 199.99, 'monthly');

-- Insert subscription features
INSERT INTO subscription_features (name, description) VALUES
('Online Consultations', 'Access to online doctor consultations'),
('24/7 Support', 'Round-the-clock customer support'),
('Medical Records', 'Electronic medical records management'),
('Prescription Management', 'Digital prescription management and refills'),
('Lab Results', 'Online access to lab test results'),
('Appointment Scheduling', 'Online appointment booking system'),
('Health Monitoring', 'Regular health monitoring and alerts'),
('Specialist Referrals', 'Quick referrals to specialists'),
('Family Doctor', 'Dedicated family doctor'),
('Priority Appointments', 'Priority scheduling for appointments'),
('Home Visits', 'Doctor home visits when needed'),
('Annual Health Checkup', 'Comprehensive annual health assessment');

-- Link features to plans
-- Free Plan Features
INSERT INTO plan_features (plan_id, feature_id)
SELECT 
    (SELECT id FROM subscription_plans WHERE name = 'Free'),
    id
FROM subscription_features
WHERE name IN ('Online Consultations', 'Medical Records', 'Appointment Scheduling');

-- Standard Plan Features
INSERT INTO plan_features (plan_id, feature_id)
SELECT 
    (SELECT id FROM subscription_plans WHERE name = 'Standard'),
    id
FROM subscription_features
WHERE name IN ('Online Consultations', 'Medical Records', 'Appointment Scheduling', 
               'Prescription Management', 'Lab Results', '24/7 Support');

-- Family Plan Features
INSERT INTO plan_features (plan_id, feature_id)
SELECT 
    (SELECT id FROM subscription_plans WHERE name = 'Family'),
    id
FROM subscription_features
WHERE name IN ('Online Consultations', 'Medical Records', 'Appointment Scheduling', 
               'Prescription Management', 'Lab Results', '24/7 Support',
               'Health Monitoring', 'Specialist Referrals', 'Family Doctor');

-- Premium Plan Features
INSERT INTO plan_features (plan_id, feature_id)
SELECT 
    (SELECT id FROM subscription_plans WHERE name = 'Premium'),
    id
FROM subscription_features;

-- Enterprise Plan Features (all features)
INSERT INTO plan_features (plan_id, feature_id)
SELECT 
    (SELECT id FROM subscription_plans WHERE name = 'Enterprise'),
    id
FROM subscription_features;