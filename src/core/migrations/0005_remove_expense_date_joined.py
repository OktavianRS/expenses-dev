# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_expense_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='date_joined',
        ),
    ]
