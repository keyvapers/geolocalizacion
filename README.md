# geolocalizacion
Ejemplo de actualización de datos en tiempo real.

## Especificaciones
- PHP 5.6+
- MySQL
- Codeigniter 3
- TypeScript
- Sass

## Accesos
- Admin
    - Usuario: admin
    - Contraseña: admin

- Cliente
    - Usuario: cliente
    - Contraseña: cliente

## Permisos
- Admin
    - Agregar
    - Editar
    - Eliminar
    - Visualizar todos los vehículos
    - Rastrear todos los vehículos
- Cliente
    - Visualizar solo a los vehículos asignados
    - Rastrear solo a los vehículos asignados

## Api Actualizar Posicion
- Url: api/Vehiculos/posicion
- Type: POST
- Params: 
    - id: Id del vehículo a actualizar
    - lat: Latitud de la posición
    - lng: Longitud de la posición
- Response:
    - Success:    
        - message: Mensaje con la acción realizada
    - Error:
        - error: Mensaje con el error








