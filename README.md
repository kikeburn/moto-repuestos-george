# 🏍 Moto Repuestos George — Sistema de Gestión

Sistema de gestión empresarial para venta de repuestos de motocicletas.
**RUC:** 1-32-422

---

## 📦 Módulos

| Módulo | Descripción |
|--------|-------------|
| 🏠 Inicio | Panel con resumen diario: ventas, gastos, utilidad y stock bajo |
| 📦 Inventario | CRUD de productos con código, nombre, cantidad, costos y precios |
| 🛒 Ventas | Registro de ventas, ajuste de precios, facturas PDF y envío por WhatsApp |
| 📤 Gastos | Registro de gastos por categoría, fecha y observaciones |
| 📊 Reportes | Reportes diarios, semanales y mensuales con exportación PDF |

---

## 🚀 Instalación local

### Requisitos
- Node.js 18 o superior → [descargar aquí](https://nodejs.org)
- Git → [descargar aquí](https://git-scm.com)

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/TU_USUARIO/moto-repuestos-george.git
cd moto-repuestos-george

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:5173`

---

## 🌐 Publicar en GitHub Pages (gratis)

### Paso 1 — Crear el repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `moto-repuestos-george` (exactamente igual al `base` en `vite.config.js`)
3. Déjalo **Público**
4. **No** inicialices con README (ya tienes uno)
5. Clic en **Create repository**

### Paso 2 — Subir el código

```bash
git init
git add .
git commit -m "Primer commit: Sistema Moto Repuestos George"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/moto-repuestos-george.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages

1. En tu repositorio, ve a **Settings** → **Pages**
2. En **Source** selecciona **GitHub Actions**
3. ¡Listo! El flujo de trabajo se ejecutará automáticamente

### Paso 4 — Acceder a tu app

Después de 1-2 minutos tu aplicación estará disponible en:
```
https://TU_USUARIO.github.io/moto-repuestos-george/
```

---

## ⚙️ Cambiar nombre del repositorio

Si usas un nombre diferente para el repositorio, actualiza `vite.config.js`:

```js
base: '/NOMBRE_DE_TU_REPOSITORIO/',
```

---

## 🔄 Actualizar la app

Cada vez que hagas cambios y los subas a GitHub, la app se actualiza automáticamente:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## 💾 Almacenamiento

Los datos se guardan en el **localStorage** del navegador. Esto significa:
- Los datos persisten aunque cierres el navegador
- Son específicos del dispositivo/navegador
- Para backup, usa el módulo de Reportes → PDF

---

## 📱 Uso en móvil

La app es responsive. Puedes acceder desde el celular usando la URL de GitHub Pages.

---

## 🛠️ Tecnologías

- **React 18** — Interfaz de usuario
- **Vite 5** — Bundler y servidor de desarrollo
- **GitHub Actions** — Despliegue automático
- **GitHub Pages** — Hosting gratuito

---

*Desarrollado para Moto Repuestos George · RUC 1-32-422*
