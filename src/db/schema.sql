-- Raio-X Político - Schema do Banco de Dados Relacional (SQLite)
-- Garante integridade referencial e tipagem estrita

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS candidates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  ballot_name TEXT,
  party TEXT NOT NULL,
  number TEXT NOT NULL,
  position TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT,
  age INTEGER,
  avatar TEXT,
  education TEXT,
  career_history TEXT,
  ai_summary TEXT,
  overall_score REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidate_metrics (
  candidate_id TEXT PRIMARY KEY,
  integridade REAL DEFAULT 0,
  eficiencia REAL DEFAULT 0,
  transparencia REAL DEFAULT 0,
  coerencia REAL DEFAULT 0,
  viabilidade REAL DEFAULT 0,
  assiduidade REAL DEFAULT 0,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_attendance (
  candidate_id TEXT PRIMARY KEY,
  total_sessions INTEGER DEFAULT 0,
  present_count INTEGER DEFAULT 0,
  justified_absences INTEGER DEFAULT 0,
  unjustified_absences INTEGER DEFAULT 0,
  rate_pct REAL DEFAULT 0,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_spending (
  candidate_id TEXT PRIMARY KEY,
  monthly_spent TEXT,
  monthly_spent_num REAL DEFAULT 0,
  limit_amount TEXT,
  limit_amount_num REAL DEFAULT 0,
  spending_pct REAL DEFAULT 0,
  saved_total TEXT,
  cost_per_minute TEXT,
  cost_per_citizen TEXT,
  civic_salarios_minimos INTEGER DEFAULT 0,
  roi_text TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_amendments (
  candidate_id TEXT PRIMARY KEY,
  protocol TEXT,
  total_allocated TEXT,
  total_executed TEXT,
  execution_rate_pct REAL DEFAULT 0,
  open_bid_pct REAL DEFAULT 0,
  direct_pix_pct REAL DEFAULT 0,
  seal_level TEXT,
  seal_title TEXT,
  seal_badge TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_debate (
  candidate_id TEXT PRIMARY KEY,
  event_name TEXT,
  broadcaster TEXT,
  stage TEXT,
  debate_date TEXT,
  youtube_url TEXT,
  transcription_engine TEXT,
  truthfulness_pct REAL DEFAULT 0,
  speaking_time TEXT,
  right_of_reply_granted INTEGER DEFAULT 0,
  clashes_count INTEGER DEFAULT 0,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_debate_statements (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  theme TEXT NOT NULL,
  quote TEXT NOT NULL,
  verdict TEXT NOT NULL,
  verdict_class TEXT,
  fact_check_summary TEXT,
  official_source TEXT,
  source_link TEXT,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_proposals (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  score REAL DEFAULT 0,
  summary TEXT,
  problem_statement TEXT,
  solution_details TEXT,
  budget_and_cost TEXT,
  timeline TEXT,
  pros TEXT,
  cons TEXT,
  support_votes INTEGER DEFAULT 0,
  reject_votes INTEGER DEFAULT 0,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_polls (
  candidate_id TEXT PRIMARY KEY,
  datafolha TEXT,
  ipec TEXT,
  quaest TEXT,
  atlas TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS incumbents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  party TEXT NOT NULL,
  office TEXT NOT NULL,
  avatar TEXT,
  status TEXT
);
