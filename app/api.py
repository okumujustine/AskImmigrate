from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.chat_logic import chat
from app.memory import list_sessions, make_memory
from app.utils import slugify_chat_session

load_dotenv()

app = FastAPI(title="RAG Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    session_id: Optional[str]
    question: str


class ChatResponse(BaseModel):
    answer: str


@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    try:
        session_id = req.session_id
        if not session_id:
            session_id = slugify_chat_session(req.question)

        answer = chat(session_id, req.question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/chat-sessions")
def get_chat_sessions():
    return {"all_sessions": list_sessions()}


@app.get("/history/{session_id}")
def history_endpoint(session_id: str):
    try:
        mem = make_memory(session_id)
        hist = mem.load_memory_variables({})["chat_history"]
        return {"session_id": session_id, "history": hist}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
