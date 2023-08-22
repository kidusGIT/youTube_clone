from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_protect
from rest_framework.generics import ListCreateAPIView

# import models here
from .models import Channel, User, Sub
from .serilizer import ChannelSerializer, NestedSubSerailizer

# create a channel
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_channel(request):
    username = request.user
    data = {}
    user = User.objects.get(username=username)
    data = request.data

    channel = Channel()
    channel.name = data['name']
    channel.banner = data['banner']
    channel.profile_pic = data['profile_pic']
    channel.users = user

    try:
        channel.save()
    except:
        return Response(status=400, data='Channel name must be unique')
   
    return Response(status=200,  data='Video Created')

# update channel
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_channel(request, pk):
    channel = Channel.objects.get(id=pk)
    
    data = request.data.copy()
    if data['profile_pic'] != '':
        print('pic---- ', data['profile_pic']) 
        channel.profile_pic = data['profile_pic'] 

    if data['banner'] != '':
        print('pic---- ', data['banner'])  
        channel.banner = data['banner']

    channel.name = data['name']

    channel.save()
    # seriallizer = ChannelSerializer(instance=channel, data=request.data) 
    # if seriallizer.is_valid():
    #     seriallizer.save()
    
    return Response(status=200, data='seriallizer.data')
    
# get channels
@api_view(['GET'])
@permission_classes([])
def get_channel(request, pk):
    channel = Channel.objects.get(id=pk)
    seriaillizer = ChannelSerializer(channel, many=False)

    return Response(seriaillizer.data)

# delete channels
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_channel(request, pk):
    channel = Channel.objects.get(id=pk)
    channel.delete()

    return Response('Channel deleted')

# sub channels
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def sub_channel(request, pk):
    username = request.user
    user = User.objects.get(username=username)
    channel = Channel.objects.get(id=pk)
    channel.subs = channel.subs + 1
    channel.save()

    sub = Sub()
    sub.channels =channel
    sub.user = user
    sub.save()
 
    channel = Channel.objects.get(id=pk)
    return Response({'sub':channel.subs})

# unsub channels
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def unsub_channel(request, pk):
    username = request.user
    user = User.objects.get(username=username)
    channel = Channel.objects.get(id=pk)
    sub = Sub.objects.filter(channels=channel, user=user).first()
    sub.delete()
    if channel.subs > 0:
        channel.subs = channel.subs - 1
        channel.save()

    channel = Channel.objects.get(id=pk)
    return Response({'sub':channel.subs})

# get subs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_subs(request):
    username = request.user
    sub = Sub.objects.filter(user=username).select_related('channels')
    serializer = NestedSubSerailizer(sub, many=True)

    return Response(serializer.data)

# search video inside a channel
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_channel(request, pk):
    channel = Channel.objects.filter(users=pk)
    channel2 = Channel.objects.filter(users=pk).query
    print(channel2)
    seriaillizer = ChannelSerializer(channel, many=True)

    return Response(seriaillizer.data)
