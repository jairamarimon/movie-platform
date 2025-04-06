from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Movie


class MovieCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        parser_classes = (MultiPartParser, FormParser)


class MovieUpdateSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    video = serializers.FileField(required=False)

    class Meta:
        model = Movie
        fields = '__all__'
        parser_classes = (MultiPartParser, FormParser)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance
