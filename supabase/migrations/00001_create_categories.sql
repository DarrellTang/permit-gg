CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  weight DECIMAL(3,2) NOT NULL DEFAULT 0.125,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO categories (slug, name, description, weight, sort_order) VALUES
  ('road-signs', 'Road Signs', 'Traffic signs, signals, and pavement markings', 0.15, 1),
  ('right-of-way', 'Right-of-Way', 'Who goes first at intersections and crosswalks', 0.15, 2),
  ('traffic-laws', 'Traffic Laws', 'Rules of the road, turns, lanes, and signals', 0.15, 3),
  ('speed-limits', 'Speed Limits', 'Speed zones, adjusting speed for conditions', 0.10, 4),
  ('dui-drug-laws', 'DUI/Drug Laws', 'Blood alcohol limits, drug impairment, penalties', 0.10, 5),
  ('safe-driving', 'Safe Driving', 'Following distance, weather, night driving, emergencies', 0.15, 6),
  ('parking', 'Parking', 'Parallel parking, curb colors, restricted zones', 0.10, 7),
  ('sharing-the-road', 'Sharing the Road', 'Pedestrians, cyclists, motorcycles, large vehicles', 0.10, 8);
