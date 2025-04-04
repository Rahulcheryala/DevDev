-- Create the testScores table
CREATE TABLE "testScores" (
    "studentId" SERIAL PRIMARY KEY,
    "firstName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "age" INT CHECK ("age" >= 18 AND "age" <= 85),
    "email" VARCHAR(100) UNIQUE NOT NULL CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "testType" VARCHAR(10) CHECK ("testType" IN ('SAT', 'ACT', 'GRE', 'AP', 'MCAT', 'LSAT')),
    "testScore" DECIMAL(5, 2) CHECK ("testScore" >= 0 AND "testScore" <= 100),
    "testDate" DATE CHECK ("testDate" >= '2010-01-01' AND "testDate" <= '2021-12-31'),
    "testLocation" VARCHAR(100),
    "state" VARCHAR(50),
    "country" VARCHAR(50),
    "postalCode" VARCHAR(20),
    "ethnicity" VARCHAR(20) CHECK ("ethnicity" IN ('White', 'Black', 'Hispanic', 'Asian', 'Other')),
    "gender" VARCHAR(20) CHECK ("gender" IN ('Male', 'Female', 'Non-binary'))
);

-- Allow all users to select rows
CREATE POLICY "Allow all users to select testScores" ON "testScores"
  FOR SELECT
  USING (true);

-- Allow all users to insert rows
CREATE POLICY "Allow all users to insert testScores" ON "testScores"
  FOR INSERT
  WITH CHECK (true);

-- Allow all users to update rows
CREATE POLICY "Allow all users to update testScores" ON "testScores"
  FOR UPDATE
  USING (true);

-- Allow all users to delete rows
CREATE POLICY "Allow all users to delete testScores" ON "testScores"
  FOR DELETE
  USING (true);
