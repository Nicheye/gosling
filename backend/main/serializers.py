from rest_framework.serializers import ModelSerializer
from rest_framework.fields import SerializerMethodField
from .models import *
class Element_serializer(ModelSerializer):
	image =SerializerMethodField()
	created_by = SerializerMethodField()
	part = SerializerMethodField()
	class Meta:
		model = Element
		fields = ['name','image','price','created_by','part']
	def get_image(self,obj):
		if obj.image:
			return "http://127.0.0.1:8000/" + str(obj.image.url)
		return None
	def get_created_by(self,obj):
		if obj.created_by:
			return str(obj.created_by.username)
		return None
	def get_part(self,obj):
		if obj.part:
			return str(obj.part.name)
		return None

class Gosling_Serializer(ModelSerializer):
	head = SerializerMethodField()
	body = SerializerMethodField()
	feet = SerializerMethodField()
	boots = SerializerMethodField()
	created_by = SerializerMethodField()
	class Meta:
		model = Gosling
		fields =['head','body','feet','boots','created_by','title','description','is_accepted']
	
	def get_head(self,obj):
		if obj.head:
			ser = Element_serializer(obj.head)
			return ser.data
	def get_body(self,obj):
		if obj.body:
			ser = Element_serializer(obj.body)
			return ser.data
	
	def get_feet(self,obj):
		if obj.feet:
			ser = Element_serializer(obj.feet)
			return ser.data
	
	def get_boots(self,obj):
		if obj.boots:
			ser = Element_serializer(obj.boots)
			return ser.data
	
	def get_created_by(self,obj):
		if obj.created_by:
			
			return obj.created_by.username

	
