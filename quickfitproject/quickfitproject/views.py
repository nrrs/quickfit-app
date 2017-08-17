# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import redirect


def landing_page(request):
    return redirect("https://nrrs.github.io/quickfit-app/")
