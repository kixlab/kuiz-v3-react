# How to install requirements

## Install packages in requirements.txt

All the required packages are found in the requirements.txt file use that for your installation.

> run the following command in the terminal preferably after you set up your virtual environment.

```
pip install -r requirements.txt
```

## distractor_suggestion.py requirements

The distractor_suggestion.py file requires external corpus to be downloaded to run properly.

- After installing the requirements through requirements.txt use the following command to download the corpus on your machine.

```
import nltk
nltk.download()
```

> An installer will appear; pressing download will download the necessary corpus.
