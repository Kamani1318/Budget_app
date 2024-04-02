from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Project)
admin.site.register(Budget)
admin.site.register(Transactions)
admin.site.register(Reminder)