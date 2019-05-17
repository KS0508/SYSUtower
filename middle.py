import json

def update_news():
'''
    news = dict()
    news[news_id]
    news[news_address], news[news_title]
    news[news_summary], news[news_keyword]
    news_json = json.dump(news)
    return [news_json]
'''

def news_tab(news_id):
'''
    tab_news = dict()
    tab_news[news_id]
    tab_news[news_content_html]
    tab_news[attachment_list]
    tab_news_json = json.dump(tab_news)
    return tab_news_json
'''

def download_attachment(attchment_id):
'''
    return operation_status
'''

def bookmark_news(news_id, operation):
'''
    operation == 1 : add bookmark
    operation == 0 : delete bookmark
    return operation_status
'''

def all_bookmarked_news():
'''
    return the same as update_news
'''

def search(keyword):
'''
    return the same as update_news
'''

def filter(keyword):
'''
    return the same as update_news
'''

def all_sources():
'''
    source = dict()
    source[source_id]
    source[source_department_name], source[source_sub_name]
    source[source_type], source[source_address]
    return [source]
'''

def check_news_scraped(news_list):
'''
    news_list = [news_basic_info]
    news_basic_info = dict()
    news_basic_info[news_title], news_basic_info[news_address]
    
    unscraped_news = (news_address not exist | news_title not same)
    return [unscraped_news]
'''