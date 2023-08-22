from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone

# for authentication and authrization
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# import user module here
from .custom_user import CustomUserManager

# user
class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=255, default='')
    username = models.CharField(max_length=255, unique=True, null=True)

    is_active = models.BooleanField(default=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_user_join = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username' 
    REQUIRED_FIELDS = ['full_name']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_full_name(self):
        return self.username
    
    def get_short_name(self):
        return self.full_name.split(' ')[0]

# authenticate 
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **keyargs):
    # create_auth_token can be any name
    if created:
        Token.objects.create(user=instance)

# channels
class Channel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    profile_pic = models.ImageField(upload_to='youTube/images/channels', null=True)
    banner = models.ImageField(upload_to='youTube/images/banners', null=True)
    subs = models.IntegerField(default=0)
    users = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# videos
class Video(models.Model):
    title = models.CharField(max_length=255, unique=True)
    desc = models.TextField(default='')
    cover_img = models.ImageField(upload_to='youTube/images/vidoes_img', null=True)
    vid_url = models.FileField (upload_to='youTube/images/vidoes_vid', null=True)
    like = models.IntegerField(default=0) 
    dis_like = models.IntegerField(default=0) 
    channels = models.ForeignKey(Channel, on_delete=models.CASCADE, null=True)
    views = models.IntegerField(default=0)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Sub(models.Model):
    channels = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, models.CASCADE)
 



