-- CA DMV Seed Questions
-- Generated from knowledge of the 2026 California Driver Handbook
-- ~300 original questions across 8 categories

-- ============================================================
-- CATEGORY: Road Signs (~45 questions)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a red octagonal sign mean?',
  'Stop completely before proceeding',
  ARRAY['Yield to oncoming traffic', 'Slow down and proceed with caution', 'Road closed ahead'],
  'A red octagonal (eight-sided) sign always means stop. You must come to a complete stop at the limit line, crosswalk, or before entering the intersection.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a yellow diamond-shaped sign indicate?',
  'Warning of a hazard or change in road conditions ahead',
  ARRAY['You must stop ahead', 'A school zone is nearby', 'Construction zone begins'],
  'Yellow diamond-shaped signs are warning signs. They alert you to hazards or changes in road conditions ahead, such as curves, hills, or intersections.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a round yellow sign with an X and two R''s indicate?',
  'Railroad crossing ahead',
  ARRAY['Road construction ahead', 'Roundabout ahead', 'Rest area ahead'],
  'A round yellow warning sign with an X and the letters RR means a railroad crossing is ahead. Slow down, look, and listen for trains before crossing.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a red and white triangular sign mean?',
  'Yield the right-of-way',
  ARRAY['Stop completely', 'Merge ahead', 'No passing zone'],
  'A red and white triangular (three-sided) sign means yield. Slow down and be prepared to stop to let traffic on the road you are entering or crossing go first.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a white rectangular sign with black lettering typically indicate?',
  'A regulatory rule you must obey',
  ARRAY['A warning about road conditions', 'Directions to a destination', 'A suggestion for safer driving'],
  'White rectangular signs with black lettering are regulatory signs. They inform you of laws and regulations that you must follow, such as speed limits and turn restrictions.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a green sign on the highway indicate?',
  'Directional information such as distance and destination',
  ARRAY['A speed limit change', 'A warning of an upcoming hazard', 'A required action for all drivers'],
  'Green signs on highways and freeways provide directional guidance, showing destinations, distances, and route information.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a blue highway sign indicate?',
  'Motorist services such as gas, food, or lodging',
  ARRAY['A highway speed limit', 'A historical landmark', 'A mandatory detour'],
  'Blue signs on highways indicate motorist services available at upcoming exits, including gas stations, restaurants, hospitals, and lodging.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a brown highway sign indicate?',
  'Recreational areas and points of interest',
  ARRAY['Motorist services like gas and food', 'Construction zones ahead', 'School zones ahead'],
  'Brown signs indicate recreational and cultural interest areas such as parks, historical sites, and scenic areas.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a flashing red traffic signal mean?',
  'Stop, then proceed when safe, just like a stop sign',
  ARRAY['Slow down and proceed with caution', 'The signal is broken, proceed normally', 'Stop and wait for the light to turn green'],
  'A flashing red signal means the same as a stop sign. You must come to a complete stop and proceed only when it is safe to do so.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a flashing yellow traffic signal mean?',
  'Slow down and proceed with caution',
  ARRAY['Stop and wait for a green light', 'Yield to all cross traffic', 'The intersection is closed'],
  'A flashing yellow signal means slow down and proceed with caution. You do not need to stop, but should be alert for cross traffic and pedestrians.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a solid yellow traffic light mean?',
  'The light is about to turn red; stop if you can safely do so',
  ARRAY['Speed up to clear the intersection', 'Proceed with caution', 'Yield to traffic already in the intersection'],
  'A solid yellow light means the signal is about to turn red. You should stop if you can do so safely. If you are already in the intersection, continue through.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a green arrow traffic signal mean?',
  'You may turn in the direction the arrow points after yielding to pedestrians',
  ARRAY['You must turn in the direction of the arrow', 'Oncoming traffic has a red light so you may turn freely', 'The arrow indicates a lane closure ahead'],
  'A green arrow means you may make a protected turn in the direction the arrow points. You must still yield to pedestrians and vehicles already in the intersection.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a red arrow traffic signal mean?',
  'You must stop and cannot turn in the direction the arrow points',
  ARRAY['You may turn after yielding', 'Proceed with caution in the arrow direction', 'The signal is malfunctioning'],
  'A red arrow means stop. You must not make the turn indicated by the arrow. Wait until the arrow turns green or disappears before proceeding.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What do double solid yellow lines on the road mean?',
  'No passing from either direction',
  ARRAY['Passing is allowed with caution', 'The left lane is for turning only', 'A bike lane is to the left'],
  'Double solid yellow lines mean no vehicle may cross or drive on the lines to pass another vehicle. Passing is not allowed from either direction.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'When is it legal to cross a single solid yellow line?',
  'When making a left turn into or from a driveway or private road',
  ARRAY['When passing a slow-moving vehicle', 'When there is no oncoming traffic', 'It is never legal to cross a solid yellow line'],
  'You may cross a single solid yellow line to turn left into or out of a driveway or private road. You may not cross it to pass another vehicle.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What do white dashed lines on the road indicate?',
  'You may change lanes when safe to do so',
  ARRAY['You must stay in your lane', 'The road is about to narrow', 'A bike lane is to your right'],
  'White dashed (broken) lines separate lanes of traffic moving in the same direction. You may change lanes when it is safe.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a solid white line on the road between lanes mean?',
  'Lane changing is discouraged but not prohibited',
  ARRAY['You must not cross the line under any circumstances', 'The lane is ending and you must merge', 'You may freely change lanes'],
  'A solid white line between lanes of traffic moving in the same direction means you should stay in your lane unless a special situation requires you to change lanes. Crossing is discouraged.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a pentagon-shaped (five-sided) yellow sign indicate?',
  'A school zone or school crossing ahead',
  ARRAY['A pedestrian crossing ahead', 'A construction zone ahead', 'A hospital zone ahead'],
  'Pentagon-shaped (five-sided) yellow signs warn of a school zone or school crossing ahead. Slow down and watch for children.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a sign with a red circle and a red line through it mean?',
  'The action shown in the sign is not allowed',
  ARRAY['The action is allowed only during certain hours', 'Slow down before performing the action', 'The sign is advisory only'],
  'A red circle with a red diagonal line through a symbol means that action is prohibited. For example, a red circle with a line through a U-turn symbol means no U-turns.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What do orange signs typically indicate?',
  'Construction or road work ahead',
  ARRAY['School zone ahead', 'Recreational area ahead', 'Railroad crossing ahead'],
  'Orange signs are used in construction and maintenance areas. They warn drivers of road work ahead and may include detour information.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What should you do when you see a yellow sign with a curved arrow?',
  'Slow down; there is a curve in the road ahead',
  ARRAY['Speed up to safely navigate the curve', 'Change lanes to the outside of the curve', 'Stop before the curve'],
  'A yellow diamond sign with a curved arrow warns of an upcoming curve. Slow down to a safe speed before entering the curve.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a white sign with a black arrow pointing upward and a side arrow indicate?',
  'The road ahead curves or merges; stay to the indicated side',
  ARRAY['A mandatory U-turn ahead', 'A one-way street begins', 'Road ends ahead'],
  'These signs indicate that the road ahead curves or a lane merges. Stay in the proper lane and follow directional guidance to navigate safely.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a "Do Not Enter" sign look like?',
  'A red and white square sign with a white horizontal bar',
  ARRAY['A red octagonal sign', 'A yellow diamond sign', 'A red circular sign with a line through it'],
  'A "Do Not Enter" sign is a square red and white sign with a prominent white horizontal bar. It means you must not enter that roadway or ramp.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a "Wrong Way" sign indicate?',
  'You are traveling against traffic on a one-way road or freeway ramp',
  ARRAY['The road ahead is closed for construction', 'You have missed your exit', 'You need to make a U-turn at the next intersection'],
  'A "Wrong Way" sign means you are going against the flow of traffic, typically on a freeway off-ramp. Immediately pull over safely and reverse direction.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a two-headed arrow sign on a yellow diamond mean?',
  'Traffic travels in both directions on the road ahead',
  ARRAY['A divided highway begins', 'Two lanes merge into one', 'A detour is ahead'],
  'A yellow diamond sign with a two-headed arrow warns that the road ahead carries two-way traffic. Be prepared for vehicles approaching from the opposite direction.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a yellow sign with a truck on a downhill slope indicate?',
  'A steep downgrade ahead; trucks and large vehicles should use low gear',
  ARRAY['Trucks are prohibited on this road', 'A truck weigh station is ahead', 'Truck parking ahead'],
  'This sign warns of a steep hill ahead. Trucks and all vehicles should use lower gears to help control speed going downhill.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a white sign with "ONE WAY" and a black arrow mean?',
  'Traffic moves only in the direction the arrow points on that street',
  ARRAY['Only one lane is open', 'Only one vehicle may pass at a time', 'There is only one exit ahead'],
  'A "ONE WAY" sign with a directional arrow indicates that traffic flows in only one direction on that street. Do not drive against the arrow.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a yellow pennant-shaped sign on the left side of the road mean?',
  'No passing zone',
  ARRAY['School zone ahead', 'Slow traffic keep right', 'Left turn only'],
  'A yellow pennant-shaped sign on the left side of the road marks the beginning of a no-passing zone. Do not attempt to pass other vehicles in this area.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What do shared-lane markings (sharrows) painted on the road indicate?',
  'The lane is shared by bicycles and motor vehicles',
  ARRAY['Bicycles must ride on the sidewalk instead', 'Motor vehicles have full priority over bicycles', 'The lane is for bicycles only'],
  'Shared-lane markings (sharrows) indicate that the lane is shared by bicycles and motor vehicles. Drivers should expect cyclists and give them adequate space.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a white sign with the letters "XING" mean?',
  'A crossing area, typically for pedestrians or animals',
  ARRAY['An exit from the highway', 'A road intersection ahead', 'A freeway exchange zone'],
  'XING is an abbreviation for "crossing." These signs warn drivers of a crossing area ahead for pedestrians, school children, animals, or other road users.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a yellow sign showing a person walking indicate?',
  'Pedestrian crossing ahead',
  ARRAY['Hiking trail ahead', 'Walking path only, no vehicles', 'Joggers may be on the road'],
  'A yellow diamond sign showing a person walking warns of a pedestrian crossing ahead. Slow down and be prepared to stop for pedestrians.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a yield sign look like, and what should you do when you see one?',
  'A downward-pointing red and white triangle; slow down and be ready to stop for traffic',
  ARRAY['A red octagon; stop completely', 'A yellow diamond; speed up to merge', 'A green circle; proceed without stopping'],
  'A yield sign is a downward-pointing red and white triangle. Slow down and be ready to stop for cross traffic or pedestrians. If the way is clear, you may proceed without stopping.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What should you do when you approach an intersection and the traffic signal is not working?',
  'Treat the intersection as a four-way stop',
  ARRAY['Proceed through cautiously without stopping', 'The vehicle on the wider road has the right-of-way', 'Honk your horn and drive through'],
  'When a traffic signal is dark or not working, treat the intersection as a four-way stop. Come to a complete stop, yield to any vehicle that arrived first, and proceed when safe.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What do white arrows painted on the road in a lane indicate?',
  'The direction(s) you may travel from that lane',
  ARRAY['A bike lane is nearby', 'Speed limit for that lane', 'The lane is closing ahead'],
  'White lane arrows painted on the pavement indicate the required or permitted directions of travel for vehicles in that lane, such as left turn only, right turn only, or straight ahead.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a sign with a bicycle symbol inside a red circle with a line through it mean?',
  'Bicycles are not allowed on this road',
  ARRAY['Bicycle parking is available', 'Bicyclists must walk their bikes', 'A bike lane begins ahead'],
  'A red circle with a line through a bicycle symbol means bicycles are prohibited on that road or path.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a sign with a solid white horizontal line on a red background at a railroad crossing mean?',
  'Stop and wait; a train is approaching',
  ARRAY['The crossing is permanently closed', 'Slow down but you may cross', 'Sound your horn and proceed'],
  'At railroad crossings, flashing red lights and lowered gates mean a train is approaching. Stop and wait until the lights stop flashing and gates are fully raised.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a diamond-shaped white sign with "HOV" on it indicate?',
  'A high-occupancy vehicle lane requiring a minimum number of passengers',
  ARRAY['A hospital zone vehicle lane', 'A handicapped-only vehicle lane', 'A heavy-occupancy vehicle weighing over 5 tons lane'],
  'HOV lane signs indicate a high-occupancy vehicle lane. These lanes are reserved for vehicles with two or more occupants (carpool lanes) during posted hours.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a sign with a left-curving arrow and an advisory speed mean?',
  'A safe recommended speed for the upcoming curve',
  ARRAY['The legal maximum speed in that area', 'The minimum speed you must maintain', 'The speed at which the curve banking was designed'],
  'Advisory speed signs are placed below curve warning signs. They recommend a safe speed for the curve, which may be lower than the posted speed limit.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What do two solid white lines painted across a lane of traffic indicate?',
  'A crosswalk where pedestrians may cross',
  ARRAY['A stop line where you must stop for a red light', 'A speed bump ahead', 'A railroad crossing boundary'],
  'Two solid white lines painted across the road mark a crosswalk. Drivers must yield to pedestrians within marked crosswalks.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a yellow diamond sign with the letters "DIP" mean?',
  'There is a dip or low area in the road ahead',
  ARRAY['You must dim your headlights', 'A detour is in progress', 'Dangerous intersection ahead'],
  'A "DIP" sign warns of a low area in the road ahead. Slow down, as the dip may cause loss of vehicle control at higher speeds.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a "Divided Highway Ends" sign mean?',
  'The divided highway is ending; traffic will travel in both directions on a single road',
  ARRAY['A rest stop is ahead', 'A new divided highway begins', 'Only one lane is open ahead'],
  'This sign warns that the physical barrier or median separating opposing traffic is ending. Be prepared for two-way traffic ahead.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a sign showing two lanes merging into one indicate?',
  'The road narrows ahead and lanes merge; be prepared to adjust your position',
  ARRAY['A passing zone is ending', 'The road is temporarily closed in one direction', 'A toll booth is ahead'],
  'A merge sign warns that two lanes are converging into one. Adjust your speed and position to safely merge with other traffic.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What do raised pavement markers (Botts'' dots) in yellow on California roads indicate?',
  'They separate lanes of traffic traveling in opposite directions',
  ARRAY['They indicate a bike lane boundary', 'They mark a parking zone', 'They warn of a speed bump ahead'],
  'Yellow raised pavement markers (Botts'' dots) separate traffic flowing in opposite directions, similar to yellow painted lines. White dots separate same-direction lanes.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a "Slow Moving Vehicle" sign look like?',
  'A fluorescent orange triangle on the back of the vehicle',
  ARRAY['A yellow diamond sign on the roadside', 'A red octagonal sign on the vehicle', 'An amber flashing light on the roof'],
  'A fluorescent orange triangle mounted on the back of a vehicle means it is a slow-moving vehicle traveling less than 25 mph. Give it extra space.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

