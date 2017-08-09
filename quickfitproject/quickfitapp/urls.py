from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'movements', views.MovementViewSet)
router.register(r'workouts', views.WorkoutViewSet)


#this may need to be adjusted to pull data by user; perhaps switch out WorkoutViewSet for another class?
router.register(r'users', views.WorkoutViewSet)

#routes that already exist  (they don't exist for movements)
# ^api/ ^ ^users/$ [name='workout-list']
# ^api/ ^ ^users\.(?P<format>[a-z0-9]+)/?$ [name='workout-list']
# ^api/ ^ ^users/(?P<pk>[^/.]+)/$ [name='workout-detail']
# ^api/ ^ ^users/(?P<pk>[^/.]+)\.(?P<format>[a-z0-9]+)/?$ [name='workout-detail']




urlpatterns = [
    url(r'^', include(router.urls)), #covers all routers defined above
    # url(r'^movements/(?P<pk>[0-9]+)/$', views.movement_detail),
]
