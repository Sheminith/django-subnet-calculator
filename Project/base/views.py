from django.shortcuts import render
from base import utils

def create_subnets(request):
    subnets = None

    if request.method == 'POST':
        ip_address = request.POST.get('ip_address')
        num_subnets = request.POST.get('num_subnets')

        subnets = utils.subnet(str(ip_address), int(num_subnets))

    context = {'subnets': subnets}
    return render(request, 'base/home.html', context)
