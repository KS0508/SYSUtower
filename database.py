# !/usr/bin/python
# -*- coding: UTF-8 -*-
import sqlite3
import parserqwq

def search_news(title_url):
    data = sqlite3.connect('basis.db')
    c = data.cursor()
    tar = c.execute('SELECT news_id FROM NEWS WHERE news_title = ? AND news_address = ?;', (title_url['news_title'], title_url['news_address']))
    for rw in tar :
        # print(title_url['news_title'] + '\t%d' % rw[0])
        return 0
    return 1

def search_source(src_id):
    data = sqlite3.connect('basis.db')
    c = data.cursor()
    address = c.execute('SELECT source_address FROM SOURCE WHERE source_id = %d;' % src_id)
    for row_add in address:
        return row_add[0]
    return 0

def insert_news(news_info_list, cutting_model, model_name):
    data = sqlite3.connect('basis.db')
    c = data.cursor()
    for news_info in news_info_list :
        abs_kw = parserqwq.parse(news_info['news_title'], news_info['news_abstract'], cutting_model, model_name)
        c.execute('INSERT INTO NEWS (source_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_abstract, news_address, news_keyword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', (news_info['source_id'], news_info['news_title'], news_info['news_text'], news_info['publish_date'], news_info['fetch_time'], 0, abs_kw[0], news_info['news_address'], abs_kw[1]))
        news_id = 0
        news_ids = c.execute('SELECT news_id FROM NEWS ORDER BY news_id DESC LIMIT 1')
        for row in news_ids :
            news_id = row[0]
        att_list = news_info['attachments']
        for att in att_list :
            c.execute('INSERT INTO ATTACHMENT (att_name, att_address, news_id) VALUES (?, ?, ?);', (att['att_name'], att['att_address'], news_id))
    data.commit()
    c.close()
    data.close()
    return 1