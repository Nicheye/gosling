
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import *

from django.shortcuts import get_object_or_404

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
    def _get_element(self, data, part_name):
        element_id = data.get(part_name, '')
        if isinstance(element_id, int):
            return get_object_or_404(Element, id=element_id, part__name=part_name)
        else:
            elements = Element.objects.filter(name__icontains=element_id, part__name=part_name)
            return elements.first() if elements.exists() else None

    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            gos = get_object_or_404(Gosling, id=id)
            gos_ser = Gosling_Serializer(gos)
            return Response({'data': gos_ser.data}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        try:
            head = self._get_element(data, 'head')
            body = self._get_element(data, 'body')
            feet = self._get_element(data, 'feet')
            boots = self._get_element(data, 'boots')

            ser = Gosling_Serializer(data=data)
            if ser.is_valid(raise_exception=True):
                ser.save(head=head, body=body, feet=feet, boots=boots, created_by=user)
                return Response({'data': ser.data})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        id = kwargs.get("id", None)

        if id is not None:
            gosling_inst = Gosling.objects.get(id=id)
            if gosling_inst.created_by == user:
                try:
                    head = self._get_element(data, 'head')
                    body = self._get_element(data, 'body')
                    feet = self._get_element(data, 'feet')
                    boots = self._get_element(data, 'boots')

                    ser = Gosling_Serializer(gosling_inst, data=data)
                    if ser.is_valid(raise_exception=True):
                        ser.save(head=head, body=body, feet=feet, boots=boots, created_by=user)
                        return Response({'data': ser.data})
                except Exception as e:
                    return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': "You are not allowed to patch gosling created by another user"},
                                status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        id = kwargs.get("id", None)
        if id is not None:
            gosling_inst = Gosling.objects.get(id=id)
            if gosling_inst.created_by == request.user:
                gosling_inst.delete()
                return Response({"message": "Successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': "You are not allowed to delete gosling created by another user"},
                                status=status.HTTP_400_BAD_REQUEST)

	
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
