from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^api/movements/$', views.movement_list),
    url(r'^api/movements/(?P<pk>[0-9]+)/$', views.movement_detail),
]
