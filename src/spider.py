#!/usr/bin/env python2.7

import bs4
import requests as req
import json

class Spider(object):
	def __init__(self, seedUrls=[], scrapingFuncs=[], maxDepth=5, maxPages=1000, mimeType="text/html"):
		self.seedUrls      = seedUrls
		self.maxDepth      = maxDepth
		self.maxPages      = maxPages
		self.scrapingFuncs = []
		self.mimeType      = mimeType
		self._googleAPIKey = "AIzaSyCDX-xabz8UM72IapswAGUge-xcWEK8Dno"
		self._googleAPIUrl = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + self._googleAPIKey
	
	def crawl(self):
		for url in seed_urls:
			#Get html page (if google API thinks its safe)
			respose = req.get()

			#parse page for more links

			#run any data scraping functions passed into crawl
			

	def _getPage(self, url):
		return
	def _getLinks(self, pageTxt):
		#check this is a safe link to visit and it is the correct doc_type
		return

	def _runCustomFuncs(self):
		return
	def test(self):
		data = '{"client": {"clientId": "crawler", "clientVersion": "0.0.1"}, "threatInfo": {"threatTypes": ["THREAT_TYPE_UNSPECIFIED"], "platformTypes":["LINUX"], "threatEntryTypes": ["URL"], "threatEntries": [{"url": "http://rjmetrics.com/"},{"url": "https://docs.python.org/"}]}}'
		r = req.post(self._googleAPIUrl, data=data)
		print r
		print r.text
		print r.json()
		#print json.loads(data)

if __name__ == "__main__":

	s = Spider(seedUrls = ["https://docs.python.org/3/tutorial/classes.html"])
	s.test()
	print 'done'
