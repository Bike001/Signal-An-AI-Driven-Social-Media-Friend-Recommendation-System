SIMILAR_EMOTIONS = {
    'admiration': ['pride', 'joy', 'optimism'],
    'amusement': ['joy', 'surprise', 'delight'],
    'anger': ['annoyance', 'rage', 'disgust'],
    'annoyance': ['anger', 'irritation', 'disapproval'],
    'approval': ['admiration', 'pride', 'satisfaction'],
    'caring': ['love', 'compassion', 'empathy'],
    'confusion': ['perplexity', 'bewilderment', 'uncertainty'],
    'curiosity': ['interest', 'inquisitiveness', 'exploration'],
    'desire': ['longing', 'craving', 'want'],
    'disappointment': ['regret', 'dismay', 'sadness'],
    'disapproval': ['disdain', 'contempt', 'scorn'],
    'disgust': ['revulsion', 'repugnance', 'loathing'],
    'embarrassment': ['shame', 'chagrin', 'mortification'],
    'excitement': ['euphoria', 'thrill', 'elation'],
    'fear': ['terror', 'dread', 'anxiety'],
    'gratitude': ['thankfulness', 'appreciation', 'recognition'],
    'grief': ['sorrow', 'mourning', 'heartache'],
    'joy': ['happiness', 'delight', 'elation'],
    'love': ['affection', 'tenderness', 'warmth'],
    'nervousness': ['anxiety', 'tension', 'apprehension'],
    'optimism': ['hopefulness', 'confidence', 'positivity'],
    'pride': ['dignity', 'honor', 'self-respect'],
    'realization': ['awareness', 'enlightenment', 'understanding'],
    'relief': ['solace', 'alleviation', 'comfort'],
    'remorse': ['regret', 'guilt', 'penitence'],
    'sadness': ['sorrow', 'melancholy', 'gloom'],
    'surprise': ['astonishment', 'amazement', 'shock'],
    'neutral': ['indifference', 'detachment', 'unconcern'],
    # And so on for other emotions...
}

def get_similar_emotions(emotion):
    # This function returns a list of emotions similar to the given one, including the original emotion.
    return SIMILAR_EMOTIONS.get(emotion, []) + [emotion]