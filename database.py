# !/usr/bin/python
# -*- coding: UTF-8 -*-
import sqlite3
import parser


def search_news(title_url):
    data = sqlite3.connect('test.db')
    c = data.cursor()
    tar = c.execute('SELECT COUNT(news_id) FROM NEWS WHERE news_title = ? AND news_address = ?;', (title_url[0], title_url[0]))
    for rw in tar :
        if rw[0] :
            return 0
    return 1

def search_source(src_id):
    data = sqlite3.connect('test.db')
    c = data.cursor()
    address = c.execute('SELECT source_address FROM SOURCE WHERE source_id = %d;' % src_id)
    for row_add in address:
        return row_add[0]
    return 0


def insert_news(news_info):
    abs_kw = parser.parse(news_info['news_title'], news_info['news_text'])
    data = sqlite3.connect('test.db')
    c = data.cursor()
    c.execute('INSERT INTO NEWS (source_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_abstract, news_address, news_keyword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', (news_info['source_id'], news_info['news_title'], news_info['news_text'], news_info['publish_date'], news_info['fetch_time'], 0, abs_kw[0], news_info['news_address'], abs_kw[1]))
    
    news_id = 0
    news_ids = c.execute('SELECT news_id FROM NEWS ORDER BY news_id DESC')
    for row in news_ids :
        news_id = row[0]
    print(news_id)
    att_list = news_info['attachment']
    for att in att_list :
        c.execute('INSERT INTO ATTACHMENT (att_name, att_address, news_id) VALUES (?, ?, ?);', (att['name'], att['url'], news_id))
    data.commit()
    c.close()
    data.close()
    return 1