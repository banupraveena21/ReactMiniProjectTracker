import django_filters
from .models import MiniProject


class MiniProjectFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status')
    priority = django_filters.CharFilter(field_name='priority')
    due_date = django_filters.DateFromToRangeFilter(field_name='due_date')
    assigned_to = django_filters.NumberFilter(field_name='assigned_to__id', lookup_expr='exact')
    
    class Meta:
        model = MiniProject
        fields = ['status', 'priority', 'due_date', 'assigned_to']
