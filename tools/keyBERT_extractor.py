from keybert import KeyBERT

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
    doc = """
        To understand the notion of inertial reference frameWhich of the followings is an inertial referance frame? Understand the concept of Newton's first lawWhich of the following is true about Newton's first law? Understand the Newton's laws.Following questions are contain information about Newton's law. Please choose the wrong one. Understanding of frictional forceWhat is difference between static friction and kinetic friction? (quantitatively explain it) Application of Newton's 2nd LawAn object falls down from a frictionless ramp of a height of 10 m and reaches a horizontal plane with friction. The coefficient of kinetic friction of the plane is 0.4. How far can the object go before it comes to rest? (g=10m/s2) Learning about fluid resistance and the types of flow fluid hasWhat is the difference between laminar and turbulent flow? Understand what tension is and how to calculate the tension throughout a rope.Suppose you have a piece of rope. You hold the left end of the rope with your left hand and the right end of the rope with your right hand. You then pull the rope horizontally with 1 N force applied to the rope (horizontally) at each end. What is the tension at the midpoint of the rope? By the third Newton's 3rd law we know that every action has a reaction. It is very important to calculate the proper reaction force which is the negative of a sum of all acting forces.A box of mass 50 kg lies on a horizontal surface with a friction coefficient 0.4. A man is pulling the box at an angle 30 as shown in the figure below. What is the minimum required force to move the box? (g = 10 m/s^2) Newton's law and two dimensional equilibrium A child on a sled with a total mass of 35.0 kg, slides down the frictionless slope with an angle of 30 degrees. Calculate the child's (a) acceleration and (b) normal force (N). (g = 9.81 m/s^2) Speed of lightwhat is the speed of light? Speed of lightWhat is the speed of light? Alternating currentAlternating current is a type of current that is required for a transformer Understanding MeasurementWhich of the following units is NOT used for measuring length?
    """
    print("keywords: ")
    print(extract_keywords(doc))
    print("key phrases: ")
    print(extract_key_phrases(doc))
