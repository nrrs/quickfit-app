from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^exercises/$', views.exercise_list),
    url(r'^exercises/(?P<pk>[0-9]+)/$', views.exercise_detail),
]
