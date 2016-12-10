#!/usr/bin/env python2.7

from bs4 import BeautifulSoup
import requests
import mimetypes
import json
import urlparse
import sys


##############################################################################
# Spider Class
# - provides a web crawling framework. Give an array of seed urls to start
#   crawling from, provide your own custom scraping functions, how many pages
#   to crawl and you're good to go
##############################################################################

class Spider(object):

	# ---------------------------------------------------------- #
	#                        Public methods                      #
	# ---------------------------------------------------------- #

	# constructor
	def __init__(self, seedUrls=[], scrapingFuncs=[],  maxPages=100, linksPerPage=5):
		self.seedUrls      = seedUrls              # An array of urls to begin scraping from
		self.maxPages      = maxPages              # Total max number of pages for the crawler to visit
		self.linksPerPage  = linksPerPage          # Max number of links to crawl from a given page
		self.scrapingFuncs = scrapingFuncs         # An array of functions to run at each page. Each function will recieve object self, current url
										   #   string, current page text as a string, and an array of links present on the page

		self._googleAPIKey = "AIzaSyCDX-xabz8UM72IapswAGUge-xcWEK8Dno"
		self._googleAPIUrl = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + self._googleAPIKey
		self._googleMaxReq = 500
	
	# Main public function to begin crawling once the constructor has been initialized with appropriate settings
	def crawl(self):
		fp = open('links.txt', 'w')
		toVisit = []
		for seedUrl in self.seedUrls:
			toVisit.append(seedUrl)
			numVisited = 0
			while toVisit != [] and numVisited < self.maxPages:
				numVisited = numVisited + 1
				url = toVisit.pop()
				pageTxt = self._getPage(url)
				links = self._getLinks(pageTxt, url)
				toVisit = links + toVisit
				self._runCustomFuncs(url, pageTxt, links)

	# ---------------------------------------------------------- #
	#                        Private methods                     #
	# ---------------------------------------------------------- #
	
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
		jsonBasicInfo  = '{"client": {"clientId": "crawler", "clientVersion": "0.0.1"},"threatInfo": {"threatTypes": '
		jsonThreatType = '["THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],' 
		jsonPlatforms  = '"platformTypes":["WINDOWS", "LINUX", "OSX"],'
		jsonThreat     = ' "threatEntryTypes": ["URL"], "threatEntries": ['
		jsonEnd        = ']}}'
		
		#loop over all link tags to get new links to visit
		links = []
		soup = BeautifulSoup(pageTxt, 'html.parser')
		for index, aTag in enumerate(soup.find_all('a')):
			#if a page has more links than we can make one request to google for, just take up to _googleMaxReq
			if index >= self._googleMaxReq or index >= self.linksPerPage:
				break

			#pull all links from page, adding to the google safe browsing threat json and urls array
			link = aTag.get('href')
			link = self._cleanLink(link, root)
			if link:
				links.append(link)
				jsonThreat = jsonThreat + '{"url": "' + link + '"},'
		
		#Make request to google safe browsing lookup api for suspicious links
		apiRequestJson = jsonBasicInfo + jsonThreatType + jsonPlatforms + jsonThreat[:-1] + jsonEnd
		links = self._removeDangerousUrls(links, apiRequestJson)
		return links

	# Runs any given functions for each page
	def _runCustomFuncs(self, pageUrl, pageTxt, links):
		for func in self.scrapingFuncs:
			func(self, pageUrl, pageTxt, links)

	# Remove dangerous urls found by googles safe browsing api
	def _removeDangerousUrls(self, urls, googleApiRequestJSON):
		if not urls:
			return self._handleError('No array of urls provided to check')
		try:
			response = requests.post(self._googleAPIUrl, data=googleApiRequestJSON)
			if response.status_code != 200:
				return self._handleError("Issue with google safe browsing lookup API request", response)
			response = response.json()
				
			#Remove any urls that google has flagged as dangerous
			if response != {}:
				for entry in response['matches']:
					dangerousURL = entry['threat']['url']
					if dangerousURL in urls:
						urls.remove(dangerousURL)
			return urls

		except:
			return self._handleError("Unknown issue with google safe browsing API")
		
		
	#append root if necesary to links, remove some common dead links
	def _cleanLink(self, link, curUrl):
		badLinks = ['#', '', ' ', None] #common bad links I came across
		if link in badLinks or link.startswith('#'):
			return ''
		else:
			if self._linkIsRelative(link):
				link = urlparse.urljoin(curUrl, link)
			return link

	def _linkIsRelative(self, link):
		if link.startswith('http') or link.startswith('https'):
			return False
		else:
			return True

	def _handleError(self, message, response=''):
		print message
		if response:
			print "HTTP/HTTPS status code:", response.status_code
			print response.text
		return []

#########################################################################
# Main execution 
#  - for class testing
########################################################################

if __name__ == "__main__":
	def createAdjList(self, url, pageTxt, links):
		print 'visited', url
		for link in links:
			if link.startswith('https://en.wikipedia.org/wiki'):
				if url in self.adjList:
					if link not in self.adjList[url]:
						self.adjList[url].append(link)
				else:
					self.adjList[url] = [link]	
		
		

	url= sys.argv[1]
	s = Spider(seedUrls=[url], maxPages=9000000000, scrapingFuncs=[createAdjList])
	s.adjList = {}
	s.crawl()
	print json.dumps(s.adjList, indent=4, separators=(',', ': '))
	
