from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'movements', views.MovementViewSet)
router.register(r'workouts', views.WorkoutViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)), #covers all routers defined above
    # url(r'^movements/(?P<pk>[0-9]+)/$', views.movement_detail),
    # url(r'^users/login/', views.login),
    # url(r'^users/signup/', views.signup),
    # url(r'^users/', include('rest_framework.urls')),
]
