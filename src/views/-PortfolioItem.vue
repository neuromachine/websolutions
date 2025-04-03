<script setup>
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import sourceData from '@/data.json'


</script>

<template>
  <Header />
  <PageTitle title="О работе" />

  <div>{{$route.params.slug}} {{sourceData}}</div>

  <!-- Start Portfolio Details Section -->
  <section class="portfolio-details-area ptb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <div class="portfolio-details-image">
            <img src="/assets/img/portfolio/work_1_1.png" alt="image">
          </div>
        </div>
        <div class="col-lg-12 col-md-12">
          <div class="portfolios-details-desc">
            <h3>Our Mission is to Establish Healthy Work Relationships</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea commodo consequat.</p>
            <div class="features-text">
              <h4>We work to Create a Better way</h4>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
            <div class="portfolio-details-info">
              <div class="single-info-box">
                <h4>Author</h4>
                <span>Jessica Smith</span>
              </div>
              <div class="single-info-box">
                <h4>Category</h4>
                <span>Virtual, Technology</span>
              </div>
              <div class="single-info-box">
                <h4>Date</h4>
                <span>June 20, 2024</span>
              </div>
              <div class="single-info-box">
                <h4>Share</h4>
                <ul class="social">
                  <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
                  <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                </ul>
              </div>
              <div class="single-info-box">
                <h4>Works Preview</h4>
                <a href="#" class="default-btn">Live Preview <span></span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Portfolio Details Section -->
</template>

<style scoped>

</style>