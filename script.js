// ===== DELICIA LAS BENDICIONES - SCRIPT PREMIUM =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Delicia las Bendiciones - Página cargada');

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== BOTÓN SCROLL TOP =====
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== MENÚ MÓVIL =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Marcar enlace activo
            document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ===== MODAL DE IMAGEN (PANTALLA COMPLETA) =====
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.image-modal .modal-close');
    
    // Todas las imágenes de productos y hero
    const allImages = document.querySelectorAll('.product-image, .season-image, .hero-image');
    
    allImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImage.src = img.querySelector('img').src;
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', () => {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ===== MODAL DE PEDIDO =====
    const orderModal = document.getElementById('orderModal');
    const orderProductName = document.getElementById('orderProductName');
    const confirmOrder = document.getElementById('confirmOrder');
    const cancelOrder = document.getElementById('cancelOrder');
    let currentProduct = null;
    
    function openOrderModal(product) {
        currentProduct = product;
        orderProductName.textContent = `${product.name} - ${product.price}`;
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Botones de pedido
    document.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card') || btn.closest('.season-premium')?.querySelector('.season-content');
            
            if (card) {
                const name = card.querySelector('h3')?.textContent || '';
                const price = card.querySelector('.price')?.textContent || '';
                const desc = card.querySelector('p')?.textContent || '';
                if (name) openOrderModal({ name, price, desc });
            } else if (btn.closest('.season-content')) {
                const name = btn.closest('.season-content').querySelector('h3')?.textContent || '';
                const price = btn.closest('.season-content').querySelector('.price')?.textContent || '';
                const desc = btn.closest('.season-content').querySelector('p')?.textContent || '';
                if (name) openOrderModal({ name, price, desc });
            }
        });
    });
    
    confirmOrder.addEventListener('click', () => {
        if (currentProduct) {
            const phoneNumber = '50495142103';
            const message = `🍽️ *PEDIDO - DELICIA LAS BENDICIONES* 🍽️%0A%0A📍 *Producto:* ${currentProduct.name}%0A💰 *Precio:* ${currentProduct.price}%0A📝 *Descripción:* ${currentProduct.desc}%0A%0A⏰ *¿En cuánto tiempo estará disponible?*%0A%0A¡Gracias y que Dios lo bendiga! 🙏`;
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        }
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentProduct = null;
    });
    
    cancelOrder.addEventListener('click', () => {
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentProduct = null;
    });
    
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ===== NAVEGACIÓN ACTIVA AL SCROLL =====
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 120;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // ===== ANIMACIÓN AL SCROLL =====
    const animatedElements = document.querySelectorAll('.product-card, .season-premium, .hour-card');
    
    function animateOnScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.15;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar estado inicial
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ===== SCROLL SUAVE PARA ENLACES INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 90;
                const elementPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // ===== EFECTO DE CARGA =====
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    console.log('Delicia las Bendiciones - Todas las funcionalidades activadas');
});

