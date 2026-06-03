-- BranchLeaders Seed Data
-- Run against WreFig database after branch-leaders-migration.sql
-- Branches must exist; matched by Name

IF NOT EXISTS (SELECT 1 FROM BranchLeaders)
BEGIN

    -- VT - Highgate Montpelier
    DECLARE @bid_5961 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Highgate%' ORDER BY Id);
    IF @bid_5961 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5961, 'Mike Medor', 'Ops Manager', '8023098687', NULL, 'Danny DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5961, 'Brian Merchant', 'VT Montpelier - Ops Supervisor', '8025053672', NULL, 'Mike Medor', NULL, 2);
    END

    -- NH - Bow
    DECLARE @bid_2323 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Bow%' ORDER BY Id);
    IF @bid_2323 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2323, 'Carlos Arostegui', 'Ops  Manager', '6038570013', NULL, 'Daniel DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2323, 'Hubert Thompson', 'Ops  Manager', '(603) 630-1856', NULL, 'Daniel DeCosta', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2323, 'Kyle Narkum', 'Operations Supervisor', '(603) 857-0837', NULL, 'Carlos Arostegui', NULL, 3);
    END

    -- MA - Holbrook (IG DC PL)
    DECLARE @bid_3829 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Holbrook%' ORDER BY Id);
    IF @bid_3829 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3829, 'Justin Hightower', 'Ops Manager', '(845) 283-7974', NULL, 'Danny DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3829, 'Ron Wiseman', 'Manager Plumbing', '(781) 785-2537', NULL, 'Justin Hightower', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3829, 'Tony Gonzalez Jr.', 'Supervisor, Drain Cleaning', '4016440367', 'Contact for AH DC', 'Justin Hightower', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3829, 'Leesa Thomas', 'Supervisor, Inside Grease', '7819527009', NULL, 'Justin Hightower', NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3829, 'Pete Moran', 'Supervisor, Projects', '(603) 508-2583', NULL, 'Danny DeCosta', NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3829, 'Melissa McKinney-Clark', 'Planner, Inside Grease', '7744310219', NULL, 'Peg Trentini', NULL, 6);
    END

    -- MA - Gloucester
    DECLARE @bid_1102 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Gloucester%' ORDER BY Id);
    IF @bid_1102 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1102, 'Eric Mueller', 'Ops Area Manager', '9789073056', NULL, 'Danny DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1102, 'Frederick Swain', 'Pumping Supervisor', '9782653769', NULL, 'Eric Mueller', 'for assistance/guidance', 2);
    END

    -- MA - Acton
    DECLARE @bid_87 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Acton%' ORDER BY Id);
    IF @bid_87 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_87, 'Eric Mueller', 'Ops Area Manager', '5082921906', NULL, 'Danny Decosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_87, 'Frederick Swain', 'Pumping Supervisor', '9782653769', NULL, 'Eric Mueller', 'guidance', 2);
    END

    -- MA - Bridgewater RI - Johnston
    DECLARE @bid_2035 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Bridgewater%' ORDER BY Id);
    IF @bid_2035 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2035, 'Eric Mueller', 'Ops Area Manager', '(978) 907-3056', NULL, 'Danny DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2035, 'John Sgambato', 'Pumping Supervisor', '(401) 644-7617', '7743840187', 'Eric Mueller', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2035, 'Steve MacFaun', 'Back up Pumping Supervisor', '(774) 454-0550', NULL, 'Pete Moran', NULL, 3);
    END

    -- MA - Carver Walpole SCoast Denn
    DECLARE @bid_7842 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Carver%' ORDER BY Id);
    IF @bid_7842 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_7842, 'Eric Mueller', 'Ops Area Manager', '508-292-1906', NULL, 'Danny DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_7842, 'Matthew Bryce', 'Pumping Supervisor', '9789074486', NULL, 'Eric Mueller', 'see note above for alternate contacts', 2);
    END

    -- CT - Old Lyme Danielson
    DECLARE @bid_4629 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Old Lyme%' ORDER BY Id);
    IF @bid_4629 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4629, 'William Waite', 'Ops Manager', '2032091606', NULL, 'Danny DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4629, 'Christopher Smith', 'Pumping Supervisor', '8606256999', NULL, 'William Waite', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4629, 'Antoni Niecikowski', 'Pumping Supervisor', '2034702980', NULL, 'William Waite', NULL, 3);
    END

    -- MA - Springfield
    DECLARE @bid_4491 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Springfield%' ORDER BY Id);
    IF @bid_4491 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4491, 'William Waite', 'Ops Area Manager', '2032091606', NULL, 'Danny DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4491, 'Christopher Smith', 'Pumping Supervisor', '8606256999', NULL, 'William Waite', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4491, 'Antoni Niecikowski', 'Pumping Supervisor', '2034702980', NULL, 'William Waite', NULL, 3);
    END

    -- CT - Monroe Norwalk
    DECLARE @bid_4525 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Monroe%' ORDER BY Id);
    IF @bid_4525 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4525, 'William Waite', 'Ops Area Manager', '2032091606', NULL, 'Danny DeCosta', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4525, 'Antoni Niecikowski', 'Pumping Supervisor', '2034702980', NULL, 'William Waite', NULL, 2);
    END

    -- NJ - Vernon
    DECLARE @bid_1477 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Vernon%' ORDER BY Id);
    IF @bid_1477 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1477, 'Ryan Patchell', 'Ops Area Manager', '8622662135', NULL, 'David Bower', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1477, 'Greg Woodbury', 'Pumping Supervisor', '9733626457', NULL, 'Ryan Patchell', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1477, 'Keith Egli', 'BH Supervisor', '5706475475', NULL, 'David Bower', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1477, 'Christopher Ellefsen', 'Vactor/IG/DC Supervisor', '5704990103', NULL, 'Ryan Patchell', NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1477, 'Kevin Kapocsi', 'Repair/Install Supervisor', '9733326269', '9737643198', 'Ryan Patchell', NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1477, 'David Moore', 'Overnight Supervisor', '4454449433', NULL, 'Ryan Callahan', 'starts taking afterhours calls @ 7pm', 6);
    END

    -- NJ - Bayville
    DECLARE @bid_3593 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Bayville%' ORDER BY Id);
    IF @bid_3593 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3593, 'William Marchionne III', 'Ops Area Manager', '4849495138', NULL, 'Dave Bower', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3593, 'Patrick Volk', 'Ops Manager', '8482210470', NULL, 'William Marchionne III', 'CSE Trained', 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3593, 'Erik Yakow', 'Supervisor', '7327031151', NULL, 'Patrick Volk', 'CSE Trained', 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3593, 'David Moore', 'Overnight Supervisor', '4454449433', NULL, 'Ryan Callahan', 'starts taking afterhours calls @ 7pm', 4);
    END

    -- NJ - Swedesboro
    DECLARE @bid_3059 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Swedesboro%' ORDER BY Id);
    IF @bid_3059 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3059, 'William Marchionne III', 'Ops Area Manager', '4849495138', NULL, 'Dave Bower', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3059, 'Mike Fogarty', 'Branch Manager', '(215) 534-5969', NULL, 'William Marchionne III', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3059, 'TJ Herms', 'Ops Supervisor', '8568121008', NULL, 'Mike Fogarty', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3059, 'Marquis Davis', 'Lead Techician', '(609) 977-5395', NULL, 'TJ Herms', NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3059, 'David Moore', 'PM Ops Supervisor', '4454449433', NULL, 'Ryan Callahan', NULL, 5);
    END

    -- PA - Salunga Birdsboro
    DECLARE @bid_5098 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Salunga%' ORDER BY Id);
    IF @bid_5098 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5098, 'William Marchionne III', 'Ops Area Manager', '4849495138', NULL, 'Dave Bower', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5098, 'Jonathan Bartlett', 'Ops Branch Manager', '4842648922', NULL, 'William Marchionne III', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5098, 'James Frizzell', 'DC / Plumbing / Repairs', '9738620612', NULL, 'Jonathan Barlett', 'Josh Leibensperger', 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5098, 'Eric Betz', 'Vactor/Projects Supervisor', '7173290718', NULL, 'Jonathan Barlett', NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5098, 'Joshua Leibensperger', 'Pumping Supervisor', '4848243260', NULL, 'Jonathan Barlett', NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5098, 'Bret Kahl', 'Trailer', '7173335205', NULL, 'Jonathan Barlett', NULL, 6);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5098, 'David Moore', 'Overnight Supervisor', '4454449433', NULL, 'Ryan Callahan', 'starts taking afterhours calls @ 7pm', 7);
    END

    -- PA - Ivyland
    DECLARE @bid_7585 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Ivyland%' ORDER BY Id);
    IF @bid_7585 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_7585, 'William Marchionne III', 'Ops Area Manager', '4849495139', NULL, 'Dave Bower', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_7585, 'Ryan Callahan', 'Operations Manager', '2678938671', NULL, 'William Marchionne III', 'after hours calls 5-7pm    Mon - Thurs when on call', 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_7585, 'Larry Lapinski', 'Projects / Bulk Supervisor', '2156693041', NULL, 'Ryan Callahan', 'after hours calls 5-7pm    Mon - Thurs when on call', 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_7585, 'Zach McCalicher', 'DC/ Repair/ Installs', '4843886332', NULL, 'Ryan Callahan', 'after hours calls 5-7pm    Mon - Thurs when on call', 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_7585, 'David Garry', 'Pumping Supervisor', '(267) 298-8776', NULL, 'Ryan Callahan', 'after hours calls 5-7pm    Mon - Thurs when on call', 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_7585, 'David Moore', 'Overnight Supervisor', '4454449433', NULL, 'Ryan Callahan', 'starts taking afterhours calls @ 7pm', 6);
    END

    -- PA - Honesdale
    DECLARE @bid_6131 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Honesdale%' ORDER BY Id);
    IF @bid_6131 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6131, 'Gene Mohrmann', 'Branch Supervisor/Vactor Supervisor', '5704935122', NULL, 'David Bower', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6131, 'Charlie Steuhl, Jr.', 'Pumping / Trailer Supervisor', '(570) 229-9264', NULL, 'Gene Mohrmann', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6131, 'Michael Sprague', 'DC/Pipeline/Grinder pump Supervisor', '5704935120', NULL, 'David Bower', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6131, 'David Moore', 'Overnight Supervisor', '4454449433', NULL, 'Ryan Callahan', 'starts taking afterhours calls @ 7pm', 4);
    END

    -- PA - Washington
    DECLARE @bid_6466 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Washington%' ORDER BY Id);
    IF @bid_6466 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6466, 'Gary Conkle', 'Sr. Ops Manager', '724-350-2829', NULL, 'Dave Bower', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6466, 'Brad Naser', 'Ops Manager', '(724) 825-0544', NULL, 'Gary Conkle', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6466, 'Ryan Allinder', 'Install/Repair Manager', '724-825-9723', NULL, 'Brad Naser', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6466, 'David Moore', 'Overnight Supervisor', '4454449433', NULL, 'Ryan Callahan', 'starts taking afterhours calls @ 7pm', 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6466, 'David Hartzell', 'Fleet/Mechanic Manager', '724-350-2765', NULL, 'Brad Naser', NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6466, 'John Marchinsky', 'Plant Supervisor', '412-965-5180', NULL, NULL, NULL, 6);
    END

    -- PA - Loretto (Under Constructio
    DECLARE @bid_3274 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Loretto%' ORDER BY Id);
    IF @bid_3274 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3274, 'Charles (Chaz) McVay', 'Pumping Supervisor', '7243504450', NULL, 'Brad Naser/Gary Conkle', 'Roll off', 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3274, 'David Moore', 'Overnight Supervisor', '4454449433', NULL, 'Ryan Callahan', 'starts taking afterhours calls @ 7pm', 2);
    END

    -- MD - Crofton
    DECLARE @bid_3950 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Crofton%' ORDER BY Id);
    IF @bid_3950 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3950, 'Brandon Tyson', 'Ops Manager', '(667) 408-0892', NULL, 'Dan Heimann', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_3950, 'Eric Lee', 'Ops Supervisor', '(443) 960-3913', NULL, 'Brandon Tyson', NULL, 2);
    END

    -- VA - Jamaica Quinton (Richmond)
    DECLARE @bid_9928 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Jamaica%' ORDER BY Id);
    IF @bid_9928 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9928, 'Chris Frost', 'Area Manager', '9126440638', NULL, 'Dan Heimann', 'Reach out to Chris for guidance if needed AH', 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9928, 'Daniel Young', 'Operations Manager', '7042758898', NULL, 'Chris Frost', 'Operations Manager', 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9928, 'Patricia Hopkins', 'Ops Supervisor/Jamaica', '(804) 432-9245', NULL, 'Daniel Young', 'Operatiopns Supervisor ( SAVAH )', 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9928, 'Chikosi Legins', 'Ops Supervisor / Quinton', '(804) 630-1826', NULL, 'Daniel Young', 'Covering West Rock weekend EMG if called in', 4);
    END

    -- NC - Boone
    DECLARE @bid_1924 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Boone%' ORDER BY Id);
    IF @bid_1924 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1924, 'Chris Frost', 'Area Manager', '9126440638', NULL, 'Dan Heimann', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1924, 'Alan Shuping', 'OPS Manager', '(828) 387-7624', NULL, 'Chris Frost', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1924, 'Jeremy Rees', 'Operations Supervisor', '(828) 334-9073', NULL, 'Alan Shuping', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1924, 'Elizabeth (Jordan) Smith', 'Portable toilets Scheduler', '980-206-3563', NULL, 'Lynette Beane-Hall', 'All portable toilet scheduling', 4);
    END

    -- NC - Stanley-Charlotte-Columbia
    DECLARE @bid_1339 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Stanley%' ORDER BY Id);
    IF @bid_1339 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1339, 'Chris Frost', 'Area Manager', '9126440638', NULL, 'Dan Heimann', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1339, 'Nate Wooten', 'Ops Manager', '7046892106', NULL, 'Chris Frost', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1339, 'Daryl Abernathy', 'Pumping Supervisor (Stanley)', '9805221325', NULL, 'Nate Wooten', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1339, 'Jamie Smith', 'Pumping Supervisor (Stanley)', '(828) 962-1272', NULL, 'Nate Wooten', NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1339, 'Love Williams', 'Pumping Supervisor(Charlotte)', '(980) 525-1548', NULL, 'Nate Wooten', NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1339, 'Charles (CJ) George', 'Pumping Supervisor(Charlotte)', '(980) 525-2860', NULL, 'Nate Wooten', NULL, 6);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1339, 'James Daly', 'PL/DC/Plumbing Manager', '9805252652', '9805252652', 'Nate Wooten', 'Call Lauren Jenkins(during business hours), Nate (after hours)', 7);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1339, 'Scott Simmons', 'Supervisor/Install/Projects (Stanley)', '7045065313', NULL, 'Nate Wooten', NULL, 8);
    END

    -- NC - Durham
    DECLARE @bid_5489 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Durham%' ORDER BY Id);
    IF @bid_5489 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5489, 'Chris Frost', 'Area Manager', '9126440638', NULL, 'Dan Heimann', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5489, 'Nate Wooten', 'Ops Manager', '7046892106', NULL, 'Chris Frost', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5489, 'Jesse Cropper', 'Ops Manager', '9843406747', NULL, 'Chris Frost', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5489, 'Gary Baker', 'Pumping Supervisor', '7012401928', NULL, 'Jesse Cropper', NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5489, 'James Daly', 'Plumbing Supervisor', '(980)-525-2652', NULL, 'Nate Wooten', NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5489, 'Kirk Haskins', NULL, '9195196285', NULL, 'Gary Baker', NULL, 6);
    END

    -- GA - Hiram
    DECLARE @bid_1196 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Hiram%' ORDER BY Id);
    IF @bid_1196 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1196, 'Zack Fraser', 'Ops Mgr', '4042737445', '706-844-2903', 'Dan Heimann', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_1196, 'Chris Johnson', 'Ops Supervisor', '(678) 268-3926', '(678) 708-5584', 'Zack Fraser', NULL, 2);
    END

    -- TN - Arlington
    DECLARE @bid_4482 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Arlington%' ORDER BY Id);
    IF @bid_4482 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4482, 'Michael Stafford', 'Operations Manager', '9017186943', '9015799180', 'Michael Gordon', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4482, 'Mark Redd', 'Projects (Camera/Hi Vac) Supervisor', '9017186939', '9016167009', 'Michael Stafford', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4482, 'Robert Sanders', 'Bulk Hauling/Industrial (Factories) Supervisor', '9017186893', '9016877822', 'Michael Stafford', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4482, 'Benton Lindsey', 'Pumping  Supervisor', '9012324733', '9013557070', 'Michael Stafford', NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4482, 'Sara Kowalski', 'Local Dispatch', '9016254992', NULL, 'Benton Lindsey', NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4482, 'Angela Schlafer', 'Billing', '901-519-4404 Ext 116', NULL, 'Benton Lindsey', NULL, 6);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4482, 'Rayne Donelson', 'Payroll', '901-519-4404 Ext 117', NULL, 'Benton Lindsey', NULL, 7);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_4482, 'Robby Sanders', 'Plant Supervisor', '9017180797', NULL, 'Ryan Ellis', NULL, 8);
    END

    -- FL - Fort Myers
    DECLARE @bid_2827 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Fort Myers%' ORDER BY Id);
    IF @bid_2827 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2827, 'Dan Madine', 'Area Manager', '9046525489', NULL, 'Michael Gordon', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2827, 'Michael Filian', 'Ops Manager', '2398411882', NULL, 'Dan Madine', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2827, 'Mark Nelson', 'Ops Supervisor', '2393184256', '(239) 476-2000', 'Michael Filian', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_2827, 'Kelly Brunelle', 'Install Supervisor', '2393404804', NULL, 'Michael Filian', NULL, 4);
    END

    -- FL - Gainesville
    DECLARE @bid_5450 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Gainesville%' ORDER BY Id);
    IF @bid_5450 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5450, 'Dan Madine', 'Area Manager', '9046525489', NULL, 'Mike Gordon', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5450, 'Dustin Sabins', 'Pumping Supervisor', '3525140656', NULL, 'Dan Madine', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5450, 'Jason Pierce', 'Ops Manager', '4845749670', '2393230635', 'Dan Madine', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5450, 'David Wilson', 'Pumping Supervisor', '9043008388', NULL, 'Jason Pierce', NULL, 4);
    END

    -- FL - Jacksonville
    DECLARE @bid_9080 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Jacksonville%' ORDER BY Id);
    IF @bid_9080 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9080, 'Dan Madine', 'Area Manager', '9046525489', NULL, 'Michael Gordon', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9080, 'Jason Pierce', 'Ops Manager', '4845749670', '2393230635', 'Dan Madine', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9080, 'David Wilson', 'Pumping Supervisor', '9043008388', NULL, 'Jason Pierce', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9080, 'Joseph Snowden', 'PL/DC Supervisor', '9044058319', NULL, 'Jason Pierce', NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9080, 'Patrick Daniel', 'Vactor Supervisor', '9045454060', NULL, 'Jason Pierce', NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9080, 'Jamey Burnette', NULL, '9045457498', NULL, 'Pat Daniel', NULL, 6);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_9080, 'Rousseau Celestin', 'Repairs/LS Supervisor', '9045663683', NULL, NULL, NULL, 7);
    END

    -- FL - Largo (Tampa)
    DECLARE @bid_5370 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Largo%' ORDER BY Id);
    IF @bid_5370 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5370, 'Todd Watson', 'Ops Manager', '7276382959', '7273921352', 'Mike Gordon', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5370, 'Christopher Maier', 'Pumping Supervisor', '7272783501', '6038283360', 'Todd Watson', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5370, 'John Tyler', 'Pumping Supervisor (Septic)', '7273373473', NULL, 'Todd Watson', NULL, 3);
    END

    -- FL - Stuart
    DECLARE @bid_5334 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Stuart%' ORDER BY Id);
    IF @bid_5334 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5334, 'Dan Madine', 'Area Manager', '9046525489', NULL, 'Michael Gordon', NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5334, 'Carlos Ayala', 'Ops Manager', '7726311965', '(561) 315-3394', 'Dan Madine', NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5334, 'Frank Pizzo', 'Pumping Supervisor', '7722846997', NULL, 'Carlos Ayala', NULL, 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_5334, 'James Baker', 'Install Supervisor', '7722601525', NULL, 'Carlos Ayala', NULL, 4);
    END

    -- FL - Orlando (North)
    DECLARE @bid_6467 INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Orlando%' ORDER BY Id);
    IF @bid_6467 IS NOT NULL
    BEGIN
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Charles Blue', 'Area Manager', '(689) 766-4124', NULL, NULL, NULL, 1);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Alison Hope', 'Ops Manager', '(407) 616-0025', NULL, NULL, NULL, 2);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Tammy Steen', 'Ops Supervisor', '4078325032', NULL, NULL, 'Please call supervisor marked Primary for any Afterhours Issues/Assignments, Call Secondary if you can''t get a hold of Primary after 15 minutes', 3);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Marcus Garcia', 'Ops Supervisor', '(407) 334-9183', NULL, NULL, NULL, 4);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Danny Floyd', 'Ops Manager', '(407) 574-0227', NULL, NULL, NULL, 5);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Frank Cruz', 'Ops Supervisor', '(407) 408-8821', NULL, NULL, NULL, 6);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Cody Peavey', 'Lift Station Supervisor', '(407) 319-1229', NULL, NULL, NULL, 7);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Elio Reyna', 'Ops Supervisor', '(407) 520-9834', NULL, NULL, NULL, 8);
        INSERT INTO BranchLeaders (BranchId, Name, JobTitle, WorkMobilePhone, AltPhone, ManagerName, Notes, SortOrder)
        VALUES (@bid_6467, 'Derek Woodruff', 'Plumbing Manager', '(407) 408-6688', '4075799244', NULL, NULL, 9);
    END

END