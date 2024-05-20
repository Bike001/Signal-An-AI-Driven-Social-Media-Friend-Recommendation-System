:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_server)).

% Define similar emotions as facts
similar_emotions(admiration, [pride, joy, optimism]).
similar_emotions(amusement, [joy, surprise, delight]).
similar_emotions(anger, [annoyance, rage, disgust]).
similar_emotions(annoyance, [anger, irritation, disapproval]).
similar_emotions(approval, [admiration, pride, satisfaction]).
similar_emotions(caring, [love, compassion, empathy]).
similar_emotions(confusion, [perplexity, bewilderment, uncertainty]).
similar_emotions(curiosity, [interest, inquisitiveness, exploration]).
similar_emotions(desire, [longing, craving, want]).
similar_emotions(disappointment, [regret, dismay, sadness]).
similar_emotions(disapproval, [disdain, contempt, scorn]).
similar_emotions(disgust, [revulsion, repugnance, loathing]).
similar_emotions(embarrassment, [shame, chagrin, mortification]).
similar_emotions(excitement, [euphoria, thrill, elation]).
similar_emotions(fear, [terror, dread, anxiety]).
similar_emotions(gratitude, [thankfulness, appreciation, recognition]).
similar_emotions(grief, [sorrow, mourning, heartache]).
similar_emotions(joy, [happiness, delight, elation]).
similar_emotions(love, [affection, tenderness, warmth]).
similar_emotions(nervousness, [anxiety, tension, apprehension]).
similar_emotions(optimism, [hopefulness, confidence, positivity]).
similar_emotions(pride, [dignity, honor, self-respect]).
similar_emotions(realization, [awareness, enlightenment, understanding]).
similar_emotions(relief, [solace, alleviation, comfort]).
similar_emotions(remorse, [regret, guilt, penitence]).
similar_emotions(sadness, [sorrow, melancholy, gloom]).
similar_emotions(surprise, [astonishment, amazement, shock]).
similar_emotions(neutral, [indifference, detachment, unconcern]).

% Predicate to retrieve similar emotions including the queried emotion
get_similar_emotions(Emotion, SimilarEmotions) :-
    similar_emotions(Emotion, Emotions),
    append(Emotions, [Emotion], SimilarEmotions).

:- http_handler(root(emotions), emotions_handler, []).

emotions_handler(Request) :-
    http_read_json_dict(Request, QueryDict),
    format(user_error, "Received query: ~p~n", [QueryDict]),
    Emotion = QueryDict.get(emotion),
    (   nonvar(Emotion),
        atom_string(EmotionAtom, Emotion),  % Convert string to atom if necessary
        get_similar_emotions(EmotionAtom, SimilarEmotions)
    ->  format(user_error, "Similar emotions found: ~p for: ~p~n", [SimilarEmotions, Emotion]),
        reply_json_dict(_{emotion: Emotion, similar_emotions: SimilarEmotions})
    ;   format(user_error, "Emotion not found for: ~p~n", [Emotion]),
        reply_json_dict(_{error: "Emotion not found"}, [status(404)])
    ).

:- http_server([port(8080)]).

% Ensure this file is saved as emotions_api_server.pl
