from keybert import KeyBERT
import os 
from PyPDF2 import PdfReader

def extract_keywords(doc:str) -> list:
    """
    This function takes in string and uses the keyBERT model to extract keywords
    """
    kw_model = KeyBERT()
    keywords = kw_model.extract_keywords(doc, keyphrase_ngram_range=(1, 1))
    return keywords

def extract_key_phrases(doc:str) -> list:
    """
    This function takes in string and uses the keyBERT model to extract key phrases
    """
    kw_model = KeyBERT()
    key_phrases = kw_model.extract_keywords(doc, keyphrase_ngram_range=(1, 2))
    return key_phrases

if __name__ == "__main__":
    file = input("Please enter the name of the pdf file it should be in the current directory: ")
    if file[-4:] != ".pdf":
        file+=".pdf"
    reader = PdfReader(file)
    print(f"Your file has {len(reader.pages)} pages.")

    doc =""
    for page in reader.pages:
        current_page = page
        text = current_page.extract_text()
        doc+=text
    
    print("keywords: ")
    print(extract_keywords(doc))
    print("key phrases: ")
    print(extract_key_phrases(doc))
