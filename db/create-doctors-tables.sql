-- Check if tables already exist before creating
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(20),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  license_number VARCHAR(50) UNIQUE,
  years_of_experience INTEGER,
  bio TEXT,
  consultation_fee DECIMAL(10, 2),
  availability_hours JSONB,
  profile_image VARCHAR(255),
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(3, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for doctor specializations
CREATE TABLE IF NOT EXISTS specializations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for doctors and specializations (many-to-many)
CREATE TABLE IF NOT EXISTS doctor_specializations (
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  specialization_id UUID REFERENCES specializations(id) ON DELETE CASCADE,
  PRIMARY KEY (doctor_id, specialization_id)
);

-- Table for doctor education
CREATE TABLE IF NOT EXISTS doctor_education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  degree VARCHAR(100) NOT NULL,
  institution VARCHAR(200) NOT NULL,
  year_completed INTEGER,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for doctor certifications
CREATE TABLE IF NOT EXISTS doctor_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  certification_name VARCHAR(200) NOT NULL,
  issuing_organization VARCHAR(200) NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  certification_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for doctor availability slots
CREATE TABLE IF NOT EXISTS doctor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0 = Sunday, 1 = Monday, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (doctor_id, day_of_week, start_time, end_time)
);

-- Insert some sample specializations
INSERT INTO specializations (name, description)
VALUES 
  ('Cardiology', 'Deals with disorders of the heart and blood vessels'),
  ('Dermatology', 'Focuses on diseases of the skin, hair, and nails'),
  ('Neurology', 'Specializes in disorders of the nervous system'),
  ('Pediatrics', 'Provides medical care for infants, children, and adolescents'),
  ('Orthopedics', 'Concerned with conditions involving the musculoskeletal system'),
  ('Gynecology', 'Deals with the health of the female reproductive system'),
  ('Ophthalmology', 'Specializes in eye and vision care'),
  ('Psychiatry', 'Focuses on the diagnosis, prevention, and treatment of mental disorders'),
  ('Urology', 'Focuses on diseases of the urinary tract and the male reproductive system'),
  ('Endocrinology', 'Deals with disorders of the endocrine system and its hormones')
ON CONFLICT (name) DO NOTHING;