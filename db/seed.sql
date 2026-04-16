-- ---------------------------------------------------------------------------
-- TEACHERS  (6 teachers, different subjects)
-- ---------------------------------------------------------------------------
INSERT INTO teachers (first_name, last_name, subject, email, phone, hired_date) VALUES
  ('Ali',   'Okonkwo',  'Mathematics',       'a.okonkwo@greenfield.edu',  '08011111111', '2018-01-15'),
  ('Idris', 'Eze',     'English Language',  'i.eze@greenfield.edu',      '08022222222', '2017-03-20'),
  ('Ngozi',   'Adeyemi',  'Basic Science',     'n.adeyemi@greenfield.edu',  '08033333333', '2019-09-01'),
  ('Emeka',   'Nwosu',    'Social Studies',    'e.nwosu@greenfield.edu',    '08044444444', '2016-06-10'),
  ('Fatima',  'Ibrahim',  'ICT',               'f.ibrahim@greenfield.edu',  '08055555555', '2020-01-08'),
  ('Tunde',   'Bakare',   'Agricultural Sci',  't.bakare@greenfield.edu',   '08066666666', '2021-04-12');


-- ---------------------------------------------------------------------------
-- CLASSES  (6 classes, grade levels 4–6)
-- ---------------------------------------------------------------------------
INSERT INTO classes (class_name, grade_level, teacher_id, room_number, capacity) VALUES
  ('Grade 4A', 4, 1, 'B101', 30),
  ('Grade 4B', 4, 2, 'B102', 30),
  ('Grade 5A', 5, 3, 'C201', 28),
  ('Grade 5B', 5, 4, 'C202', 28),
  ('Grade 6A', 6, 5, 'D301', 25),
  ('Grade 6B', 6, 6, 'D302', 25);


-- ---------------------------------------------------------------------------
-- STUDENTS  (24 students spread across all 6 classes)
-- ---------------------------------------------------------------------------
INSERT INTO students (first_name, last_name, date_of_birth, gender, class_id, parent_name, parent_phone, address, enrolled_at) VALUES
  -- Grade 4A (class_id = 1)
  ('Isa',    'Okafor',    '2014-03-12', 'M', 1, 'Mr. Okafor Senior',  '07011111111', '12 Aba Road, Enugu',          '2023-09-04'),
  ('Aisha',   'Nwosu',     '2014-07-25', 'F', 1, 'Mrs. Nwosu',         '07022222222', '5 Independence Layout, Enugu', '2023-09-04'),
  ('Kelvin',   'Obi',       '2013-11-30', 'M', 1, 'Mr. Obi Kelvin Sr',  '07033333333', '8 GRA Phase 2, Enugu',         '2023-09-04'),
  ('Adam', 'Eze',       '2014-01-18', 'F', 1, 'Mrs. Eze Adam',  '07044444444', '3 Ogui Road, Enugu',           '2023-09-04'),

  -- Grade 4B (class_id = 2)
  ('Ikenna',   'Nnaji',     '2014-05-09', 'M', 2, 'Chief Nnaji',        '07055555555', '20 Zik Avenue, Enugu',         '2023-09-04'),
  ('Chiamaka', 'Ugwu',      '2013-12-14', 'F', 2, 'Mrs. Ugwu',          '07066666666', '15 Trans-Ekulu, Enugu',        '2023-09-04'),
  ('Samuel',   'Okeke',     '2014-04-02', 'M', 2, 'Mr. Okeke',          '07077777777', '9 Coal Camp, Enugu',           '2023-09-04'),
  ('Favour',   'Onah',      '2014-08-22', 'F', 2, 'Mrs. Onah',          '07088888888', '7 Achara Layout, Enugu',       '2023-09-04'),

  -- Grade 5A (class_id = 3)
  ('Obinna',   'Chukwu',    '2013-02-17', 'M', 3, 'Mr. Chukwu',         '07099999999', '4 New Haven, Enugu',           '2022-09-05'),
  ('Nneka',    'Okonkwo',   '2012-10-05', 'F', 3, 'Dr. Okonkwo',        '07111111111', '11 Maryland, Enugu',           '2022-09-05'),
  ('Emmanuel', 'Ani',       '2013-06-28', 'M', 3, 'Pastor Ani',         '07122222222', '2 Nike Lake Road, Enugu',      '2022-09-05'),
  ('Grace',    'Nkem',      '2013-03-31', 'F', 3, 'Mrs. Nkem',          '07133333333', '18 Independence Layout, Enugu','2022-09-05'),

  -- Grade 5B (class_id = 4)
  ('Uche',     'Madu',      '2012-09-16', 'M', 4, 'Mr. Madu',           '07144444444', '6 Asata, Enugu',               '2022-09-05'),
  ('Zainab',   'Eze',       '2013-01-07', 'F', 4, 'Mrs. Eze Zainab',    '07155555555', '23 Ogui Road, Enugu',          '2022-09-05'),
  ('Victor',   'Odoh',      '2012-11-20', 'M', 4, 'Engineer Odoh',      '07166666666', '14 GRA Phase 1, Enugu',        '2022-09-05'),
  ('Precious', 'Nweke',     '2013-07-03', 'F', 4, 'Mrs. Nweke',         '07177777777', '30 Agbani Road, Enugu',        '2022-09-05'),

  -- Grade 6A (class_id = 5)
  ('Ifeanyi',  'Okonkwo',   '2011-04-14', 'M', 5, 'Chief Okonkwo',      '07188888888', '1 Uwani, Enugu',               '2021-09-06'),
  ('Ngozi',    'Eze',       '2011-12-29', 'F', 5, 'Madam Eze',          '07199999999', '7 Coal Camp, Enugu',           '2021-09-06'),
  ('David',    'Okafor',    '2012-02-11', 'M', 5, 'Mr. Okafor David',   '07211111111', '9 Independence Layout, Enugu', '2021-09-06'),
  ('Adaora',   'Onuoha',    '2011-08-05', 'F', 5, 'Mrs. Onuoha',        '07222222222', '16 Trans-Ekulu, Enugu',        '2021-09-06'),

  -- Grade 6B (class_id = 6)
  ('Chinonso', 'Ugwuanyi',  '2011-06-19', 'M', 6, 'Mr. Ugwuanyi',       '07233333333', '3 New Haven, Enugu',           '2021-09-06'),
  ('Amara',    'Nwoye',     '2012-01-25', 'F', 6, 'Mrs. Nwoye',         '07244444444', '5 Asata, Enugu',               '2021-09-06'),
  ('Jude',     'Eze',       '2011-09-30', 'M', 6, 'Chief Eze Jude',     '07255555555', '21 Agbani Road, Enugu',        '2021-09-06'),
  ('Ifeoma',   'Obi',       '2011-11-15', 'F', 6, 'Mrs. Obi Ifeoma',    '07266666666', '10 Uwani, Enugu',              '2021-09-06');


