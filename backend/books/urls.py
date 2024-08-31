from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookListView, BookDetailView, BookReviewListView, BookCreateAPIView, BookUpdateAPIView, BookDetailView, BookDeleteView, ReviewDetailView


urlpatterns = [
    path('list/', BookListView.as_view(), name='book-list'),
    path('create/', BookCreateAPIView.as_view(), name='book-create'),
    path('<int:pk>/update/', BookUpdateAPIView.as_view(), name='book-update'),
    path('<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('<int:pk>/delete/', BookDeleteView.as_view(), name='book-delete'),
    path('<int:book_id>/reviews/', BookReviewListView.as_view(), name='book-reviews-list'),
    path('reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
    ]
