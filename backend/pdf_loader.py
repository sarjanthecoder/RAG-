"""
PDF Loader Module - With Text Cleanup
Handles loading PDF documents and cleaning up extracted text
"""

from pypdf import PdfReader
import os
import re


def clean_spaced_text(text: str) -> str:
    """
    Clean up text that has spaces between every character.
    This is common in some PDF extraction scenarios.
    """
    # Pattern to detect text like "S E P / 1 5 / 2 0 2 5"
    # Look for sequences where single characters are separated by single spaces
    lines = text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # Check if line has the pattern of space-separated characters
        # (more than 30% single-char tokens separated by spaces)
        tokens = line.split(' ')
        if len(tokens) > 5:
            single_char_count = sum(1 for t in tokens if len(t) == 1)
            if single_char_count / len(tokens) > 0.5:
                # This line likely has spaced-out text, join it
                cleaned_line = ''.join(tokens)
                cleaned_lines.append(cleaned_line)
            else:
                cleaned_lines.append(line)
        else:
            cleaned_lines.append(line)
    
    return '\n'.join(cleaned_lines)


def load_pdf(file_path: str) -> str:
    """
    Load a PDF file and extract all text content.
    
    Args:
        file_path: Path to the PDF file
        
    Returns:
        Extracted text content as a string
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF file not found: {file_path}")
    
    reader = PdfReader(file_path)
    text = ""
    
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    
    # Clean up the extracted text
    cleaned_text = clean_spaced_text(text.strip())
    
    return cleaned_text
