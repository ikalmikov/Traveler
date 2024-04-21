from django.urls import path
from . import views
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('signup/', views.signup_view, name='api-signup'),
    # path('session', views.session_view, name='api-session'),

    # path("token/", TokenObtainPairView.as_view(), name="get_token"),
    # path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),

    path('itineraries/', views.itinerary_view, name='api-itinerary'), # GET, POST
    path('itineraries/<int:pk>', views.itinerary_view_detail, name='api-itinerary-detail'), # GET, PUT, DELETE
    # path('create-itinerary', views.updateData),

    path('events/', views.event_view, name='api-event'), # GET, POST
    path('events/<int:pk>', views.event_view_detail, name='api-event-detail'), # GET, PUT, DELETE
]