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

CREATE TABLE IF NOT EXISTS candidate_bills (
  candidate_id TEXT PRIMARY KEY,
  total_proposed INTEGER DEFAULT 0,
  annual_avg REAL DEFAULT 0,
  approved INTEGER DEFAULT 0,
  annual_approved REAL DEFAULT 0,
  success_rate_pct REAL DEFAULT 0,
  fiscal_count INTEGER DEFAULT 0,
  highlight_json TEXT,
  mandates_json TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_jurisdiction (
  candidate_id TEXT PRIMARY KEY,
  constitutional_duties TEXT,
  coverage_pct REAL DEFAULT 100,
  covered_count INTEGER DEFAULT 3,
  total_count INTEGER DEFAULT 3,
  priority_goal TEXT,
  problems_json TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_campaign_finance (
  candidate_id TEXT PRIMARY KEY,
  election_year INTEGER,
  office_elected TEXT,
  total_spent REAL,
  total_spent_formatted TEXT,
  total_received REAL,
  total_received_formatted TEXT,
  votes_received INTEGER,
  cost_per_vote TEXT,
  tse_spending_limit TEXT,
  status_tse TEXT,
  public_fund_pct REAL,
  private_donations_pct REAL,
  own_resources_pct REAL,
  crowdfunding_pct REAL,
  top_donors_json TEXT,
  top_expenses_json TEXT,
  tse_url TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_ethics (
  candidate_id TEXT PRIMARY KEY,
  clean_record_status TEXT NOT NULL DEFAULT 'Ficha Limpa Oficial',
  active_lawsuits_count INTEGER DEFAULT 0,
  stf_stj_inquiries_count INTEGER DEFAULT 0,
  tcu_tce_irregular_accounts INTEGER DEFAULT 0,
  dismissed_archived_count INTEGER DEFAULT 0,
  party_compliance_score REAL DEFAULT 85,
  integrity_score REAL DEFAULT 95,
  integrity_formula_json TEXT,
  lawsuits_json TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_statements (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  context_source TEXT NOT NULL,
  statement_date TEXT NOT NULL,
  quote TEXT NOT NULL,
  verdict TEXT NOT NULL,
  verdict_class TEXT,
  fact_check_summary TEXT,
  official_source TEXT,
  source_link TEXT,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidate_political_capacity (
  candidate_id TEXT PRIMARY KEY,
  score REAL DEFAULT 85,
  level TEXT NOT NULL,
  academic_degree TEXT,
  academic_details TEXT,
  political_schools TEXT,
  political_exam_score TEXT,
  public_track_record_years INTEGER DEFAULT 8,
  public_track_record_text TEXT,
  technical_skills_json TEXT,
  anti_fool_evaluation TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS civic_contradictory_requests (
  id TEXT PRIMARY KEY,
  protocol TEXT UNIQUE NOT NULL,
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  candidate_name TEXT NOT NULL,
  request_type TEXT NOT NULL,
  proof_link TEXT,
  justification TEXT NOT NULL,
  status TEXT DEFAULT 'PENDENTE_ANALISE_48H',
  created_at TEXT NOT NULL
);
