import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None


def get_estimated_price(location, sqft, bhk, bath):
    try:
        locationIndex = __data_columns.index(location.lower())
    except:
        locationIndex = -1

    xValue = np.zeros(len(__data_columns))
    xValue[0] = sqft
    xValue[1] = bath
    xValue[2] = bhk
    if locationIndex >= 0:
        xValue[locationIndex] = 1
    return round(__model.predict([xValue])[0], 2)


def get_location_names():
    return __locations


def load_saved_artifacts():
    print("Loading saved artifacts... starting!")
    global __data_columns
    global __locations

    with open('./artifacts/columns.json', 'r') as func:
        __data_columns = json.load(func)['Data Columns']
        __locations = __data_columns[3:]
    global __model
    with open('./artifacts/real_estate_price_model.pickle', 'rb') as func:
       __model = pickle.load(func)
    print("Loading saved artifacts... Done!")

if (__name__ == '__main__'):
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    print(get_estimated_price('Kalhalli', 1000, 2, 2))
    print(get_estimated_price('Ejipura', 1000, 2, 2))