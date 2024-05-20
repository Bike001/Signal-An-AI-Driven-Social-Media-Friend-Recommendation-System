# myapp/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post
from .models import FriendRequest
from .models import Message
from .models import Comment, UserProfile


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ['username', 'password', 'email']  # Add any other required fields

class PostSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Post
        fields = ['id', 'content', 'published_date', 'sentiment', 'username', 'image']  # Add 'image' field here
        extra_kwargs = {
            'user': {'read_only': True},
            'image': {'required': False},  # Make 'image' not required
        }


    
    #   # Define a get method for the SerializerMethodField if necessary
    # def get_recommended_friends(self, obj):
    #     # Assuming `recommend_friends` function is available and it returns user instances.
    #     # You will need to serialize the data of recommended friends.
    #     recommended_users = recommend_friends(obj.user, obj.sentiment)
    #     return UserSerializer(recommended_users, many=True).data

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'accepted']


# class MessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Message
#         fields = ['id', 'sender', 'receiver', 'content', 'timestamp']


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    receiver = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'timestamp']
        read_only_fields = ['id', 'user', 'post', 'timestamp']

    def get_user(self, obj):
        # This will return the username of the user who made the comment
        return obj.user.username
    
    
class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.ImageField(source='profile_picture')

    class Meta:
        model = UserProfile
        fields = ['user', 'profile_picture_url']