SKILL_DB = [
    "Python", "Java", "C++", "FastAPI", "Flask", "Django",
    "HTML", "CSS", "JavaScript", "React", "Node.js",
    "SQL", "MongoDB", "Machine Learning", "Deep Learning",
    "Data Science", "AI", "NLP"
]

def extract_skills(text: str):
    found = []
    text_lower = text.lower()
    for skill in SKILL_DB:
        if skill.lower() in text_lower:
            found.append(skill)
    return list(set(found))







