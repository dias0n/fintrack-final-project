from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, RegisterSerializer, CategorySerializer, TransactionSerializer
from .models import User, Category, Transaction
from rest_framework import generics
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_balance(request):
    transactions = Transaction.objects.filter(user=request.user).order_by('date')

    balance = 0
    history = []

    for t in transactions:
        if t.type == 'income':
            balance += t.amount
        else:
            balance -= t.amount
        history.append(balance)

    return Response({
        'current_balance': balance,
        'history': history
    })

