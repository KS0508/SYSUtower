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
	def removevisitedURL(self):
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
	def __init__(self,source_list):
		self.linkQueue = linkQueue()
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
		return NewsURL		
	def catch_attachment_list(self,URL):
		res=requests.get(URL)
		res.encoding='utf-8'
		attachments=[]
		attachments1={}
		soup=BeautifulSoup(res.text,'html.parser')
		for file in soup.find_all(href=re.compile("http://sdcs.sysu.edu.cn/sites")):
			attachments1['att_name']=file.text
			attachments1['att_address']=file['href']
			attachments.append(attachments1)
		return attachments
	def catch_news_info(self,URL,source_id):
		res=requests.get(URL)
		res.encoding='utf-8'
		news_info={}
		html1=[]
		article=[]
		article1=[]
		soup=BeautifulSoup(res.text,'html.parser')
		news_info['news_address']=URL
		news_info['source_id']=source_id
		news_info['news_title'] = ''
		news_info['publish_date'] = ''
		for header in soup.select('.page-header'):
			news_info['news_title']=header.text.strip()
		for writer in soup.select('.submitted-by'):
			news_info['publish_date']=writer.text.split('\u3000')[1].strip("发布时间：").replace("/","-")
		for content1 in soup.select('.content'):
			html1.append(content1)
		htmlall=" ".join('%s' %id for id in html1)
		news_info['news_text']=htmlall
		for content3 in soup.select('.content p'):
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
		for file in soup.find_all(href=re.compile("http://jwb.sysu.edu.cn/sites")):
			attachments1['att_name']=file.text
			attachments1['att_address']=file['href']
			attachments.append(attachments1)
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
		for content1 in soup.select('.node'):
			html1.append(content1)
		htmlall=" ".join('%s' %id for id in html1)
		news_info['news_text']=htmlall
		for content3 in soup.select('.node p'):
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
						news_info=self.catch_news_info(URLL['news_address'],visitedsource)
					table1.append(news_info)
			database.insert_news(table1)
		return True

