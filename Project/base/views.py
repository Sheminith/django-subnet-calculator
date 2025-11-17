from django.shortcuts import render
from base import utils

def create_subnets(request):
    subnets = None
    network_ip_address = None

    if request.method == 'POST':
        ip_address = request.POST.get('ip_address')
        num_subnets = request.POST.get('num_subnets')

        # Generate subnet list
        subnets = utils.subnet(str(ip_address), int(num_subnets))

        # Get network IP address without CIDR
        network_ip_address = utils.split_network_host(ip_address)[0]

    context = {'subnets': subnets, 'network_ip_address':network_ip_address}
    return render(request, 'base/home.html', context)
