document.addEventListener('DOMContentLoaded', function () {

    // ═══════════════════════════════════════════════════════════════
    //  ÉCLAT — THE BLACK VAULT — Interactive Engine
    // ═══════════════════════════════════════════════════════════════

    // ─── PRELOADER ───
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function () {
        setTimeout(() => {
            document.body.classList.add('loaded');
            // Start scroll reveals after preloader fades
            setTimeout(initScrollReveal, 600);
        }, 2800);
    });

    // ─── CUSTOM CURSOR ───
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Cursor states
        const hoverTargets = document.querySelectorAll('a, button, .magnetic, .collection-card, .product-card, .location-card, input, .close-vip, .close-cart');
        const textTargets = document.querySelectorAll('input, textarea');

        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        textTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.remove('cursor-hover');
                document.body.classList.add('cursor-text');
            });
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-text'));
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        });
    }

    // ─── MAGNETIC BUTTONS ───
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        btn.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.1s ease-out';
        });
    });

    // ─── HEADER SCROLL EFFECT ───
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ─── MOBILE MENU ───
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        mobileMenuBtn.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });

    // ─── SEARCH TOGGLE ───
    const searchBtn = document.getElementById('searchBtn');
    const searchBar = document.getElementById('searchBar');

    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
        if (searchBar.style.display === 'block') {
            searchBar.querySelector('input').focus();
        }
    });

    // ─── VIP MODAL ───
    const vipModal = document.querySelector('.vip-modal');
    const closeVip = document.querySelector('.close-vip');
    const accountBtn = document.getElementById('accountBtn');

    accountBtn.addEventListener('click', function (e) {
        e.preventDefault();
        vipModal.style.display = 'flex';
        document.body.classList.add('no-scroll');
    });

    closeVip.addEventListener('click', function () {
        vipModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    });

    window.addEventListener('click', function (e) {
        if (e.target === vipModal) {
            vipModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });

    // ─── CART SIDEBAR ───
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.querySelector('.close-cart');

    cartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.classList.add('no-scroll');
    });

    function closeCartPanel() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }

    closeCart.addEventListener('click', closeCartPanel);
    cartOverlay.addEventListener('click', closeCartPanel);

    // ─── HERO SLIDER ───
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrev = document.querySelector('.hero-prev');
    const heroNext = document.querySelector('.hero-next');
    const heroCurrentEl = document.querySelector('.hero-current');
    let currentHeroSlide = 0;

    function showHeroSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[index].classList.add('active');
        currentHeroSlide = index;
        heroCurrentEl.textContent = String(index + 1).padStart(2, '0');
    }

    heroPrev.addEventListener('click', function () {
        let newIndex = currentHeroSlide - 1;
        if (newIndex < 0) newIndex = heroSlides.length - 1;
        showHeroSlide(newIndex);
    });

    heroNext.addEventListener('click', function () {
        let newIndex = currentHeroSlide + 1;
        if (newIndex >= heroSlides.length) newIndex = 0;
        showHeroSlide(newIndex);
    });

    // Auto-advance hero
    let heroInterval = setInterval(() => {
        let newIndex = currentHeroSlide + 1;
        if (newIndex >= heroSlides.length) newIndex = 0;
        showHeroSlide(newIndex);
    }, 7000);

    const heroSlideshow = document.querySelector('.hero-slideshow');
    heroSlideshow.addEventListener('mouseenter', () => clearInterval(heroInterval));
    heroSlideshow.addEventListener('mouseleave', () => {
        heroInterval = setInterval(() => {
            let newIndex = currentHeroSlide + 1;
            if (newIndex >= heroSlides.length) newIndex = 0;
            showHeroSlide(newIndex);
        }, 7000);
    });

    // ─── HORIZONTAL SCROLL (Collections) ───
    const scrollWrapper = document.querySelector('.collections-horizontal-wrapper');
    const scrollProgressBar = document.getElementById('scrollProgressBar');

    if (scrollWrapper) {
        let isDown = false;
        let startX, scrollLeft;

        scrollWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollWrapper.style.cursor = 'grabbing';
            startX = e.pageX - scrollWrapper.offsetLeft;
            scrollLeft = scrollWrapper.scrollLeft;
        });

        scrollWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            scrollWrapper.style.cursor = 'grab';
        });

        scrollWrapper.addEventListener('mouseup', () => {
            isDown = false;
            scrollWrapper.style.cursor = 'grab';
        });

        scrollWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollWrapper.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollWrapper.scrollLeft = scrollLeft - walk;
        });

        // Scroll progress bar
        scrollWrapper.addEventListener('scroll', () => {
            const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
            const progress = (scrollWrapper.scrollLeft / maxScroll) * 100;
            scrollProgressBar.style.width = progress + '%';
        });
    }

    // ─── PRODUCT DATA ───
    const products = [
        {
            id: 1,
            name: "Silk Evening Gown",
            description: "Hand-beaded with Swarovski crystals",
            price: 8950,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
            badge: "NEW"
        },
        {
            id: 2,
            name: "Signature Leather Tote",
            description: "Handcrafted Italian leather with gold hardware",
            price: 4200,
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
            badge: "BESTSELLER"
        },
        {
            id: 3,
            name: "Cashmere Winter Coat",
            description: "100% Mongolian cashmere, hand-finished",
            price: 12500,
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"
        },
        {
            id: 4,
            name: "Diamond Drop Earrings",
            description: "5ct total weight, G color, VS clarity",
            price: 65000,
            image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80",
            badge: "LIMITED"
        },
        {
            id: 5,
            name: "Bespoke Tailored Suit",
            description: "Super 150s wool, hand-stitched details",
            price: 12000,
            image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&q=80"
        },
        {
            id: 6,
            name: "Alligator Briefcase",
            description: "Handcrafted from premium alligator hide",
            price: 18500,
            image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
            badge: "NEW"
        },
        {
            id: 7,
            name: "South Sea Pearl Necklace",
            description: "Rare pearls with diamond clasp",
            price: 32000,
            image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80"
        },
        {
            id: 8,
            name: "Tourbillon Timepiece",
            description: "Limited edition, platinum case",
            price: 285000,
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
            badge: "ONE OF ONE"
        }
    ];

    // ─── PRODUCTS SLIDER ───
    const productsContainer = document.getElementById('productsContainer');
    const sliderDots = document.getElementById('sliderDots');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    let currentProductSlide = 0;
    const productsPerSlide = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : 2;
    const totalProductSlides = Math.ceil(products.length / productsPerSlide);

    products.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="price">$${product.price.toLocaleString()}</span>
                    <a href="#" class="btn magnetic" data-id="${product.id}">ADD TO BAG</a>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });

    for (let i = 0; i < totalProductSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showProductSlide(i));
        sliderDots.appendChild(dot);
    }

    function showProductSlide(index) {
        const cardWidth = productsContainer.children[0].offsetWidth + 30; // card + gap
        const offset = -index * productsPerSlide * cardWidth;
        productsContainer.style.transform = `translateX(${offset}px)`;

        document.querySelectorAll('.slider-dots .slider-dot').forEach(d => d.classList.remove('active'));
        if (sliderDots.children[index]) sliderDots.children[index].classList.add('active');
        currentProductSlide = index;
    }

    sliderPrev.addEventListener('click', function () {
        let newIndex = currentProductSlide - 1;
        if (newIndex < 0) newIndex = totalProductSlides - 1;
        showProductSlide(newIndex);
    });

    sliderNext.addEventListener('click', function () {
        let newIndex = currentProductSlide + 1;
        if (newIndex >= totalProductSlides) newIndex = 0;
        showProductSlide(newIndex);
    });

    setInterval(() => {
        let newIndex = currentProductSlide + 1;
        if (newIndex >= totalProductSlides) newIndex = 0;
        showProductSlide(newIndex);
    }, 9000);

    // ─── TESTIMONIALS ───
    const testimonials = [
        {
            text: "Wearing Éclat is like wearing a masterpiece. The craftsmanship is unparalleled, and I always receive compliments whenever I wear their pieces.",
            author: "ELEANOR VAN DER WOODSEN",
            role: "Socialite & Philanthropist"
        },
        {
            text: "As someone who appreciates fine watchmaking, the Éclat timepiece collection exceeds all expectations. The attention to detail is extraordinary.",
            author: "JAMES ROTHESMERE",
            role: "CEO, Rothesmere Holdings"
        },
        {
            text: "The Éclat atelier understands true luxury. Their couture pieces are investments that transcend seasons and trends.",
            author: "LADY VICTORIA CHAMBERLAIN",
            role: "Fashion Editor, Vogue"
        },
        {
            text: "My Éclat handbag has been with me for a decade and still looks impeccable. That's the mark of true quality craftsmanship.",
            author: "MARGUERITE DE LA ROCHE",
            role: "Art Collector"
        },
        {
            text: "The VIP experience at Éclat is unmatched. They remember every detail and make you feel like the only client that matters.",
            author: "SERGEI PETROV",
            role: "Tech Entrepreneur"
        }
    ];

    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const testimonialDots = document.getElementById('testimonialDots');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonialSlide = 0;

    testimonials.forEach((t, i) => {
        const slide = document.createElement('div');
        slide.className = 'testimonial';
        slide.innerHTML = `
            <p class="testimonial-text">${t.text}</p>
            <p class="testimonial-author">${t.author}</p>
            <p class="testimonial-role">${t.role}</p>
        `;
        testimonialsContainer.appendChild(slide);
    });

    testimonials.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonialSlide(i));
        testimonialDots.appendChild(dot);
    });

    function showTestimonialSlide(index) {
        testimonialsContainer.style.transform = `translateX(${-index * 100}%)`;
        document.querySelectorAll('.testimonial-dots .testimonial-dot').forEach(d => d.classList.remove('active'));
        if (testimonialDots.children[index]) testimonialDots.children[index].classList.add('active');
        currentTestimonialSlide = index;
    }

    testimonialPrev.addEventListener('click', function () {
        let i = currentTestimonialSlide - 1;
        if (i < 0) i = testimonials.length - 1;
        showTestimonialSlide(i);
    });

    testimonialNext.addEventListener('click', function () {
        let i = currentTestimonialSlide + 1;
        if (i >= testimonials.length) i = 0;
        showTestimonialSlide(i);
    });

    setInterval(() => {
        let i = currentTestimonialSlide + 1;
        if (i >= testimonials.length) i = 0;
        showTestimonialSlide(i);
    }, 10000);

    // ─── SHOPPING CART ───
    let cart = [];
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn') && e.target.hasAttribute('data-id')) {
            e.preventDefault();
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }

            updateCart();
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('open');
            document.body.classList.add('no-scroll');
        }

        if (e.target.classList.contains('cart-item-remove')) {
            e.preventDefault();
            const itemId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }
    });

    function updateCart() {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your selections will appear here</p>';
        } else {
            cart.forEach(item => {
                const el = document.createElement('div');
                el.className = 'cart-item';
                el.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toLocaleString()} × ${item.quantity}</p>
                        <a href="#" class="cart-item-remove" data-id="${item.id}">Remove</a>
                    </div>
                `;
                cartItems.appendChild(el);
            });
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toLocaleString()}`;
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
    }

    // ─── FORMS ───
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const vip = document.getElementById('vipOptIn').checked;
        console.log('Newsletter:', email, 'VIP:', vip);
        alert('Welcome to the world of Éclat. You will now receive our most exclusive communications.');
        this.reset();
    });

    const vipForm = document.getElementById('vipForm');
    vipForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you. A personal liaison from the Éclat maison will contact you shortly to arrange your private consultation.');
        this.reset();
        vipModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    });

    // ─── SCROLL REVEAL (IntersectionObserver) ───
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('[data-scroll-reveal]');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered reveal for sibling elements
                    const siblings = entry.target.parentElement.querySelectorAll('[data-scroll-reveal]');
                    let delay = 0;
                    siblings.forEach((sib, i) => {
                        if (sib === entry.target) delay = i * 0.1;
                    });
                    entry.target.style.transitionDelay = delay + 's';
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // Fallback: start reveals if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(initScrollReveal, 3200);
    }

    // Initialize cart display
    updateCart();
});
