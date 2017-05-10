from django.conf.urls import url
from .views import (
    CreateCategoryViewSet,
    EditCategoryViewSet,
    ListCategoryViewSet,
    CreateExpenseViewSet,
    EditExpenseViewSet,
    ListExpenseViewSet,
)

urlpatterns = [
    url(r'categories$',
        CreateCategoryViewSet.as_view(),
        name='protected_data'),
    url(r'categories/(?P<id>.+)/$',
        EditCategoryViewSet.as_view(),
        name='protected_data'),
    url(r'filter/(?P<user>.+)/$', ListCategoryViewSet.as_view(), name='protected_data'),
    url(r'records/$',
        CreateExpenseViewSet.as_view(),
        name='protected_data'),
    url(r'records/detail/(?P<id>.+)/$',
        EditExpenseViewSet.as_view(),
        name='protected_data'),
    url(r'records/filter/(?P<user>.+)/$', ListExpenseViewSet.as_view(), name='protected_data')
]
