# !/usr/bin/python
# -*- coding: UTF-8 -*-

import json
import time
from flask import Flask
from flask import jsonify
from flask import request
import socket
import subprocess
'''
def get_free_port():
    HOST = '127.0.0.1'
    with socket.socket() as sock:
        sock.bind((HOST, 0))
        port = sock.getsockname()[1]
    return port

subprocess.run(['dir'])

app = Flask('hehe')
free_port = get_free_port()
print(free_port)
app.run(host='127.0.0.1', port=free_port, threaded=True)
'''

import thulac
import pkuseg
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

def find_abstract(sentences, cutting_model, limit=3, alpha=0.85):
    abstract_sentences = []
    sentences_num = len(sentences)
    graph = zeros((sentences_num, sentences_num))
    wordlist = []
    for sent in sentences:
        '''
        THU model
        current_sentence_wordcut = cutting_model.cut(sent, text=True)
        '''
        current_sentence_wordcut = cutting_model.cut(sent)
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

def parse(news_title, news_text, cutting_model):
    news_keyword_1 = find_keyword(news_title)
    news_keyword_2 = find_keyword(news_text)
    news_keyword = list(set(news_keyword_1).union(set(news_keyword_2)))
    news_keyword_str = '，'.join(news_keyword)
    news_sentences_list = split_sentence(news_text)
    news_abstract = find_abstract(news_sentences_list, cutting_model)
    return [news_abstract, news_keyword_str]

#lac = thulac.thulac(seg_only=True)
#seg = pkuseg.pkuseg()
for i in range(50):
    title = '教务部关于做好2019届本科毕业论文答辩和校级优秀毕业论文评选工作的通知'
    text = '''各学院、直属系：
本科生毕业论文（含毕业设计，下同）是本科教学阶段培养学生综合素质与创新、实践能力的重要环节，是对学生本科学习阶段最重要的一次综合考察。根据《中山大学本科生毕业论文的有关规定》和《教务部关于加强2019届本科生毕业论文（设计）管理工作的通知》（教务〔2019〕98号），并做好校级优秀毕业论文评选推荐工作，现将有关事项通知如下：
一、2019年5月15日至25日之间各学院（系）进行论文评阅、答辩工作。指导教师要根据《中山大学本科生毕业论文质量评定参考标准（试行）》对学生的毕业论文严格要求并掌握好评分标准；各学院（系）应把好答辩关，每一答辩小组由至少3名教师组成；各学院（系）教学负责人要对毕业论文的成绩进行全面复核。
各学院（系）可从本单位的教学业务费中支取本科生毕业论文（设计）答辩的相关费用，其标准按每生30元计。请各学院（系）严格按照2019届本科生参加毕业论文（设计）答辩的人数做好核算和支取工作。
二、学校将对毕业论文（设计）进行抽查工作。各学院（系）应于5月24日前将《中山大学本科毕业论文情况统计表》（附件1）报教务部备案，5月27日前提交教务部选定抽查的毕业论文（设计）电子版至教务部。
三、各学院（系）应遵循“科学公正、注重创新”的原则，根据毕业论文的选题、课题设计、分析论证、写作规范等方面，对校级优秀毕业论文进行评选和推荐。按本单位的推优名额（附件2）从成绩评定为“优秀”的本科毕业论文里优中选优、排序推荐，宁缺毋滥。
5月30日前提交《中山大学2019届校级优秀本科毕业论文推荐表》（附件3）以及所推荐论文的电子版，逾期视为放弃推荐处理。推荐论文请按附件4论文格式要求进行整理后，转化为PDF格式，以“推荐序号+学院+姓名+论文题目”命名。
四、按照《教务部关于加强2019届本科生毕业论文（设计）管理工作的通知》的要求，5月31日前各学院（系）完成毕业论文成绩录入，毕业论文归档工作。6月8日前将《本科毕业论文情况统计表》，毕业论文工作总结报告报送教务部。
'''
    print(parse(title, text, seg))
