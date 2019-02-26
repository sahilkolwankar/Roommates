from rest_framework import serializers
from matcher.models import Matcher

# Matcher Serializer

class MatcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matcher
        fields = '__all__'
