from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Book, Review

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author') 
    search_fields = ('title', 'author') 
    list_filter = ('author',) 


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('book', 'user', 'rating')  
    search_fields = ('book__title', 'user__username') 
    list_filter = ('rating', 'book')  

# Register the models with the admin site
admin.site.register(Book, BookAdmin)
admin.site.register(Review, ReviewAdmin)
