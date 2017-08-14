from django.conf.urls import url, include
from django.views import static
from django.conf import settings
from django.contrib import admin
from . import views
<<<<<<< HEAD

# from .router import router

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^mobil-auth/', include('rest_framework.urls', namespace='rest_framework')),
=======

urlpatterns = [
    url(r'^admin/', admin.site.urls),
>>>>>>> ab193fca4e7f912cf8e3e262209796a1a1662757
    url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    url(r'^api/', include('quickfitapp.urls')),
    # url(r'^accounts/profile/', )  # calling api/users/login will redirect to this url
    url(r'^static/(?P<path>.*)$', static.serve, {
        'document_root': settings.STATIC_ROOT,
    }),
    url(r'^', views.landing_page),
<<<<<<< HEAD
    
=======
>>>>>>> ab193fca4e7f912cf8e3e262209796a1a1662757
]
