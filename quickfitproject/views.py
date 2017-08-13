# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render

from django.http import HttpResponse
def landing_page(request):
    html = "<html><body>Quickfit by Covalent Labs</body></html>"
    return HttpResponse(html)
