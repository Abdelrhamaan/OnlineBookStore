from rest_framework import generics
from .models import Book, Review
from .serializers import BookSerializer, ReviewSerializer, BooksDataSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated




class PaginationClass(PageNumberPagination):
    page_size = 10


class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BooksDataSerializer
    pagination_class = PaginationClass
    permission_classes = [IsAuthenticated]

class BookCreateAPIView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    
    
class BookUpdateAPIView(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    

class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    


class BookDeleteView(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    



class BookReviewListView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    pagination_class = PaginationClass
    permission_classes = [IsAuthenticated]
    
    
    def get_queryset(self):
        book_id = self.kwargs.get('book_id')
        return Review.objects.filter(book_id=book_id)

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            raise PermissionDenied("Authentication credentials were not provided.")





class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    

    def get_object(self):
        obj = super().get_object()
        # Allow all users to view the review
        if self.request.method in ['GET']:
            return obj
        # Restrict modification (PUT, PATCH, DELETE) to the owner only
        if obj.user != self.request.user:
            raise PermissionDenied("You can only modify your own reviews.")
        return obj