-- ============================================================
-- CATEGORY: Right-of-Way (~45 questions)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'At an uncontrolled intersection (no signs or signals), who has the right-of-way?',
  'The vehicle that arrives first; if at the same time, yield to the vehicle on your right',
  ARRAY['The vehicle on the wider road', 'The vehicle traveling faster', 'The vehicle making a left turn'],
  'At an uncontrolled intersection, the first vehicle to arrive has the right-of-way. If two vehicles arrive at the same time, the driver on the left yields to the driver on the right.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'At a four-way stop, who goes first when two vehicles arrive at the same time?',
  'The vehicle on the right',
  ARRAY['The vehicle on the left', 'The vehicle going straight', 'The larger vehicle'],
  'When two vehicles arrive at a four-way stop at the same time, the driver on the left must yield to the driver on the right.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When making a left turn at an intersection, who must you yield to?',
  'All oncoming traffic and pedestrians',
  ARRAY['Only vehicles turning right', 'Only vehicles in the left lane', 'Nobody if you have a green light'],
  'When making a left turn, you must yield to all oncoming traffic that is close enough to be dangerous, and to all pedestrians in the crosswalk.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When must you yield to pedestrians in a crosswalk?',
  'Always, whether the crosswalk is marked or unmarked',
  ARRAY['Only if the crosswalk is marked with painted lines', 'Only if the pedestrian is already past the center of the road', 'Only at intersections with traffic signals'],
  'Drivers must yield to pedestrians at all crosswalks, both marked and unmarked. An unmarked crosswalk exists at every intersection.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When entering a roundabout, who has the right-of-way?',
  'Vehicles already in the roundabout',
  ARRAY['Vehicles entering from the right', 'Vehicles entering from the largest road', 'The fastest vehicle'],
  'When entering a roundabout, yield to vehicles already circulating inside. Wait for a gap in traffic before entering.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'What must you do when an emergency vehicle with sirens and flashing lights approaches from any direction?',
  'Pull to the right edge of the road and stop until the emergency vehicle passes',
  ARRAY['Speed up to get out of the way', 'Stop wherever you are, including in the intersection', 'Continue at the same speed if you are in the left lane'],
  'When you hear sirens or see flashing lights on an emergency vehicle, pull over to the right edge of the road and stop. Remain stopped until the emergency vehicle has passed.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'Who has the right-of-way when a vehicle is entering a highway from an on-ramp?',
  'Traffic already on the highway',
  ARRAY['The vehicle on the on-ramp', 'The vehicle that signals first', 'The slower vehicle'],
  'Vehicles entering a highway from an on-ramp must yield to traffic already on the highway. Adjust your speed to merge safely.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When a school bus has its red lights flashing and stop arm extended, what must you do?',
  'Stop from both directions and remain stopped until the lights stop flashing',
  ARRAY['Slow down to 15 mph and pass carefully', 'Stop only if you are behind the bus', 'You may pass if there is a median or divider'],
  'When a school bus displays flashing red lights and the stop arm is extended, traffic in both directions must stop. The only exception is if you are on the opposite side of a divided highway with a physical barrier.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When must you yield to a blind pedestrian carrying a white cane or using a guide dog?',
  'Always, even if the pedestrian is not in a crosswalk',
  ARRAY['Only at marked crosswalks', 'Only when they raise their cane', 'Only at intersections with traffic lights'],
  'California law requires all drivers to yield the right-of-way to blind pedestrians carrying a white cane or using a guide dog at all times, regardless of where they are crossing.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When two vehicles approach a T-intersection at the same time, who has the right-of-way?',
  'The vehicle on the through road (the top of the T)',
  ARRAY['The vehicle on the terminating road', 'The vehicle turning left', 'The vehicle on the narrower road'],
  'At a T-intersection, the vehicle on the through road has the right-of-way. The vehicle on the road that ends (the stem of the T) must yield.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'What should you do when you approach a yield sign?',
  'Slow down, check for traffic, and be prepared to stop if necessary',
  ARRAY['Stop completely before proceeding', 'Speed up to merge quickly', 'Flash your headlights to warn others'],
  'At a yield sign, slow down and check for cross traffic. Be prepared to stop if another vehicle or pedestrian has the right-of-way. If the way is clear, you may proceed without stopping.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When turning right on a red light, who must you yield to?',
  'All pedestrians, bicyclists, and vehicles that have a green light',
  ARRAY['Only vehicles on the cross street', 'Only pedestrians in the crosswalk', 'Nobody if the way appears clear'],
  'When making a right turn on red (where permitted), you must first come to a complete stop, then yield to all pedestrians, bicyclists, and vehicles before proceeding.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When backing out of a driveway, who has the right-of-way?',
  'All vehicles and pedestrians on the sidewalk and street',
  ARRAY['The vehicle backing up', 'Vehicles only, not pedestrians', 'Nobody, since driveways are private property'],
  'When backing out of a driveway, you must yield to all traffic on the street and pedestrians on the sidewalk. You do not have the right-of-way when leaving private property.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'If you reach an intersection at the same time as another vehicle and both of you want to go straight, who goes first?',
  'Neither has priority; both may proceed with caution since their paths do not cross',
  ARRAY['The vehicle on the right', 'The vehicle on the larger road', 'The vehicle that signals first'],
  'If two vehicles approach an intersection at the same time and both are going straight, their paths typically do not conflict. Both can proceed with caution.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When entering a road from an alley or private driveway, who has the right-of-way?',
  'All vehicles on the road and pedestrians on the sidewalk',
  ARRAY['The vehicle exiting the driveway', 'The vehicle traveling slower', 'The vehicle on your left'],
  'Vehicles entering a road from a driveway, alley, or private road must yield to all traffic on the road and all pedestrians on the sidewalk.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'At an intersection with a stop sign, you stop and see a pedestrian crossing. What should you do?',
  'Wait for the pedestrian to completely cross before proceeding',
  ARRAY['Honk to alert the pedestrian and proceed', 'Proceed as soon as the pedestrian clears your lane', 'Wave the pedestrian to hurry up'],
  'You must wait for pedestrians to completely finish crossing the road before proceeding, even if they are in a lane that does not directly conflict with your intended path.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'What should you do at an intersection with a flashing yellow light?',
  'Slow down and proceed with caution, yielding to traffic and pedestrians',
  ARRAY['Stop completely and then proceed', 'Speed up to clear the intersection', 'Treat it as an uncontrolled intersection'],
  'A flashing yellow light means proceed with caution. Slow down and watch for cross traffic and pedestrians.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'A vehicle ahead of you stops for a pedestrian at a crosswalk. What should you do?',
  'Stop behind the vehicle and do not pass it while the pedestrian is in the crosswalk',
  ARRAY['Change lanes and pass the stopped vehicle', 'Honk to alert the vehicle to move', 'Pass on the right side using the shoulder'],
  'It is illegal and dangerous to pass a vehicle that has stopped for a pedestrian at a crosswalk. Stop and wait until the pedestrian has safely crossed.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When must you yield to traffic on a through road?',
  'When entering from a side road, alley, driveway, or unpaved road',
  ARRAY['Only when there is a yield sign', 'Only during peak traffic hours', 'Only if you are turning left'],
  'You must always yield to traffic on a through road when entering from a side street, alley, driveway, or unpaved road, regardless of whether there is a sign.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'If you are in an intersection waiting to make a left turn and the light turns yellow, what should you do?',
  'Complete your turn if you can do so safely, yielding to oncoming traffic',
  ARRAY['Back up out of the intersection', 'Stop immediately in the intersection', 'Speed up and turn before cross traffic starts'],
  'If you are already in the intersection waiting for a gap to turn left, you should complete the turn when it is safe, even after the light turns yellow or red. Do not remain stopped in the intersection.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When two vehicles on different roads arrive at an all-way stop at the same time, who goes first?',
  'The vehicle to the right goes first',
  ARRAY['The vehicle to the left goes first', 'The vehicle going straight goes first', 'The vehicle that flashes its lights first'],
  'At an all-way stop, if two vehicles arrive at the same time, the vehicle on the right has the right-of-way and should proceed first.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When approaching an intersection where a traffic officer is directing traffic, whose instructions should you follow?',
  'The traffic officer''s directions, even if they conflict with signs or signals',
  ARRAY['The traffic signals', 'The posted signs', 'The directions of the first vehicle in line'],
  'A traffic officer''s instructions override all signs and signals. Always follow the officer''s directions when they are directing traffic at an intersection.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'You are at an intersection and an emergency vehicle with lights and sirens is approaching. What should you do?',
  'Clear the intersection, pull to the right, and stop',
  ARRAY['Stop in the intersection and wait', 'Speed up to clear the intersection faster', 'Move to the left lane to make room'],
  'If you are in an intersection when an emergency vehicle approaches, safely clear the intersection first, then pull to the right edge of the road and stop.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When making a U-turn, who must you yield to?',
  'All approaching vehicles and pedestrians',
  ARRAY['Only vehicles in the nearest lane', 'Only pedestrians in marked crosswalks', 'Nobody if you signal properly'],
  'When making a U-turn, you must yield to all approaching vehicles and pedestrians. You do not have the right-of-way when making a U-turn.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'What must you do when you see a crosswalk at a stop sign intersection?',
  'Stop before the crosswalk, yield to pedestrians, then proceed when clear',
  ARRAY['Stop at the stop sign line only, pedestrians must wait', 'Slow down but proceed through the crosswalk', 'Stop only if pedestrians are present'],
  'You must stop before the crosswalk, even if there are no pedestrians. If pedestrians are present, yield and allow them to cross before proceeding.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'Who has the right-of-way at an intersection with a green light?',
  'Vehicles going straight or turning right, but they must still yield to pedestrians and traffic already in the intersection',
  ARRAY['All vehicles entering the intersection from any direction', 'Only vehicles turning left with a green arrow', 'The vehicle that enters the intersection first'],
  'A green light means you may go, but you must still yield to pedestrians in the crosswalk and vehicles already in the intersection.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'At an intersection where you have a green light and a pedestrian is crossing against the signal (jaywalking), what should you do?',
  'Yield to the pedestrian regardless, since you must avoid hitting them',
  ARRAY['Proceed because you have the right-of-way', 'Honk your horn and drive around them', 'Flash your lights to warn the pedestrian'],
  'Even if a pedestrian is crossing illegally, you must yield to avoid hitting them. Drivers have a duty to avoid a collision at all times.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When can you legally enter an intersection on a green light?',
  'Only when there is enough space on the other side to get completely through without blocking the intersection',
  ARRAY['Anytime the light is green', 'As long as you entered before the light turned red', 'Only when there are no pedestrians in any crosswalk'],
  'Do not enter an intersection if you cannot get completely through before the light turns red. Blocking an intersection is illegal.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'A funeral procession is passing through an intersection. What should you do?',
  'Yield the right-of-way to all vehicles in the funeral procession',
  ARRAY['Proceed through since you have a green light', 'Honk to signal the procession to stop', 'Cut between vehicles in the procession'],
  'In California, you should yield the right-of-way to a funeral procession. Do not cut through or interrupt the procession.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'What should you do if you are the first vehicle at a four-way stop and another vehicle arrives after you?',
  'Proceed first since you arrived at the intersection first',
  ARRAY['Wait for the other vehicle to go', 'Flash your lights to indicate you are going', 'Yield to the vehicle on your left'],
  'At a four-way stop, the first vehicle to arrive and come to a complete stop has the right-of-way. You should proceed first.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'A visually impaired person with a guide dog is waiting at a corner. What should you do?',
  'Stop and yield the right-of-way, even if the person is not in a crosswalk',
  ARRAY['Honk your horn to let them know you are there', 'Proceed carefully, they will wait for traffic to clear', 'Rev your engine so they can hear your vehicle'],
  'You must always yield to visually impaired pedestrians using a guide dog or white cane. Do not honk, as it may confuse or disorient them.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When are you allowed to go around a lowered railroad crossing gate?',
  'Never; it is always illegal to go around lowered railroad crossing gates',
  ARRAY['When you can see no train approaching', 'When the gates have been down for more than five minutes', 'When other vehicles are crossing'],
  'It is always illegal to go around or under a lowered railroad crossing gate. Doing so is extremely dangerous and can result in a fine or worse.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When a road has no sidewalk, where should pedestrians walk?',
  'On the left side of the road, facing oncoming traffic',
  ARRAY['On the right side of the road, with traffic', 'In the nearest travel lane', 'On the right shoulder only'],
  'When there is no sidewalk, pedestrians should walk on the left side of the road, facing oncoming traffic, so they can see approaching vehicles.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'You are turning left at an intersection and a bicyclist is approaching from the opposite direction going straight. Who has the right-of-way?',
  'The bicyclist, because you must yield to oncoming traffic when turning left',
  ARRAY['You do, because cars have priority over bicycles', 'You do, because you arrived at the intersection first', 'The bicyclist, but only if they are in a bike lane'],
  'Bicyclists have the same rights and responsibilities as motor vehicle drivers. When turning left, you must yield to oncoming bicyclists just as you would to oncoming cars.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When should you never insist on taking the right-of-way?',
  'When doing so could cause a collision, regardless of who legally has the right-of-way',
  ARRAY['When you are at a yield sign', 'When you are making a left turn', 'When the road is wet'],
  'Even if you have the legal right-of-way, never insist on it if doing so could lead to a collision. Safety always takes priority over traffic rules.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When approaching a crosswalk at a stop sign where a pedestrian is waiting to cross, what must you do?',
  'Come to a complete stop and allow the pedestrian to cross',
  ARRAY['Slow down and let the pedestrian cross only if they step into the road', 'Honk your horn so the pedestrian knows you see them', 'Stop only if the pedestrian makes eye contact'],
  'At a stop sign with a crosswalk, you must stop and yield to any pedestrian waiting to cross. Do not wave pedestrians across; instead, wait patiently.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'At a three-way intersection where all streets have stop signs, three vehicles arrive at the same time. Who goes first?',
  'The vehicle to the right of each driver has priority; proceed in order',
  ARRAY['All three vehicles proceed at the same time', 'The vehicle on the through road goes first', 'The largest vehicle goes first'],
  'When three vehicles arrive at a multi-way stop at the same time, apply the right-of-way rule: yield to the vehicle on your right. This creates an orderly sequence.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'Who has the right-of-way when you approach a horse and rider on the road?',
  'The horse and rider; slow down or stop to avoid startling the horse',
  ARRAY['You do, because the horse should be on the shoulder', 'Neither; both share the road equally at full speed', 'The rider, but only if they are in a crosswalk'],
  'Horses and riders have a right to use the road. Slow down or stop if necessary to avoid frightening the horse, which could cause a dangerous situation.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'You approach a crosswalk with a flashing yellow light and a pedestrian has started crossing. What should you do?',
  'Stop and wait for the pedestrian to completely finish crossing',
  ARRAY['Proceed slowly around the pedestrian', 'Honk to warn the pedestrian you are approaching', 'Speed up to pass before the pedestrian reaches your lane'],
  'A flashing yellow light near a crosswalk alerts drivers that pedestrians may be crossing. You must stop and yield to any pedestrian in the crosswalk.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When exiting a freeway, where do you begin to slow down?',
  'On the deceleration lane (exit ramp), not on the freeway itself',
  ARRAY['In the far right freeway lane before the exit', 'Immediately when you see the exit sign', 'On the freeway, two car lengths before the exit ramp'],
  'Do not slow down on the freeway itself. Wait until you are in the deceleration lane (off-ramp) to reduce your speed for the exit.',
  'CA DMV Handbook, Chapter 6: Entering and Exiting Freeways'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When merging onto the freeway, what is the proper technique?',
  'Use the acceleration lane to match freeway traffic speed, then merge into a gap',
  ARRAY['Stop at the end of the on-ramp and wait for a gap', 'Drive slowly until freeway traffic gives you room', 'Enter the freeway at any speed and expect others to move over'],
  'Use the on-ramp and acceleration lane to build up to freeway speed, signal, check mirrors and blind spots, and merge into a safe gap in traffic.',
  'CA DMV Handbook, Chapter 6: Entering and Exiting Freeways'
);

