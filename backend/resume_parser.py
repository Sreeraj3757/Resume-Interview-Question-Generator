from PyPDF2 import PdfReader
from fastapi import UploadFile
import io


async def extract_text_from_resume(file: UploadFile):
    contents = await file.read()
    reader = PdfReader(io.BytesIO(contents))

    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"

    return text



