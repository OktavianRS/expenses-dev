from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.cache import cache_page
from core.views import (
    ListExpenseViewSet
)

from base import views as base_views

urlpatterns = [
    url(r'^api/v1/records/filter/(?P<user>.+)/$', ListExpenseViewSet.as_view(), name='protected_data'),
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/dashboard/', include('core.urls', namespace='dashboard')),
    url(r'^api/v1/getdata/', include('base.urls', namespace='base')),
    url(r'^admin/', admin.site.urls),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
]
