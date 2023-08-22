import random
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated 
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListCreateAPIView

# import models here
from .models import Channel, Video
from .serilizer import VideoSerializer, NestVideoSerialzer

# create a video
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_video(request):
    data ={}
    data = request.data
    print('channel id: ', data['channels'])
    chId =  data['channels']
    channel = Channel.objects.get(id=chId)

    video = Video()
    video.title = data['title'] 
    video.desc = data['desc']
    video.channels = channel
    video.cover_img = data['cover_img']
    video.vid_url = data['vid_url']
    video.save()

    return Response('Video uploaded')


# update video
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_video(request, pk):
    video = Video.objects.get(id=pk)
    serializer = VideoSerializer(instance=video, data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

# get video
@api_view(['GET'])
@permission_classes([])
def get_video(request, pk):
    video = Video.objects.get(id=pk)
    serializer = NestVideoSerialzer(video, many=False)

    return Response(serializer.data)

# delete video
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_video(request, pk):
    video = Video.objects.get(id=pk)
    video.delete()
    return Response('Video deleted')

# get random vidoes
@api_view(['GET'])
@permission_classes([])
def get_random_video(request):
    print('user: ', request.user)
    videos = (Video.objects.all().select_related('channels'))
    # videos = random.sample(videos, 2)

    serializer = NestVideoSerialzer(videos, many=True)

    return Response(serializer.data)


# like video
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def like_video(request, pk):
    video = Video.objects.get(id=pk)
    video.like = video.like + 1
    
    video.save()

    video = Video.objects.get(id=pk)
    return Response({'like':video.like})    

# dis like video
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def dislike_video(request, pk):
    video = Video.objects.get(id=pk)
    video.dis_like = video.dis_like + 1
    video.save()

    video = Video.objects.get(id=pk)
    return Response({'like':video.dis_like})  

# search video
class VideoSearchListView(ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = NestVideoSerialzer
    filter_backends = [SearchFilter, OrderingFilter]
    permission_classes = []
    search_fields = ['title', 'channels__name']

# View a video
@api_view(['PUT'])
@permission_classes([])
def view_video(request, pk):
    video = Video.objects.get(id=pk)

    video.views = video.views + 1
    video.save()
    video = Video.objects.get(id=pk)
    return Response({'views':video.views})

# get like videos
