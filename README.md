# k101r-learner-backend


## Words

### /words

Retrieve information about Korean vocabulary.

###### Parameters
- `id` - ID of the word
- `korean` - Korean word
- `english` - English translation of the Korean word
- `dictation_id` - Dictation ID
- `vocab_id` - Vocabulary ID
- `type` - Bitwise enum of the type of word (particle, noun, etc.)
- `honorific` - Boolean for honorific words

Types
```
0 - null
1 - hangul
2 - particle
4 - noun
8 - pronoun
16 - noun modifier
32 - verb
64 - adverb
128 - plain form
```

###### Response

```javascript
[{
    "_id": 0,
    "korean": "ㄱ",
    "honorific": false,
    "type": 1,
    "english_alias": "",
    "english": "gi-yeok",
    "vocab_id": "",
    "dictation_id": "",
    "description": "기역"
}, { ... }, ...]
```

## Verb Endings

### /verb_endings

Retrieve information about verb endings.

###### Parameters
- `id` - Verb ending ID
- `speech` - Bitwise enum of speech type
- `type`- Type of the verb ending (declarative, interrogative, etc.)
- `tense` - Tense of the verb ending (past, present, future)

Types
```
0 - declarative
1 - interrogative
2 - imperative
3 - propositive
```

Speech
```
0 - null
1 - formal
2 - informal
4 - polite
8 - plain
```

Tense
```
-1 - past
0 - present
1 - future
```

###### Response

```javascript
[{
    "_id": 0,
    "vowel": "ㅂ니다",
    "consonant": "습니다",
    "speech": 5,
    "type": 0,
    "tense": 0
}, { ... }, ...]
```


