
from django.urls import path, include
from .views import *

urlpatterns = [
	path('',Main_View.as_view()),
	path('all_parts/',All_Parts.as_view()),
	path('detail/<int:id>',Gosling_View.as_view()),
	path('profile/<int:id>',Profile_View.as_view()),
	path('profile',Profile_View.as_view()),
    
]