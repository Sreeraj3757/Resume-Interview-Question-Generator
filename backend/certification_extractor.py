def extract_certifications(text: str):
    lines = text.split("\n")
    certs = []

    for line in lines:
        if any(word in line.lower() for word in ["certification", "certificate"]):
            certs.append(line.strip())

    return list(set(certs))



