import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from django.contrib.auth.hashers import check_password

# import user models here
from .models import User
from .serilizer import UserSerializer

# create user
@api_view(['POST'])
@permission_classes([])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        data['full_name'] = user.full_name
        data['username'] = user.username
        token = Token.objects.get(user=user).key
        data['token'] = token
    else:
        data = serializer.errors
    return Response(data)
    

# update user
@api_view(['PUT'])
def update_user(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)
    data = {}
    if serializer.is_valid():
        serializer.save()
        data = serializer.data
    else:
        data = serializer.errors
    return Response(data)

# delete user
@api_view(['DELETE'])
def delete_user(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response('Items is deleted')

# get all users
@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)


# get a user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

# login a user
@api_view(['POST'])
@permission_classes([])
def user_login(request):
    data ={}
    # body = json.loads(request.body)
    body = request.data
    print(body['username'])

    username = body['username']
    password = body['password']
    user = User.objects.filter(username=username).first()
    if user is None:
        return Response("Username dont'found")
    pwd = check_password(password, user.password)
    if not pwd:
        return Response('invalid password')
    
    if user.is_active:
        token = Token.objects.get_or_create(user=user)[0].key
        login(request, user)
        data['message'] = 'user logged in'
        data['username'] = user.username
        data['id'] = user.id
        data['token'] = token
        
    return Response(data)

# logout a user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    print('some ',request.user)
    request.user.auth_token.delete()

    logout(request)
    return Response('User logged out successfully')
