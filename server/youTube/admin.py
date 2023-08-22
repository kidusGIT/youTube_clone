from django.contrib import admin

# import models here
from .models import User, Channel, Video, Sub

# Register a user
class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'username', 'id', 'is_staff', 'is_superuser', 'is_active']

admin.site.register(User, UserAdmin)

# Register a channels
class ChannelAdmin(admin.ModelAdmin):
    list_display = ['name', 'id', 'profile_pic', 'banner', 'subs', 'users']
admin.site.register(Channel, ChannelAdmin)

# Register a videos
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'id', 'desc', 'views', 'cover_img', 'vid_url', 'like', 'dis_like', 'channels']

admin.site.register(Video, VideoAdmin)

# Register a subs
class SubAdmin(admin.ModelAdmin):
    list_display = ['id','channels', 'user']

admin.site.register(Sub, SubAdmin)

