from pymongo import MongoClient
import datetime
import time
import random

class Singal_Maker:
    def __init__(self, gatewayName):
        self.sending_size = 0

        self.gatewayName = gatewayName
        self.register_db = False
        self.client = MongoClient('localhost', 27018)
        self.db = self.client['Lora']
        self.signals = self.db['signals']


    def save_signal_to_db(self):
        signal = {
            "gateway": self.gatewayName,
            "sample_rate": 125000,
            "length": self.sending_size,
            "time": datetime.datetime.utcnow(),
            "bin_num": random.randrange(0, 8000),
            "mag_max": random.randrange(100, 500),
            "real": [],
            "imag": []
        }
        signal_id = self.signals.insert_one(signal).inserted_id
        print("Save(%s): %s" %(self.gatewayName, signal_id))
        # self.register_db = True
        #

signal_maker_PC = Singal_Maker("PC")
signal_maker_LAB = Singal_Maker("LAB")
while(True):
    signal_maker_PC.save_signal_to_db()
    time.sleep(0.2)
    signal_maker_LAB.save_signal_to_db()
    time.sleep(5)