# projects/permissions.py

from rest_framework.permissions import BasePermission

class IsTrainer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'trainer'

class IsAssignedOrTrainer(BasePermission):
    def has_object_permission(self, request, view, obj):
        # trainer can do anything on object
        if request.user.role == 'trainer':
            return True
        # otherwise the user must be the assigned_to user
        return obj.assigned_to == request.user

class IsTrainerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.role == 'trainer' or request.user.is_staff)
