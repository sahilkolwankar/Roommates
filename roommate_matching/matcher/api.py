from matcher.models import Matcher
from rest_framework import viewsets, permissions
from .serializers import MatcherSerializer

# Matcher Viewset


class MatcherViewSet(viewsets.ModelViewSet):
    queryset = Matcher.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MatcherSerializer