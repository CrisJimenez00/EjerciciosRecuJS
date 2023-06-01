import React, { useState, useEffect } from "react";
import { Navbar, NavLink, NavbarBrand, Button, ButtonGroup } from "reactstrap";
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";

export default function MenuUsuario(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slides, setSlides] = useState([]);
  const [tiempo, setTiempo] = useState(0);

  useEffect(() => {
    props.userListarAnuncio(props.idUsuario);
  }, [props.idUsuario]);

  useEffect(() => {
    setSlides(props.listaAnuncios);
  }, [props.listaAnuncios]);

  useEffect(() => {
    if (slides.length > 0) {
      const anuncio = slides[activeIndex];
      setTiempo(anuncio.tiempo);
    }
  }, [activeIndex, slides]);

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setTimeout(next, tiempo*1000);
      console.log(tiempo);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, tiempo, slides]);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slidesContent = slides.map((anuncio, index) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={anuncio.id_anuncio}
      className={index === activeIndex ? "active" : ""}
    >
      <img src={`./src/${anuncio.imagen}`} alt={`Anuncio ${anuncio.id_anuncio}`} />
    </CarouselItem>
  ));

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">Bienvenido</NavbarBrand>
        <NavLink>
          <ButtonGroup>
            <Button
              color="danger"
              onClick={() => {
                window.location.reload();
                return props.changeMenu("LOGOUT");
              }}
            >
              LOGOUT
            </Button>
          </ButtonGroup>
        </NavLink>
      </Navbar>
      {slides.length > 0 && (
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          {slidesContent}
        </Carousel>
      )}
      {slides.length > 0 && (
        <CarouselIndicators
          items={slides}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
      )}
    </div>
  );
}

