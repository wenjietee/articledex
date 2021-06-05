import requests
from bs4 import BeautifulSoup


def scrape(url, article_type):

    # get DOM object
    page = requests.get(url)

    # html string
    parsed_html = BeautifulSoup(page.content, 'html.parser')

    # init scraped data dict with title, default content with error msg in case scrape failed
    scraped_data = {
        'title': parsed_html.find('title').text,
        'content': ''}

    # get medium article
    if article_type == 'medium':

        sections = parsed_html.find_all('section')

        for section in sections:
            paragraphs = section.find_all(['p', 'img'])
            for paragraph in paragraphs:
                scraped_data['content'] += str(paragraph)

        return scraped_data

    # get web article or attempt to...
    if article_type == 'webpage':
        article = parsed_html.find('article')
        scraped_data['content'] = str(article)

        return scraped_data

    # get dev.to article or attempt to...
    if article_type == 'dev.to':
        article = parsed_html.find('div', 'crayons-article__main')
        scraped_data['content'] = str(article)

        return scraped_data

    # if scrape failed set error message and return
    scraped_data['content'] = '<h2>attempt to parse but no data was retrieved 😔 </h2>'

    return scraped_data