-- ---------------------------------------------------------------------------
-- GRADES  (Term 1 2024 — multiple subjects per student)
-- grade_letter is auto-computed by the GENERATED column in the schema
-- ---------------------------------------------------------------------------
INSERT INTO grades (student_id, subject, score, term, exam_type, recorded_at) VALUES
  -- Student 1: Isa Okafor
  (1, 'Mathematics',    82.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (1, 'English',        75.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (1, 'Basic Science',  88.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 2: Aisha Nwosu
  (2, 'Mathematics',    91.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (2, 'English',        85.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (2, 'Basic Science',  79.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 3: Kelvin Obi
  (3, 'Mathematics',    60.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (3, 'English',        55.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (3, 'Basic Science',  67.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 4: Adam Eze
  (4, 'Mathematics',    94.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (4, 'English',        90.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (4, 'Basic Science',  92.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 5: Ikenna Nnaji
  (5, 'Mathematics',    70.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (5, 'English',        68.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (5, 'Basic Science',  72.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 6: Chiamaka Ugwu
  (6, 'Mathematics',    88.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (6, 'English',        93.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (6, 'Basic Science',  84.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 7: Samuel Okeke
  (7, 'Mathematics',    45.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (7, 'English',        52.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (7, 'Basic Science',  49.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 8: Favour Onah
  (8, 'Mathematics',    78.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (8, 'English',        82.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (8, 'Basic Science',  76.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 9: Obinna Chukwu (Grade 5A)
  (9, 'Mathematics',    95.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (9, 'English',        89.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (9, 'Basic Science',  91.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 10: Nneka Okonkwo
  (10, 'Mathematics',   73.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (10, 'English',       80.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (10, 'Basic Science', 68.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 11: Emmanuel Ani
  (11, 'Mathematics',   58.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (11, 'English',       62.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (11, 'Basic Science', 55.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 12: Grace Nkem
  (12, 'Mathematics',   87.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (12, 'English',       92.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (12, 'Basic Science', 88.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 13: Uche Madu (Grade 5B)
  (13, 'Mathematics',   66.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (13, 'English',       71.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (13, 'Basic Science', 60.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 14: Zainab Eze
  (14, 'Mathematics',   99.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (14, 'English',       95.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (14, 'Basic Science', 97.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 15: Victor Odoh
  (15, 'Mathematics',   63.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (15, 'English',       58.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (15, 'Basic Science', 70.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 16: Precious Nweke
  (16, 'Mathematics',   81.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (16, 'English',       77.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (16, 'Basic Science', 83.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 17: Ifeanyi Okonkwo (Grade 6A)
  (17, 'Mathematics',   74.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (17, 'English',       69.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (17, 'Basic Science', 72.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 18: Ngozi Eze
  (18, 'Mathematics',   90.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (18, 'English',       88.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (18, 'Basic Science', 93.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 19: David Okafor
  (19, 'Mathematics',   51.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (19, 'English',       48.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (19, 'Basic Science', 55.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 20: Adaora Onuoha
  (20, 'Mathematics',   86.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (20, 'English',       91.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (20, 'Basic Science', 89.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 21: Chinonso Ugwuanyi (Grade 6B)
  (21, 'Mathematics',   77.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (21, 'English',       80.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (21, 'Basic Science', 74.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 22: Amara Nwoye
  (22, 'Mathematics',   92.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (22, 'English',       87.50, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (22, 'Basic Science', 90.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 23: Jude Eze
  (23, 'Mathematics',   43.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (23, 'English',       50.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (23, 'Basic Science', 47.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  -- Student 24: Ifeoma Obi
  (24, 'Mathematics',   96.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (24, 'English',       94.00, 'Term 1 2024', 'End of Term', '2024-03-20'),
  (24, 'Basic Science', 98.00, 'Term 1 2024', 'End of Term', '2024-03-20');


-- ---------------------------------------------------------------------------
-- SCHOOL FEES  (Term 1 2024 — mix of paid, partial, and unpaid)
-- balance is auto-computed by the GENERATED column in the schema
-- ---------------------------------------------------------------------------
INSERT INTO school_fees (student_id, term, amount, paid_amount, due_date, paid_date, status, payment_method, notes) VALUES
  (1,  'Term 1 2024', 45000.00, 45000.00, '2024-01-15', '2024-01-10', 'paid',    'bank transfer', NULL),
  (2,  'Term 1 2024', 45000.00, 45000.00, '2024-01-15', '2024-01-08', 'paid',    'online',        NULL),
  (3,  'Term 1 2024', 45000.00, 20000.00, '2024-01-15', NULL,         'partial', 'cash',          'Parent promised balance by Feb'),
  (4,  'Term 1 2024', 45000.00, 45000.00, '2024-01-15', '2024-01-12', 'paid',    'bank transfer', NULL),
  (5,  'Term 1 2024', 45000.00, 0.00,     '2024-01-15', NULL,         'unpaid',  NULL,            'Parent yet to respond'),
  (6,  'Term 1 2024', 45000.00, 45000.00, '2024-01-15', '2024-01-14', 'paid',    'online',        NULL),
  (7,  'Term 1 2024', 45000.00, 30000.00, '2024-01-15', NULL,         'partial', 'cash',          NULL),
  (8,  'Term 1 2024', 45000.00, 45000.00, '2024-01-15', '2024-01-09', 'paid',    'bank transfer', NULL),
  (9,  'Term 1 2024', 50000.00, 50000.00, '2024-01-15', '2024-01-07', 'paid',    'online',        NULL),
  (10, 'Term 1 2024', 50000.00, 50000.00, '2024-01-15', '2024-01-11', 'paid',    'bank transfer', NULL),
  (11, 'Term 1 2024', 50000.00, 25000.00, '2024-01-15', NULL,         'partial', 'cash',          'Single parent family'),
  (12, 'Term 1 2024', 50000.00, 50000.00, '2024-01-15', '2024-01-13', 'paid',    'online',        NULL),
  (13, 'Term 1 2024', 50000.00, 0.00,     '2024-01-15', NULL,         'unpaid',  NULL,            'Scholarship application pending'),
  (14, 'Term 1 2024', 50000.00, 50000.00, '2024-01-15', '2024-01-06', 'paid',    'bank transfer', NULL),
  (15, 'Term 1 2024', 50000.00, 50000.00, '2024-01-15', '2024-01-10', 'paid',    'online',        NULL),
  (16, 'Term 1 2024', 50000.00, 50000.00, '2024-01-15', '2024-01-15', 'paid',    'cash',          NULL),
  (17, 'Term 1 2024', 55000.00, 55000.00, '2024-01-15', '2024-01-08', 'paid',    'bank transfer', NULL),
  (18, 'Term 1 2024', 55000.00, 55000.00, '2024-01-15', '2024-01-09', 'paid',    'online',        NULL),
  (19, 'Term 1 2024', 55000.00, 0.00,     '2024-01-15', NULL,         'unpaid',  NULL,            'Family relocated, awaiting confirmation'),
  (20, 'Term 1 2024', 55000.00, 55000.00, '2024-01-15', '2024-01-11', 'paid',    'bank transfer', NULL),
  (21, 'Term 1 2024', 55000.00, 55000.00, '2024-01-15', '2024-01-12', 'paid',    'online',        NULL),
  (22, 'Term 1 2024', 55000.00, 55000.00, '2024-01-15', '2024-01-07', 'paid',    'bank transfer', NULL),
  (23, 'Term 1 2024', 55000.00, 40000.00, '2024-01-15', NULL,         'partial', 'cash',          'Balance due end of month'),
  (24, 'Term 1 2024', 55000.00, 55000.00, '2024-01-15', '2024-01-10', 'paid',    'online',        NULL);
