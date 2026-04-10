-- =============================================================================
-- School Management System — SQL Queries
-- File: 03_queries.sql
-- Run order: 3rd (after 01_schema.sql + 02_seed.sql)
-- =============================================================================


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  SECTION 1 — BASIC SELECTS & JOINS                                       ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝

-- Q1. All students with their class names
-- Skill: Basic JOIN
SELECT
    s.student_id,
    s.first_name || ' ' || s.last_name  AS full_name,
    c.class_name,
    c.grade_level
FROM students s
JOIN classes c ON s.class_id = c.class_id
ORDER BY c.grade_level, c.class_name, s.last_name;


-- Q2. All classes with their assigned teachers
-- Skill: JOIN across 3 tables
SELECT
    c.class_name,
    c.grade_level,
    c.room_number,
    t.first_name || ' ' || t.last_name  AS teacher_name,
    t.subject                            AS teacher_subject
FROM classes c
JOIN teachers t ON c.teacher_id = t.teacher_id
ORDER BY c.grade_level, c.class_name;


-- Q3. All grades for a specific student (student_id = 14: Chisom Eze)
-- Skill: Filtered JOIN
SELECT
    s.first_name || ' ' || s.last_name  AS student_name,
    g.subject,
    g.score,
    g.grade_letter,
    g.term,
    g.exam_type
FROM grades g
JOIN students s ON g.student_id = s.student_id
WHERE g.student_id = 14
ORDER BY g.subject;


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  SECTION 2 — AGGREGATIONS                                                ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝

-- Q4. Average score per student, sorted from highest to lowest
-- Skill: GROUP BY + AVG + ORDER BY
SELECT
    s.first_name || ' ' || s.last_name  AS student_name,
    c.class_name,
    ROUND(AVG(g.score), 2)              AS average_score,
    COUNT(g.grade_id)                   AS subjects_recorded
FROM students s
JOIN classes c  ON s.class_id   = c.class_id
JOIN grades g   ON s.student_id = g.student_id
WHERE g.term = 'Term 1 2024'
GROUP BY s.student_id, s.first_name, s.last_name, c.class_name
ORDER BY average_score DESC;


-- Q5. Number of students in each class
-- Skill: GROUP BY + COUNT + LEFT JOIN (catches empty classes)
SELECT
    c.class_name,
    c.grade_level,
    t.first_name || ' ' || t.last_name  AS class_teacher,
    COUNT(s.student_id)                 AS total_students
FROM classes c
JOIN teachers t      ON c.teacher_id  = t.teacher_id
LEFT JOIN students s ON c.class_id    = s.class_id
GROUP BY c.class_id, c.class_name, c.grade_level, t.first_name, t.last_name
ORDER BY c.grade_level, c.class_name;


-- Q6. Fee collection summary per class
-- Skill: Multi-table JOIN + SUM + ROUND
SELECT
    c.class_name,
    COUNT(f.fee_id)                             AS total_students_billed,
    SUM(f.amount)                               AS total_expected,
    SUM(f.paid_amount)                          AS total_collected,
    SUM(f.balance)                              AS total_outstanding,
    ROUND(SUM(f.paid_amount) / SUM(f.amount) * 100, 1) AS collection_rate_pct
FROM school_fees f
JOIN students s ON f.student_id = s.student_id
JOIN classes  c ON s.class_id   = c.class_id
WHERE f.term = 'Term 1 2024'
GROUP BY c.class_id, c.class_name
ORDER BY collection_rate_pct DESC;


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  SECTION 3 — FILTERING & CONDITIONAL LOGIC                               ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝

-- Q7. Students with outstanding or partial fees (defaulters report)
-- Skill: JOIN + WHERE + arithmetic on GENERATED column
SELECT
    s.first_name || ' ' || s.last_name  AS student_name,
    c.class_name,
    f.amount                             AS total_fee,
    f.paid_amount,
    f.balance                            AS amount_owed,
    f.status,
    f.due_date,
    COALESCE(f.notes, '—')              AS notes
FROM school_fees f
JOIN students s ON f.student_id = s.student_id
JOIN classes  c ON s.class_id   = c.class_id
WHERE f.status IN ('unpaid', 'partial')
ORDER BY f.status DESC, f.balance DESC;


-- Q8. Students who scored below 60 in any subject (at-risk students)
-- Skill: WHERE + multiple conditions
SELECT
    s.first_name || ' ' || s.last_name  AS student_name,
    c.class_name,
    g.subject,
    g.score,
    g.grade_letter,
    g.term
FROM grades g
JOIN students s ON g.student_id = s.student_id
JOIN classes  c ON s.class_id   = c.class_id
WHERE g.score < 60
  AND g.term = 'Term 1 2024'
ORDER BY g.score ASC;


