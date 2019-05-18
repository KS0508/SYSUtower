import asyncio
import urllib3
import bs4
import aiohttp

def scrap_subscriptnion(subscription_list):
'''
    subscription_list = [subscription]
    subscription = dict()
    subscription[subscription_id]
    subscription[subscription_type]
    subscription[subscrioption_source]
    
    news_info = dict()
    news_info[subscription_id]
    news_info[news_address], news_info[news_title]
    news_info[news_text]
    news_info[news_content_html]
    news_info[publish_time]
    news_info[fetch_time]
    news_info[attachment_list]    

    attachment_list = [attachment] 
    attachment = dict()
    attachment[news_id], attachment[attachment_id]
    attachment[attachment_name], attachment[atachment_address]

    return [news_info]
'''

