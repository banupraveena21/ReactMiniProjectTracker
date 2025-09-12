from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User  # import your custom User model

class CustomUserAdmin(UserAdmin):
    # Add the 'role' field to the user admin form
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )
    
    # Show the role field in the list display of users in admin
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'role')

    # Add a filter on the right sidebar for roles
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')

admin.site.register(User, CustomUserAdmin)
