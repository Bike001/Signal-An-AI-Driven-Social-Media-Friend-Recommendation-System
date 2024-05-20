# myapp/urls.py

from django.urls import path
from .views import (
    SignUpView, PostList, UserPostList, friend_suggestions, my_user_view,
    send_friend_request, approve_friend_request, get_conversations,
    friend_requests_list, friends_list, profile_view, user_posts,
    own_profile_view, own_posts, get_messages, send_message, post_comments,
    upload_profile_picture, get_profile_picture, search # Ensure this is imported
)
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('api/posts/', PostList.as_view(), name='post-list'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('api/login/', obtain_auth_token, name='api_token_auth'),
    path('api/user/posts/', UserPostList.as_view(), name='user-post-list'),
    path('api/friend-suggestions/', friend_suggestions, name='friend-suggestions'),
    path('send-friend-request/<str:username>/', send_friend_request, name='send-friend-request'),
    path('approve-friend-request/<int:request_id>/', approve_friend_request, name='approve-friend-request'),
    path('api/friend-requests/', friend_requests_list, name='friend-requests-list'),
    path('api/friends-list/', friends_list, name='friends-list'),
    path('api/profile/<str:username>/', profile_view, name='profile-view'),
    path('api/user/<str:username>/posts/', user_posts, name='user-posts'),
    path('api/ownprofile/', own_profile_view, name='own-profile-view'),
    path('api/ownposts/', own_posts, name='own-posts'),
    path('api/messages/<str:username>/', get_messages, name='get-messages'),
    path('api/messages/', send_message, name='send-message'),
    path('api/myuser/', my_user_view, name='my-user'),
    path('api/get_conversations/', get_conversations, name='get_conversations'),
    path('api/posts/<int:post_id>/comments/', post_comments, name='post_comments'),
    path('api/upload_profile_picture/', upload_profile_picture, name='upload_profile_picture'),
    path('api/user/profile-picture/', get_profile_picture, name='get_profile_picture'),
    path('api/search/', search, name='search'),  # Trailing slash included

    # Additional paths specific to your app
]
