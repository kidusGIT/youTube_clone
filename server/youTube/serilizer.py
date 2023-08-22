from rest_framework.serializers import ModelSerializer

# import models here
from .models import Video, Channel, User, Sub

# user serializers
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'password']
        write_only_fields = ['password']
        read_only_fields = ['id']
    
    # to make the password hash 
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            full_name=validated_data['full_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

# channel serializers
class ChannelSerializer(ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'

# video serializers
class VideoSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

# -- NESTED --

# nested channel serializer
class NestedChannelSerializer(ModelSerializer):
    users = UserSerializer()
    class Meta:
        model = Channel
        fields = ['id', 'name', 'profile_pic', 'banner', 'subs', 'users', 'create_at', 'update_at']

# nested video serializer
class NestVideoSerialzer(ModelSerializer):
    channels = NestedChannelSerializer()
    class Meta:
        model = Video
        fields = ['id', 'title', 'desc', 'views', 'cover_img', 'vid_url', 'like', 'dis_like', 'channels', 'create_at', 'update_at']

# sub serializer
class SubSerailizer(ModelSerializer):
    class Meta:
        model=Sub
        fields ='__all__'

# nested sub serializer
class NestedSubSerailizer(ModelSerializer):
    channels = NestedChannelSerializer()
    class Meta:
        model=Sub
        fields =['id', 'channels', 'user']