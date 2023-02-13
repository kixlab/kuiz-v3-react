# How to install nltk?
# 1. pip install nltk
# 2. to install the corpus uncomment the following 2 lines and follow the popup steps
# import nltk
# nltk.download()

from nltk.corpus import wordnet 
from pywsd.similarity import max_similarity
from pywsd.lesk import simple_lesk
import random

def get_synset(context: str, word:str):
    """
    This function takes in a context and a word and then returns the synset of the word based on the context
    """
    synsets = wordnet.synsets(word)
    if synsets:
        similarity = max_similarity(context, word)
        lesk =  simple_lesk(context, word)
        lowest_index = min(synsets.index(similarity),synsets.index(lesk))
        highest_prob_synset = synsets[lowest_index]
        return highest_prob_synset
    else:
        return "Word NOT Found!"

def make_distractors_from_synset(synset,original_word: str) -> list:
    """
    This function takes synset and the original word and uses the synset to get the distractors while avoiding adding the original word in the distractors list
    """
    distractors = []
    hypernym = synset.hypernyms()[0]
    for word in hypernym.hyponyms():
        name = word.lemmas()[0].name()
        if name.lower() == original_word.lower():
            continue
        name = name.replace("_", " ")
        name = " ".join(w.capitalize() for w in name.split())
        if name is not None and name not in distractors:
            distractors.append(name)
    if len(distractors) > 3:
        random_selection_distractors = random.sample(distractors, 3)
        return random_selection_distractors
    return distractors

if __name__ == "__main__":
    answer = "Green"
    question = "What color is emerald?"
    if answer not in question:
        question = answer + question
    synset = get_synset(question,answer)
    if type(synset) != str:
        print(f"The definition of the word {answer} is {synset.definition()}")
        distractors = make_distractors_from_synset(synset,answer)
        print("Here are the distractors: ")
        print(distractors) #['Salmon', 'Pink', 'Blue']
    else:
        print(synset)
