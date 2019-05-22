import requests
import string
import re
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from datetime import datetime
import json
import time
import pandas as pd
import database
import aiohttp
import asyncio
import urllib3
import operator

class linkQueue:
    def __init__(self):
        self.visited = []
        self.unvisited = []
    def getvisitedURL(self):
        return self.visited
    def getunvisitedURL(self):
        return self.unvisited
    def addvisitedURL(self,URL):
        return self.visited.append(URL)
    def addunvisitedURL(self,URL):
        return self.unvisited.append(URL)
    def removevisitedURL(self,URL):
        return self.visited.remove(URL)
    def unvisitedURLdequence(self):
        try:
            return self.unvisited.pop()
        except:
            return None
    def getvisitedURLcount(self):
        return len(self.visited)
    def getunvisitedURLcount(self):
        return len(self.unvisited)
    def unvisitedURLisempty(self):
        return len(self.unvisited) == 0

class Spider():
    def __init__(self,source_list,cutting_model,model_name):
        self.linkQueue = linkQueue()
        self.cutting_model = cutting_model
        self.model_name = model_name
        for source_id in source_list:
            self.linkQueue.addunvisitedURL(source_id)

    def getNewsURL(self, URL):
        NewsURL=[]
        if URL== 0:
            return NewsURL
        base = URL
        res=requests.get(URL)
        res.encoding='utf-8'
        soup=BeautifulSoup(res.text,'html.parser')
        for k in soup.find_all(href=re.compile("content")):
            if k['href']!="#main-content":
                NewsURLL={}
                NewsURLL['news_address'] = urljoin(base,k['href'])
                NewsURLL['news_title'] = k.text
                NewsURL.append(NewsURLL)
        for k in soup.find_all(href=re.compile("article")):
            if k['href']!="#main-content":
                NewsURLL={}
                NewsURLL['news_address'] = urljoin(base,k['href'])
                NewsURLL['news_title'] = k.text
                NewsURL.append(NewsURLL)
        for k in soup.find_all(href=re.compile("[0-9].htm")):
            if k['href']!="#main-content":
                NewsURLL={}
                NewsURLL['news_address'] = urljoin(base,k['href'])
                NewsURLL['news_title'] = k.text
                NewsURL.append(NewsURLL)
        for k in soup.find_all(href=re.compile("notices/[0-9]")):
            if k['href']!="#main-content":
                NewsURLL={}
                NewsURLL['news_address'] = urljoin(base,k['href'])
                NewsURLL['news_title'] = k.text
                NewsURL.append(NewsURLL)
        return NewsURL

    def catch_attachment_list(self,URL):
        res=requests.get(URL)
        res.encoding='utf-8'
        attachments=[]
        attachments1={}
        soup=BeautifulSoup(res.text,'html.parser')
        for file in soup.find_all(href=re.compile(r"(.pdf$|.doc$|.xls$|.xlsx$|.docx$)")):
            attachments1={}
            attachments1['att_name']=file.text
            attachments1['att_address']=file['href']
            attachments.append(attachments1)
        sorted(attachments,key=operator.itemgetter('att_name'))
        return attachments

    def catch_news_info(self,URL,title,source_id):
        res=requests.get(URL)
        res.encoding='utf-8'
        news_info={}
        html1=[]
        article=[]
        article1=[]
        soup=BeautifulSoup(res.text,'html.parser')
        news_info['news_address']=URL
        news_info['source_id']=source_id
        news_info['news_title']=title
        news_info['publish_date']=''
        for writer in soup.select('.submitted-by'):
            news_info['publish_date']=writer.text.split('\u3000')[1].strip("发布时间：").replace("/","-")
            if(news_info['publish_date']=='|'):
                news_info['publish_date']=writer.text.split('\u3000')[2].strip("发布时间：").replace("/","-")
        id=0
        for content1 in soup.select('.field-label-hidden'):
            id+=1
            html1.append(content1)
        htmlall=" ".join('%s' %id for id in html1)
        news_info['news_text']=htmlall
        if id==0:
            for content1 in soup.select('.cont'):
                id+=1
                html1.append(content1)
            htmlall=" ".join('%s' %id for id in html1)
            news_info['news_text']=htmlall
            if id == 0:
                for content1 in soup.select('.field--label-hidden'):
                    id+=1
                    html1.append(content1)
                htmlall=" ".join('%s' %id for id in html1)
                news_info['news_text']=htmlall
                for content3 in soup.select('.field--label-hidden p'):
                    bo=0
                    for content2 in soup.find_all(class_="rtecenter"):
                        if content2 == content3:
                            bo=1
                        if bo == 0:
                            article1.append(content3.text.strip())
                    article.append(content3.text.strip())
                articleall=' '.join(article)
            else:
                for content3 in soup.select('.cont p'):
                    bo=0
                    for content2 in soup.find_all(class_="rtecenter"):
                        if content2 == content3:
                            bo=1
                    if bo == 0:
                        article1.append(content3.text.strip())
                    article.append(content3.text.strip())
                articleall=' '.join(article)
        else:
            for content3 in soup.select('.field-label-hidden p'):
                bo=0
                for content2 in soup.find_all(class_="rtecenter"):
                    if content2 == content3:
                        bo=1
                if bo == 0:
                    article1.append(content3.text.strip())
                article.append(content3.text.strip())
            articleall=' '.join(article)
        news_info['news_abstract']=articleall
        news_info['fetch_time']=time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
        news_info['attachments']=self.catch_attachment_list(URL)
        return news_info

    def catch_attachment_list1(self,URL):
        res=requests.get(URL)
        res.encoding='utf-8'
        attachments=[]
        attachments1={}
        soup=BeautifulSoup(res.text,'html.parser')
        for file in soup.find_all(href=re.compile(r".pdf")):
            attachments1={}
            attachments1['att_name']=file.text
            attachments1['att_address']=file['href']
            attachments.append(attachments1)
        for file in soup.find_all(href=re.compile(r".doc")):
            attachments1={}
            attachments1['att_name']=file.text
            attachments1['att_address']=file['href']
            attachments.append(attachments1)
        for file in soup.find_all(href=re.compile(r".xls")):
            attachments1={}
            attachments1['att_name']=file.text
            attachments1['att_address']=file['href']
            attachments.append(attachments1)
        for file in soup.find_all(href=re.compile(r".xlsx")):
            attachments1={}
            attachments1['att_name']=file.text
            attachments1['att_address']=file['href']
            attachments.append(attachments1)
        for file in soup.find_all(href=re.compile(r".docx")):
            attachments1={}
            attachments1['att_name']=file.text
            attachments1['att_address']=file['href']
            attachments.append(attachments1)
        sorted(attachments,key=operator.itemgetter('att_name'))
        return attachments

    def catch_news_info1(self,URL,source_id):
        res=requests.get(URL)
        res.encoding='utf-8'
        news_info={}
        html1=[]
        article=[]
        article1=[]
        news_info['news_address']=URL
        news_info['source_id']=source_id
        news_info['news_title'] = ''
        news_info['publish_date'] = ''
        soup=BeautifulSoup(res.text,'html.parser')
        for header in soup.select('.page-header'):
            news_info['news_title']=header.text.strip()
        for writer in soup.select('.submitted-by'):
            news_info['publish_date']=writer.text.split('\u3000')[1].strip("发布时间：").replace("/","-")
        for content1 in soup.select('.field-label-hidden'):
            html1.append(content1)
        htmlall=" ".join('%s' %id for id in html1)
        news_info['news_text']=htmlall
        for content3 in soup.select('.field-label-hidden p'):
            bo=0
            for content2 in soup.find_all(class_="rtecenter"):
                if content2 == content3:
                    bo=1
            if bo == 0:
                article1.append(content3.text.strip())
            article.append(content3.text.strip())
        articleall=' '.join(article)
        news_info['news_abstract']=articleall
        news_info['fetch_time']=time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
        news_info['attachments']=self.catch_attachment_list1(URL)
        return news_info

    def crawler(self):
        while (self.linkQueue.getunvisitedURLcount() != 0):
            visitedsource = self.linkQueue.unvisitedURLdequence() 
            if visitedsource is None or visitedsource == '':
                continue
            visitedURL=database.search_source(visitedsource)
            k=self.getNewsURL(visitedURL)
            jiaowubu='http://jwb.sysu.edu.cn'
            k.reverse()
            table1=[]
            for URLL in k :
                if database.search_news(URLL):
                    if jiaowubu in URLL['news_address']:
                        news_info=self.catch_news_info1(URLL['news_address'],visitedsource)
                    else:   
                        news_info=self.catch_news_info(URLL['news_address'],URLL['news_title'],visitedsource)
                    table1.append(news_info)
            database.insert_news(table1, self.cutting_model, self.model_name)
        return True

