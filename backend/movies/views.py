from rest_framework import generics
from .models import Movie
from .serializers import MovieCreateSerializer, MovieUpdateSerializer
from rest_framework.response import Response


class MovieListView(generics.ListCreateAPIView):
    serializer_class = MovieCreateSerializer
    queryset = Movie.objects.all()

    def get(self, request, *args, **kwargs):
        try:
            movies = Movie.objects.all()
            serializer = MovieCreateSerializer(movies, many=True)
            return Response(serializer.data)
        except Movie.DoesNotExist:
            return Response("Movie does not exist")


class MovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MovieUpdateSerializer
    queryset = Movie.objects.all()
