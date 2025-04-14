import { useRef, useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [direction, setDirection] = useState("up"); // Track animation direction
  const imageContainerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const viewButtonRef = useRef(null);
  const prevHoverIndexRef = useRef(null);
  const prevActiveIndexRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "TWICE",
        description:
          "Interactive storytelling platform focusing on user experience and visual aesthetics.",
        category: "Interaction & Development",
        image: "/accordian-dennis/ss.jpeg",
      },
      {
        id: 2,
        title: "The Daniel",
        description:
          "Premium branding project combining elegant design with functional development.",
        category: "Design & Development",
        image: "/accordian-dennis/ssss.jpeg",
      },
      {
        id: 3,
        title: "FABRIC™",
        description:
          "Textile visualization platform showcasing materials in innovative digital formats.",
        category: "Design & Development",
        image: "/accordian-dennis/sssss.jpeg",
      },
    ],
    []
  );

  useEffect(() => {
    gsap.set(imageContainerRef.current, { opacity: 0, x: 0, y: 0 });
    gsap.set(viewButtonRef.current, { opacity: 0, scale: 0.8 });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX - 192;
      const y = e.clientY - 128;

      // Move image container with mouse
      gsap.to(imageContainerRef.current, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
      });

      // Move view button in opposite direction within container
      const imageContainer = imageContainerRef.current;
      const rect = imageContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (centerX - e.clientX) * 1.4;
      const offsetY = (centerY - e.clientY) * 1.4;

      gsap.to(viewButtonRef.current, {
        x: offsetX,
        y: offsetY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    if (hoverIndex !== null) {
      window.addEventListener("mousemove", handleMouseMove);

      gsap.to(imageContainerRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(viewButtonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        delay: 0.1,
        ease: "back.out(1.7)",
      });

      if (prevHoverIndexRef.current === null) {
        const img = imageWrapperRef.current.querySelector("img");
        if (img) {
          img.src = projects[hoverIndex].image;
          img.alt = projects[hoverIndex].title;
        }
      } else if (prevHoverIndexRef.current !== hoverIndex) {
        const timeline = gsap.timeline();
        const nextImage = projects[hoverIndex].image;
        const newImg = document.createElement("img");
        newImg.src = nextImage;
        newImg.alt = projects[hoverIndex].title;
        newImg.className = "w-full h-full object-cover absolute top-0 left-0";
        newImg.style.opacity = "0";

        const wrapper = imageWrapperRef.current;
        wrapper.appendChild(newImg);

        // Determine whether to roll up or down based on direction state
        const startY = direction === "up" ? "100%" : "-100%";
        const oldImgDestY = direction === "up" ? "-100%" : "100%";

        timeline
          .set(newImg, { y: startY, opacity: 0.7 })
          .to(wrapper.querySelector("img:not(:last-child)"), {
            y: oldImgDestY,
            opacity: 0.7,
            duration: 0.4,
            ease: "power3.inOut",
          })
          .to(
            newImg,
            {
              y: "0%",
              opacity: 1,
              duration: 0.6,
              ease: "power3.inOut",
              onComplete: () => {
                const images = wrapper.querySelectorAll("img");
                for (let i = 0; i < images.length - 1; i++) {
                  wrapper.removeChild(images[i]);
                }
              },
            },
            "-=0.4"
          );
      }
    } else {
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      gsap.to(viewButtonRef.current, {
        opacity: 0,
        scale: 0.8,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      window.removeEventListener("mousemove", handleMouseMove);
    }

    prevHoverIndexRef.current = hoverIndex;

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoverIndex, projects, direction]);

  // Track accordion changes and set direction
  useEffect(() => {
    if (prevActiveIndexRef.current !== null && activeIndex !== null) {
      // If moving to a higher index, use "up" animation, else "down"
      setDirection(activeIndex > prevActiveIndexRef.current ? "down" : "up");
    } else if (activeIndex !== null && prevActiveIndexRef.current === null) {
      // Opening an accordion, default to up
      setDirection("up");
    } else if (activeIndex === null && prevActiveIndexRef.current !== null) {
      // Closing an accordion, default to down
      setDirection("down");
    }

    prevActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  const handleItemClick = (index) => {
    // If clicking the active index, we're closing it
    if (activeIndex === index) {
      setDirection("down");
    } else {
      // If opening or changing, set direction based on index comparison
      setDirection(activeIndex === null || index > activeIndex ? "up" : "down");
    }

    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMouseEnter = (index) => {
    // Also update direction based on hover changes
    if (prevHoverIndexRef.current !== null) {
      setDirection(index > prevHoverIndexRef.current ? "up" : "down");
    }
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleViewButtonHover = () => {
    gsap.to(viewButtonRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleViewButtonLeave = () => {
    gsap.to(viewButtonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl relative">
      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-8">
        RECENT WORK
      </h3>

      {/* Floating Image Container (follows mouse) */}
      <div
        ref={imageContainerRef}
        className="fixed pointer-events-none w-96 h-64 bg-stone-900 overflow-hidden rounded-lg shadow-2xl z-50"
        style={{ top: 0, left: 0 }}
      >
        <div
          ref={imageWrapperRef}
          className="w-full h-full overflow-hidden relative"
        >
          <img
            src={projects[0].image}
            alt={projects[0].title}
            className="w-full h-full object-cover absolute"
          />
        </div>

        {/* View Button */}
        <div
          ref={viewButtonRef}
          className="absolute top-1/2 left-1/2 bg-blue-600 text-white rounded-full w-20 h-20 flex justify-center items-center cursor-pointer shadow-lg"
          style={{ transform: "translate(-50%, -50%)" }}
          onMouseEnter={handleViewButtonHover}
          onMouseLeave={handleViewButtonLeave}
        >
          View
        </div>
      </div>

      {/* Accordion Items */}
      <div className="accordion">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`accordion-item py-8 border-t ${
              index === projects.length - 1 ? "border-b" : ""
            } border-gray-300 cursor-pointer`}
            onClick={() => handleItemClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex justify-between items-center">
              <h2
                className={`text-5xl font-extralight transition-colors duration-300 ${
                  activeIndex === index || hoverIndex === index
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >
                {project.title}
              </h2>
              <span className="text-sm text-gray-500">{project.category}</span>
            </div>

            <div
              className="accordion-content overflow-hidden"
              style={{
                height: activeIndex === index ? "auto" : "0",
                opacity: activeIndex === index ? 1 : 0,
                transition: "height 0.4s ease-in-out, opacity 0.3s ease-in-out",
                marginTop: activeIndex === index ? "1.5rem" : "0",
              }}
            >
              <p className="text-gray-700 max-w-2xl">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