-- ============================================================
-- CATEGORY: Traffic Laws (~45 questions)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When is it legal to make a right turn on a red light in California?',
  'After coming to a complete stop and yielding to all pedestrians and traffic, unless a sign prohibits it',
  ARRAY['At any time, since California allows right turns on red', 'Only when there is a green arrow', 'Only between 6 AM and 10 PM'],
  'You may turn right on red after a complete stop, unless a "No Turn on Red" sign is posted. You must yield to pedestrians, bicyclists, and all traffic with a green light.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'Is it legal to make a left turn on a red light in California?',
  'Yes, only from a one-way street onto another one-way street, after stopping and yielding',
  ARRAY['No, left turns on red are never legal', 'Yes, at any intersection after stopping', 'Yes, but only at intersections without pedestrians'],
  'You may make a left turn on red only from a one-way street onto another one-way street. You must come to a complete stop first and yield to all traffic and pedestrians.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the minimum following distance you should maintain behind the vehicle in front of you?',
  'At least 3 seconds under normal conditions',
  ARRAY['1 car length for every 10 mph', 'At least 2 seconds', 'At least 5 seconds at all times'],
  'You should maintain at least a 3-second following distance under normal conditions. Increase this distance in bad weather, heavy traffic, or at higher speeds.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When are you required to use your headlights in California?',
  'From 30 minutes after sunset to 30 minutes before sunrise, and whenever visibility is less than 1,000 feet',
  ARRAY['Only at night', 'Only when it is raining', 'Only on highways after dark'],
  'California law requires headlights from 30 minutes after sunset to 30 minutes before sunrise, during fog, rain, or any time you cannot see clearly for 1,000 feet.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When must you dim your high-beam headlights?',
  'Within 500 feet of an oncoming vehicle and within 300 feet when following another vehicle',
  ARRAY['Only when the other driver flashes their lights at you', 'Within 1,000 feet of any other vehicle', 'When driving in the city limits'],
  'You must dim your high beams within 500 feet of an approaching vehicle and within 300 feet when following behind another vehicle.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the California law regarding cell phone use while driving for drivers 18 and older?',
  'Must use hands-free mode only; holding a phone while driving is illegal',
  ARRAY['Can use a phone freely if under 5 mph', 'Can hold the phone for calls but not for texting', 'No restrictions for drivers over 18'],
  'California law prohibits all drivers 18 and older from holding or operating a handheld wireless phone while driving. Hands-free devices are permitted.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the cell phone law for drivers under 18 in California?',
  'No use of any electronic devices at all, including hands-free, while driving',
  ARRAY['Hands-free calling is allowed', 'Texting is banned but calls are allowed', 'Same rules as drivers over 18'],
  'Drivers under 18 may not use any electronic communication device while driving, including hands-free. This is a zero-tolerance policy for teen drivers.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'How far in advance must you signal before making a turn?',
  'At least 100 feet before the turn',
  ARRAY['At least 50 feet before the turn', 'At least 200 feet before the turn', 'Only when other vehicles are nearby'],
  'California law requires you to signal at least 100 feet before turning. On highways at higher speeds, signal earlier to give other drivers more notice.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When is it legal to make a U-turn in California?',
  'On a green light or at an intersection where no sign prohibits it, when you can see clearly 200 feet in each direction',
  ARRAY['Anywhere as long as you signal', 'Only at intersections with U-turn signs', 'Only on residential streets'],
  'U-turns are legal at intersections with a green light or left-turn arrow unless a sign prohibits them. You must be able to see 200 feet in each direction.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'Where is it illegal to make a U-turn in California?',
  'On a divided highway where you would have to cross a dividing section, median, or unpaved strip',
  ARRAY['At any intersection controlled by a traffic signal', 'On any street with more than two lanes', 'In residential neighborhoods only'],
  'U-turns are illegal on divided highways with a median, double yellow lines, or physical barrier; near fire stations; and on one-way streets. They are also prohibited where signs say "No U-Turn."',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the "Move Over" law in California?',
  'You must slow down and, if safe, move over a lane when passing a stopped emergency vehicle or tow truck with flashing lights',
  ARRAY['You must always move to the right lane on the highway', 'You must pull over whenever you hear a siren', 'You must move over only for police vehicles, not fire trucks'],
  'California''s "Move Over" law requires drivers to slow down and, when possible, change lanes to give space to stopped emergency vehicles, tow trucks, and Caltrans vehicles displaying flashing lights.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What lane should you use for passing on a two-lane road?',
  'The left lane (oncoming traffic lane), only when it is clear and safe',
  ARRAY['The right shoulder', 'Either lane is acceptable', 'The left lane at any time if you signal'],
  'On a two-lane road, you pass in the left lane when it is safe and legal. Never pass on the right using the shoulder. Ensure the left lane is clear of oncoming traffic before passing.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When is it legal to pass another vehicle on the right?',
  'When the vehicle ahead is making a left turn, or on a one-way street with multiple lanes',
  ARRAY['Whenever the vehicle ahead is going slower than the speed limit', 'On any multilane road at any time', 'On the shoulder of any road'],
  'Passing on the right is allowed when the vehicle ahead is turning left, on a one-way street, or on a road with multiple lanes going in the same direction. Never use the shoulder to pass.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What must you do if you are involved in a traffic collision that causes injury or death?',
  'Stop at the scene, call 911, provide your information, and render aid if possible',
  ARRAY['Continue driving and report it later at a police station', 'Call your insurance company and leave the scene', 'Move your vehicle off the road and wait for police'],
  'If you are involved in a collision causing injury or death, you must stop at the scene, call 911, give your identification and insurance information, and help the injured if you can do so safely.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the legal requirement when you are involved in a collision that causes property damage only?',
  'Exchange information with the other party and report it to the DMV within 10 days if damage exceeds $1,000',
  ARRAY['No report is needed for property damage only', 'Report to police within 24 hours regardless of damage amount', 'Only report if the damage exceeds $5,000'],
  'For property-damage-only collisions, exchange information with the other party. If damage exceeds $1,000 or anyone is injured, you must report it to the DMV within 10 days (SR 1 form).',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'How close to a fire hydrant can you legally park?',
  '15 feet',
  ARRAY['10 feet', '5 feet', '20 feet'],
  'You must not park within 15 feet of a fire hydrant. This ensures emergency vehicles have clear access.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What does California''s "implied consent" law mean for drivers?',
  'By driving on California roads, you agree to submit to a chemical test if lawfully arrested for DUI',
  ARRAY['You automatically consent to a vehicle search during any traffic stop', 'You agree to show your license to any citizen who asks', 'You consent to have your blood tested during a routine traffic stop'],
  'California''s implied consent law means that by driving in the state, you have agreed to submit to a blood, breath, or urine test if lawfully arrested on suspicion of DUI. Refusal carries additional penalties.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the penalty for a first-offense hit-and-run in California that involves injury?',
  'Up to 1 year in jail and/or a fine, plus points on your driving record',
  ARRAY['A warning letter from the DMV', 'A small fine with no jail time', '30-day license suspension only'],
  'Hit-and-run involving injury is a serious offense in California. Penalties include jail time, fines, license suspension, and points on your driving record.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When parking on a hill with a curb, which way should you turn your front wheels if you are facing uphill?',
  'Away from the curb (turn the steering wheel to the left)',
  ARRAY['Toward the curb', 'Straight ahead', 'It does not matter as long as you set the parking brake'],
  'When parking uphill with a curb, turn your front wheels away from the curb (to the left). If your vehicle rolls backward, the wheels will catch the curb and stop the vehicle.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When parking on a hill facing downhill (with or without a curb), which way should you turn your wheels?',
  'Toward the curb (turn the steering wheel to the right)',
  ARRAY['Away from the curb', 'Straight ahead', 'It depends on the steepness of the hill'],
  'When parking downhill, always turn your front wheels toward the curb (to the right). If your vehicle rolls forward, the wheels will roll into the curb and stop the vehicle.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'On a two-lane road, what should you do if a line of cars has built up behind you?',
  'Pull over to the right and let them pass when it is safe',
  ARRAY['Speed up to match the flow of traffic', 'Ignore them; they should be patient', 'Turn on your hazard lights to warn them'],
  'If five or more vehicles are lined up behind you on a two-lane road, you are required to pull over at the nearest safe turnout to let them pass.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the legal requirement for child car seats in California?',
  'Children under 2 must be in a rear-facing car seat; children under 8 must be in a car seat or booster',
  ARRAY['Children under 5 must be in a car seat', 'Only children under 1 need a rear-facing seat', 'Car seats are optional if the child is in the back seat'],
  'California law requires children under 2 years old to ride in a rear-facing car seat. Children under 8 must be secured in an appropriate car seat or booster seat.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When may you legally drive in a bike lane?',
  'Only within 200 feet of making a right turn, after checking for cyclists',
  ARRAY['Whenever the bike lane is empty', 'When traffic is congested', 'Never; bike lanes are exclusively for bicycles'],
  'You may enter a bike lane no more than 200 feet before a right turn, after checking for and yielding to bicyclists. At all other times, stay out of the bike lane.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the maximum speed limit in a residential area in California unless otherwise posted?',
  '25 mph',
  ARRAY['30 mph', '35 mph', '20 mph'],
  'The default speed limit in residential areas in California is 25 mph unless otherwise posted by signs.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When must you report a change of address to the DMV?',
  'Within 10 days of moving',
  ARRAY['Within 30 days', 'Within 5 days', 'You do not need to report address changes'],
  'California law requires you to notify the DMV within 10 days of any change of address. You can update your address online at the DMV website.',
  'CA DMV Handbook, Chapter 1: Licensing Information'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What should you do if you hit a parked vehicle and cannot find the owner?',
  'Leave a note on the vehicle with your name, phone number, and address, then report it to police',
  ARRAY['Wait at the scene for up to 30 minutes for the owner', 'Report it to the DMV within 24 hours', 'Leave the scene since no one was injured'],
  'If you hit a parked vehicle, try to find the owner. If you cannot, leave a note with your contact and insurance information in a visible spot on the vehicle, and report the collision to police.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'In California, when are you required to wear a seatbelt?',
  'At all times when the vehicle is in motion, regardless of your seating position',
  ARRAY['Only if you are in the front seat', 'Only on highways', 'Only if you are under 18'],
  'California law requires all vehicle occupants to wear seatbelts at all times when the vehicle is moving. Drivers can be fined for unbelted passengers.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the minimum liability insurance you must carry in California?',
  '$15,000 for injury/death to one person, $30,000 for injury/death to multiple people, $5,000 for property damage',
  ARRAY['$10,000/$20,000/$5,000', '$25,000/$50,000/$10,000', '$20,000/$40,000/$15,000'],
  'California''s minimum liability insurance requirements are commonly called 15/30/5: $15,000 for one person''s injuries, $30,000 for all injuries, and $5,000 for property damage.',
  'CA DMV Handbook, Chapter 1: Licensing Information'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the purpose of a two-way left-turn lane (center lane marked with double yellow lines)?',
  'For vehicles traveling in either direction to use when making left turns',
  ARRAY['For passing slow vehicles', 'For emergency vehicles only', 'For motorcycles to split traffic'],
  'A two-way left-turn lane in the center of a road is shared by vehicles from both directions for making left turns. You may not travel in this lane for more than 200 feet.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When are you allowed to drive in the carpool (HOV) lane?',
  'When your vehicle has the required number of occupants listed on the sign, or if you are driving a qualifying clean air vehicle with a sticker',
  ARRAY['Anytime as long as you are going faster than 65 mph', 'Only during non-peak hours', 'When you are within 2 miles of your exit'],
  'Carpool (HOV) lanes require the posted minimum number of occupants (usually 2+). Some qualifying clean air vehicles with valid stickers may use them with only one occupant.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'If you refuse a chemical test (breath, blood, or urine) after being lawfully arrested for DUI, what happens?',
  'Your license will be suspended for one year and it can be used as evidence against you in court',
  ARRAY['There is no penalty for refusing a chemical test', 'Your license is suspended for 6 months', 'You will be released without charges'],
  'Under California''s implied consent law, refusing a chemical test after a lawful DUI arrest results in an automatic one-year license suspension for a first offense, with longer suspensions for repeat offenses.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When can you legally cross a double yellow line?',
  'When turning left into a driveway, when an obstruction requires it, or when instructed by a traffic officer',
  ARRAY['Never, under any circumstances', 'When passing a slow vehicle if the road is clear', 'Only during emergencies'],
  'You may cross a double yellow line to turn left into a driveway or private road, to pass an obstruction blocking your lane, or when directed by a traffic officer.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the legal blood alcohol concentration (BAC) limit for drivers 21 and older in California?',
  '0.08%',
  ARRAY['0.05%', '0.10%', '0.04%'],
  'In California, it is illegal to drive with a BAC of 0.08% or higher for drivers aged 21 and older. For commercial drivers, the limit is 0.04%.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

