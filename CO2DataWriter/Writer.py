from datetime import datetime
import threading
from random import randint

from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# You can generate a Token from the "Tokens Tab" in the UI
token = ""
org = "fhswf"
bucket = "timeseries"

client = InfluxDBClient(url="http://localhost:8086", token=token)

write_api = client.write_api(write_options=SYNCHRONOUS)


def write_data():
    co2 = randint(0, 3500)
    temp = randint(-50, 50)
    humidity = randint(0, 100)

    print(f"Writing Data: {datetime.utcnow()}, {co2}, {temp}, {humidity}")

    point = Point("mem").tag("host", "unit1")\
        .field("co2", co2)\
        .field("temp", temp)\
        .field("humidity", humidity)\
        .time(datetime.utcnow(), WritePrecision.NS)
    write_api.write(bucket, org, point)

    threading.Timer(5.0, write_data).start()


write_data()



