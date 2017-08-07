# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-07 18:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickfitapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='exercise_type',
            field=models.CharField(choices=[('w', 'Weight Lifting'), ('d', 'dance'), ('c', 'cardio'), ('o', 'Others')], default='o', max_length=1),
        ),
    ]