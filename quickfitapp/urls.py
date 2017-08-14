from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'movements', views.MovementViewSet)
router.register(r'workouts', views.WorkoutViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^signup/$', views.signup),
    url(r'^session/(?P<pk>[0-9]+)/$', views.session),
    url(r'^profile/(?P<pk>[0-9]+)/edit/$', views.edit_profile),
    url(r'^users/(?P<pk>[0-9]+)/movements/$', views.user_movements),
    url(r'^users/(?P<pk>[0-9]+)/workouts/$', views.user_workouts),
    url(r'^', include(router.urls)), #catch-all, covers all registered default routers, should be last on list of URLs
]
