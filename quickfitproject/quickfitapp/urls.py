from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'movements', views.MovementViewSet)
router.register(r'workouts', views.WorkoutViewSet)

urlpatterns = [
    url(r'^', include(router.urls)), #covers all routers defined above
    # url(r'^movements/(?P<pk>[0-9]+)/$', views.movement_detail),
]
