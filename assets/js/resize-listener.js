window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(function () {
    divider = window.innerHeight / 2;
  }, 100);
});
