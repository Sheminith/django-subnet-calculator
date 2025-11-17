import math
import ipaddress

def get_closest_two_power(value):
    """Return the next power of 2 greater than or equal to the value."""
    number = value
    while not math.log(number, 2).is_integer():
        number += 1
    return number

def split_network_host(ip):
    """Split an IP in CIDR format into network and prefix."""
    return ip.split('/')

def ip_to_binary(ip_str):
    """Convert an IP string to a single 32-bit binary string."""
    return ''.join(format(int(octet), '08b') for octet in ip_str.split('.'))

def binary_to_ip(binary_str):
    """Convert a single 32-bit binary string to a list of 4 decimal octets."""
    return [int(binary_str[i:i+8], 2) for i in range(0, 32, 8)]

def get_network_broadcast(ip):
    """Return network and broadcast IP as lists of integers for a IP in CIDR format."""
    network_portion, prefix = split_network_host(ip)
    prefix = int(prefix)
    host_bits = 32 - prefix

    network_bin = ip_to_binary(network_portion)
    network_ip_bin = network_bin[:prefix] + '0' * host_bits
    broadcast_ip_bin = network_bin[:prefix] + '1' * host_bits

    return binary_to_ip(network_ip_bin), binary_to_ip(broadcast_ip_bin)

def get_address_ranges(ip):
    """Return total and usable address ranges for a subnet."""
    network_ip, broadcast_ip = get_network_broadcast(ip)

    first_usable = network_ip.copy()
    first_usable[-1] += 1

    last_usable = broadcast_ip.copy()
    last_usable[-1] -= 1

    return network_ip, broadcast_ip, first_usable, last_usable

def get_subnet_mask(prefix):
    """Return subnet mask as a list of 4 decimal octets from prefix length."""
    prefix = int(prefix)
    mask_bin = '1' * prefix + '0' * (32 - prefix)
    return binary_to_ip(mask_bin)

def get_default_gateway(ip):
    """Assume default gateway is the first usable host."""
    return get_address_ranges(ip)[2]

def create_subnet(ip):
    """Return a dictionary of all subnet details for a given CIDR IP."""
    network_ip, broadcast_ip, first_host, last_host = get_address_ranges(ip)
    subnet_mask = get_subnet_mask(split_network_host(ip)[1])
    prefix = int(split_network_host(ip)[1])

    total_ip_count = 2 ** (32 - prefix)
    usable_ip_count = total_ip_count - 2  # subtract network and broadcast

    return {
        'subnet_mask': subnet_mask,
        'network_ip_address': network_ip,
        'broadcast_ip_address': broadcast_ip,
        'total_ip_address_range': [network_ip, broadcast_ip],
        'usable_hosts_range': [first_host, last_host],
        'default_gateway': get_default_gateway(ip),
        'total_ip_count': total_ip_count,
        'usable_ip_count': usable_ip_count
    }

def subnet(ip: str, num_subnets: int):
    """Split network into subnets and return all details."""
    network, prefix = split_network_host(ip)
    prefix = int(prefix)

    needed_subnets = get_closest_two_power(num_subnets)
    subnet_prefix = prefix + int(math.log2(needed_subnets))
    block_size = 2 ** (32 - subnet_prefix)
    base_ip = ipaddress.IPv4Address(network)

    all_subnets = []
    for i in range(needed_subnets):
        offset = i * block_size
        new_ip = base_ip + offset
        subnet_ip = f"{new_ip}/{subnet_prefix}"
        subnet_detail = create_subnet(subnet_ip)
        all_subnets.append(subnet_detail)

    return all_subnets

def display_subnets(subnets_list):
    """Return formatted subnet data with dotted IP notation."""
    def ip_list_to_str(ip_list):
        return '.'.join(str(octet) for octet in ip_list)

    formatted_output = []

    for subnet in subnets_list:
        formatted_output.append({
            'subnet_mask': ip_list_to_str(subnet['subnet_mask']),
            'network_ip_address': ip_list_to_str(subnet['network_ip_address']),
            'broadcast_ip_address': ip_list_to_str(subnet['broadcast_ip_address']),
            'total_ip_address_range': f"{ip_list_to_str(subnet['total_ip_address_range'][0])} - {ip_list_to_str(subnet['total_ip_address_range'][1])}",
            'usable_hosts_range': f"{ip_list_to_str(subnet['usable_hosts_range'][0])} - {ip_list_to_str(subnet['usable_hosts_range'][1])}",
            'default_gateway': ip_list_to_str(subnet['default_gateway']),
            'total_ip_count': subnet['total_ip_count'],
            'usable_ip_count': subnet['usable_ip_count'],
        })

    return formatted_output

