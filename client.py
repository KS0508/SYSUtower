# !/usr/bin/python
# -*- coding: UTF-8 -*-
import json
from flask import Flask
from flask import request
from flask import jsonify
import sqlite3

# template = {'ret', 'data'}
ERROR_LIST = ['SUBSCRIPTION_ID_NOT_FOUND']

client = Flask(__name__)


'''
用户订阅的所有 source 的数组，及 source 对应的部分 news。
news 仅包括 id, title, publishDate, fetchTime, is_favorite/is_bookmarked, keywords, excerpt, url；不包括 content, attachments。
'''
@client.route('/home', methods = ['GET'])
def home_test():
    if request.method == 'GET':
        article_num = request.args.get('limit', 5, type = int)

        data = sqlite3.connect('test.db')
        c_source = data.cursor()
        c_news = data.cursor()

        sources = c_source.execute('SELECT source_id, source_sub_name, source_department_name FROM SOURCE ORDER BY source_id ASC;')
        src_list = []        
        
        for row_src in sources:
            news = c_news.execute('SELECT news_id, news_title, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address FROM NEWS WHERE source_id = %d ORDER BY fetch_time DESC LIMIT %d;' % (row_src[0], article_num))
            news_list = []

            for row_new in news:
                news_list.append({'id' : row_new[0], 'title' : row_new[1], 'publishData' : row_new[2], 'fetchTime' : row_new[3], 'is_favorite' : row_new[4], 'keywords' : row_new[5].split('，'), 'excerpt' : row_new[6], 'url' : row_new[7]})
            print(jsonify(news_list[0]))
            src_list.append({'id' : row_src[0], 'name' : row_src[1], 'department' : row_src[2], 'news' : news_list})
        
        c_source.close()
        c_news.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : src_list})

    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/sources/', methods = ['GET'])
def source_all():
    if request.method == 'GET':
        data = sqlite3.connect('test.db')
        c_src = data.cursor()

        src_list = []
        sources = c_src.execute('SELECT source_id, source_sub_name, source_department_name FROM SOURCE ORDER BY source_id ASC;')
        for row_src in sources:
            src_list.append({'id' : row_src[0], 'name' : row_src[1], 'department' : row_src[2]})
        
        c_src.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : src_list})
    
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/sources/<int:id>', methods = ['GET'])
def source_tar(id):
    print(id)
    if request.method == 'GET':
        article_num = request.args.get('limit', 10, type = int)
        article_page = request.args.get('page', 1, type = int)
        data = sqlite3.connect('test.db')
        c_src = data.cursor()
        c_news = data.cursor()        
        src_list = []        

        sources = c_src.execute('SELECT source_id, source_sub_name, source_department_name FROM SOURCE WHERE source_id = %d' % id)
        for row_src in sources:
            news = c_news.execute('SELECT news_id, news_title, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address FROM NEWS WHERE source_id = %d ORDER BY fetch_time DESC LIMIT %d OFFSET %d;' % (id, article_num, ((article_page - 1) * article_num)))
            news_list = []

            for row_new in news:
                news_list.append({'id' : row_new[0], 'title' : row_new[1], 'publishData' : row_new[2], 'fetchTime' : row_new[3], 'is_favorite' : row_new[4], 'keywords' : row_new[5].split('，'), 'excerpt' : row_new[6], 'url' : row_new[7]})
            print(jsonify(news_list[0]))
            src_list.append({'id' : row_src[0], 'name' : row_src[1], 'department' : row_src[2], 'news' : news_list})
    
        c_src.close()
        c_news.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : src_list})

    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/news/<int:id>', methods = ['GET'])
def give_news(id):
    if request.method == 'GET':
        data = sqlite3.connect('test.db')
        c = data.cursor()

        att_list = []
        atts = c.execute('SELECT att_id, att_name, att_address FROM ATTACHMENT WHERE news_id = %d ORDER BY att_id ASC;' % id)
        for rows_att in atts:
            att_list.append({'id' : rows_att[0], 'name' : rows_att[1], 'url' : rows_att[2]})
        
        news_tar = {}
        news = c.execute('SELECT news_id, news_title, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_text, news_address FROM NEWS WHERE news_id = %d;' % id)
        for rows_new in news:
            news_tar = {'id' : rows_new[0], 'title' : rows_new[1], 'publishData' : rows_new[2], 'fetchTime' : rows_new[3], 'is_favorite' : rows_new[4], 'keywords' : rows_new[5].split('，'), 'excerpt' : rows_new[6], 'content' : rows_new[7], 'url' : rows_new[8], 'attachments' : att_list}
        
        return jsonify(news_tar)
            

    else :
        return jsonify({'ret' : 0, 'data' : 'NULL'})





'''
@client.route('/update_news')
def update_news():
    news = dict()
    news[news_id]
    news[news_address]
    news[news_title]
    news[news_summary]
    news[news_keyword]
    news_json = json.dumps(news)
    return [news_json]

@client.route('/news_tab')
def news_tab(news_id):
    tab_news = dict()
    tab_news[news_id]
    tab_news[news_content_html]
    tab_news[attachment_list]
    tab_news_json = json.dump(tab_news)
    return tab_news_json

@client.route('/download_attachment')
def download_attachment(attchment_id):
    return operation_status

@client.route('/bookmark_news')
def bookmark_news(news_id, operation):
    operation == 1 : add bookmark
    operation == 0 : delete bookmark
    return operation_status


@client.route('/all_bookmarked_news')
def all_bookmarked_news():
    bookmarked_news = dict()
    bookmarked_news[news_id]
    bookmarked_news[news_address]
    bookmarked_news[news_title]
    bookmarked_news[news_summary]
    bookmarked_news[news_keyword]
    bookmarked_news_json = json.dump(news)
    return [bookmarked_news]

@client.route('/search')
def search(keyword):
    news = dict()
    news[news_id]
    news[news_address]
    news[news_title]
    news[news_summary]
    news[news_keyword]
    news_json = json.dump(news)
    return [news_json]

@client.route('/keyword')
def filter(keyword):
    news = dict()
    news[news_id]
    news[news_address]
    news[news_title]
    news[news_summary]
    news[news_keyword]
    news_json = json.dump(news)
    return [news_json]

@client.route('/all_sourse')
def all_sources():
    source = dict()
    source[source_id]
    source[source_department_name]
    source[source_sub_name]
    source[source_type]
    source[source_address]
    return [source]
'''

