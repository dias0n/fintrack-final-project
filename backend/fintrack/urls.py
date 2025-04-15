from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="FinTrack API",
        default_version='v1',
        description="API для работы с категориями, пользователями и финансами",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@fintrack.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/', include('core.urls')),
    path('swagger/', schema_view.as_view(), name='swagger-schema')
]