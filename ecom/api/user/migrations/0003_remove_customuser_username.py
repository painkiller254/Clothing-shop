# Generated by Django 3.1 on 2022-11-27 12:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_customuser_session_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='username',
        ),
    ]
