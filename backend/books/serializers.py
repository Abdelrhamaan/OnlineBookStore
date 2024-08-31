from rest_framework import serializers
from .models import Book, Review

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class BooksDataSerializer(serializers.ModelSerializer):
    review_links = serializers.SerializerMethodField()
    book_detail = serializers.SerializerMethodField()
    
    class  Meta:
        model = Book
        fields = '__all__'

    def get_review_links(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(f'/books/{obj.id}/reviews/')
    
    def get_book_detail(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(f'/books/{obj.id}')
    
    

    
class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username') 
    class Meta:
        model = Review
        fields = ['review_text', 'rating', 'book', 'user']  
        
    def validate_rating(self, value):
        if value < 0 or value > 10 :
            return serializers.ValidationError('Rating Must be from 0 to 10')
        return value

    def validate(self, data):
        request = self.context.get('request')
        if request and request.method in ['PATCH', 'PUT']:
            review = self.instance
            if review.user != request.user:
                raise serializers.ValidationError("You can only modify your own reviews.")
        return data

    
    
    
    
    

