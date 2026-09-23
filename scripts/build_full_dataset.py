import csv
import io
import json
import re

BAIRRO_COORDS = {
    'vila barao': (-23.4912, -47.4725),
    'vila barão': (-23.4912, -47.4725),
    'jardim zulmira': (-23.4965, -47.4682),
    'zulmira': (-23.4965, -47.4682),
    'nova esperanca': (-23.4880, -47.4820),
    'nova esperança': (-23.4880, -47.4820),
    'jardim nova esperança': (-23.4880, -47.4820),
    'lopes de oliveira': (-23.4735, -47.4750),
    'lopes oliveira': (-23.4735, -47.4750),
    'habiteto': (-23.4420, -47.4890),
    'vila angelica': (-23.4830, -47.4620),
    'vila angélica': (-23.4830, -47.4620),
    'jardim itangua': (-23.4940, -47.4810),
    'jardim itanguá': (-23.4940, -47.4810),
    'itangua': (-23.4940, -47.4810),
    'itanguá': (-23.4940, -47.4810),
    'parque sao bento': (-23.4460, -47.4690),
    'parque são bento': (-23.4460, -47.4690),
    'sao bento': (-23.4460, -47.4690),
    'são bento': (-23.4460, -47.4690),
    'jardim betania': (-23.4750, -47.4710),
    'jardim betânia': (-23.4750, -47.4710),
    'betania': (-23.4750, -47.4710),
    'vila nova sorocaba': (-23.4740, -47.4610),
    'nova sorocaba': (-23.4740, -47.4610),
    'jardim paulista': (-23.4780, -47.4580),
    'jardim simus': (-23.5040, -47.4850),
    'simus': (-23.5040, -47.4850),
    'vila helena': (-23.4760, -47.4670),
    'santa marina': (-23.4690, -47.4730),
    'jardim santa marina': (-23.4690, -47.4730),
    'jardim santa cecilia': (-23.4650, -47.4710),
    'jardim santa cecília': (-23.4650, -47.4710),
    'santa cecilia': (-23.4650, -47.4710),
    'brigadeiro tobias': (-23.5050, -47.3620),
    'eden': (-23.4410, -47.3850),
    'éden': (-23.4410, -47.3850),
    'aparecidinha': (-23.4720, -47.3750),
    'centro': (-23.5015, -47.4580),
    'vila fiori': (-23.4820, -47.4520),
    'wanel ville': (-23.4990, -47.5020),
    'parque esmeralda': (-23.4910, -47.4980),
    'jardim guaiba': (-23.4710, -47.4650),
    'jardim guaíba': (-23.4710, -47.4650),
    'guaiba': (-23.4710, -47.4650),
    'jardim magnolia': (-23.5180, -47.4750),
    'jardim magnólias': (-23.5180, -47.4750),
    'magnolia': (-23.5180, -47.4750),
    'vila haro': (-23.5080, -47.4350),
    'vila barcelona': (-23.5120, -47.4410),
    'barcelona': (-23.5120, -47.4410),
    'trujilo': (-23.4970, -47.4610),
    'jardim trujilo': (-23.4970, -47.4610),
    'paineiras': (-23.4350, -47.4710),
    'cidade jardim': (-23.5220, -47.4790),
    'piazza di roma': (-23.5150, -47.5120),
    'mineirao': (-23.4680, -47.4520),
    'mineirão': (-23.4680, -47.4520),
    'jardim sao guilherme': (-23.4580, -47.4650),
    'jardim são guilherme': (-23.4580, -47.4650),
    'hebert de souza': (-23.4520, -47.4710),
    'vitoria regia': (-23.4420, -47.4510),
    'vitória régia': (-23.4420, -47.4510),
    'vila leopoldina': (-23.4860, -47.4710),
    'vila elza': (-23.4810, -47.4690),
    'vila carvalho': (-23.4910, -47.4540),
    'vila jardini': (-23.5090, -47.4710),
    'jardim das magnolias': (-23.5180, -47.4750),
    'jardim sao camilo': (-23.4660, -47.4780),
    'sao camilo': (-23.4660, -47.4780),
    'jardim nogueira': (-23.4720, -47.4730),
    'portal do itavuvu': (-23.4510, -47.4680),
    'portal itavuvu': (-23.4510, -47.4680),
    'altos do itavuvu': (-23.4530, -47.4670),
    'altos ipanema': (-23.4320, -47.4820),
    'altos do ipanema': (-23.4320, -47.4820),
    'jardim josane': (-23.4610, -47.3910),
    'josane': (-23.4610, -47.3910),
    'vila sao joao': (-23.4870, -47.4580),
    'vila são joão': (-23.4870, -47.4580),
    'vila sao jorge': (-23.4920, -47.4610),
    'vila são jorge': (-23.4920, -47.4610),
    'sol nascente': (-23.4920, -47.4890),
    'jardim sol nascente': (-23.4920, -47.4890),
    'jardim california': (-23.4790, -47.4780),
    'jardim califórnia': (-23.4790, -47.4780),
}

import random

def get_coords(bairro):
    if not bairro:
        return [-23.5015, -47.4580]
    b = bairro.lower().strip()
    for key, (lat, lng) in BAIRRO_COORDS.items():
        if key in b or b in key:
            j_lat = (random.random() - 0.5) * 0.005
            j_lng = (random.random() - 0.5) * 0.005
            return [round(lat + j_lat, 6), round(lng + j_lng, 6)]
    return [round(-23.5015 + (random.random() - 0.5) * 0.03, 6), round(-47.4580 + (random.random() - 0.5) * 0.03, 6)]

print("Bairro coords mapping ready")
