def extract_projects(text: str):
    lines = text.split("\n")
    projects = []

    for line in lines:
        if "project" in line.lower():
            projects.append(line.strip())

    return list(set(projects))


