from django.conf.urls import url, include
from django.views import static
from django.conf import settings
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    url(r'^api/', include('quickfitapp.urls')),
    # url(r'^accounts/profile/', )  # calling api/users/login will redirect to this url
    url(r'^static/(?P<path>.*)$', static.serve, {
        'document_root': settings.STATIC_ROOT,
    }),
    url(r'^', views.landing_page),
]
