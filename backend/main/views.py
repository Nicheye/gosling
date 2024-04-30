
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import *

class Profile_View(APIView):
	permission_classes = [IsAuthenticated,]
	def get(self,request,*args,**kwargs):
		id = kwargs.get("id",None)
		if id is not None:
			user =User.objects.get(id=id)
			goslings = Gosling.objects.filter(created_by=user)
			goslings_ser = Gosling_Serializer(goslings,many=True)
			return Response({'data':goslings_ser.data},status=status.HTTP_200_OK)
		user = request.user
		goslings = Gosling.objects.filter(created_by=user)
		goslings_ser = Gosling_Serializer(goslings,many=True)
		return Response({'data':goslings_ser.data},status=status.HTTP_200_OK)
	
class Main_View(APIView):
	permission_classes = [IsAuthenticated,]
	def get(self,request):
		goslings = Gosling.objects.order_by('-id')
		gos_ser = Gosling_Serializer(goslings,many=True)
		return Response({'data':gos_ser.data})



class Gosling_View(APIView):
	def get(self,request,*args,**kwargs):
		id = kwargs.get('id',None)
		if id is not None:
			gos = Gosling.objects.get(id=id)
			gos_ser = Gosling_Serializer(gos)
			return Response({'data':gos_ser.data},status=status.HTTP_200_OK)
	
class All_Parts(APIView):
	def get(self,request):
		heads = Element.objects.filter(part__name='head')
		bodies = Element.objects.filter(part__name='body')
		feet = Element.objects.filter(part__name='feet')
		boots = Element.objects.filter(part__name='boot')
		h_ser = Element_serializer(heads,many=True)
		b_ser = Element_serializer(bodies,many=True)
		f_ser = Element_serializer(feet,many=True)
		boots_ser = Element_serializer(boots,many=True)
		return Response({
			'heads':h_ser.data,
			'bodies':b_ser.data,
			'feet':f_ser.data,
			'boots':boots_ser.data
		})
