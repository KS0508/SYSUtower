# !/usr/bin/python
# -*- coding: UTF-8 -*-
import json
import time
from flask import Flask
from flask import request
from flask import jsonify
import sqlite3

client = Flask(__name__)

'''
用户订阅的所有 source 的数组，及 source 对应的部分 news。
news 仅包括 id, title, publishDate, fetchTime, is_favorite/is_bookmarked, keywords, excerpt, url；不包括 content, attachments。
'''
@client.route('/home', methods = ['GET'])
def home():
    if request.method == 'GET':
        article_num = request.args.get('limit', 5, type = int)

        data = sqlite3.connect('test.db')
        c_source = data.cursor()
        c_news = data.cursor()

        sources = c_source.execute('SELECT * FROM SOURCE INNER JOIN SUBSCRIPTION ON SOURCE.source_id = SUBSCRIPTION.source_id ORDER BY source_id ASC;')
        src_list = []        
        
        for row_src in sources:
            news = c_news.execute('SELECT news_id, news_title, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address FROM NEWS WHERE source_id = %d ORDER BY fetch_time DESC LIMIT %d;' % (row_src[0], article_num))
            news_list = []

            for row_new in news:
                news_list.append({'id' : row_new[0], 'title' : row_new[1], 'publishDate' : row_new[2], 'fetchTime' : row_new[3], 'is_favorite' : row_new[4], 'keywords' : row_new[5].split('，'), 'excerpt' : row_new[6], 'url' : row_new[7]})
            src_list.append({'id' : row_src[0], 'name' : row_src[2], 'department' : row_src[1], 'news' : news_list})
        
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

@client.route('/sources/count', methods = ['GET'])
def src_count():
    if request.method == 'GET' :
        data = sqlite3.connect('test.db')
        c = data.cursor()

        sources = c.execute('SELECT COUNT (source_id) FROM SOURCE')
        for row_src in sources :
            return jsonify({'ret' : 0, 'data' : row_src[0]})
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
        src_list = {}        

        sources = c_src.execute('SELECT source_id, source_sub_name, source_department_name FROM SOURCE WHERE source_id = %f' % id)
        for row_src in sources:
            news = c_news.execute('SELECT news_id, news_title, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address FROM NEWS WHERE source_id = %d ORDER BY fetch_time DESC LIMIT %d OFFSET %d;' % (id, article_num, ((article_page - 1) * article_num)))
            news_list = []

            for row_new in news:
                news_list.append({'id' : row_new[0], 'title' : row_new[1], 'publishDate' : row_new[2], 'fetchTime' : row_new[3], 'is_favorite' : row_new[4], 'keywords' : row_new[5].split('，'), 'excerpt' : row_new[6], 'url' : row_new[7]})
            src_list = {'id' : row_src[0], 'name' : row_src[1], 'department' : row_src[2], 'news' : news_list}
    
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