-- ============================================================
-- CATEGORY: Safe Driving (~45 questions)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the recommended following distance under normal driving conditions?',
  'At least 3 seconds behind the vehicle ahead',
  ARRAY['At least 1 second behind the vehicle ahead', 'At least one car length for every 10 mph', 'At least 5 seconds behind the vehicle ahead'],
  'The recommended following distance is at least 3 seconds under normal conditions. This gives you time to react and stop if the vehicle ahead brakes suddenly.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'How should you increase your following distance when driving in rain?',
  'Double your normal following distance to at least 6 seconds',
  ARRAY['Maintain the normal 3-second distance', 'Increase to 4 seconds', 'Triple your following distance to 9 seconds'],
  'In rain or wet conditions, you need extra stopping distance. Doubling your following distance provides the additional time needed to stop safely on slippery roads.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if your vehicle starts to hydroplane?',
  'Ease off the gas pedal, do not brake suddenly, and steer straight until you regain traction',
  ARRAY['Brake firmly to slow down', 'Turn the steering wheel sharply', 'Speed up to drive through the water'],
  'Hydroplaning occurs when your tires lose contact with the road surface due to water. Ease off the gas, avoid sudden braking or steering, and keep the wheel straight until your tires regain grip.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the first thing you should do if your brakes fail while driving?',
  'Pump the brake pedal rapidly; if that fails, use the parking brake gradually',
  ARRAY['Turn off the engine immediately', 'Open the car door and drag your foot on the road', 'Shift to the highest gear'],
  'If your brakes fail, pump the pedal rapidly to build up pressure. If that does not work, gradually apply the parking brake. Shift to a lower gear to slow down using engine braking.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if a tire blows out while driving?',
  'Hold the steering wheel firmly, ease off the gas gradually, and steer straight while the vehicle slows',
  ARRAY['Brake hard immediately', 'Speed up to maintain control', 'Turn the wheel in the direction of the blown tire'],
  'If a tire blows out, grip the steering wheel firmly, take your foot off the gas gradually, do not brake suddenly, and steer straight. Let the vehicle slow naturally before gently pulling off the road.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the best way to handle a skid on a wet road?',
  'Ease off the gas and steer in the direction you want to go',
  ARRAY['Brake firmly and turn the wheel sharply', 'Accelerate to regain control', 'Shift to reverse and back up'],
  'If your vehicle skids, take your foot off the gas pedal and steer in the direction you want the front of the vehicle to go. Do not brake suddenly, as this can make the skid worse.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'When driving in fog, which headlights should you use?',
  'Low-beam headlights or fog lights',
  ARRAY['High-beam headlights for maximum visibility', 'No headlights; use only fog lights', 'Parking lights only'],
  'In fog, use low-beam headlights or fog lights. High beams reflect off the fog and reduce your visibility, making it harder to see the road.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if you encounter a dust storm or heavy smoke while driving?',
  'Pull completely off the road, stop, turn off your headlights, and wait for conditions to improve',
  ARRAY['Continue driving slowly with hazard lights on', 'Speed up to get through the storm quickly', 'Stop on the road and turn on hazard lights'],
  'In a dust storm or heavy smoke, pull completely off the road, stop, turn off your lights so other vehicles do not follow you off the road, and wait until visibility improves.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'How do you check your blind spot before changing lanes?',
  'Turn your head and look over your shoulder in the direction you plan to move',
  ARRAY['Use your rearview mirror only', 'Check your side mirrors only', 'Honk your horn to alert other drivers'],
  'Mirrors have blind spots that do not show vehicles beside you. Before changing lanes, turn your head and look over your shoulder in the direction you want to move.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the most common cause of collisions on California highways?',
  'Driving too fast for conditions',
  ARRAY['Mechanical failures', 'Road construction', 'Bad weather'],
  'Driving too fast for conditions is the most common cause of collisions. Always adjust your speed for traffic, weather, road conditions, and visibility.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What does defensive driving mean?',
  'Anticipating hazards, being aware of your surroundings, and being prepared to react safely',
  ARRAY['Driving aggressively to avoid other drivers', 'Driving slower than the speed limit at all times', 'Following other vehicles very closely to prevent lane changes'],
  'Defensive driving means being aware of potential hazards, anticipating the actions of other drivers, and being ready to react safely. Always expect the unexpected.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if an oncoming vehicle has its high beams on and is blinding you?',
  'Look toward the right edge of your lane and avoid looking directly at the headlights',
  ARRAY['Flash your high beams back at them repeatedly', 'Slow down and stop on the road', 'Close one eye to preserve night vision'],
  'If oncoming high beams are blinding you, look toward the right edge of your lane to guide your steering. Avoid looking directly at the lights, and slow down if necessary.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if your accelerator sticks while driving?',
  'Shift to neutral, apply the brakes, and pull off the road safely',
  ARRAY['Turn off the engine immediately and coast', 'Pump the gas pedal repeatedly', 'Open the door and jump out'],
  'If your accelerator sticks, shift to neutral to disengage the engine from the wheels, apply the brakes, and carefully steer to the side of the road. Do not turn off the ignition until stopped, as this may lock the steering.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the safest way to navigate a curve?',
  'Slow down before entering the curve, then accelerate gently through it',
  ARRAY['Brake while in the curve', 'Enter the curve at full speed and coast through', 'Speed up before the curve to maintain momentum'],
  'Slow down before entering a curve, not while you are in it. Braking in a curve can cause you to skid. Gently accelerate through the curve to maintain control.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'If you are feeling drowsy while driving, what is the safest thing to do?',
  'Pull off the road in a safe location and rest before continuing',
  ARRAY['Open the window and turn up the radio', 'Drink coffee and continue driving', 'Switch lanes frequently to stay alert'],
  'If you are drowsy, the only truly safe option is to stop driving. Pull over in a safe location and take a nap or rest until you are alert enough to drive safely.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do when driving at night on a dark road with no streetlights?',
  'Use high-beam headlights and reduce your speed so you can stop within the distance lit by your headlights',
  ARRAY['Drive at the posted speed limit with low beams', 'Use fog lights for maximum visibility', 'Follow other vehicles closely to use their lights'],
  'On dark roads with no other traffic, use high beams to see farther. Reduce speed so you can stop within the distance your headlights illuminate.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the primary cause of rear-end collisions?',
  'Following too closely (tailgating)',
  ARRAY['Driving too slowly', 'Changing lanes without signaling', 'Turning without looking'],
  'Tailgating (following too closely) is the primary cause of rear-end collisions. Maintaining at least a 3-second following distance gives you enough time to react if the vehicle ahead stops suddenly.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'When should you increase your following distance to more than 3 seconds?',
  'When the road is wet, you are being tailgated, driving behind a large vehicle, or visibility is poor',
  ARRAY['Only when driving in snow or ice', 'Only when driving behind a motorcycle', 'Only during rush hour traffic'],
  'Increase your following distance in bad weather, poor visibility, when being tailgated, behind large vehicles, or when following motorcycles. Longer distances give you more reaction time.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if you see a vehicle ahead of you weaving between lanes?',
  'Stay well behind the vehicle, do not attempt to pass, and report it to law enforcement if possible',
  ARRAY['Flash your lights to alert the driver', 'Honk your horn repeatedly', 'Pass the vehicle quickly on the right'],
  'A weaving vehicle may indicate an impaired, distracted, or drowsy driver. Stay well behind, do not try to pass, and if you can safely call 911, report the vehicle.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the correct way to check your mirrors while driving?',
  'Glance at your mirrors every 5 to 8 seconds to maintain awareness of traffic around you',
  ARRAY['Check your mirrors only when changing lanes', 'Check only the rearview mirror every 30 seconds', 'Stare at your mirrors for several seconds to get a complete view'],
  'Regularly scanning your mirrors every 5 to 8 seconds helps you maintain awareness of your surroundings. Brief glances keep you informed without taking your eyes off the road for too long.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the leading cause of death for teens in California?',
  'Motor vehicle crashes',
  ARRAY['Drowning', 'Drug overdoses', 'Falls'],
  'Motor vehicle crashes are the leading cause of death among teenagers. This is why graduated licensing and restrictions for new teen drivers are important safety measures.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do when approaching a stalled vehicle on the freeway?',
  'Slow down, move to another lane if possible, and pass with extra space',
  ARRAY['Maintain your speed and pass close to them', 'Stop and offer assistance', 'Honk your horn as a warning'],
  'If you see a stalled vehicle ahead, slow down and move to another lane if possible. Give the stalled vehicle extra room in case the driver opens a door or moves unexpectedly.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the proper technique for scanning for hazards while driving?',
  'Look far ahead, check mirrors frequently, and scan intersections left-center-right before entering',
  ARRAY['Focus only on the vehicle directly ahead of you', 'Look only at the road surface for debris', 'Keep your eyes fixed on the center of your lane'],
  'Effective hazard scanning involves looking 10-15 seconds ahead, checking mirrors every 5-8 seconds, and scanning intersections left-center-right before entering them.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'If your vehicle starts to slide on ice, what should you do?',
  'Take your foot off the gas and turn the steering wheel gently in the direction you want to go',
  ARRAY['Slam on the brakes to stop immediately', 'Turn the wheel sharply in the opposite direction of the skid', 'Shift into reverse'],
  'On icy roads, if your vehicle begins to skid, ease off the accelerator and steer gently in the direction you want the front of the vehicle to go. Avoid sudden braking or steering.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the safest lane position when driving on a multi-lane highway?',
  'The middle lane, which provides the most options for maneuvering',
  ARRAY['The far left lane for maximum speed', 'The far right lane at all times', 'The lane with the least traffic'],
  'On a multi-lane highway, the middle lane is generally safest because it gives you options to move left or right to avoid hazards and does not have entering/exiting traffic.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if your hood suddenly flies up while driving?',
  'Slow down, try to look through the gap beneath the hood or out the side window, and pull over safely',
  ARRAY['Slam on the brakes immediately', 'Try to reach out and push the hood down', 'Stop in your lane and turn on hazard lights'],
  'If your hood flies up, do not panic. Slow down, try to see the road beneath the hood or out the side window, signal, and carefully pull off the road.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'When driving near parked cars, what hazard should you watch for?',
  'Car doors opening suddenly or pedestrians stepping out from between parked cars',
  ARRAY['Vehicles backing out at high speed', 'Parking meters being over time', 'Vehicles with flat tires'],
  'When driving near parked cars, watch for doors opening suddenly, pedestrians stepping out from between parked vehicles, and vehicles pulling out of parking spaces.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the safest action when you are being tailgated?',
  'Gradually slow down to encourage the tailgater to pass, or move to another lane',
  ARRAY['Speed up to create more distance', 'Brake suddenly to teach them a lesson', 'Ignore them and maintain your speed'],
  'If someone is following too closely, gradually slow down to create a safe situation or change lanes to let them pass. Never brake suddenly, as this could cause a rear-end collision.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'Before starting your engine, what safety checks should you perform?',
  'Adjust mirrors, fasten seatbelt, check for obstacles around the vehicle',
  ARRAY['Check tire pressure and oil level', 'Test your horn and wipers', 'Warm up the engine for 5 minutes'],
  'Before driving, adjust your mirrors, fasten your seatbelt, and check around your vehicle for children, pets, or obstacles. These simple steps can prevent collisions.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if your vehicle stalls on a railroad track?',
  'Get out immediately and move away from the tracks at an angle toward the oncoming train',
  ARRAY['Try to restart the vehicle', 'Stay in the vehicle and call 911', 'Push the vehicle off the tracks'],
  'If your vehicle stalls on railroad tracks, get out immediately and move away from the tracks. Move at an angle toward the oncoming train so debris from a collision will not hit you.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is road rage, and how should you respond to an aggressive driver?',
  'Road rage is violent anger caused by driving stress; avoid eye contact, do not engage, and let them pass',
  ARRAY['Road rage means driving too fast; flash your lights at them', 'Road rage is honking excessively; honk back to assert yourself', 'Road rage only affects new drivers; ignore it completely'],
  'Road rage is aggressive or violent behavior by a driver. Avoid eye contact, do not respond to aggressive gestures, let them pass, and report dangerous behavior to police if needed.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'How far ahead should you look while driving in the city?',
  'At least one to two blocks ahead, or about 10 to 15 seconds of travel time',
  ARRAY['Only at the car directly in front of you', 'About half a block ahead', 'At least one mile ahead'],
  'In the city, scan at least one to two blocks ahead (10-15 seconds of travel time). This gives you time to identify hazards and plan your actions.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'Why is it dangerous to drive in another vehicle''s blind spot?',
  'The other driver cannot see you and may change lanes into your vehicle',
  ARRAY['It causes your engine to overheat', 'It is illegal in California', 'It reduces your fuel efficiency'],
  'Driving in another vehicle''s blind spot is dangerous because the other driver cannot see you in their mirrors. They may change lanes or merge into your vehicle. Speed up or slow down to stay visible.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if your vehicle''s power steering fails?',
  'Grip the wheel firmly and use extra effort to steer; pull over as soon as safely possible',
  ARRAY['Release the steering wheel and coast to a stop', 'Turn off the engine immediately', 'Continue driving normally and fix it later'],
  'If power steering fails, you can still steer the vehicle, but it will require much more effort. Grip the wheel firmly, slow down, and pull over safely to address the issue.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the proper hand position on the steering wheel recommended for safe driving?',
  '9 o''clock and 3 o''clock positions',
  ARRAY['10 o''clock and 2 o''clock positions', '12 o''clock with one hand', '8 o''clock and 4 o''clock positions'],
  'The recommended hand position is 9 and 3 (or 8 and 4). This provides the best control while reducing the risk of injury from airbag deployment compared to the older 10 and 2 position.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'When driving through a flooded area, what should you do?',
  'Avoid driving through it if possible; if you must, drive slowly in low gear',
  ARRAY['Speed up to push through the water', 'Drive through at normal speed', 'Turn off your engine and coast through'],
  'Avoid driving through flooded areas. If unavoidable, drive slowly in low gear to keep water out of the engine. After crossing, test your brakes. Just 6 inches of water can stall a vehicle.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the purpose of ABS (Anti-lock Braking System)?',
  'To prevent the wheels from locking up during hard braking, allowing you to maintain steering control',
  ARRAY['To stop the vehicle faster in all conditions', 'To apply the brakes automatically when you approach another vehicle', 'To reduce wear on brake pads'],
  'ABS prevents wheels from locking up during hard braking, which helps you maintain steering control. With ABS, apply firm, steady pressure to the brake pedal; do not pump the brakes.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'When is the road surface most slippery during a rainstorm?',
  'During the first few minutes of rain, when oil and dust mix with water',
  ARRAY['After it has been raining for an hour', 'Only during heavy downpours', 'When the rain stops'],
  'The road is most slippery during the first few minutes of rain. Oil, grease, and dust on the road surface mix with water to create an especially slippery film.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if you need to stop suddenly and your vehicle does not have ABS?',
  'Pump the brakes rapidly to prevent the wheels from locking up',
  ARRAY['Press the brake pedal as hard as you can and hold it', 'Turn the steering wheel while braking', 'Shift to reverse to slow down'],
  'In a vehicle without ABS, pump the brakes rapidly to prevent wheel lockup. This technique, called threshold braking, helps maintain steering control during an emergency stop.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What should you do if an earthquake occurs while you are driving?',
  'Pull over to the side of the road, away from overpasses, bridges, and power lines, and stay in your vehicle',
  ARRAY['Speed up to drive to a safe location', 'Stop in the middle of the road', 'Get out of your vehicle and lie flat on the ground'],
  'During an earthquake while driving, pull over safely, avoiding overpasses, bridges, power lines, and buildings. Stay in your vehicle, which provides some protection from falling debris.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);

