# urls.py
# urls.py
from django.urls import path
from .views import (
    CompanyListCreateView,
    CompanyRetrieveUpdateDestroyView,
    EmployeeListCreateView,
    EmployeeRetrieveUpdateDestroyView,
    EmployeeViewSet,
    ComplainListCreateView,
    ComplainRetrieveUpdateDestroyView,
    ComplainViewSet
)

urlpatterns = [
    path('api/companies/', CompanyListCreateView.as_view(), name='company-list-create'),
    path('api/companies/<int:pk>/', CompanyRetrieveUpdateDestroyView.as_view(), name='company-retrieve-update-destroy'),
    path('api/employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('api/employees/<int:pk>/', EmployeeRetrieveUpdateDestroyView.as_view(), name='employee-retrieve-update-destroy'),
    path('api/companiesemp/<int:pk>/',EmployeeViewSet.as_view({"get":"retrieve"}),name = 'lkd'),
    path('api/empcomplains/<int:pk>/',ComplainViewSet.as_view({"get":"retrieve"}),name = 'sdk'),
    path('complains/', ComplainListCreateView.as_view(), name='complain-list'),
    path('complains/<int:pk>/', ComplainRetrieveUpdateDestroyView.as_view(), name='complain-detail'),
]

