from rest_framework import generics
from .models import Movie
from .serializers import MovieSerializer
from rest_framework.response import Response


class MovieListView(generics.GenericAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()

    def get(self, request, *args, **kwargs):
        try:
            movies = Movie.objects.all()
            serializer = MovieSerializer(movies, many=True)
            return Response(serializer.data)
        except Movie.DoesNotExist:
            return Response("Movie does not exist")


class MovieDetailView(generics.GenericAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
