from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Element)
admin.site.register(Gosling)
admin.site.register(Part_of_body)
