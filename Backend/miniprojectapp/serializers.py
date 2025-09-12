
from rest_framework import serializers
from .models import MiniProject
from django.contrib.auth import get_user_model
from users.models import User

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role']

class MiniProjectSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)  # Return user object
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='assigned_to',
        write_only=True
    )

    class Meta:
        model = MiniProject
        fields = [
            'id',
            'title',
            'description',
            'assigned_to',
            'priority',
            'due_date',
            'assigned_to_id',
            'status',
            'created_at',
            'updated_at',
        ]


