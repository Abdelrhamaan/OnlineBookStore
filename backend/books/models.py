from accounts.models import CustomUser
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255, db_index=True)  # Index on title
    author = models.CharField(max_length=255, db_index=True)  # Index on author
    description = models.TextField()
    content = models.TextField(blank=True, null=True)
    content_file = models.FileField(upload_to='booksfiles/', blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        indexes = [
            models.Index(fields=['title']),  
            models.Index(fields=['author']), 
        ]


class Review(models.Model):
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE, db_index=True)  # Index on foreign key
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_index=True)  # Index on foreign key
    review_text = models.TextField()
    rating = models.PositiveIntegerField(db_index=True)  # Index on rating

    def __str__(self):
        return f'{self.user.username} - {self.book.title}'

    class Meta:
        indexes = [
            models.Index(fields=['book', 'user']),  
            models.Index(fields=['rating']),  
        ]
