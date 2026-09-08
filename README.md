# OsteoCare Insights

Yes. Based on your OA screening workflow, healthcare worker dashboard, patient flow, AI gait analysis, X-ray pathway, and the fact that this will be shown to internal judges, I would give Bolt/Lovable a prompt like this:

BBG Osteoarthritis Screening Platform – Complete Website Prompt

Build a modern, responsive, production-ready healthcare web application called BBG (Better Bone Guidance) for early Osteoarthritis (OA) screening and patient management.

Design Requirements

Clean, modern healthcare aesthetic

Soft pastel color palette

Primary: #7BC4C4 (Pastel Teal)

Secondary: #A8DADC (Light Mint)

Accent: #F1FAEE (Cream White)

Warning: #FFB4A2 (Soft Coral)

Rounded cards and buttons

Minimalistic UI

Mobile and desktop responsive

Professional enough for judges and healthcare stakeholders

Smooth page transitions and loading states

All forms should have validation

Dark mode support optional

LANDING PAGE

Create a beautiful landing page containing:

Hero Section

Title:
AI-Powered Osteoarthritis Early Screening Platform

Subtitle:
Helping patients and healthcare workers detect Osteoarthritis earlier through AI-driven screening, gait analysis, risk assessment, and care recommendations.

Buttons:

Primary:
Get Started

Do NOT show Login or Signup directly on landing page.

Features Section

Cards:

AI Screening

Video Gait Analysis

Risk Assessment

X-Ray Analysis

Healthcare Worker Dashboard

Patient Monitoring

Workflow Section

Show simplified workflow:

Questionnaire → Gait Analysis → AI Assessment → Risk Score → Care Pathway → Healthcare Review

Benefits Section

Early Detection

Reduced Treatment Costs

Faster Referrals

Better Rural Healthcare Access

Improved Patient Outcomes

GET STARTED FLOW

When user clicks:

Get Started

Open a selection page with:

Card 1:
Login

Card 2:
Sign Up

LOGIN PAGE

When Login is selected:

Display:

Login As

Card 1:
Patient

Card 2:
Healthcare Worker

PATIENT LOGIN

Fields:

Email

Password

Button:
Login

Forgot Password option

HEALTHCARE WORKER LOGIN

Fields:

Email

Password

Button:
Login

Forgot Password option

SIGNUP PAGE

When Sign Up is selected:

Display:

Sign Up As

Card 1:
Patient

Card 2:
Healthcare Worker

PATIENT SIGNUP

Store in database:

Full Name

Age

Gender

Phone Number

Email

Password

Create patient profile automatically.

HEALTHCARE WORKER SIGNUP

Store in database:

Full Name

Healthcare Worker ID

Organization

Phone Number

Email

Password

Create healthcare worker profile automatically.

DATABASE REQUIREMENTS

Use Supabase/Firebase/PostgreSQL.

Data MUST persist.

No mock data.

Store:

Users

user_id

role

name

email

password hash

Patients

patient_id

age

gender

phone

medical history

Healthcare Workers

worker_id

organization

Questionnaires

questionnaire_id

patient_id

responses

risk_score

Gait Analysis

video_url

analysis_results

X-Ray Reports

image_url

ai_results

Final Reports

recommendations

severity_score

generated_date

PATIENT DASHBOARD

After patient login:

Show:

Dashboard Cards

Complete Questionnaire

Upload/Record Gait Video

View Screening Results

View Reports

Book Appointment

Profile

QUESTIONNAIRE MODULE

Create OA risk questionnaire.

Sections:

Pain Level

Joint Stiffness

Walking Difficulty

Family History

Previous Injuries

Daily Activity

Generate questionnaire score.

Save to database.

GAIT ANALYSIS MODULE

Allow:

Upload Video
OR

Record Video

Show:

Upload status

Processing animation

For prototype:

Generate realistic gait analysis results.

Store in database.

Display:

Walking Symmetry

Joint Stability

Risk Indicators

AI SCREENING MODULE

Combine:

Questionnaire Score

Gait Analysis Score

Generate:

Low Risk
Medium Risk
High Risk

Display confidence percentage.

RISK PATHWAY

LOW RISK

Show:

Lifestyle recommendations

Exercise suggestions

Book appointment option

HIGH RISK

Show:

Upload X-Ray

Proceed to AI X-Ray Analysis

AI X-RAY ANALYSIS

Allow:

Upload X-Ray Image

Show:

Severity Grade

OA Indicators

Joint Space Narrowing

Osteophyte Detection

Store report.

FINAL REPORT PAGE

Generate comprehensive report containing:

Patient Information

Questionnaire Results

Gait Analysis Results

X-Ray Findings

Risk Score

AI Recommendation

Download PDF Button

Share with Healthcare Worker Button

HEALTHCARE WORKER DASHBOARD

After healthcare worker login:

Dashboard options:

View Consultation Requests

View Existing Patients

Create New Patient Report

Review Submitted Reports

Monitor High-Risk Patients

Generate Final Care Plan

PATIENT CASE MANAGEMENT

Healthcare worker should be able to:

Open patient profile

View:

Questionnaire summary

Gait analysis

X-Ray reports

AI assessment

Determine care pathway.

POSSIBLE FOLLOW UPS

Healthcare worker can select:

Monitor Symptoms

Further Testing

Specialist Referral

Immediate Consultation

Store decision in database.

REPORT MANAGEMENT

Generate downloadable reports.

Formats:

PDF

Printable View

Include hospital branding area.

ADDITIONAL FEATURES

Notification System

New consultation request

Report ready

Appointment reminder

Search Patients

Filter by:

Risk Level

Age

Status

Activity Logs

Audit Trail

Profile Management

TECH STACK

Frontend:
React + TypeScript + TailwindCSS

Backend:
Supabase

Authentication:
Supabase Auth

Database:
PostgreSQL

Storage:
Supabase Storage

Charts:
Recharts

State Management:
Zustand

IMPORTANT

Every page must be fully functional.

All forms should submit successfully.

Authentication should work.

Data should persist in database.

No placeholder buttons.

No dummy navigation.

All dashboard routes must be connected.

The application should feel like a working healthcare MVP suitable for demonstration before judges and stakeholders.

simcxe basic layout is done so forget about those features that are alr present focus mainly on implementing rest of the logic in continutio nto this web app and please change the questionnaier https://orthotoolkit.com/koos/ questionaire should be from this and like the first part shouldd be age sex height and weight to calculate bmi and like that as hey will be required for fianl score calculation pl ease make it

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gait-guide-health.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f25f356f-aa1f-492a-b994-3e7f670389ee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
