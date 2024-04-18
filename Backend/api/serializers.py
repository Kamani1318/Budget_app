from rest_framework import serializers
from .models import *

# Serializers are used to convert complex data types such as querysets and model instances to native Python datatypes that can be rendered into JSON, XML or other content types.
# They also handle deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ("id","name","start_date","end_date","comments","status")
        
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ("id","transaction_name","category","amount","transaction_date","mode_of_payment","description")
        
class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ("id","budget_name","budget_amount","budget_date")

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ("id","r_transaction_name","r_category","r_amount","r_transaction_date","r_mode_of_payment","r_description")
        
class FinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Finance
        fields = ("id","month_name","month","income","balance","expense")