@client.route('/subscriptions/',  methods = ['GET'])
def subscription():
    if request.method == 'GET' :
        fav_page = request.args.get('page', 1, type = int)
        fav_num = request.args.get('limit', 0, type = int)
        s_limit = ''
        if fav_num != 0 :
            s_limit = 'LIMIT ? OFFSET ?', (fav_num, (fav_page - 1) * fav_num)

        data = sqlite3.connect('test.db')
        c_src = data.cursor()

        sub = c_src.execute('SELECT source_id FROM SUBSCRIPTION ORDER BY source_id ASC %s;' % s_limit)
        sub_list = []
        src_id_ls = []
        
        for row_sub in sub:
            src_id_ls.append(row_sub[0])
        for row_id in src_id_ls :
            sources = c_src.execute('SELECT source_id, source_sub_name, source_department_name FROM SOURCE WHERE source_id = %d;' % row_id)
            for row_src in sources :
                sub_list.append({'id' : row_src[0], 'name' : row_src[1], 'department' : row_src[2]})
        '''
        # 我也不知道为什么这个不行
        for row_sub in sub:
            sources = c_src.execute('SELECT source_id, source_sub_name, source_department_name FROM SOURCE WHERE source_id = ?;', row_sub[0])
            for row_src in sources:
                sub_list.append({'id' : row_src[0], 'name' : row_src[1], 'department' : row_src[2]})
        '''
        c_src.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : sub_list})
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/subscriptions/count', methods = ['GET'])
def sub_count():
    if request.method == 'GET' :
        data = sqlite3.connect('test.db')
        c = data.cursor()
        subscriptions = c.execute('SELECT COUNT (sub_id) FROM SUBSCRIPTION')
        for row_sub in subscriptions :
            return jsonify({'ret' : 0, 'data' : row_sub[0]})
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/subscriptions/<int:src_id>', methods = ['POST'])
def add_sub(src_id):
    if request.method == 'POST':
        data = sqlite3.connect('test.db')
        c = data.cursor()
        passport = 0

        sources = c.execute('SELECT source_id FROM SOURCE WHERE source_id = %d' % src_id)
        for row_src in sources :
            if row_src[0] == src_id:
                passport = 1
        if passport == 0 :
            return jsonify({'ret' : 243, 'data' : 'SOURCE_ID_NOT_FOUND'})
        
        sub = c.execute('SELECT source_id FROM SUBSCRIPTION WHERE source_id = %d;' % src_id)
        for row_sub in sub:
            if row_sub[0] == src_id:
                passport = 0
        if passport == 0 :
            return jsonify({'ret' : 242, 'data' : 'IS_ALREADY_SUBSCRIBED'})

        c.execute('INSERT INTO SUBSCRIPTION (source_id, last_update_time) VALUES (?, ?);', (src_id, time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())))
        test = c.execute('SELECT * FROM SUBSCRIPTION WHERE source_id = %d;' % src_id)
        for row in test :
            print(row)
        data.commit()
        c.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : 'SUCCESS'})

    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/subscriptions/<int:id>', methods = ['DELETE'])
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
        data.commit()
        c.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : 'SUCCESS'})

    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/favorites/count', methods = ['GET'])
def fav_count():
    if request.method == 'GET' :
        data = sqlite3.connect('test.db')
        c = data.cursor()
        favs = c.execute('SELECT COUNT (news_id) FROM NEWS WHERE is_bookmarked = 1')
        for row_fav in favs :
            return jsonify({'ret' : 0, 'data' : row_fav[0]})
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/favorites/', methods = ['GET'])
def fav_get():
    if request.method == 'GET' :

        data = sqlite3.connect('test.db')
        c = data.cursor()
        news_num = request.args.get('limit', 0, type = int)
        news_page = request.args.get('page', 1, type = int)
        s_limit = ''
        if news_num :
            s_limit = 'LIMIT ? OFFSET ?', (news_num, (news_page - 1) * news_num)
        
        favorite = c.execute('SELECT news_id, news_title, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address FROM NEWS WHERE is_bookmarked = 1 ORDER BY fetch_time %s;' % s_limit)
        fav_list = []
        for row_fav in favorite :
            fav_list.append({'id' : row_fav[0], 'title' : row_fav[1], 'publishDate' : row_fav[2], 'fetch_time' : row_fav[3], 'is_favorite' : row_fav[4], 'keywords' : row_fav[5].split('，'), 'excerpt' : row_fav[6], 'url' : row_fav[7]})
        
        c.close()
        data.close()
        return jsonify({'ret' : 0, 'data' : fav_list})

    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

@client.route('/favorites/<int:id>', methods = ['POST'])
def add_fav(id):
    if request.method == 'POST':
        passport = 0
        data = sqlite3.connect('test.db')
        c = data.cursor()
        news_sub = c.execute('SELECT news_id, is_bookmarked FROM NEWS WHERE news_id = %d;' % id)
        for row_news_sub in news_sub :
            if row_news_sub[0] == id :
                passport = 1
                if row_news_sub[1] == 1:
                    passport = 2
        if passport == 1 :
            c.execute('UPDATE NEWS SET is_bookmarked = 1 WHERE news_id = %d;' % id)
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

@client.route('/favorites/<int:id>', methods = ['DELETE'])
def del_fav(id):
    if request.method == 'DELETE':
        passport = 0
        data = sqlite3.connect('test.db')
        c = data.cursor()
        news_sub = c.execute('SELECT news_id, is_bookmarked FROM NEWS WHERE news_id = %d;' % id)
        for row_news_sub in news_sub :
            if row_news_sub[0] == id :
                passport = 1
                if row_news_sub[1] == 0:
                    passport = 2
        if passport == 1 :
            c.execute('UPDATE NEWS SET is_bookmarked = 0 WHERE news_id = %d;' % id)
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
            return jsonify({'ret' : 223, 'data' : 'IS_ALREADY_NOT_FAVORITE'})
    else :
        return jsonify({'ret' : 1, 'data' : 'NULL'})

