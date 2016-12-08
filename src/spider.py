#!/usr/bin/env python2.7

from bs4 import BeautifulSoup
import requests
import mimetypes
import json

##############################################################################
# Spider Class
# - provides a web crawling framework
##############################################################################

class Spider(object):
	# Constructor
	def __init__(self, seedUrls=[], scrapingFuncs=[],  maxPages=1000, mimeTypes=["text/html"]):
		self.seedUrls      = seedUrls
		self.maxPages      = maxPages
		self.scrapingFuncs = scrapingFuncs
		self.mimeTypes     = mimeTypes
		self._googleAPIKey = "AIzaSyCDX-xabz8UM72IapswAGUge-xcWEK8Dno"
		self._googleAPIUrl = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + self._googleAPIKey
		self._googleMaxReq = 500
	
	# Main public function to begin crawling once the constructor has been initialized with appropriate settings
	def crawl(self):
		toVisit = []
		for seedUrl in self.seedUrls:
			toVisit.append(seedUrl)
			numVisited = 0
			while toVisit != [] and numVisited < self.maxPages:
				numVisited = numVisited + 1
				url = toVisit.pop()
				pageTxt = self._getPage(url)
				toVisit = self._getLinks(pageTxt, url) + toVisit
				self._runCustomFuncs(url, pageTxt)	

	# Makes a get request to the given url, returns the page text as a string
	def _getPage(self, url):
		try:
			response = requests.get(url)
			return response.text
		except Exception as e:
			print e
			return ""
	
	#Strips the links from an html page to know where to continue crawling
	def _getLinks(self, pageTxt, root):
		#strings of JSON to send to the google safe browsing api
		jsonClient = '{"client": {"clientId": "crawler", "clientVersion": "0.0.1"},'
		jsonThreat = '"threatInfo": {"threatTypes": ["THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"], "platformTypes":["WINDOWS", "LINUX", "OSX"], "threatEntryTypes": ["URL"], "threatEntries": ['
		jsonEnd = ']}}'
		
		#loop over all link tags to get new links to visit
		urls = []
		soup = BeautifulSoup(pageTxt, 'html.parser')
		for index, aTag in enumerate(soup.find_all('a')):
			#if a page has more links than we can make one request to google for, just take up to _googleMaxReq
			if index >= self._googleMaxReq:
				break

			#pull all links from page, adding to the google safe browsing threat json and urls array
			link = aTag.get('href')
			if mimetypes.guess_type(link)[0] in self.mimeTypes:
				if not link.startswith('http') or not link.startswith('https'):
					link = root + link
				urls.append(link)
				jsonThreat = jsonThreat + '{"url": "' + link + '"},'
		
		#Make request to google safe browsing lookup api for suspicious links
		if urls != []:
			apiRequestJson = jsonClient + jsonThreat[:-1] + jsonEnd
			response = requests.post(self._googleAPIUrl, data=apiRequestJson)
			if response.status_code != 200:
				print "Issue with google safe browsing lookup API request"
				print response
				print response.text
				return []
			response = response.json()
					
			#Remove any urls that google has flagged as dangerous
			if response != {}:
				for entry in response['matches']:
					dangerousURL = entry['threat']['url']
					if dangerousURL in urls:
						urls.remove(dangerousURL)
		return urls

	# Runs any given functions for each page
	def _runCustomFuncs(self, url, pageTxt):
		for func in self.scrapingFuncs:
			func(url, pageTxt)

if __name__ == "__main__":
	#This main just tests the spider
	def printer(url, pageTxt):
		print 'visited', url

	s = Spider(seedUrls=['http://www.shreyakumar.com/'], maxPages=1000, scrapingFuncs=[printer])
	s.crawl()