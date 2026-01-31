"""
RAG Engine Module - Simplified Version
Uses direct Gemini API without LangChain for Python 3.14 compatibility
"""

import os
from typing import List
import google.generativeai as genai
from dotenv import load_dotenv

from pdf_loader import load_pdf

# Load environment variables
load_dotenv()


class SimpleRAGEngine:
    """
    Simple RAG Engine using Gemini's built-in context handling
    """
    
    def __init__(self, resume_path: str):
        """
        Initialize the RAG engine.
        
        Args:
            resume_path: Path to the resume PDF
        """
        self.resume_path = resume_path
        self.resume_content = ""
        self._is_initialized = False
        
        # Configure Gemini
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key or api_key == "your_gemini_api_key_here":
            raise ValueError("Please set your GOOGLE_API_KEY in the .env file")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        
        # System prompt for the chatbot
        self.system_prompt = """You are an AI assistant that answers questions about a person based on their resume.
You should respond in a friendly, professional manner as if you are representing this person.
Use the provided resume content to answer questions accurately.

CRITICAL INSTRUCTIONS:
- NOTE: Due to PDF formatting, the internship/job dates may appear at the END of the document near the name, NOT next to the job title. 
- If you see a date pattern like (SEP/15/2025-OCT/15/2025) at the end of the document, it refers to the DATA SCIENCE INTERNSHIP dates.
- ALWAYS include specific dates, durations, percentages, and numbers from the resume when answering.
- When discussing experience or education, ALWAYS mention the exact dates found in the resume.
- Speak in first person as if you ARE the person whose resume this is.
- Look for date patterns throughout the ENTIRE document, especially at the end."""
    
    def initialize(self, force_reload: bool = False) -> dict:
        """
        Load the resume document.
        
        Args:
            force_reload: If True, reload the resume
            
        Returns:
            Dict with initialization status
        """
        try:
            if self._is_initialized and not force_reload:
                return {
                    "status": "success",
                    "message": "Already initialized",
                    "content_length": len(self.resume_content)
                }
            
            # Load the PDF
            self.resume_content = load_pdf(self.resume_path)
            
            if not self.resume_content:
                return {
                    "status": "error",
                    "message": "No content extracted from PDF"
                }
            
            self._is_initialized = True
            return {
                "status": "success",
                "message": f"Successfully loaded resume ({len(self.resume_content)} characters)",
                "content_length": len(self.resume_content)
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }
    
    def query(self, question: str) -> dict:
        """
        Answer a question using the resume context.
        
        Args:
            question: The user's question
            
        Returns:
            Dict containing the answer
        """
        if not self._is_initialized:
            init_result = self.initialize()
            if init_result["status"] == "error":
                return {
                    "answer": "Sorry, I couldn't load the resume data. Please try again.",
                    "context": [],
                    "question": question,
                    "error": init_result["message"]
                }
        
        try:
            # Build prompt with full resume context
            prompt = f"""{self.system_prompt}

=== MY RESUME ===
{self.resume_content}
=== END RESUME ===

USER QUESTION: {question}

Please answer the question based on my resume above. If the information isn't available, say so politely."""
            
            # Generate response using Gemini
            response = self.model.generate_content(prompt)
            
            return {
                "answer": response.text,
                "context": [self.resume_content[:500] + "..."],  # Preview of context
                "question": question
            }
            
        except Exception as e:
            return {
                "answer": f"Sorry, I encountered an error: {str(e)}",
                "context": [],
                "question": question,
                "error": str(e)
            }
    
    def get_status(self) -> dict:
        """Get the current status of the RAG engine"""
        return {
            "initialized": self._is_initialized,
            "content_length": len(self.resume_content),
            "resume_path": self.resume_path
        }


# Use SimpleRAGEngine as RAGEngine for compatibility
RAGEngine = SimpleRAGEngine
