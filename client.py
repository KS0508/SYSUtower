# !/usr/bin/python
# -*- coding: UTF-8 -*-
import json
import time
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
                news_list.append({'id' : row_new[0], 'title' : row_new[1], 'publishDate' : row_new[2], 'fetchTime' : row_new[3], 'is_favorite' : row_new[4], 'keywords' : row_new[5].split('，'), 'excerpt' : row_new[6], 'url' : row_new[7]})
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
                news_list.append({'id' : row_new[0], 'title' : row_new[1], 'publishDate' : row_new[2], 'fetchTime' : row_new[3], 'is_favorite' : row_new[4], 'keywords' : row_new[5].split('，'), 'excerpt' : row_new[6], 'url' : row_new[7]})
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
            news_tar = {'id' : rows_new[0], 'title' : rows_new[1], 'publishDate' : rows_new[2], 'fetchTime' : rows_new[3], 'is_favorite' : rows_new[4], 'keywords' : rows_new[5].split('，'), 'excerpt' : rows_new[6], 'content' : rows_new[7], 'url' : rows_new[8], 'attachments' : att_list}
        
        c.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : news_tar})
        
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/subscription/',  methods = ['GET'])
def subscription():
    if request.method == 'GET' :
        fav_page = request.args.get('page', 0, type = int)
        fav_num = request.args.get('limit', 1, type = int)
        s_limit = ''
        if fav_num :
            s_limit = 'LIMIT %d OFFSET %d' % (fav_num, (fav_page - 1) * fav_num)
        data = sqlite3.connect('test.db')
        c = data.cursor()

        sub = c.execute('SELECT source_id FROM SUBSCRIPTION ORDER BY source_id ASC %s;' % s_limit)
        sub_list = []
        for row_sub in sub:
            sources = c.execute('SELECT source_id, source_sub_name, source_department_name FROM SOURCE WHERE source_id = %d;' % row_sub[0])
            for row_src in sources:
                sub_list.append({'id' : row_src[0], 'name' : row_src[1], 'department' : row_src[2]})

        c.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : sub_list})
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/subcription/<int:id>', methods = ['POST'])
def add_sub(id):
    if request.method == 'POST':
        data = sqlite3.connect('test.db')
        c = data.cursor()
        passport = 0

        sources = c.execute('SELECT source_id FROM SOURCE WHERE source_id = %d;' % id)
        for row_src in sources :
            if row_src[0] == id:
                passport = 1
        if passport == 0 :
            return jsonify({'ret' : 243, 'data' : 'SOURCE_ID_NOT_FOUND'})
        
        passport = 0
        sub = c.execute('SELECT source_id FROM SUBSCRIPTION WHERE source_id = %d;' % id)
        for row_sub in sub:
            if row_sub[0] == id:
                passport = 1
        if passport == 1 :
            return jsonify({'ret' : 242, 'data' : 'IS_ALREADY_SUBSCRIBED'})

        c.execute('INSERT INTO SUBSCRIPTION (source_id, last_update_time) VALUES (%d, %s)' % (id, time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())))
        sub_ids = c.execute('SELECT sub_id FROM SUBSCRIPTION WHERE source_id = %d' % id)
        sub_id = 0
        for row_id in sub_id :
            sub_id  = row_id[0]
        c.execute('UPDATE SOUCRCE SET subscription_id = %d WHERE source_id = %d' % (sub_id, id))
        data.commit()
        c.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : 'SUCCESS'})

    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/subcription/<int:id>', methods = ['DELETE'])
def del_sub(id):
    if request.method == 'DELETE':
        data = sqlite3.connect('test.db')
        c = data.cursor()
        passport = 0

        sources = c.execute('SELECT source_id FROM SOURCE WHERE source_id = %d;' % id)
        for row_src in sources :
            if row_src[0] == id:
                passport = 1
        if passport == 0 :
            return jsonify({'ret' : 243, 'data' : 'SOURCE_ID_NOT_FOUND'})
        
        passport = 0
        sub = c.execute('SELECT source_id FROM SUBSCRIPTION WHERE source_id = %d;' % id)
        for row_sub in sub:
            if row_sub[0] == id:
                passport = 1
        if passport == 0 :
            return jsonify({'ret' : 242, 'data' : 'IS_ALREADY_NOT_SUBSCRIBED'})

        c.execute('DELETE FROM SUBSCRIPTION WHERE source_id = %d;' % id)
        c.execute('UPDATE SOUCRCE SET subscription_id = 0 WHERE subscription_id = %d;' % id)
        data.commit()
        c.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : 'SUCCESS'})

    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/favorite/', methods = ['GET'])
def fav_get():
    if request.method == 'GET' :

        data = sqlite3.connect('test.db')
        c = data.cursor()
        news_num = request.args.get('limit', 0, type = int)
        news_page = request.args.get('page', 1, type = int)
        s_limit = ''
        if news_num :
            s_limit = 'LIMIT %d OFFSET %d' % (news_num, (news_page - 1) * news_num)
        
        favorite = c.execute('SELECT news_id, news_title, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address FROM NEWS WHERE is_bookmarked = 1 ORDER BY fetch_time %s;' % s_limit)
        fav_list = []
        for row_fav in favorite :
            fav_list.append({'id' : row_fav[0], 'title' : row_fav[1], 'publishDate' : row_fav[2], 'fetch_time' : row_fav[3], 'is_favorite' : row_fav[4], 'keywords' : row_fav[5].split('，'), 'excerpt' : row_fav[6], 'url' : row_fav[7]})
        
        c.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : fav_list})

    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/favorite/<int:id>', methods = ['POST'])
def add_fav(id):
    if request.method == 'POST':
        passport = 0
        data = sqlite3.connect('tast.db')
        c = data.cursor()
        news_sub = c.execute('SELECT news_id is_bookmarked FROM NEWS WHERE news_id = %d;' % id)
        for row_news_sub in news_sub :
            if row_news_sub[0] == id :
                passport = 1
                if row_news_sub[1] == 1:
                    passport = 2
        if passport == 1 :
            c.execute('UPDATE NEWS SET is_bookmarked = 1 WHERR news_id = %d;' % id)
            c.close()
            data.commit()
            data.close()
            return jsonify({'ret' : 0, 'data' : 'SUCCESS'})
        elif passport == 0 :
            c.close()
            data.close()
            return jsonify({'ret' : 233, 'data' : 'NEWS_ID_NOT_FOUND'})
        elif passport == 2 :
            c.close()
            data.close()
            return jsonify({'ret' : 222, 'data' : 'IS_ALREADY_FAVORITE'})
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/favorite/<int:id>', methods = ['DELETE'])
def del_fav(id):
    if request.method == 'DELETE':
        passport = 0
        data = sqlite3.connect('tast.db')
        c = data.cursor()
        news_sub = c.execute('SELECT news_id, id_bookmarked FROM NEWS WHERE news_id = %d;' % id)
        for row_news_sub in news_sub :
            if row_news_sub[0] == id :
                passport = 1
                if row_news_sub[1] == 1:
                    passport = 2
        if passport == 1 :
            c.execute('UPDATE NEWS SET is_bookmarked = 0 WHERR news_id = %d;' % id)
            c.close()
            data.commit()
            data.close()
            return jsonify({'ret' : 0, 'data' : 'SUCCESS'})
        elif passport == 0 :
            c.close()
            data.close()
            return jsonify({'ret' : 233, 'data' : 'NEWS_ID_NOT_FOUND'})
        elif passport == 1 :
            c.close()
            data.close()
            return jsonify({'ret' : 223, 'data' : 'IS_ALREADY_NOT_FAVORITE'})
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})