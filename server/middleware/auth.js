// Middleware = una función que corre ANTES de tu ruta y decide si la deja pasar.

// Solo deja pasar a estudiantes que hicieron login (el login guarda su id en la sesión del servidor).
function requireAuth(req, res, next) {
  if (!req.session.studentId) {
    return res.status(401).json({ error: 'Inicia sesión primero' });
  }
  next();
}

// Para rutas de administración (crear/editar/borrar oportunidades).
// Requiere el header x-admin-key igual a ADMIN_KEY (variable de entorno).
// Si ADMIN_KEY no está configurada, nadie pasa: cerrado por defecto.
function requireAdmin(req, res, next) {
  const key = process.env.ADMIN_KEY;
  if (!key || req.get('x-admin-key') !== key) {
    return res.status(403).json({ error: 'Solo administradores' });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
