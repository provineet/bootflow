// our module goes here...

const homeSlider = (function () {
  let run = ($, className) => {
    $(function () {
      $(className).owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 5,
          },
        },
      });
    });
  };

  return { run };
})();

export default homeSlider;
