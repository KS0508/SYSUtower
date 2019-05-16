import asyncio
import urllib3
import bs4
import aiohttp

def scrap_subscriptnion(subscription_list):
'''
    subscription = [subscription]
    subscription = dict()
    subscription[subscription_id]
    subscription[subscription_type]
    subscription[subscrioption_source]
    
    news_info_list = [news_info]
    news_info = dict()
    news_info[subscription_id], news_info[news_id]
    news_info[news_address], news_info[news_title]
    news_info[news_content_html](simplified html, string)
    news_info[created_time](written in news)
    
    return news_info_list
'''

