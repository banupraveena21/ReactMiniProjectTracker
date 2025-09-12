# projects/views.py

from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import MiniProject
from .serializers import MiniProjectSerializer
from .permissions import IsTrainer, IsAssignedOrTrainer, IsTrainerOrAdmin
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from .filters import MiniProjectFilter

class MiniProjectViewSet(viewsets.ModelViewSet):
    queryset = MiniProject.objects.all()
    serializer_class = MiniProjectSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = MiniProjectFilter
    ordering_fields = ['due_date', 'priority', 'created_at']
    search_fields = ['title', 'description']
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        user = self.request.user

        if not user.is_authenticated:
            return [permissions.IsAuthenticated()]  # or empty queryset in get_queryset()

        # Create / destroy only trainers
        if self.action in ['create', 'destroy']:
            return [IsTrainer()]

        # Update/partial_update assigned user or trainer
        if self.action in ['update', 'partial_update']:
            return [IsAssignedOrTrainer()]

        # List or retrieve:
        if self.action in ['list', 'retrieve']:
            # Admin and trainers can see all
            if user.is_staff or user.role == 'trainer':
                return [permissions.IsAuthenticated()]
            # Trainees can only access their own projects
            elif user.role == 'trainee':
                return [permissions.IsAuthenticated()]
            else:
                return [permissions.IsAdminUser()]  # fallback - deny others

        # Default fallback permission
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        print(f"User: {user}, role: {getattr(user, 'role', None)}")

        if not user.is_authenticated:
            return MiniProject.objects.none()

    # Admin / staff sees all
        if user.is_staff:
            return MiniProject.objects.all().order_by('-created_at')

    # Trainer sees all projects
        if user.role == 'trainer':
            return MiniProject.objects.all(assigned_to=user).order_by('-created_at')

    # Trainee sees only their own projects
        if user.role == 'trainee':
            return MiniProject.objects.filter(assigned_to=user).order_by('-created_at')

        return MiniProject.objects.none()