-- ============================================================
-- CATEGORY: Speed Limits (~30 questions)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the maximum speed limit in a school zone when children are present?',
  '25 mph',
  ARRAY['15 mph', '20 mph', '30 mph'],
  'The speed limit in a school zone is 25 mph when children are present or the school zone lights are flashing. Always be extra cautious near schools.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the default speed limit in a residential district in California?',
  '25 mph',
  ARRAY['30 mph', '20 mph', '35 mph'],
  'Unless otherwise posted, the default speed limit in a residential area in California is 25 mph.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the default speed limit near a school when children are not present?',
  '25 mph unless otherwise posted',
  ARRAY['15 mph', '30 mph', '35 mph'],
  'Near schools, the default speed limit is 25 mph unless otherwise posted. When children are present, the limit is also 25 mph with additional caution required.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the maximum speed limit on most California highways?',
  '65 mph',
  ARRAY['55 mph', '70 mph', '75 mph'],
  'The maximum speed limit on most California highways is 65 mph. Some rural freeways may be posted at 70 mph. Always obey the posted speed limit.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the maximum speed limit on a two-lane undivided highway in California unless otherwise posted?',
  '55 mph',
  ARRAY['45 mph', '65 mph', '50 mph'],
  'On two-lane undivided highways, the maximum speed limit is 55 mph unless otherwise posted.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the default speed limit in a business district in California?',
  '25 mph',
  ARRAY['30 mph', '35 mph', '20 mph'],
  'Unless otherwise posted, the speed limit in a business district is 25 mph.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What does California''s "Basic Speed Law" require?',
  'You must never drive faster than is safe for current conditions, regardless of the posted speed limit',
  ARRAY['You must always drive at the posted speed limit', 'You may exceed the speed limit by 5 mph in favorable conditions', 'You must always drive 5 mph below the posted limit in rain'],
  'The Basic Speed Law states that you must never drive faster than is safe for current conditions, even if the posted speed limit is higher. Conditions include weather, traffic, and road surface.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the speed limit in an alley in California?',
  '15 mph',
  ARRAY['25 mph', '10 mph', '20 mph'],
  'The speed limit when driving in an alley is 15 mph in California.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What speed limit applies near a railroad crossing with no crossing gates?',
  '15 mph within 100 feet of the crossing when you cannot see the tracks for 400 feet in both directions',
  ARRAY['25 mph within 200 feet of the crossing', '10 mph at all railroad crossings', '20 mph within 50 feet of the crossing'],
  'You must not drive faster than 15 mph within 100 feet of a railroad crossing where you cannot see the tracks for 400 feet in both directions.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What speed limit applies in a senior citizen zone?',
  '25 mph unless otherwise posted',
  ARRAY['15 mph', '20 mph', '30 mph'],
  'Near senior centers or facilities, the speed limit is 25 mph unless otherwise posted. Watch for elderly pedestrians who may move slowly.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'Can you be cited for driving too slowly on a highway?',
  'Yes, it is illegal to block traffic by driving too slowly when a minimum speed is posted or traffic flow requires it',
  ARRAY['No, there is no minimum speed law in California', 'Only if you are in the left lane', 'Only on freeways with posted minimum speeds'],
  'Driving too slowly can be just as dangerous as speeding. You can be cited for impeding traffic flow. On some highways, minimum speed limits are posted.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'When should you reduce your speed below the posted limit?',
  'In heavy traffic, bad weather, construction zones, or near pedestrians and schools',
  ARRAY['Only when road signs instruct you to', 'Only at night', 'Only when police are visible'],
  'You should reduce your speed whenever conditions make the posted limit unsafe, including heavy traffic, wet roads, fog, construction, and areas with pedestrians.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the speed limit when passing a school building or school grounds during school hours with children outside?',
  '25 mph',
  ARRAY['15 mph', '20 mph', '30 mph'],
  'When passing a school building or grounds, the speed limit is 25 mph when children are outside. Look for the school zone signs and flashing lights.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What should you do if traffic ahead of you is traveling below the speed limit on a freeway?',
  'Match the speed of traffic to maintain a safe flow, even if it is below the posted limit',
  ARRAY['Weave between lanes to maintain the speed limit', 'Drive at the posted speed limit regardless of traffic', 'Use the shoulder to bypass slow traffic'],
  'For safety, match the flow of traffic even if it is below the posted speed limit. Going significantly faster or slower than surrounding traffic increases collision risk.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'On a highway posted at 65 mph, is it legal to drive 70 mph to keep up with the flow of traffic?',
  'No, you may not exceed the posted speed limit regardless of traffic flow',
  ARRAY['Yes, keeping up with traffic is always legal', 'Yes, if you are in the left lane', 'Yes, as long as you are within 5 mph of the posted limit'],
  'The posted speed limit is the maximum legal speed. You may not exceed it, even to keep up with the flow of traffic. You can be cited for speeding even if everyone is going the same speed.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the speed limit when towing a trailer on a freeway?',
  '55 mph, unless posted otherwise',
  ARRAY['65 mph, the same as other vehicles', '45 mph at all times', '60 mph on most freeways'],
  'When towing a trailer or another vehicle, the maximum speed is 55 mph on freeways, regardless of the posted speed limit for other vehicles.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'You are driving on a road with a 45 mph speed limit but it is raining heavily. What speed should you drive?',
  'A speed below 45 mph that is safe for the wet conditions',
  ARRAY['45 mph since that is the posted limit', '35 mph, which is always the rain speed', '25 mph in all rain conditions'],
  'The Basic Speed Law requires you to drive at a speed that is safe for conditions. In heavy rain, a safe speed will be well below the posted limit.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the speed limit on blind curves and blind intersections?',
  '15 mph when you cannot see at least 100 feet ahead',
  ARRAY['25 mph', '10 mph', '20 mph'],
  'When approaching a blind intersection or curve where you cannot see at least 100 feet in both directions, the speed limit is 15 mph.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'Why is speeding in a construction zone especially dangerous?',
  'Workers may be close to traffic, lanes may be narrow, and road surfaces may be uneven',
  ARRAY['It is not any more dangerous than speeding elsewhere', 'Only because fines are doubled', 'Because construction vehicles move unpredictably'],
  'Construction zones have workers near traffic, narrower lanes, uneven surfaces, and unexpected lane shifts. Speeding in these areas puts workers and yourself at extreme risk.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the speed limit when driving within 500 to 1000 feet of a school while children are outside?',
  '25 mph when children are outside, unless a lower speed is posted',
  ARRAY['35 mph during school hours', '15 mph at all times', '20 mph from 7 AM to 4 PM'],
  'When driving within 500 to 1,000 feet of a school during hours when children are going to or leaving school, or when children are present, the speed limit is 25 mph.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What advisory speed signs do you sometimes see below curve warning signs?',
  'Black numbers on a white square showing a recommended safe speed for the curve',
  ARRAY['Orange numbers showing the minimum speed', 'Green numbers showing the maximum speed', 'Red numbers showing the required speed'],
  'Advisory speed plaques appear below curve warning signs. They show a recommended safe speed in black on white. While advisory, exceeding them on a wet road is especially risky.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the speed limit when approaching an uncontrolled blind intersection?',
  '15 mph',
  ARRAY['25 mph', '20 mph', '10 mph'],
  'When approaching a blind intersection where you cannot see cross traffic for 100 feet in both directions, the speed limit is 15 mph.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'How does vehicle speed affect the severity of a collision?',
  'Doubling your speed quadruples the force of impact',
  ARRAY['Doubling speed doubles impact force', 'Speed has minimal effect on crash severity', 'Impact force increases by 50% when speed doubles'],
  'The force of impact in a collision increases with the square of the speed. Doubling your speed quadruples the force, making high-speed crashes much more severe.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'Is there a minimum speed on California freeways?',
  'Generally no specific minimum is posted, but you must not impede the normal flow of traffic',
  ARRAY['Yes, the minimum is always 45 mph', 'Yes, the minimum is 55 mph', 'No, you can drive at any speed on freeways'],
  'While most California freeways do not have a posted minimum speed, it is illegal to drive so slowly that you impede the normal and reasonable flow of traffic.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the posted speed limit on some rural interstate highways in California?',
  '70 mph',
  ARRAY['75 mph', '80 mph', '65 mph only'],
  'Some rural interstate highways in California have a posted speed limit of 70 mph. Always obey the posted limit for the specific road you are traveling on.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

