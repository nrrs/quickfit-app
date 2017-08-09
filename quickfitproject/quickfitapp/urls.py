from django.conf.urls import url, include
from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'movements', views.MovementViewSet)
router.register(r'workouts', views.WorkoutViewSet)
router.register(r'profiles', views.ProfileViewSet)

#this may need to be adjusted to pull data by user; perhaps switch out WorkoutViewSet for another class?
# router.register(r'users', views.UserViewSet)

#routes that already exist  (they don't exist for movements)
# ^api/ ^ ^users/$ [name='workout-list']
# ^api/ ^ ^users\.(?P<format>[a-z0-9]+)/?$ [name='workout-list']
# ^api/ ^ ^users/(?P<pk>[^/.]+)/$ [name='workout-detail']
# ^api/ ^ ^users/(?P<pk>[^/.]+)\.(?P<format>[a-z0-9]+)/?$ [name='workout-detail']



#for all default routes (works for all routes registered above)
urlpatterns = [
    url(r'^', include(router.urls)), #covers all routers defined above
    # url(r'^movements/(?P<pk>[0-9]+)/$', views.movement_detail),
]


#class-based movement urls
# urlpatterns = [
#     url(r'^movements/(?P<pk>[0-9]+)/$', views.MovementDetail.as_view()),
# ]


#function-based movement urls
# urlpatterns = [
#     url(r'^movements/(?P<pk>[0-9]+)/$', views.movement_detail),
# ]

#Below is only for use with function-based or class-based routes, comment out when using default routes
#allows frontend to specify data format (e.g. http://example.com/api/items/4.json)
# urlpatterns = format_suffix_patterns(urlpatterns)
