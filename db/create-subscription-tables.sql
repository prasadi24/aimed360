-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create features table
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for plans and features
CREATE TABLE plan_features (
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES subscription_features(id) ON DELETE CASCADE,
    PRIMARY KEY (plan_id, feature_id)
);

-- Create patient subscriptions table
CREATE TABLE patient_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    payment_status VARCHAR(20) NOT NULL, -- paid, pending, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alter patients table to add required fields
ALTER TABLE patients 
ADD COLUMN marital_status VARCHAR(20),
ADD COLUMN agent_name VARCHAR(100),
ADD COLUMN agent_code VARCHAR(50),
ADD COLUMN branch VARCHAR(100);