-- ============================================================
-- CATEGORY: DUI/Drug Laws (~30 questions)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the legal blood alcohol concentration (BAC) limit for drivers under 21 in California?',
  '0.01%',
  ARRAY['0.02%', '0.05%', '0.08%'],
  'California has a zero-tolerance law for drivers under 21. The BAC limit is 0.01%, which means virtually any amount of alcohol is illegal for underage drivers.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the legal BAC limit for drivers 21 and older operating a private vehicle in California?',
  '0.08%',
  ARRAY['0.10%', '0.05%', '0.04%'],
  'The legal BAC limit for drivers 21 and older operating a regular (non-commercial) vehicle is 0.08%. Driving at or above this level is a DUI.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the BAC limit for commercial vehicle drivers in California?',
  '0.04%',
  ARRAY['0.08%', '0.02%', '0.06%'],
  'Commercial vehicle drivers have a stricter BAC limit of 0.04%, which is half the limit for regular drivers. Commercial driving requires higher safety standards.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What happens to your driving privilege if you are under 21 and are caught driving with a BAC of 0.01% or more?',
  'Your license will be suspended for one year',
  ARRAY['You will receive a warning letter', 'You will get a small fine but keep your license', 'Nothing happens for a first offense'],
  'Under California''s zero-tolerance law, drivers under 21 caught with a BAC of 0.01% or more face a one-year license suspension for a first offense.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'Can you be arrested for DUI even if your BAC is below 0.08%?',
  'Yes, if you are impaired to the point that you cannot drive safely',
  ARRAY['No, 0.08% is the only legal standard', 'Only if you are under 21', 'Only if you are also using drugs'],
  'You can be arrested for DUI at any BAC if the officer determines you are too impaired to drive safely. This includes impairment from legal or illegal drugs.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the penalty for a first DUI conviction in California for a driver 21 or older?',
  'Up to 6 months in jail, fines up to $1,000, and a 6-month license suspension',
  ARRAY['A warning and a traffic school requirement', 'Probation only, no jail time possible', 'A fine of $250 and no license suspension'],
  'A first DUI conviction can result in jail time (up to 6 months), fines (up to approximately $1,000 plus penalty assessments), a 6-month license suspension, and mandatory DUI education.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'Can prescription drugs affect your ability to drive?',
  'Yes, many prescription drugs can impair driving and it is illegal to drive while impaired by any drug',
  ARRAY['No, only illegal drugs affect driving', 'Only if you take more than the prescribed dose', 'Only sleep medications affect driving'],
  'Prescription and over-the-counter drugs can impair driving. It is illegal to drive while impaired by any substance, including legal medications that cause drowsiness or impaired judgment.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'Is it legal to drive after using marijuana in California?',
  'No, driving while impaired by marijuana is illegal regardless of whether marijuana is legal to possess',
  ARRAY['Yes, since marijuana is legal in California', 'Yes, if you wait one hour after using it', 'Only if you have a medical marijuana card'],
  'Even though recreational marijuana is legal in California, driving while impaired by marijuana is illegal. THC impairs reaction time, judgment, and coordination.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the purpose of an Ignition Interlock Device (IID)?',
  'It prevents the vehicle from starting if it detects alcohol on the driver''s breath',
  ARRAY['It limits the vehicle speed to 25 mph', 'It tracks the driver''s location via GPS', 'It records all conversations inside the vehicle'],
  'An IID requires the driver to blow into a breathalyzer before starting the vehicle. If alcohol is detected, the vehicle will not start. IIDs may be required after a DUI conviction.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the penalty for a DUI that causes injury to another person?',
  'It can be charged as a felony with state prison time, larger fines, and longer license revocation',
  ARRAY['The same penalty as a standard DUI', 'Only community service and a fine', 'A mandatory 30-day jail sentence'],
  'A DUI causing injury can be charged as a felony in California. Penalties include state prison time, substantial fines, and extended license revocation, in addition to civil liability.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'How does alcohol affect your driving ability?',
  'It impairs judgment, slows reaction time, reduces coordination, and decreases concentration',
  ARRAY['It only affects your vision', 'It only impairs coordination, not judgment', 'It makes you more alert but less coordinated'],
  'Alcohol impairs multiple driving abilities simultaneously: judgment, reaction time, coordination, concentration, and vision. Even one drink can begin to impair these functions.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the only effective way to lower your BAC after drinking?',
  'Time; your body processes alcohol at a fixed rate that cannot be sped up',
  ARRAY['Drinking coffee', 'Taking a cold shower', 'Eating food and drinking water'],
  'Only time can lower your BAC. Your liver processes alcohol at about one standard drink per hour. Coffee, cold showers, food, and exercise do not speed up this process.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is a standard drink in terms of alcohol content?',
  '12 oz of beer, 5 oz of wine, or 1.5 oz of distilled spirits (80 proof)',
  ARRAY['Any size glass of beer, wine, or liquor', '8 oz of beer, 4 oz of wine, or 2 oz of spirits', '16 oz of beer, 8 oz of wine, or 3 oz of spirits'],
  'A standard drink contains about 0.6 ounces of pure alcohol: 12 oz of regular beer, 5 oz of wine, or 1.5 oz of 80-proof spirits. Knowing this helps you estimate your BAC.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'Is it legal to have an open container of alcohol in a vehicle in California?',
  'No, open containers of alcohol are prohibited in any area of the vehicle accessible to driver or passengers',
  ARRAY['Yes, as long as only passengers are drinking', 'Yes, if the container is in the back seat', 'Only in the trunk area of a sedan'],
  'California law prohibits open containers of alcohol anywhere in the vehicle that is accessible to the driver or passengers. The container must be sealed, full, and in the trunk.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'If you are stopped at a DUI checkpoint, what are you required to do?',
  'Show your license and registration; officers may briefly check for signs of impairment',
  ARRAY['Submit to a breathalyzer test', 'Allow officers to search your vehicle', 'Step out of the vehicle for a full sobriety test'],
  'At a DUI checkpoint, officers may ask for your license and registration and briefly observe you for signs of impairment. You are not required to answer questions about drinking.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What additional penalty applies to a DUI conviction for a driver under 21?',
  'A one-year license revocation, in addition to any criminal penalties',
  ARRAY['No additional penalties beyond those for adults', 'Community service of 100 hours', 'A vehicle impoundment for 6 months'],
  'Drivers under 21 convicted of DUI face a mandatory one-year license revocation. This is in addition to fines, possible jail time, and mandatory DUI education programs.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'How can combining alcohol and drugs affect your driving?',
  'The combined effect is often greater than either substance alone, making impairment much worse',
  ARRAY['They cancel each other out', 'The effect is the same as alcohol alone', 'Drugs counteract the effects of alcohol'],
  'Mixing alcohol with other drugs (including prescription medications) can multiply the impairing effects. The combined effect is often much greater than either substance alone.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What should you do if you have been drinking and need to get home?',
  'Use a designated driver, call a rideshare service, taxi, or public transit',
  ARRAY['Drive slowly and carefully', 'Wait 30 minutes and then drive', 'Drive on back roads to avoid police'],
  'The safest choice is to never drive after drinking. Plan ahead by designating a sober driver, using a rideshare service, taxi, or public transportation.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What happens if you are caught driving with a suspended license due to a prior DUI?',
  'You face additional criminal charges, fines, and possible jail time',
  ARRAY['You get another warning', 'Your suspension period is extended by one month', 'Nothing additional happens'],
  'Driving on a DUI-suspended license is a separate criminal offense in California. Penalties include additional fines, jail time, and further extension of your license suspension.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is a DUI education program, and when is it required?',
  'A mandatory court-ordered program teaching about the dangers of impaired driving, required after a DUI conviction',
  ARRAY['An optional online course for reducing fines', 'A program only required for repeat offenders', 'A voluntary class that dismisses a DUI charge'],
  'After a DUI conviction in California, you are typically required to complete a DUI education program. The length varies from 3 months (first offense) to 30 months (multiple offenses).',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'Can you be charged with DUI for sleeping in your car while intoxicated?',
  'Yes, if you have physical control of the vehicle (such as having the keys in the ignition)',
  ARRAY['No, you must be moving for a DUI charge', 'Only if the engine is running', 'No, sleeping it off is always the safest choice'],
  'In California, you can potentially be charged with DUI if you are in physical control of a vehicle while intoxicated, even if the vehicle is parked and you are sleeping.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the look-back period for DUI convictions in California?',
  '10 years; any DUI within this period counts as a prior offense for sentencing',
  ARRAY['5 years', '7 years', '3 years'],
  'California uses a 10-year look-back period for DUI offenses. A second DUI within 10 years of the first results in enhanced penalties, with escalating penalties for each subsequent offense.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'At what BAC level do most people begin to show impaired driving ability?',
  '0.05%, even though it is below the legal limit for adults',
  ARRAY['0.08%', '0.10%', '0.02%'],
  'While the legal limit is 0.08%, most people begin to show some driving impairment at 0.05% BAC. Judgment, alertness, and coordination start to decline well before reaching the legal limit.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'Which of the following medications could impair your driving?',
  'Antihistamines, cough medicines, sleep aids, and some pain relievers',
  ARRAY['Only controlled substances', 'Only medications labeled as sedatives', 'Only prescription drugs, not over-the-counter'],
  'Many common over-the-counter and prescription medications can impair driving, including antihistamines, cold medicines, sleep aids, and pain relievers. Always read labels for drowsiness warnings.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the penalty for a second DUI conviction within 10 years in California?',
  'Up to 1 year in jail, higher fines, a 2-year license suspension, and mandatory 18-month DUI education program',
  ARRAY['The same penalties as a first DUI', 'A 6-month license suspension', 'Probation with no jail time'],
  'A second DUI within 10 years carries enhanced penalties: up to one year in jail, increased fines, a two-year license suspension, and mandatory installation of an IID.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'Is it possible to be charged with DUI while riding a bicycle in California?',
  'Yes, California law prohibits riding a bicycle while under the influence of alcohol or drugs',
  ARRAY['No, DUI laws only apply to motor vehicles', 'Only if you are on a public road', 'Only for electric bicycles'],
  'California Vehicle Code Section 21200.5 makes it illegal to ride a bicycle on a highway while under the influence of alcohol or drugs. Penalties include fines.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What happens if a driver under 21 is found with any alcoholic beverage in the vehicle?',
  'The vehicle may be impounded for 30 days, and the driver faces additional penalties',
  ARRAY['Nothing unless the driver is over the BAC limit', 'A verbal warning only', 'Only a $50 fine'],
  'For drivers under 21, it is illegal to have any alcoholic beverage in the vehicle, whether opened or unopened (unless accompanied by a parent or guardian). The vehicle may be impounded.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

-- ============================================================
-- CATEGORY: Parking (~30 questions)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What does a red painted curb mean?',
  'No stopping, standing, or parking at any time',
  ARRAY['Passenger loading only for 3 minutes', 'Fire lane parking for emergencies', 'Limited parking during business hours'],
  'A red curb means no stopping, standing, or parking at any time. This includes fire lanes and fire hydrant zones.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What does a white painted curb mean?',
  'Passenger loading and unloading only; 5-minute limit',
  ARRAY['Time-limited parking, usually 15-30 minutes', 'No parking at any time', 'Commercial loading zone only'],
  'A white curb is for loading and unloading passengers or picking up/dropping off mail. The time limit is typically 5 minutes.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What does a green painted curb indicate?',
  'Time-limited parking, usually between 15 and 30 minutes',
  ARRAY['Passenger loading zone', 'Unlimited parking', 'Commercial vehicle parking only'],
  'A green curb indicates time-limited parking. The time limit is usually shown on a nearby sign or on the curb. Typical limits are 15 to 30 minutes during posted hours.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What does a yellow painted curb mean?',
  'Loading zone for commercial vehicles only during business hours; non-commercial drivers may stop briefly to load or unload passengers',
  ARRAY['Taxi stand only', 'School bus loading zone', 'No parking during daytime hours'],
  'A yellow curb is a loading zone for commercial vehicles during business hours. Non-commercial drivers may stop only to load or unload passengers or freight; the driver must stay with the vehicle.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What does a blue painted curb mean?',
  'Parking is reserved for disabled persons with a valid placard or license plate',
  ARRAY['Short-term parking for anyone, up to 15 minutes', 'Hospital emergency zone', 'Bicycle parking zone'],
  'A blue curb is reserved for disabled persons who display a valid disabled parking placard or special license plate. It is illegal to park in these spaces without proper authorization.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'How far from a railroad track must you park?',
  'At least 7.5 feet from the nearest rail',
  ARRAY['At least 15 feet', 'At least 10 feet', 'At least 5 feet'],
  'You must not park within 7.5 feet of a railroad track. This keeps parked vehicles clear of the path of trains.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'How far must you park from a crosswalk at an intersection?',
  'At least 15 feet',
  ARRAY['At least 10 feet', 'At least 20 feet', 'At least 5 feet'],
  'You must not park within 15 feet of a crosswalk at an intersection. This ensures pedestrians are visible to approaching traffic.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'When parking uphill on a street with no curb, which way should you turn your wheels?',
  'To the right, toward the edge of the road',
  ARRAY['To the left, away from the road', 'Straight ahead', 'It does not matter without a curb'],
  'When parking uphill or downhill with no curb, turn your wheels toward the right (edge of the road). If the vehicle rolls, it will roll off the road instead of into traffic.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Is it legal to park in front of a driveway?',
  'No, you may not block access to any public or private driveway',
  ARRAY['Yes, if you are the property owner', 'Yes, for up to 5 minutes', 'Yes, if there is no car in the driveway'],
  'It is illegal to park in front of or block any driveway, whether public or private, even for a short time. Other vehicles must be able to enter and exit.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What is the penalty for illegally parking in a disabled person parking space?',
  'A fine of $250 to $1,000 for a first offense',
  ARRAY['A $50 fine', 'A warning ticket only', 'No penalty unless a disabled person needs the space'],
  'Illegally parking in a disabled parking space is subject to fines from $250 to $1,000 or more. Your vehicle may also be towed.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'How close to a stop sign can you legally park?',
  'You must not park within 15 feet of a stop sign',
  ARRAY['You must not park within 10 feet', 'You must not park within 20 feet', 'You must not park within 30 feet'],
  'Parking within 15 feet of a stop sign is prohibited because it can obstruct visibility for drivers approaching the intersection.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Is it legal to park on a sidewalk?',
  'No, parking on a sidewalk is always illegal',
  ARRAY['Yes, if there is enough room for pedestrians to walk', 'Yes, for loading and unloading only', 'Only if your vehicle is small enough'],
  'It is always illegal to park on a sidewalk. Sidewalks are for pedestrians. Even partially blocking the sidewalk is a violation.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'When parallel parking, how far should your vehicle be from the curb?',
  'No more than 18 inches from the curb',
  ARRAY['No more than 12 inches', 'No more than 24 inches', 'No more than 6 inches'],
  'When parallel parking, your vehicle must be within 18 inches of the curb. Being further out can obstruct traffic and is a violation.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Can you park in a bicycle lane?',
  'No, you may not stop, park, or leave a vehicle in a bike lane',
  ARRAY['Yes, for up to 5 minutes', 'Yes, if there are no cyclists present', 'Only during non-rush hours'],
  'It is illegal to park, stop, or leave your vehicle in a bicycle lane at any time. Cyclists have the right to an unobstructed lane.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What should you do before opening your car door on the traffic side?',
  'Check your mirrors and look behind you for approaching traffic, cyclists, and pedestrians',
  ARRAY['Honk your horn to alert traffic', 'Open the door slowly and traffic will stop', 'Open the door quickly to minimize exposure'],
  'Before opening your door on the traffic side, always check your mirrors and look over your shoulder for approaching vehicles, bicyclists, and pedestrians. "Dooring" a cyclist is dangerous and illegal.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Is it legal to park on a bridge or highway overpass?',
  'No, parking on bridges, highway overpasses, or in tunnels is prohibited',
  ARRAY['Yes, if there is a shoulder wide enough', 'Yes, in an emergency for up to 30 minutes', 'Only if your hazard lights are on'],
  'You may not park on a bridge, highway overpass, or in a tunnel. These are dangerous locations where parked vehicles can cause collisions.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What must you always do when leaving your vehicle parked?',
  'Set the parking brake and turn off the engine; remove the key and lock the doors',
  ARRAY['Leave the engine running if you will return soon', 'Leave the windows open for ventilation', 'Put the car in neutral if on level ground'],
  'When leaving your vehicle, always set the parking brake, turn off the engine, take your keys, and lock the doors. If on a hill, turn your wheels appropriately.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Is double parking (parking beside another parked vehicle in the traffic lane) legal?',
  'No, double parking is illegal at all times',
  ARRAY['Yes, if you are only stopping for a few minutes', 'Yes, with hazard lights on', 'Only in commercial zones'],
  'Double parking -- parking your vehicle in the traffic lane next to another parked car -- is always illegal. It blocks traffic and creates hazards.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'How far from a fire station driveway must you park on the same side of the street?',
  'At least 15 feet',
  ARRAY['At least 25 feet', 'At least 10 feet', 'At least 50 feet'],
  'You must not park within 15 feet of a fire station driveway on the same side of the street. On the opposite side, the distance is different and may be signed.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Can you leave children unattended in a parked vehicle?',
  'No, it is illegal to leave children 6 years old or younger unattended in a vehicle',
  ARRAY['Yes, if the windows are cracked open', 'Yes, for up to 10 minutes', 'Only if another child over 12 is present'],
  'California law prohibits leaving a child 6 years old or younger unattended in a motor vehicle. The penalty can be a fine or imprisonment if the child is harmed.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'When are you allowed to park next to another parked vehicle (double park)?',
  'Never; double parking is not permitted under any circumstances',
  ARRAY['When making a quick delivery', 'When your hazard lights are on', 'When all parking spaces are full'],
  'Double parking is illegal at all times in California. Find a legal parking space even if it means walking farther.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Where is it illegal to park near an intersection without traffic signals?',
  'Within 15 feet of a crosswalk at the intersection',
  ARRAY['Within 50 feet of the intersection', 'Within 5 feet of the corner', 'Within 25 feet of any cross street'],
  'You must not park within 15 feet of a crosswalk at an uncontrolled intersection, to maintain visibility for both drivers and pedestrians.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What should you do if you park in a metered space and the meter expires?',
  'Move your vehicle before the meter expires or add more time, as you can be ticketed for an expired meter',
  ARRAY['You have a 15-minute grace period after the meter expires', 'Only meter maids can issue tickets, and they rarely check', 'The expired meter is a warning, not a violation'],
  'Parking at an expired meter is a violation and you can be ticketed. Always keep track of your time and move or add more time before the meter runs out.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'How should you park on a one-way street?',
  'Park on either side of the street, with your wheels within 18 inches of the curb',
  ARRAY['Park only on the right side of the street', 'Park only on the left side of the street', 'Park in the center lane if it is wide enough'],
  'On a one-way street, you may park on either side. Your wheels must be within 18 inches of the curb.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Is it legal to park your vehicle on the freeway for a non-emergency reason?',
  'No, you may only stop on a freeway in an emergency',
  ARRAY['Yes, on the shoulder if you need to make a phone call', 'Yes, for up to 15 minutes', 'Yes, if your hazard lights are on'],
  'Stopping or parking on a freeway is only allowed in emergencies. If your vehicle breaks down, move it to the right shoulder as far as possible.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'What is the correct way to parallel park?',
  'Signal, pull alongside the vehicle ahead, steer sharply toward the curb, straighten wheels, then center in the space',
  ARRAY['Drive straight into the space at an angle', 'Back in at full speed to save time', 'Pull forward past the space and reverse in a straight line'],
  'Parallel parking involves pulling alongside the vehicle in front, turning the wheel sharply toward the curb as you back up, then straightening out. Practice until you can park within 18 inches of the curb.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'When parking on a hill with a curb facing downhill, what additional step should you take?',
  'Set the parking brake and leave the vehicle in gear (or Park for automatic) in addition to turning wheels toward the curb',
  ARRAY['Set the parking brake only, wheels do not matter', 'Leave the car in neutral so it can be moved if needed', 'Block the rear tire with a rock'],
  'When parking on a hill, always set the parking brake, leave the transmission in gear (or Park for automatic), and turn the wheels appropriately. This provides multiple safeguards.',
  'CA DMV Handbook, Chapter 9: Parking'
);

