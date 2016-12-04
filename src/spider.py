#!/usr/bin/env python2.7

from bs4 import beautifulsoup4

class spider(object):
	def __init__(self, seed_urls=[], scraping_funcs=[], max_depth=5, max_pages=1000, doc_type="text/html"):
		self.seed_urls = seed_urls
		self.max_depth = max_depth
		self.max_pages = max_pages
	
	def crawl():
		for url in seed_urls:
			#Get html page

			#parse page for more links

			#run any data scraping functions passed into crawl
			

	def _getPage(url):

	def _getLinks(pageTxt):
		#check this is a safe link to visit and it is the correct doc_type

	def _runCustomFuncs():
