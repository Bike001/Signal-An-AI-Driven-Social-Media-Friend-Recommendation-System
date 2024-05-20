from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class Post(models.Model):
    # Other fields...
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    sentiment = models.CharField(max_length=30, blank=True, null=True)
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)

    # any other fields you might have


# models.py

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, related_name='friend_requests_sent', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='friend_requests_received', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    # Other fields...

    class Meta:
        unique_together = ('from_user', 'to_user')




# models.py

class Friendship(models.Model):
    user1 = models.ForeignKey(User, related_name='friendships1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='friendships2', on_delete=models.CASCADE)

    class Meta:
        # Ensuring that each pair of users is only represented once
        constraints = [
            models.UniqueConstraint(fields=['user1', 'user2'], name='unique_friendships')
        ]

    def __str__(self):
        return f"{self.user1.username} and {self.user2.username} are friends"


class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on post {self.post.id}"
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    def __str__(self):
        return self.user.username