-- ============================================================
-- CATEGORY: Sharing the Road (~30 questions)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'How much space should you give a bicycle when passing?',
  'At least 3 feet of clearance between your vehicle and the bicyclist',
  ARRAY['At least 1 foot of clearance', 'At least 6 feet of clearance', 'No specific distance is required'],
  'California law requires motorists to give at least 3 feet of clearance when passing a bicyclist. If you cannot give 3 feet, slow down to a safe speed and pass when it is safe.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'Do bicyclists have the same rights as motor vehicle drivers on the road?',
  'Yes, bicyclists have the same rights and responsibilities as motor vehicle drivers',
  ARRAY['No, bicyclists must always yield to motor vehicles', 'Only on streets with bike lanes', 'Only in residential areas'],
  'Bicyclists are legally considered vehicle operators and have the same rights and responsibilities as motor vehicle drivers on the road. Respect their space.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'When making a right turn at an intersection, how should you check for bicyclists?',
  'Check your right mirror and look over your right shoulder for cyclists before turning',
  ARRAY['Honk your horn before turning to warn them', 'Assume they will stop for you', 'Check only the left mirror since cyclists ride on the right'],
  'Before turning right, check your right mirror and look over your right shoulder for bicyclists who may be approaching from behind in the bike lane or on the right side of the road.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'When following a motorcycle, how much following distance should you maintain?',
  'At least 4 seconds, since motorcycles can stop faster than cars',
  ARRAY['The same 3-second distance as following a car', 'At least 2 seconds', 'As close as possible to draft behind them'],
  'Give motorcycles extra following distance -- at least 4 seconds. Motorcycles can stop much faster than cars, and if you follow too closely, you may not have time to stop.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What is lane splitting, and is it legal in California?',
  'Lane splitting is when a motorcycle rides between lanes of traffic, and it is legal in California',
  ARRAY['Lane splitting is always illegal in California', 'It is legal only on freeways', 'It is legal only during rush hour'],
  'California is the only state that explicitly allows lane splitting for motorcycles. Motorcyclists may ride between lanes of traffic. Drivers should check mirrors before changing lanes.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'Why should you be especially careful around large trucks and buses?',
  'They have larger blind spots, take longer to stop, and make wider turns',
  ARRAY['They are always going faster than passenger cars', 'Their drivers are less experienced', 'They have priority over passenger vehicles'],
  'Large trucks and buses have bigger blind spots (no-zones), require more stopping distance, and make wider turns. Give them extra space and stay out of their blind spots.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'Where are a large truck''s blind spots (no-zones)?',
  'Directly behind, directly in front, and along both sides, especially the right side',
  ARRAY['Only directly behind the truck', 'Only on the left side of the truck', 'Trucks have no blind spots due to large mirrors'],
  'A large truck has four main blind spots: directly in front, directly behind, along the left side near the cab, and along the right side (the largest blind spot). If you cannot see the truck driver in their mirror, they cannot see you.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'When a large truck makes a right turn, why might it swing wide to the left first?',
  'Large trucks need extra room to make right turns and may swing left to avoid mounting the curb',
  ARRAY['The driver is trying to change lanes', 'The truck is making a U-turn', 'The truck is having mechanical problems'],
  'Large trucks often need to swing wide to the left before making a right turn. Never try to squeeze between a turning truck and the curb -- you could be caught in the truck''s blind spot.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What should you do when sharing the road with a slow-moving farm vehicle?',
  'Slow down, be patient, and pass only when it is safe and legal to do so',
  ARRAY['Honk your horn to make them pull over', 'Pass on the right using the shoulder', 'Flash your lights to signal them'],
  'Farm vehicles and other slow-moving vehicles have a right to use the road. Be patient, slow down, and pass only when it is safe and legal. Watch for the orange triangle slow-moving vehicle sign.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What should you do when you see a pedestrian with a white cane at a crosswalk?',
  'Stop and yield the right-of-way; the person is visually impaired',
  ARRAY['Honk your horn so they know a car is present', 'Proceed carefully since they can hear your car', 'Rev your engine to alert them of your presence'],
  'A white cane indicates a visually impaired pedestrian. Stop and yield. Do not honk, as it may startle or confuse them. Wait until they have completely crossed.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'Are electric scooter riders allowed on the road?',
  'Yes, electric scooter riders may use roads, bike lanes, and paths, and drivers must share the road with them',
  ARRAY['No, electric scooters are only allowed on sidewalks', 'Only on streets with speed limits of 25 mph or less', 'Only in dedicated scooter lanes'],
  'Electric scooter riders are allowed on roads, bike lanes, and bike paths. Drivers should treat them similarly to bicyclists and give them adequate space.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'When driving near a school, what additional hazards should you watch for?',
  'Children crossing unexpectedly, school buses stopping, crossing guards, and bicyclists',
  ARRAY['Only school buses with flashing lights', 'Only children at marked crosswalks', 'Only crossing guards directing traffic'],
  'Near schools, watch for children who may dart into the street unexpectedly, school buses loading/unloading, crossing guards, bicyclists, and other pedestrians.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What should you do if you are driving behind a bus that is stopped at a bus stop?',
  'Slow down and prepare to stop, as passengers may cross in front of the bus after exiting',
  ARRAY['Pass the bus quickly before passengers exit', 'Honk to alert passengers you are behind the bus', 'Change lanes and speed up to pass'],
  'When a bus stops to load or unload passengers, slow down and be prepared for pedestrians to cross in front of the bus. They may not see you approaching.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What extra care should you take when driving near someone in a wheelchair or using a mobility device?',
  'Give them extra space, slow down, and be patient, as they may move slowly or unpredictably',
  ARRAY['Honk to let them know you see them', 'Pass closely but quickly', 'They should not be on the road; flash your lights'],
  'People in wheelchairs or using mobility devices have the same rights as pedestrians. Give them extra space, be patient, and never assume they can move quickly out of your way.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'Why should you never follow a fire truck closer than 300 feet?',
  'It is illegal and dangerous; the fire truck may stop suddenly and deploy equipment',
  ARRAY['The exhaust from the fire truck is toxic', 'The fire truck driver cannot see you', 'It is not illegal, just discouraged'],
  'California law prohibits following a fire truck responding to an alarm within 300 feet. The truck may stop suddenly to respond to the emergency.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What should you do when driving near a horse-drawn vehicle?',
  'Slow down, give plenty of space, and avoid honking, as the horse may be startled',
  ARRAY['Honk to alert the driver of the horse-drawn vehicle', 'Speed up to pass them quickly', 'Flash your lights to warn them'],
  'Horse-drawn vehicles have the right to use the road. Slow down, give plenty of space, and do not honk or make sudden movements that could startle the horse.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What precautions should you take when passing a stopped ice cream truck?',
  'Slow down and watch for children who may run into the street from either direction',
  ARRAY['Proceed at normal speed since the truck is parked', 'Honk to warn children you are approaching', 'Only slow down if you see children'],
  'Children are often very excited near ice cream trucks and may run into the street without looking. Always slow down and be prepared to stop when passing a stopped ice cream truck.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'When driving next to a motorcyclist, why should you check your blind spots more carefully?',
  'Motorcycles are smaller and can easily be hidden in your blind spots',
  ARRAY['Motorcyclists always drive in blind spots', 'Motorcycles make no noise', 'Motorcyclists are inexperienced drivers'],
  'Motorcycles are much smaller than cars and can easily be hidden in your blind spots. Always check your mirrors and look over your shoulder before changing lanes.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What should you do if you are driving and a bicyclist ahead of you signals a left turn?',
  'Give the bicyclist the right-of-way and allow them to make their turn safely',
  ARRAY['Speed up and pass before they turn', 'Honk to let them know you are behind them', 'Ignore the signal since bicyclists do not have right-of-way'],
  'When a bicyclist signals a left turn, treat them as you would another vehicle. Give them space and time to make their turn safely.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'How should you react if a pedestrian is crossing the street outside of a crosswalk?',
  'Yield to the pedestrian and allow them to cross safely, even though they may be jaywalking',
  ARRAY['You have the right-of-way; proceed normally', 'Honk your horn to warn them', 'Flash your lights and drive around them'],
  'Even if a pedestrian is crossing illegally (jaywalking), you must still yield and avoid hitting them. Drivers have a duty to exercise care to avoid a collision with any pedestrian.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What is the proper way to share the road with a streetcar or light rail vehicle?',
  'Do not pass on the left, yield when they are loading/unloading passengers, and watch for tracks',
  ARRAY['Treat them like any other vehicle and pass freely', 'Always pass on the left side', 'Streetcars must yield to all automobile traffic'],
  'Streetcars and light rail vehicles operate on fixed tracks and cannot swerve to avoid you. Do not pass on the left, yield at stops, and be careful driving across tracks.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What should you do when approaching a road maintenance or construction crew?',
  'Slow down, follow the directions of flaggers, and be prepared for lane shifts and workers near the road',
  ARRAY['Maintain your speed and pass quickly', 'Honk to alert the workers you are approaching', 'Change lanes only if a sign directs you to'],
  'In work zones, slow down, obey flaggers and warning signs, and watch for workers and equipment near or in the road. Fines are often doubled in construction zones.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'How should you drive when sharing the road with pedestrians who are elderly or have disabilities?',
  'Be extra patient, give them more time to cross, and do not honk or rush them',
  ARRAY['Honk gently so they know to hurry', 'Drive around them if they are moving slowly', 'They should only cross at signalized intersections'],
  'Elderly pedestrians and those with disabilities may move slowly or unpredictably. Be patient, give them extra time to cross, and never rush or honk at them.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What is the danger of driving alongside a large truck when it is making a turn?',
  'You could be caught in the truck''s blind spot and crushed between the truck and the curb',
  ARRAY['The truck may splash water on your vehicle', 'The truck may block your view of traffic signals', 'There is no additional danger compared to passenger vehicles'],
  'When a large truck turns, it can squeeze vehicles between itself and the curb. Never drive alongside a turning truck, and never try to pass on the right when a truck is making a right turn.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'When is a motorcyclist most at risk at an intersection?',
  'When a vehicle is making a left turn in front of the motorcycle, which is the most common car-motorcycle collision',
  ARRAY['When the motorcyclist is turning right', 'When the motorcyclist is stopped at a red light', 'When the motorcyclist is on a highway'],
  'The most common type of car-motorcycle collision involves a vehicle turning left in front of an oncoming motorcycle. Always look twice for motorcycles before turning.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What is the rule for driving near a trolley or bus that has stopped to pick up passengers?',
  'Remain stopped behind the bus or trolley until passengers have finished boarding; do not pass when passengers are entering or exiting',
  ARRAY['You may pass slowly on the left', 'You may pass if no passengers are visible', 'Only stop if a stop sign swings out from the bus'],
  'When a trolley or bus stops to load/unload passengers, you should stop and remain behind until passengers are safely out of the roadway.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'When driving near a bicyclist at night, what extra precaution should you take?',
  'Watch carefully for cyclists who may be difficult to see, even with reflectors and lights',
  ARRAY['Flash your high beams to illuminate them', 'Honk to alert them of your presence', 'Cyclists are not allowed to ride at night'],
  'Bicyclists are harder to see at night. Watch carefully for them, especially at intersections. Look for reflectors and lights. Give extra space when passing.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'If a large truck is behind you and you need to stop, what should you do differently?',
  'Signal and brake early and gradually to give the truck extra time to slow down',
  ARRAY['Stop quickly since the truck has air brakes', 'Speed up to get away from the truck', 'Nothing different; brake as you normally would'],
  'Large trucks need much more distance to stop than cars. If a truck is following you, brake earlier and more gradually to give the truck driver time to react.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

