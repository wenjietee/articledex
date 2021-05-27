import requests
from bs4 import BeautifulSoup


def scrape(url):
    # get DOM object
    page = requests.get(url)

    # html string
    parsed_html = BeautifulSoup(page.content, 'html.parser')

    sections = parsed_html.find_all('section')

    content = ''
    for section in sections:
        paragraphs = section.find_all('p')
        for paragraph in paragraphs:
            content += str(paragraph)

    return content
