def extract_experience(text: str):
    lines = text.split("\n")
    experiences = []

    for line in lines:
        if any(word in line.lower() for word in ["intern", "internship", "experience", "company"]):
            experiences.append(line.strip())

    return list(set(experiences))
