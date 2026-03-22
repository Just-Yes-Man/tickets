CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE modelos_producto (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(80) NOT NULL UNIQUE,
  qr VARCHAR(120) NOT NULL UNIQUE,
  peso_esperado INT NOT NULL,
  color_esperado VARCHAR(40) NOT NULL,
  altura_esperada INT NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_modelos_tipo ON modelos_producto(tipo);
CREATE INDEX idx_modelos_qr ON modelos_producto(qr);

CREATE TABLE monitores_proceso (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  canal VARCHAR(30) NOT NULL DEFAULT '1',
  activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
