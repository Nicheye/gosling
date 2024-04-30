from django.db import models
from authentification.models import User
# Create your models here.

class Part_of_body(models.Model):
	name = models.CharField(max_length=30)
	def __str__(self) -> str:
		return self.name
class Element(models.Model):
	name = models.CharField(max_length=40)
	image = models.ImageField(upload_to='head')
	
	price = models.PositiveIntegerField(default=0)
	created_by = models.ForeignKey(User,on_delete=models.CASCADE)
	part = models.ForeignKey(Part_of_body,on_delete=models.CASCADE)
	
	def __str__(self) -> str:
		return self.name


class Gosling(models.Model):
	title = models.CharField(max_length=50,blank=True)
	description = models.CharField(max_length=120,blank=True)
	head = models.ForeignKey(Element,on_delete=models.CASCADE,related_name='head')
	body = models.ForeignKey(Element,on_delete=models.CASCADE,related_name='body')
	feet = models.ForeignKey(Element,on_delete=models.CASCADE,related_name='feet')
	boots = models.ForeignKey(Element,on_delete=models.CASCADE,related_name='boots')
	created_by = models.ForeignKey(User,on_delete=models.CASCADE)
	is_accepted = models.BooleanField(default=False)
	def __str__(self) -> str:
		return self.title
