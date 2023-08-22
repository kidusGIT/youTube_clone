from django.contrib.auth.models import UserManager

class CustomUserManager(UserManager):
    def make_user(self, password, **extra):
        user = self.model(**extra)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_user(self, password=None, **extra):
        extra.setdefault('is_staff', False)
        extra.setdefault('is_superuser', False)

        return self.make_user(password, **extra)
    
    def create_superuser(self, password=None, **extra):
        extra.setdefault('is_staff', True)
        extra.setdefault('is_superuser', True)

        return self.make_user(password, **extra)