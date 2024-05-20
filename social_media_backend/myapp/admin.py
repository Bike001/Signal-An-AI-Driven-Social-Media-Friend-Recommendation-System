from django.contrib import admin
from .models import Post, Friendship, FriendRequest, Message, Comment, UserProfile

class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'content', 'published_date', 'sentiment', 'image')
    # If you want to show the image in the detail view as well:
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        return obj.image.url if obj.image else 'No image'

    image_preview.short_description = 'Image Preview'

admin.site.register(Post, PostAdmin)

@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('user1', 'user2')

@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_user', 'accepted']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'content', 'timestamp')
    # Other configurations if needed
    
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'content', 'timestamp')
    # Add any additional admin options here as needed

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture')
    # Additional configurations if needed
