# views.py
# views.py
from rest_framework import generics
from rest_framework import viewsets, status
from .models import Company, Employee,Complain
from .serializers import CompanySerializer, EmployeeSerializer,ComplainSerializer
from .models import *
from rest_framework.decorators import action
from rest_framework.response import Response
class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

from rest_framework import viewsets
from .models import Company, Employee
from .serializers import EmployeeSerializer  # You'll need to create a serializer for the Employee model

class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

    @action(detail=True, methods=['GET'])
    def retrieve(self, request, pk=None):
        try:
            comp = Company.objects.get(pk=pk)
            emps = comp.employees.all()
            serializer = EmployeeSerializer(emps, many=True)
            return Response(serializer.data)
        except Company.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ComplainListCreateView(generics.ListCreateAPIView):
    queryset = Complain.objects.all()
    serializer_class = ComplainSerializer

class ComplainRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Complain.objects.all()
    serializer_class = ComplainSerializer


class ComplainViewSet(viewsets.ModelViewSet):
    serializer_class = ComplainSerializer
    queryset = Complain.objects.all()

    @action(detail=True, methods=['GET'])
    def retrieve(self, request, pk=None):
        try:
            comp = Employee.objects.get(pk=pk)
            emps = comp.complain_set.all()
            serializer = ComplainSerializer(emps, many=True)
            return Response(serializer.data)
        except Employee.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

