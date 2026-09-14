const productos = [
  {
    id: "JM001",
    nombre: "Catan",
    categoria: "Juegos de Mesa",
    precio: 29990,
    descripcion: "Clásico juego de estrategia donde compites por colonizar la isla.",
    imagen: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "JM002",
    nombre: "Carcassonne",
    categoria: "Juegos de Mesa",
    precio: 24990,
    descripcion: "Juego de colocación de fichas y estrategia medieval.",
    imagen: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "AC001",
    nombre: "Controlador Inalámbrico Xbox Series X",
    categoria: "Accesorios",
    precio: 59990,
    descripcion: "Botones mapeables y respuesta táctil mejorada.",
    imagen: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "AC002",
    nombre: "Audífonos Gamer Headset",
    categoria: "Accesorios",
    precio: 34990,
    descripcion: "Sonido envolvente con micrófono omnidireccional.",
    imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CO001",
    nombre: "Consola Next-Gen 1TB",
    categoria: "Consolas",
    precio: 499990,
    descripcion: "Rendimiento de última generación.",
    imagen: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CG001",
    nombre: "PC Gamer RTX 4060",
    categoria: "Computadores Gamers",
    precio: 899990,
    descripcion: "Procesador de alto rendimiento para jugar en Ultra.",
    imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "SG001",
    nombre: "Silla Gamer Ergonómica",
    categoria: "Sillas Gamers",
    precio: 129990,
    descripcion: "Soporte lumbar ajustable y reclinación de 180°.",
    imagen: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MS001",
    nombre: "Mouse Óptico 16000 DPI",
    categoria: "Mouse",
    precio: 19990,
    descripcion: "Sensor de alta precisión y luces RGB.",
    imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MP001",
    nombre: "Mousepad Extra Large RGB",
    categoria: "Mousepad",
    precio: 14990,
    descripcion: "Superficie de tela con bordes iluminados.",
    imagen: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "PG001",
    nombre: "Polera Gamer Logo Neon",
    categoria: "Poleras Personalizadas",
    precio: 12990,
    descripcion: "100% algodón con estampado duradero.",
    imagen: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "PP001",
    nombre: "Polerón Gamer Level-Up",
    categoria: "Polerones Gamers Personalizados",
    precio: 24990,
    descripcion: "Polerón con capucha y bolsillo frontal.",
    imagen: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ST001",
    nombre: "Mantenimiento y Limpieza PC",
    categoria: "Servicio Técnico",
    precio: 20000,
    descripcion: "Limpieza profunda y cambio de pasta térmica.",
    imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80"
  }
];