from rest_framework import routers
from .api import MatcherViewSet

router = routers.DefaultRouter()
router.register('api/matcher', MatcherViewSet, 'matcher')

urlpatterns = router.urls