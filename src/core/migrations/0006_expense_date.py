# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_expense_date_joined'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='date',
            field=models.CharField(default=datetime.datetime(2017, 5, 3, 20, 14, 2, 640972, tzinfo=utc), max_length=128),
            preserve_default=False,
        ),
    ]
