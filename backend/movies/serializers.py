from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        parser_classes = (MultiPartParser, FormParser)
