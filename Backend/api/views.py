from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets,permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
# Create your views here.
def home(request):
    return HttpResponse("This is the homepage")

class ProjectViewset(viewsets.ViewSet):
    # Allow any user to access the viewset
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # to list al; project instances
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    #  handles post request to create a new project instance
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 404)
        #  hand;es get request to retrieve a single project instance
    def retrieve(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)
    
    #  handles put request to update a single project instance
    def update(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 404)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        project = self.queryset.get(id=pk)
        project.delete()
        return Response(status=204)
    
class BudgetViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 404)

    def retrieve(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 404)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        project = self.queryset.get(id=pk)
        project.delete()
        return Response(status=204)
    
class TransactionViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 404)

    def retrieve(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 404)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        project = self.queryset.get(id=pk)
        project.delete()
        return Response(status=204)
    
    
class ReminderViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 404)

    def retrieve(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = self.queryset.get(id=pk)
        serializer = self.serializer_class(project,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 404)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        project = self.queryset.get(id=pk)
        project.delete()
        return Response(status=204)