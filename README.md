# WebCrawler

Project Overview
Our project is a web application that plays the Wikipedia game. You choose a Wikipedia page, we scrape Wikipedia for a graph, and then you can choose two nodes to see the fewest links to get from one topic to another.

Running our Code
To run our code, go the the src folder and run ./server.py. You may need to change the postUrl in web/js/main.js to match the machine you are running the server on. This variable is located in the hunt function. Once the server is running, you can view index.html. You also can view tests.html and benchmark.html to run output and time tests on our Dijkstra's algorithm or benchmark the algorithm, respectively. When you open index.html, we suggest that you choose 10 for the Max Page Count and 10 for the Max Link Count. This will give you an optimal graph for viewing. Note that our scraper can only go so fast, and sigma.js does not do a great job or representing the data on the html page (would not recommend sigma.js). The url should also be a wikipedia link.  

Code Organization
All resources to serve to the browser are located in the web folder. The three html pages mentioned above are all in this folder, as well as subfolder for different kinds of resources. main.js is the JavaScript controller file for index.html, tests.js for test.html, and benchmark.js for benchmark.html. These all make use of dijkstras.js. We also made use of the Sigma.js library for graph visualization and jQuery for DOM manipulation. In the src folder, you will find server.js, which is the server provided in project05 with some modifications. This server calls the spider class in spider.py to scrape wikipedia starting at the user defined url address. It generates an adjacency list of the graph to return to the web page, where the user can interact with the graph. 

Benchmarking Results

Nodes         Time (in milliseconds)
100            1
100            0
100            0
100            1           
100            0
1000           6
1000           1
1000           0
1000           1
1000           2
10000          8
10000          14
10000          7
10000          7
10000          8
100000         103
100000         110
100000         105
100000         105
100000         155
1000000        1890
1000000        1570
1000000        1664
1000000        1667
1000000        1725
