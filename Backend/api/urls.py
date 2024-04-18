from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("projects", ProjectViewset, basename="projects")
router.register("budget", BudgetViewset, basename="budget")
router.register("transactions", TransactionViewset, basename="transactions")
router.register("reminders", ReminderViewset, basename="reminders")
router.register("finance", FinanceViewset, basename="finance")
urlpatterns = router.urls
# urlpatterns = [
#     path('', home),
# ]
