# Proyecto de API con Node.js, Clean Architecture y TypeScript

Este es un proyecto de API construido con **Node.js** y **TypeScript**, siguiendo el patrón arquitectónico **Clean Architecture**. La API se encarga de realizar funciones básicas de **Login**, como la creación de usuarios, autenticación y generación de **JWT**. Además, se han implementado pruebas unitarias para los diferentes endpoints y se utiliza **Prisma** como ORM para la conexión a la base de datos **PostgreSQL**, que está configurada mediante **Docker Compose**.

## Tecnologías utilizadas

- **Node.js**: Plataforma de ejecución para JavaScript en el servidor.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Clean Architecture**: Arquitectura que separa la lógica de negocio de los detalles de implementación (bases de datos, frameworks, etc.).
- **Prisma ORM**: Herramienta de acceso a datos para Node.js y TypeScript que facilita la interacción con la base de datos.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **Docker Compose**: Herramienta para definir y ejecutar aplicaciones con múltiples contenedores Docker (en este caso, para la base de datos PostgreSQL).
- **JWT (JSON Web Tokens)**: Estándar para la autenticación y transmisión segura de información entre partes.
- **Jest**: Framework de pruebas unitarias para Node.js y TypeScript.

## Funcionalidades

- **Creación de usuarios**: Permite crear nuevos usuarios con un nombre, correo electrónico y contraseña.
- **Autenticación de usuarios**: Permite a los usuarios autenticarse con su correo electrónico y contraseña.
- **Restablecimiento de contraseña**: Permite a los usuarios restablecer la contraseña.
- **Generación de JWT**: Una vez autenticado, se genera un JWT para la autorización de solicitudes posteriores.
- **Pruebas unitarias**: Se implementaron pruebas unitarias para verificar el correcto funcionamiento de los diferentes endpoints de la API.

## Estructura del Proyecto

El proyecto sigue el principio de Clean Architecture, lo que significa que está organizado de la siguiente manera:

- **src**
  - **application**: Contiene la lógica de negocio y casos de uso de la aplicación.
  - **domain**: Contiene las entidades, casos de uso y reglas del dominio.
  - **infrastructure**: Implementaciones concretas de la infraestructura, como bases de datos, servicios externos, etc.
  - **presentation**: Define los helpers y controladores de la API, así como las rutas.
- **test**: Contiene las pruebas unitarias para los casos de uso y endpoints.
- **prisma**: Contiene la configuración y el esquema de la base de datos.
## Visión General de la Estructura
**DTOS:** (Data Transfer Objects): Son objetos que representan los datos que se reciben en la solicitud y se envían en la respuesta. En Clean Architecture, estos son utilizados para transferir datos entre las capas de la aplicación.

**Entidades:** Representan los objetos de dominio del negocio. En este caso, la entidad sería un Usuario.

**Use Cases:** Contienen la lógica de negocio. En este caso, se encargarán de gestionar el proceso de login.

**Repositories:** Son los encargados de acceder a los datos persistentes (base de datos) y devolver los objetos de dominio, como los usuarios. En este caso, interactuarán con Prisma ORM.

**Controladores:** Reciben las solicitudes HTTP y ejecutan los casos de uso apropiados. En este caso, el controlador se encargará de recibir la solicitud de login y devolver la respuesta.

## Crear un JWT 
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

## Instalación

### Requisitos previos

- Tener instalado [Node.js](https://nodejs.org/) (preferentemente la versión 22.12.0).
- Tener instalado [Docker](https://www.docker.com/get-started).
- Tener instalado [Docker Compose](https://docs.docker.com/compose/install/).

### Pasos para la instalación

1. Clona este repositorio en tu máquina local:

```bash
   git clone https://github.com/bpabon/api-clean-architecture-login.git
   cd api-clean-architecture-login
```
2. Clonar archivo **.env.template** y renombrar a **.env**.
3. Clonar archivo **.env.template** y renombrar a **.env.test** cambiar los valores para ejecutar pruebas unitarias.
4. Instalar dependencias.
```bash
npm install
```
5. Levantar la base de datos
```bash
docker-compose up -d
```
6. Correr migración con prisma 
```bash
npx prisma migrate dev
```
7. Ejecutar proyecto en modo desarrollo
```bash
npm run dev
```
8. Crear la carpeta postgres_data en la raiz del proyecto para el manejo del volumen en docker-compose
```bash
mkdir postgres_data
```
## Ejecutar pruebas 

1. Para ejecutar pruebas, ejecute el siguiente comando

```bash
  npm run test:watch
```
2. Para ejecutar pruebas con coverage, ejecute el siguiente comando
```bash
  npm run test:coverage
```