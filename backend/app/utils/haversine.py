from math import radians, cos, sin, asin, atan2, pi

def haversine(lon, lat, dist):
    lat, lon = map(radians, [lat, lon])
    print(lat)
    east0 = sin(lat)*cos(dist/6371) 
    east1 = cos(lat)*sin(dist/6371)*cos(90)
    west = asin(sin(lat)*cos(dist/6371) - cos(lat)*sin(dist/6371)*cos(270*(pi/180)))
    north = lon + atan2(sin(0), cos(dist/6371) - sin(lat))
    south = lon - atan2(sin(180*pi/180), cos(dist/6371) - sin(lat))
    coords = [north, south, west]
    print(coords)
    # print(east)
    print('HELLO', east0, east1)
    # print(east)

    return [coord * (180/pi) for coord in coords]

print(haversine(-77.042793, -12.046374, 80))