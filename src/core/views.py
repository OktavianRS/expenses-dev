import logging

from django.shortcuts import render
from rest_framework import generics
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import CategorySerializer, ExpenseSerializer
from .models import Category, Expense

class CreateCategoryViewSet(generics.CreateAPIView):
    model = Category
    serializer_class = CategorySerializer
    # renderer_classes = (JSONRenderer,)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class EditCategoryViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    lookup_field = "id"
    model = Category
    serializer_class = CategorySerializer
    # renderer_classes = (JSONRenderer,)
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)


class ListCategoryViewSet(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # renderer_classes = (JSONRenderer,)
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_id = self.kwargs['user']
        return Category.objects.filter(user_id=user_id)

class CreateExpenseViewSet(generics.CreateAPIView):
    model = Expense
    serializer_class = ExpenseSerializer
    # renderer_classes = (JSONRenderer,)
    logging.error("asonethuasnoehunsahuao----------")
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class EditExpenseViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    lookup_field = "id"
    model = Expense
    serializer_class = ExpenseSerializer
    # renderer_classes = (JSONRenderer,)
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)


class ListExpenseViewSet(generics.ListAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    # renderer_classes = (JSONRenderer,)
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_id = self.kwargs['user']
        return Expense.objects.filter(category__user_id=user_id)
