from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MiniProjectViewSet

router = DefaultRouter()
router.register(r'projects', MiniProjectViewSet, basename='mini-project')

urlpatterns = [
    path('', include(router.urls)),
]
