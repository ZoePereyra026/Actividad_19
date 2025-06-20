# 🌐 API RESTful de Países

> Documentación oficial de la API de gestión de países. Esta API permite realizar operaciones CRUD sobre una base de datos de países, incluyendo filtrado por idioma y búsqueda por nombre.

## URL Base
http://localhost:3000/


---

## 📋 Sumario

- [URL Base](#-url-base)
- [Rutas y Métodos](#-rutas-y-métodos)
- [Ejemplos de uso](#-ejemplos-de-uso)
- [Cuerpo del mensaje para POST y PUT](#-cuerpo-del-mensaje-para-post-y-put)
- [Ejemplo de archivo .env](#-ejemplo-de-archivo-env)

---

## 📌 Rutas y Métodos

| Método | Ruta                        | Descripción                                       |
|--------|-----------------------------|---------------------------------------------------|
| GET    | `/paises`                   | Obtener todos los países o filtrarlos por idioma |
| GET    | `/paises/:nombre`           | Obtener país por nombre parcial o completo        |
| POST   | `/paises`                   | Insertar un nuevo país                            |
| DELETE | `/paises/:nombre`           | Eliminar un país por nombre exacto                |

---

## 🔍 Ejemplos de uso

### Obtener todos los países  
```http
GET http://localhost:3000/paises
```

### Obtener los datos de un país en particular (ejemplo: Colombia)

```http
GET http://localhost:3000/paises/Colombia
```

### Obtener todos los países que hablen un idioma específico (ejemplo: italiano)
```http
GET http://localhost:3000/paises?idioma=italiano

```

### Insertar un nuevo país
```http
POST http://localhost:3000/paises
Content-Type: application/json

{
  "pais": "Argentina",
  "idioma": ["Español"],
  "continente": "América"
}

```

### Borrar un país (ejemplo: Argentina)
```http
DELETE http://localhost:3000/paises/Argentina

```

### Cuerpo del mensaje para POST y PUT
#### POST - Agregar nuevo país
```http

{
  "pais": "Japón",
  "idioma": ["Japonés"],
  "continente": "Asia"
}

```
> Asegurate de que todos los campos estén completos.

### Ejemplo de archivo .env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/Paises

> RECORDATORIO: Este archivo no debe ser subido al repositorio si contiene credenciales reales. Asegurate de agregar .env al archivo .gitignore.