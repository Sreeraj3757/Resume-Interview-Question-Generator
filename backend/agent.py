from skill_extractor import extract_skills
from experience_extractor import extract_experience
from project_extractor import extract_projects
from certification_extractor import extract_certifications
from backend.local_question_generator import generate_questions

def run_agent(resume_text):
    skills = extract_skills(resume_text)
    experience = extract_experience(resume_text)
    projects = extract_projects(resume_text)
    certifications = extract_certifications(resume_text)

    questions = generate_questions(
        skills=skills,
        experience=experience,
        projects=projects,
        certifications=certifications
    )

    return {
        "extracted_skills": skills,
        "questions": questions
    }


