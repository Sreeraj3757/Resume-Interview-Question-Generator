import pyttsx3
import os
import uuid

AUDIO_DIR = "audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

def text_to_speech(text: str) -> str:
    engine = pyttsx3.init()

    
    engine.setProperty("rate", 160)  
    engine.setProperty("volume", 1.0)

    
    voices = engine.getProperty("voices")
    engine.setProperty("voice", voices[0].id)  

    filename = f"{uuid.uuid4()}.wav"
    filepath = os.path.join(AUDIO_DIR, filename)

    engine.save_to_file(text, filepath)
    engine.runAndWait()
    engine.stop()

    return filename





