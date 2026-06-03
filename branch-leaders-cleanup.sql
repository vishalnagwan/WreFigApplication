-- BranchLeaders Cleanup Script
-- Run against WreFig database in SSMS to remove incorrectly imported rows.
-- Safe to re-run (DELETE is idempotent on already-removed rows).

-- ── NJ - Vernon ──────────────────────────────────────────────────────────────
-- Keep only the 6 actual leaders (SortOrder 1-6).
-- Removes 73 technician/section-header/notes rows that were over-captured.
DECLARE @vernonId INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Vernon%' ORDER BY Id);
IF @vernonId IS NOT NULL
    DELETE FROM BranchLeaders WHERE BranchId = @vernonId AND SortOrder > 6;

-- ── FL - Orlando ─────────────────────────────────────────────────────────────
-- Remove "BRANCH STAFF INFORMATION" section header and the two dispatcher rows.
DECLARE @orlandoId INT = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Orlando%' ORDER BY Id);
IF @orlandoId IS NOT NULL
    DELETE FROM BranchLeaders WHERE BranchId = @orlandoId AND SortOrder > 9;

SELECT 'Cleanup complete. Vernon leaders remaining:' AS Info,
       COUNT(*) AS Count
FROM BranchLeaders
WHERE BranchId = (SELECT TOP 1 Id FROM Branches WHERE Name LIKE 'Vernon%' ORDER BY Id);
