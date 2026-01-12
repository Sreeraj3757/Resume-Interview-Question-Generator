import subprocess

OLLAMA_MODEL = "mistral"


def _ask_ollama(prompt: str) -> str:
    result = subprocess.run(
        ["ollama", "run", OLLAMA_MODEL],
        input=prompt,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore"
    )
    return result.stdout.strip()


def clean_questions(text: str, limit: int):
    lines = []
    for line in text.split("\n"):
        line = line.strip()
        if not line:
            continue
        if line.lower().startswith(("answer", "solution", "code")):
            continue
        line = line.lstrip("-•1234567890. ").strip()
        if line.endswith("?"):
            lines.append(line)
    return lines[:limit]

def skill_questions(skill: str, count: int = 2):
    prompt = f"""
You are a strict technical interviewer.

Generate EXACTLY {count} interview questions.

Skill: {skill}

MANDATORY RULES:
- ONLY questions
- NO answers
- NO explanations
- NO code
- NO hints
- Each question must be UNIQUE
- Output plain text only
"""
    output = _ask_ollama(prompt)
    return clean_questions(output, count)


def experience_questions(experience: str, count: int = 2):
    prompt = f"""
You are a professional interviewer.

Generate EXACTLY {count} experience-based interview questions.

Experience:
{experience}

STRICT RULES:
- ONLY questions
- NO answers
- NO explanations
- NO code
- Plain text only
"""
    output = _ask_ollama(prompt)
    return clean_questions(output, count)

def project_questions(project: str, count: int = 2):
    prompt = f"""
You are a senior technical interviewer.

Generate EXACTLY {count} interview questions based on this project.

Project:
{project}

RULES:
- ONLY questions
- NO answers
- NO explanations
- NO code
- Plain text only
"""
    output = _ask_ollama(prompt)
    return clean_questions(output, count)


def certification_questions(cert: str, count: int = 2):
    prompt = f"""
You are an interviewer.

Generate EXACTLY {count} interview questions related to this certification.

Certification:
{cert}

RULES:
- ONLY questions
- NO answers
- NO explanations
- NO code
- Plain text only
"""
    output = _ask_ollama(prompt)
    return clean_questions(output, count)


def generate_questions(skills, experience, projects, certifications):
    return {
        "skills": {
            skill: skill_questions(skill) for skill in skills
        },
        "experience": [
            q for exp in experience for q in experience_questions(exp)
        ],
        "projects": {
            project: project_questions(project) for project in projects
        },
        "certifications": {
            cert: certification_questions(cert) for cert in certifications
        }
    }









