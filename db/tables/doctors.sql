CREATE TABLE doctors (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    specialty_id integer,
    license_number character varying(100) NOT NULL,
    employment_type_id integer,
    clinic_id uuid,
    consultation_fee numeric(10, 2),
    education text[],  -- assuming ARRAY of text
    experience integer,
    bio text,
    languages text[],  -- assuming ARRAY of text
    available_days text[],  -- assuming ARRAY of text
    available_hours jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
