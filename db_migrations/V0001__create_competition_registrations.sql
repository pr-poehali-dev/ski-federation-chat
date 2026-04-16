CREATE TABLE t_p25194708_ski_federation_chat.competition_registrations (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  region VARCHAR(255) NOT NULL,
  team VARCHAR(255),
  rank VARCHAR(100),
  competition_name VARCHAR(255) NOT NULL,
  distance VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
