    import React, { useEffect, useRef } from "react";
    import { Swiper, SwiperSlide } from "swiper/react";
    import { Pagination, Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
    import { Camera, Search, ShoppingCart, Zap, Shield, Heart } from "lucide-react";

    // Import Swiper styles
    import "swiper/css";
    import "swiper/css/pagination";
    import "swiper/css/navigation";
    import "swiper/css/effect-coverflow";

    const featuresData = [
    {
        id: 1,
        title: "Smart Medicine Search",
        description:
        "Find any medicine instantly with our AI-powered search engine. Get detailed information, pricing, and availability across multiple pharmacies.",
        icon: Search,
        category: ["Search", "AI-Powered"],
        image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center",
        color: "from-blue-500 to-cyan-400",
    },
    {
        id: 2,
        title: "Prescription Image Upload",
        description:
        "Upload your prescription image and let our OCR technology extract medicine details automatically. No more manual typing required.",
        icon: Camera,
        category: ["OCR", "Upload"],
        image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
        color: "from-green-500 to-emerald-400",
    },
    {
        id: 3,
        title: "Alternative Medicine Finder",
        description:
        "Discover cost-effective alternatives with similar compositions. Save up to 70% on your medical expenses with our smart recommendations.",
        icon: Heart,
        category: ["Alternatives", "Cost-Saving"],
        image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop&crop=center",
        color: "from-purple-500 to-pink-400",
    },
    {
        id: 4,
        title: "Direct Purchase Links",
        description:
        "Buy medicines online directly through our integrated pharmacy partners. Compare prices and get the best deals instantly.",
        icon: ShoppingCart,
        category: ["E-commerce", "Price Comparison"],
        image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&crop=center",
        color: "from-orange-500 to-red-400",
    },
    {
        id: 5,
        title: "Lightning Fast Results",
        description:
        "Get medicine information in milliseconds with our optimized NestJS backend and PostgreSQL database architecture.",
        icon: Zap,
        category: ["Performance", "Backend"],
        image:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop&crop=center",
        color: "from-yellow-500 to-orange-400",
    },
    {
        id: 6,
        title: "Secure & Reliable",
        description:
        "Your health data is protected with enterprise-grade security. Firebase authentication ensures safe and secure access.",
        icon: Shield,
        category: ["Security", "Privacy"],
        image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
        color: "from-indigo-500 to-blue-400",
    },
    ];

    const MedLinkrCarousel = () => {
    const swiperRef = useRef(null);

    const adjustMargin = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
        const screenWidth = window.innerWidth;
        let margin = 0;
        if (screenWidth >= 1024) margin = -100;
        else if (screenWidth >= 768) margin = -50;
        else margin = 0;
        swiperRef.current.swiper.wrapperEl.style.marginLeft = `${margin}px`;
        }
    };

    useEffect(() => {
        adjustMargin();
        window.addEventListener("resize", adjustMargin);
        return () => window.removeEventListener("resize", adjustMargin);
    }, []);

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-6">
                Revolutionizing{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Healthcare
                </span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                Experience the future of medicine discovery with MedLinkr's AI-powered platform. From
                prescription analysis to cost-effective alternatives, we've got you covered.
            </p>
            </div>

            <Swiper
            ref={swiperRef}
            modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
            spaceBetween={30}
            centeredSlides
            initialSlide={2}
            slideToClickedSlide
            effect="coverflow"
            coverflowEffect={{
                rotate: 15,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: true,
            }}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            navigation
            breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="medlinkr-swiper"
            onSlideChange={adjustMargin}
            >
            {featuresData.map((feature) => {
                const IconComponent = feature.icon;
                return (
                <SwiperSlide key={feature.id} className="pb-12">
                    <div className="group relative bg-white rounded-3xl shadow-xl border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    {/* Background Image */}
                    <div className="relative h-64 overflow-hidden">
                        <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-[.swiper-slide-active]:grayscale-0"
                        loading="lazy"
                        />
                        <div
                        className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-60 group-[.swiper-slide-active]:opacity-40 transition-opacity duration-500`}
                        />
                        <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                        {feature.category.map((cat, idx) => (
                            <span
                            key={idx}
                            className="px-3 py-1 text-xs font-semibold text-primary/80 bg-primary/10 rounded-full border border-primary/20 opacity-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-700"
                            style={{ animationDelay: `${idx * 100}ms` }}
                            >
                            {cat}
                            </span>
                        ))}
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-4 group-[.swiper-slide-active]:text-primary transition-colors duration-500">
                        {feature.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed mb-6 opacity-0 group-[.swiper-slide-active]:opacity-100 transform translate-y-4 group-[.swiper-slide-active]:translate-y-0 transition-all duration-700">
                        {feature.description}
                        </p>

                        <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 opacity-0 group-[.swiper-slide-active]:opacity-100 transform translate-y-4 group-[.swiper-slide-active]:translate-y-0 hover:shadow-lg hover:shadow-primary/25">
                        Learn More
                        </button>
                    </div>
                    </div>
                </SwiperSlide>
                );
            })}
            </Swiper>
        </div>

        {/* Custom Styles */}
        <style jsx global>{`
            .medlinkr-swiper .swiper-pagination {
            bottom: -10px !important;
            }
            .medlinkr-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgb(var(--muted-foreground));
            opacity: 0.3;
            transition: all 0.3s ease;
            }
            .medlinkr-swiper .swiper-pagination-bullet-active {
            background: rgb(var(--primary));
            opacity: 1;
            transform: scale(1.3);
            }
            .medlinkr-swiper .swiper-button-next,
            .medlinkr-swiper .swiper-button-prev {
            color: rgb(var(--primary));
            background: white;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            }
            .medlinkr-swiper .swiper-button-next:hover,
            .medlinkr-swiper .swiper-button-prev:hover {
            background: rgb(var(--primary));
            color: white;
            transform: scale(1.1);
            }
            .medlinkr-swiper .swiper-button-next:after,
            .medlinkr-swiper .swiper-button-prev:after {
            font-size: 16px;
            }
            @media (max-width: 768px) {
            .medlinkr-swiper .swiper-button-next,
            .medlinkr-swiper .swiper-button-prev {
                display: none;
            }
            }
        `}</style>
        </section>
    );
    };

    export default MedLinkrCarousel;
