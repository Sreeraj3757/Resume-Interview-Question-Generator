from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from resume_parser import extract_text_from_resume
from skill_extractor import extract_skills
from experience_extractor import extract_experience
from project_extractor import extract_projects
from certification_extractor import extract_certifications

from local_question_generator import generate_questions
from tts_engine import text_to_speech


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/audio", StaticFiles(directory="audio"), name="audio")


def generate_audio_map(data, audio_map):
    """
    Traverse questions structure.
    Generate audio ONLY for strings ending with '?'
    Store mapping: { question_text : audio_filename }
    """
    if isinstance(data, dict):
        for value in data.values():

            generate_audio_map(value, audio_map)

    elif isinstance(data, list):
        for item in data:
            generate_audio_map(item, audio_map)

    elif isinstance(data, str):
        if data.strip().endswith("?"):
            audio_file = text_to_speech(data)
            audio_map[data] = audio_file


@app.get("/")
def root():
    return {"status": "Resume Analyzer Running"}



@app.post("/upload_resume/")
async def upload_resume(file: UploadFile = File(...)):
    
    resume_text = await extract_text_from_resume(file)


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

    
    audio_map = {}
    generate_audio_map(questions, audio_map)


    return {
        "skills": skills,
        "experience": experience,
        "projects": projects,
        "certifications": certifications,
        "questions": questions,
        "audio_map": audio_map,
        "status": "Question-only audio generation completed"
    }













