-- Q9. Classify all students by fee payment status using CASE
-- Skill: CASE WHEN (conditional column)
SELECT
    s.first_name || ' ' || s.last_name  AS student_name,
    c.class_name,
    f.amount,
    f.paid_amount,
    f.balance,
    CASE
        WHEN f.status = 'paid'    THEN 'Cleared'
        WHEN f.status = 'partial' THEN 'Needs follow-up'
        WHEN f.status = 'unpaid'  THEN 'URGENT — not paid'
    END AS payment_status_label
FROM school_fees f
JOIN students s ON f.student_id = s.student_id
JOIN classes  c ON s.class_id   = c.class_id
ORDER BY f.status DESC, c.class_name;


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  SECTION 4 — ADVANCED QUERIES (SUBQUERIES, WINDOW FUNCTIONS, CTE)        ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝

-- Q10. Top student in each class by average score
-- Skill: Window function (RANK) + CTE
WITH ranked_students AS (
    SELECT
        s.first_name || ' ' || s.last_name      AS student_name,
        c.class_name,
        ROUND(AVG(g.score), 2)                   AS avg_score,
        RANK() OVER (
            PARTITION BY c.class_id
            ORDER BY AVG(g.score) DESC
        )                                        AS class_rank
    FROM students s
    JOIN classes c ON s.class_id   = c.class_id
    JOIN grades  g ON s.student_id = g.student_id
    WHERE g.term = 'Term 1 2024'
    GROUP BY s.student_id, s.first_name, s.last_name, c.class_id, c.class_name
)
SELECT class_name, student_name, avg_score
FROM ranked_students
WHERE class_rank = 1
ORDER BY class_name;


-- Q11. Full school report card — student average, fee status, rank in class
-- Skill: CTE + multiple JOINs + window function (comprehensive demo query)
WITH student_averages AS (
    SELECT
        student_id,
        ROUND(AVG(score), 2) AS avg_score
    FROM grades
    WHERE term = 'Term 1 2024'
    GROUP BY student_id
),
student_ranks AS (
    SELECT
        sa.student_id,
        sa.avg_score,
        RANK() OVER (
            PARTITION BY s.class_id
            ORDER BY sa.avg_score DESC
        ) AS rank_in_class
    FROM student_averages sa
    JOIN students s ON sa.student_id = s.student_id
)
SELECT
    s.first_name || ' ' || s.last_name  AS student_name,
    c.class_name,
    sr.avg_score,
    sr.rank_in_class,
    f.status                             AS fee_status,
    f.balance                            AS outstanding_balance
FROM students s
JOIN classes         c  ON s.class_id   = c.class_id
LEFT JOIN student_ranks  sr ON s.student_id = sr.student_id
LEFT JOIN school_fees    f  ON s.student_id = f.student_id AND f.term = 'Term 1 2024'
ORDER BY c.class_name, sr.rank_in_class;


-- Q12. Subject-level performance summary across the whole school
-- Skill: GROUP BY on non-PK column + multiple aggregates
SELECT
    subject,
    COUNT(*)                    AS total_records,
    ROUND(AVG(score), 2)        AS school_average,
    MAX(score)                  AS highest_score,
    MIN(score)                  AS lowest_score,
    COUNT(*) FILTER (WHERE score >= 70)  AS passed,
    COUNT(*) FILTER (WHERE score <  60)  AS failed
FROM grades
WHERE term = 'Term 1 2024'
GROUP BY subject
ORDER BY school_average DESC;


-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║  SECTION 5 — USEFUL VIEWS (save these as shortcuts in pgAdmin)           ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝

-- View: Student directory with class and teacher info
CREATE OR REPLACE VIEW vw_student_directory AS
SELECT
    s.student_id,
    s.first_name || ' ' || s.last_name          AS student_name,
    s.gender,
    c.class_name,
    c.grade_level,
    t.first_name || ' ' || t.last_name          AS class_teacher,
    s.parent_name,
    s.parent_phone,
    s.enrolled_at
FROM students s
JOIN classes  c ON s.class_id   = c.class_id
JOIN teachers t ON c.teacher_id = t.teacher_id;

-- View: Quick fee status dashboard
CREATE OR REPLACE VIEW vw_fee_dashboard AS
SELECT
    s.student_id,
    s.first_name || ' ' || s.last_name  AS student_name,
    c.class_name,
    f.term,
    f.amount,
    f.paid_amount,
    f.balance,
    f.status,
    f.due_date
FROM school_fees f
JOIN students s ON f.student_id = s.student_id
JOIN classes  c ON s.class_id   = c.class_id;

-- Usage examples after views are created:
-- SELECT * FROM vw_student_directory WHERE grade_level = 5;
-- SELECT * FROM vw_fee_dashboard WHERE status != 'paid';
