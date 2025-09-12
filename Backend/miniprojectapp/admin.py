# projects/admin.py
from django.contrib import admin
from .models import MiniProject

@admin.register(MiniProject)
class MiniProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'assigned_to', 'priority', 'status', 'due_date', 'created_at')
    search_fields = ('title', 'description', 'assigned_to__username')
    list_filter = ('priority', 'status', 'due_date', 'assigned_to')
