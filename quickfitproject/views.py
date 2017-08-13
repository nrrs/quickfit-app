# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render

# from django.views import generic
# class IndexView(generic.ListView):
#     template_name = 'polls/index.html'

from django.http import HttpResponse
def landing_page(request):
    html = "<html><body>Quickfit by Covalent Labs</body></html>"
    return HttpResponse(html)
