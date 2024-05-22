import pandas as pd
from pymongo import MongoClient

# Leer los datos
archivo_excel = './excel.xlsx'
datos_italcol = pd.read_excel(archivo_excel, sheet_name='ITALCOL', header=[0,1]).droplevel(0, axis=1)

# Renombrar columnas para facilitar el acceso
datos_italcol.columns = ['codigo_barra', 'codigo_producto', 'descripcion', 'pres', 'sub', 'may', 'express']

# Filtrar productos que contienen "Agility" en la descripción
productos_agility = datos_italcol[datos_italcol['descripcion'].str.contains("Agility", case=False, na=False)]

# Convertir la columna de precio express a numérico, forzando valores no numéricos a NaN
productos_agility['express'] = pd.to_numeric(productos_agility['express'], errors='coerce')

# Eliminar filas donde el precio express es NaN
productos_agility = productos_agility.dropna(subset=['express'])

# Seleccionar solo las columnas relevantes
productos_agility = productos_agility[['codigo_barra', 'codigo_producto', 'descripcion', 'express']]

# Transformar a lista de diccionarios
productos_a_insertar = productos_agility.to_dict('records')

# Conectar a MongoDB
cliente = MongoClient("mongodb://Santi:12345@localhost/Usuarios")
db = cliente['Productos']  # Ajustar al nombre de tu base de datos
coleccion = db['products']

# Insertar los datos en MongoDB
resultado = coleccion.insert_many(productos_a_insertar)
print(f'Se insertaron {len(resultado.inserted_ids)} productos "Agility".')
