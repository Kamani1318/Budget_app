from django.db import models

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(max_length = 100)
    status = models.CharField(max_length = 100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class Transactions(models.Model):
    transaction_name = models.CharField(max_length=100)
    category = models.CharField(max_length = 100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateField()
    mode_of_payment = models.CharField(max_length = 100)
    description = models.CharField(max_length = 100)
    t_created = models.DateTimeField(auto_now_add=True)
    t_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.transaction_name
    
class Budget(models.Model):
    budget_name = models.CharField(max_length=100)
    budget_amount = models.DecimalField(max_digits=10, decimal_places=2)
    budget_date = models.DateField()
    b_created = models.DateTimeField(auto_now_add=True)
    b_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.budget_name
    
class Reminder(models.Model):
    r_transaction_name = models.CharField(max_length=100)
    r_category = models.CharField(max_length = 100)
    r_amount = models.DecimalField(max_digits=10, decimal_places=2)
    r_transaction_date = models.DateField()
    r_mode_of_payment = models.CharField(max_length = 100)
    r_description = models.CharField(max_length = 100)
    r_created = models.DateTimeField(auto_now_add=True)
    r_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.r_transaction_name
    
class Finance(models.Model):
    month_name = models.CharField(max_length=100)
    month = models.DateField()
    income = models.DecimalField(max_digits=10, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    expense = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Finance for {self.month.strftime('%B %Y')}"
    
    
