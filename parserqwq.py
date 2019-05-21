import thulac
import jieba.analyse
from networkx import from_numpy_matrix, pagerank_numpy
from numpy import log,zeros
from re import split

def split_sentence(full_text):
    sep = '[\n。？！]'
    sentences = split(sep, full_text)
    return sentences

def calc_similarity(wordlist_1, wordlist_2):
    common_occur_sum = 0.0
    wordset_1 = list(set(wordlist_1))
    wordset_2 = list(set(wordlist_2))
    for word in wordset_1:
        if word in wordset_2:
            common_occur_sum += 1.0
    if common_occur_sum < 1e-12:
        return 0.0
    denominator = log(len(wordset_1)) + log(len(wordset_2))
    if abs(denominator) < 1e-12:
        return 0.0
    similarity = common_occur_sum / denominator
    return similarity

def find_abstract(sentences, limit=3, alpha=0.85):
    abstract_sentences = []
    sentences_num = len(sentences)
    graph = zeros((sentences_num, sentences_num))
    lac = thulac.thulac(seg_only=True)
    wordlist = []
    for sent in sentences:
        current_sentence_wordcut = lac.cut(sent, text=True)
        wordlist.append(current_sentence_wordcut)
    for x in range(sentences_num):
        for y in range(x, sentences_num):
            similarity = calc_similarity(wordlist[x], wordlist[y])
            graph[x, y] = similarity
            graph[y, x] = similarity
    nx_graph = from_numpy_matrix(graph)
    scores = pagerank_numpy(nx_graph, alpha)
    sorted_scores = sorted(scores.items(), key=lambda item: item[1], reverse=True)
    for index, score in sorted_scores[:limit]:
        item = {"sentence_text": sentences[index], 'score': score, 'index': index}
        abstract_sentences.append(item)
    sorted_abstract = sorted(abstract_sentences, key=lambda x: x['index'], reverse=False)
    abstract = '\n'.join([x['sentence_text'] for x in sorted_abstract])
    return abstract

def find_keyword(full_text, limit=3):
    keywords = jieba.analyse.textrank(full_text,topK=limit)
    return keywords

def parse(news_title, news_text):
    news_keyword_1 = find_keyword(news_title)
    news_keyword_2 = find_keyword(news_text)
    news_keyword = list(set(news_keyword_1).union(set(news_keyword_2)))
    news_keyword_str = '，'.join(news_keyword)
    news_sentences_list = split_sentence(news_text)
    news_abstract = find_abstract(news_sentences_list)
    return [news_abstract, news_keyword_str]

'''
may can call jieba.initialize() at first to reduce the time of starting
'''