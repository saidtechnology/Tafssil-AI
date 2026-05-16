CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS measurements (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    source VARCHAR(50) DEFAULT 'manual',
    height FLOAT,
    chest FLOAT,
    waist FLOAT,
    hips FLOAT,
    shoulder_width FLOAT,
    arm_length FLOAT,
    inseam FLOAT,
    neck FLOAT,
    back_width FLOAT,
    bicep FLOAT,
    wrist FLOAT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_measurements_project_id ON measurements(project_id);
