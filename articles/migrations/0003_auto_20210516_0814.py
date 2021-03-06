# Generated by Django 3.2.3 on 2021-05-16 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_alter_article_tags'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='tags',
        ),
        migrations.AddField(
            model_name='tag',
            name='article',
            field=models.ManyToManyField(related_name='articles', related_query_name='article', to='articles.Article'),
        ),
    ]
