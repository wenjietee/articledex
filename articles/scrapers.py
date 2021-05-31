import requests
from bs4 import BeautifulSoup


def scrape(url,article_type):

    # get DOM object
    page = requests.get(url)
     # html string
    parsed_html = BeautifulSoup(page.content, 'html.parser')
    # init error message
    error = '<h2>attempt to parse but no data was retrieved 😔 </h2>'

    # get medium article
    if article_type == 'medium':

        sections = parsed_html.find_all('section')
        content = ''

        for section in sections:
            paragraphs = section.find_all(['p', 'img'])
            for paragraph in paragraphs:
                content += str(paragraph)

        return content or error

    # get web article or attempt to...
    if article_type == 'webpage':
        article = parsed_html.find('article')
        content = str(article)
 
        return content or error
    
    # get dev.to article or attempt to...
    if article_type == 'dev.to':
        article = parsed_html.find('div','crayons-article__main')
        content = str(article)
 
        return content or error


           