-- ============================================================
-- ADDITIONAL QUESTIONS: Traffic Laws (supplemental)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What is the maximum fine for littering from a vehicle on a California highway?',
  '$1,000',
  ARRAY['$250', '$500', '$100'],
  'Littering from a vehicle on a California highway can result in fines up to $1,000. California takes littering seriously due to fire risk and environmental impact.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When driving in a construction zone, what must you do if a flagger is holding a "SLOW" sign?',
  'Slow down and proceed carefully through the construction zone',
  ARRAY['Stop completely until the sign changes', 'Drive at the normal speed limit', 'Change lanes to avoid the construction zone'],
  'When a flagger displays a "SLOW" sign, reduce your speed and proceed carefully through the work zone. Follow any additional directions the flagger gives.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'Is it legal to wear headphones or earbuds covering both ears while driving in California?',
  'No, you may not wear headphones or earbuds covering both ears while driving',
  ARRAY['Yes, as long as the volume is low', 'Yes, but only for phone calls', 'Yes, if you are using GPS navigation'],
  'California law prohibits wearing headphones or earbuds in both ears while driving or cycling. You may use a single earbud in one ear.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What should you do if you approach a flooded road where the water depth is unknown?',
  'Do not attempt to cross; turn around and find an alternate route',
  ARRAY['Drive through slowly', 'Follow the vehicle ahead through the water', 'Speed through to create momentum'],
  'Never drive through flooded roads where you cannot see the road surface. Even shallow water can sweep a vehicle off the road. Turn around and find another route.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'When two vehicles meet on a steep mountain road where neither can pass, who must yield?',
  'The vehicle going downhill must yield by backing up to a wider point',
  ARRAY['The vehicle going uphill must yield', 'The smaller vehicle must yield', 'The vehicle closest to a pullout must yield'],
  'On a steep narrow mountain road, the vehicle going downhill must yield to the vehicle going uphill, because it is easier and safer to back downhill than uphill.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'What does a "No Parking" sign mean?',
  'You may stop temporarily to load/unload or let passengers in and out, but cannot leave the vehicle unattended',
  ARRAY['You may not stop for any reason', 'You may park for up to 5 minutes', 'You may park only during nighttime hours'],
  'A "No Parking" sign means you may briefly stop to load/unload passengers or goods, but you may not leave your vehicle unattended or park for any length of time.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'traffic-laws'),
  'Is it legal to use your vehicle''s horn as a warning device?',
  'Yes, but only to warn others of danger or to prevent a potential collision',
  ARRAY['Yes, for any purpose including greeting friends', 'No, using the horn is illegal in California', 'Only on freeways'],
  'California law allows use of the horn only as a safety warning device. Using it in anger, to greet someone, or to express frustration is technically a violation.',
  'CA DMV Handbook, Chapter 3: Traffic Laws'
);

-- ============================================================
-- ADDITIONAL QUESTIONS: Speed Limits (supplemental)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the speed limit near a playground when children are present?',
  '25 mph',
  ARRAY['15 mph', '20 mph', '30 mph'],
  'The speed limit near playgrounds is 25 mph when children are present. Always watch carefully for children who may run into the street.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'If you are driving 55 mph and conditions become foggy, what should you do about your speed?',
  'Reduce your speed to match visibility conditions so you can stop within the distance you can see',
  ARRAY['Maintain 55 mph and use high beams', 'Reduce to exactly 45 mph', 'Turn on hazard lights and continue at 55 mph'],
  'In fog, reduce speed so you can stop within the distance you can see ahead. This may mean driving well below the posted speed limit.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'How does doubling your speed from 30 mph to 60 mph affect your stopping distance?',
  'Your stopping distance approximately quadruples',
  ARRAY['Your stopping distance doubles', 'Your stopping distance triples', 'Your stopping distance stays about the same'],
  'Stopping distance increases with the square of speed. Doubling your speed roughly quadruples the distance needed to stop, which is why higher speeds are so much more dangerous.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'What is the speed limit when driving through a school zone with a flashing beacon?',
  '25 mph while the beacon is flashing',
  ARRAY['15 mph', '30 mph', '20 mph'],
  'When the school zone beacon is flashing, the speed limit is 25 mph. These beacons activate during school hours when children are arriving or leaving.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'speed-limits'),
  'On a road posted at 50 mph, it starts raining and the road becomes wet. What speed should you not exceed?',
  'A speed that allows you to safely control your vehicle and stop on the wet surface',
  ARRAY['50 mph, since that is the posted limit', '45 mph in all wet conditions', '40 mph as a universal rain speed'],
  'The Basic Speed Law applies: never drive faster than is safe for current conditions. On wet roads, reduce speed based on how much traction is reduced.',
  'CA DMV Handbook, Chapter 6: Speed Limits'
);

-- ============================================================
-- ADDITIONAL QUESTIONS: DUI/Drug Laws (supplemental)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What is the legal consequence if a driver under 21 is found to have a BAC between 0.05% and 0.08%?',
  'Their license will be suspended and they may face criminal charges even below the adult limit',
  ARRAY['No consequence since it is below 0.08%', 'A warning only', 'The same as an adult DUI'],
  'For drivers under 21, any measurable BAC is illegal (0.01% limit). A BAC between 0.05% and 0.08% still results in suspension and potential criminal charges, even though it is below the adult limit.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'How long after your last drink should you typically wait before driving to be safe?',
  'At least one hour per standard drink consumed, though individual metabolism varies',
  ARRAY['30 minutes per drink', '15 minutes per drink', 'You can drive as soon as you feel sober'],
  'Your body metabolizes about one standard drink per hour. However, individual rates vary and you should use a designated driver if there is any doubt.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'dui-drug-laws'),
  'What happens to your car insurance after a DUI conviction?',
  'Your rates will increase significantly and you may need an SR-22 filing for 3 years',
  ARRAY['Your rates stay the same', 'Your insurance is automatically cancelled', 'You only need to pay a one-time surcharge'],
  'After a DUI, your insurance rates will increase dramatically. California requires an SR-22 (proof of financial responsibility) filing for 3 years after a DUI conviction.',
  'CA DMV Handbook, Chapter 8: Alcohol and Drugs'
);

-- ============================================================
-- ADDITIONAL QUESTIONS: Parking (supplemental)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Is it legal to park your vehicle in a marked crosswalk?',
  'No, parking in a crosswalk is always illegal',
  ARRAY['Yes, if no pedestrians are nearby', 'Yes, during nighttime hours only', 'Yes, for loading and unloading'],
  'Parking in a crosswalk is always illegal. It blocks pedestrians from safely crossing the street and reduces visibility for drivers.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'Can your vehicle be towed if it is parked in a disabled parking space without a valid placard?',
  'Yes, your vehicle can be towed and you will face a fine of $250 to $1,000',
  ARRAY['No, you will only receive a ticket', 'Only after 24 hours', 'Only if the space is needed by a disabled person'],
  'Vehicles illegally parked in disabled spaces can be immediately towed in addition to receiving a fine of $250 to $1,000 or more.',
  'CA DMV Handbook, Chapter 9: Parking'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'parking'),
  'When parking at a metered space, what happens if your meter shows expired time from a previous user?',
  'You must still pay for your own time; the remaining time is not guaranteed',
  ARRAY['You may use the remaining time for free', 'The meter must be reset to zero before you pay', 'You are automatically ticketed for the expired time'],
  'You should always pay for your own parking time. Relying on leftover time from a previous user may result in a ticket if the time expires before you return.',
  'CA DMV Handbook, Chapter 9: Parking'
);

-- ============================================================
-- ADDITIONAL QUESTIONS: Sharing the Road (supplemental)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What are "no-zones" in relation to large trucks?',
  'They are the large blind spots around the truck where the driver cannot see other vehicles',
  ARRAY['They are construction zones where trucks cannot enter', 'They are areas where trucks cannot park', 'They are speed-restricted zones for trucks'],
  'No-zones are the four large blind spots around a truck: directly in front, directly behind, and along each side. If you cannot see the truck driver in their mirrors, they cannot see you.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What should you watch for when driving near a delivery truck that is double-parked?',
  'The truck driver may suddenly open their door, or pedestrians may step out from behind the truck',
  ARRAY['Nothing special; just pass at normal speed', 'Only watch for the truck pulling out', 'Only watch for oncoming traffic'],
  'Double-parked delivery trucks create hazards: doors may open unexpectedly, drivers may step into traffic, and pedestrians may emerge from behind the vehicle. Slow down and pass carefully.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What special consideration should you give to motorcycles in cold or wet weather?',
  'Motorcyclists may have reduced traction and stability; give them more following distance and space',
  ARRAY['No special consideration is needed', 'They should not be on the road in those conditions', 'Drive closer to block wind for them'],
  'In cold or wet weather, motorcycles have less traction and are more vulnerable to road hazards. Give them extra space and be especially watchful for sudden movements.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'sharing-the-road'),
  'What is the proper way to share the road with a bicyclist when you both need to use the same lane?',
  'Wait until you can safely pass with at least 3 feet of clearance; do not squeeze past',
  ARRAY['Honk and expect them to move to the sidewalk', 'Pass with at least 1 foot of clearance', 'Ride close behind them until they pull over'],
  'When sharing a lane with a bicyclist, wait for a safe opportunity to pass with at least 3 feet of clearance. Do not honk or attempt to force them off the road.',
  'CA DMV Handbook, Chapter 10: Sharing the Road'
);

-- ============================================================
-- ADDITIONAL QUESTIONS: Road Signs (supplemental)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'road-signs'),
  'What does a flashing yellow arrow in a left-turn signal mean?',
  'You may turn left after yielding to oncoming traffic and pedestrians; turns are not protected',
  ARRAY['You have a protected left turn', 'You must stop and wait for a green arrow', 'Left turns are prohibited'],
  'A flashing yellow arrow means you may turn left, but you must first yield to oncoming traffic and pedestrians. Unlike a solid green arrow, your turn is not protected.',
  'CA DMV Handbook, Chapter 5: Signs, Signals, and Road Markings'
);

-- ============================================================
-- ADDITIONAL QUESTIONS: Right-of-Way (supplemental)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'right-of-way'),
  'When you are driving and an authorized emergency vehicle approaches from behind, what should you do on a multi-lane road?',
  'Move to the right lane when safe and slow down; you do not need to stop on a multi-lane road if you clear a path',
  ARRAY['Stop in your current lane immediately', 'Speed up to stay ahead of the emergency vehicle', 'Move to the left lane to let them pass on the right'],
  'On a multi-lane road, move to the right to give the emergency vehicle room to pass. On a two-lane road, pull to the right and stop.',
  'CA DMV Handbook, Chapter 4: Right-of-Way'
);

-- ============================================================
-- ADDITIONAL QUESTIONS: Safe Driving (supplemental)
-- ============================================================

INSERT INTO seed_questions (category_id, question_text, correct_answer, wrong_answers, explanation, handbook_reference)
VALUES (
  (SELECT id FROM categories WHERE slug = 'safe-driving'),
  'What is the proper technique for making a lane change on the freeway?',
  'Check mirrors, signal, check blind spot by looking over your shoulder, then change lanes smoothly',
  ARRAY['Signal and immediately move over', 'Check mirrors only and change lanes', 'Speed up and merge without signaling'],
  'The safe lane change sequence is: check mirrors, activate signal, look over your shoulder to check the blind spot, then smoothly change lanes when a safe gap exists.',
  'CA DMV Handbook, Chapter 7: Safe Driving'
);
