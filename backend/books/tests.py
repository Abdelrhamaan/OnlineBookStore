from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import Book, Review
from accounts.models import CustomUser
from django.urls import reverse

class BooksTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', email='testuser@example.com', password='testpassword123')
        self.client.force_authenticate(user=self.user)
        self.book = Book.objects.create(
            title='Test Book',
            author='Test Author',
            description='Test Description',
            content='Test Content'
        )
        self.book_list_url = reverse('book-list')
        self.book_detail_url = reverse('book-detail', kwargs={'pk': self.book.id})
        self.book_reviews_url = reverse('book-reviews-list', kwargs={'book_id': self.book.id})

    def test_book_list(self):
        response = self.client.get(self.book_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_book_detail(self):
        response = self.client.get(self.book_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Book')

    def test_create_review(self):
        review_data = {
            'review_text': 'Great book!',
            'rating': 8,
            'book': self.book.id
        }
        response = self.client.post(self.book_reviews_url, review_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_review_permission(self):
        # Create a review
        review = Review.objects.create(book=self.book, user=self.user, review_text='Test Review', rating=7)
        review_detail_url = reverse('review-detail', kwargs={'pk': review.id})
        
        # Attempt to delete review as a different user
        new_user = CustomUser.objects.create_user(username='newuser', email='newuser@example.com', password='newpassword123')
        self.client.force_authenticate(user=new_user)
        response = self.client.delete(review_detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
