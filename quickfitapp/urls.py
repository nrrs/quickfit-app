from django.conf.urls import url, include
from . import views
from rest_framework import routers
# from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'movements', views.MovementViewSet)
router.register(r'workouts', views.WorkoutViewSet)
router.register(r'profiles', views.ProfileViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^signup/$', views.signup),
    url(r'^session/(?P<pk>[0-9]+)/$', views.session),
    url(r'^profile/(?P<pk>[0-9]+)/edit/$', views.edit_profile),
    url(r'^users/(?P<pk>[0-9]+)/movements/$', views.UserMovementList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/workouts/$', views.UserWorkoutList.as_view()),
    url(r'^', include(router.urls)), #catch-all, covers all registered default routers, should be last on list of URLs
]


# function-based movement urls
# urlpatterns = [
#     url(r'^movements/(?P<pk>[0-9]+)/$', views.movement_detail),
# ]

# Below is only for use with function-based or class-based routes, comment out when using default routes
# urlpatterns = format_suffix_patterns(urlpatterns)  #allows frontend to specify data format (e.g. http://example.com/api/items/4.json)
