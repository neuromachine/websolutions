<script setup>

</script>

<template>
  <!-- Start Portfolio Section -->
  <section class="portfolio-area section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">Последние работы</h6>
            <h2>Наше портфолио</h2>
          </div>
        </div>
        <div class="col-md-12">
          <div class="portfolio-list">
            <ul class="nav" id="portfolio-flters">
              <li class="filter filter-active" data-filter=".all">Все</li>
              <li class="filter" data-filter=".dev">Разработка</li>
              <li class="filter" data-filter=".branding">Брендинг</li>
              <li class="filter" data-filter=".application">SMM</li>
              <li class="filter" data-filter=".photography">Продвижение</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="portfolio-container">
        <div class="row">
          <!-- portfolio-item -->
          <div class="col-lg-4 col-md-6 portfolio-grid-item all dev">
            <div class="portfolio-item">
              <img src="/assets/img/portfolio/thumb_1.jpg" alt="image">
              <div class="portfolio-content-overlay">
                <p>Разработка | Сопровождение</p>
                <h3><a href="single-portfolio.html">Магазин мебели "Авто-кроватка"</a></h3>
                <a class="portfolio-link-icon" href="/portfolio_car.html"><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <!-- portfolio-item -->
          <div class="col-lg-4 col-md-6 portfolio-grid-item all photography">
            <div class="portfolio-item">
              <img src="/assets/img/portfolio/portfolio-2.jpg" alt="image">
              <div class="portfolio-content-overlay">
                <p>App Store | Social Media</p>
                <h3><a href="single-portfolio.html">Creative Web Design</a></h3>
                <a class="portfolio-link-icon" href="single-portfolio.html"><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <!-- portfolio-item -->
          <div class="col-lg-4 col-md-6 portfolio-grid-item all branding webdesign">
            <div class="portfolio-item">
              <img src="/assets/img/portfolio/portfolio-3.jpg" alt="image">
              <div class="portfolio-content-overlay">
                <p>App Store | Social Media</p>
                <h3><a href="single-portfolio.html">Creative Web Design</a></h3>
                <a class="portfolio-link-icon" href="single-portfolio.html"><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <!-- portfolio-item -->
          <div class="col-lg-4 col-md-6 portfolio-grid-item all webdesign">
            <div class="portfolio-item">
              <img src="/assets/img/portfolio/portfolio-4.jpg" alt="image">
              <div class="portfolio-content-overlay">
                <p>App Store | Social Media</p>
                <h3><a href="single-portfolio.html">Creative Web Design</a></h3>
                <a class="portfolio-link-icon" href="single-portfolio.html"><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <!-- portfolio-item -->
          <div class="col-lg-4 col-md-6 portfolio-grid-item all application">
            <div class="portfolio-item">
              <img src="/assets/img/portfolio/portfolio-5.jpg" alt="image">
              <div class="portfolio-content-overlay">
                <p>App Store | Social Media</p>
                <h3><a href="single-portfolio.html">Creative Web Design</a></h3>
                <a class="portfolio-link-icon" href="single-portfolio.html"><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <!-- portfolio-item -->
          <div class="col-lg-4 col-md-6 portfolio-grid-item all application photography">
            <div class="portfolio-item">
              <img src="/assets/img/portfolio/portfolio-6.jpg" alt="image">
              <div class="portfolio-content-overlay">
                <p>App Store | Social Media</p>
                <h3><a href="single-portfolio.html">Creative Web Design</a></h3>
                <a class="portfolio-link-icon" href="single-portfolio.html"><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Portfolio Section -->
</template>

<style scoped>

</style>