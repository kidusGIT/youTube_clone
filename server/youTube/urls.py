from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

# import views here
from .channel_views import create_channel, update_channel, get_channel, sub_channel, unsub_channel, delete_channel, get_subs, get_user_channel
from .video_views import create_video, update_video, get_video, get_random_video, like_video, dislike_video, delete_video, VideoSearchListView, view_video
from .views import create_user, update_user, get_user, delete_user, get_users, user_login, user_logout

urlpatterns = [
    # -- USERS --
    path('create-user', create_user, name='create-user'),
    path('update-user/<str:pk>', update_user, name='update-user'),
    path('get-user/<str:pk>', get_user, name='get-user'),
    path('delete-user/<str:pk>', delete_user, name='delete-user'),
    path('get-all-user', get_users, name='get-all-user'),
    path('login-user', user_login, name='login-user'),
    path('logout-user', user_logout, name='logout-user'),

    # -- CHANNELS --  
    path('create-channel', create_channel, name='create-channel'),
    path('update-channel/<str:pk>', update_channel, name='update-channel'),
    path('get-channel/<str:pk>', get_channel, name='get-channel'),
    path('sub-channel/<str:pk>', sub_channel, name='sub-channel'),
    path('unsub-channel/<str:pk>', unsub_channel, name='unsub-channel'),
    path('delete-channel/<str:pk>', delete_channel, name='delete-channel'),
    path('getsubs-channel', get_subs, name='getsubs-channel'),
    path('get-user-channel/<str:pk>', get_user_channel),

    # -- VIDOES ---
    path('create-video', create_video, name='create-video'),
    path('update-video/<str:pk>', update_video, name='update-video'),
    path('get-video/<str:pk>', get_video, name='get-video'),
    path('like-video/<str:pk>', like_video, name='like-video'),
    path('dislike-video/<str:pk>', dislike_video, name='dislike-video'),
    path('get-random-video', get_random_video, name='get-random-video'),
    path('delete-video/<str:pk>', delete_video, name='delete-video'),
    path('search_video/', VideoSearchListView.as_view(), name='search-video'),
    path('view-video/<str:pk>', view_video, name='view-video'),
]
