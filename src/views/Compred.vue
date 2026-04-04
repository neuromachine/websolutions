<script setup>
// import debug from "@/components/Debug.vue";
import Header from "@/components/Header.vue";
// import CPheader from "@/components/CPheader.vue";
import CPimg from "@/components/CPimg.vue";
import CPicon from "@/components/CPicon.vue";
import WSteam from "@/components/WSteam.vue";
import Portfolio from "@/components/blocks/portfolio/index.vue"
import Footer from "@/components/Footer.vue";
import content from "@/components/blocks/services/presentation/content.vue"
import Benefits from "@/components/blocks/compred/presentation/benefits.vue";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";

import qrcode from "@/components/blocks/general/ui/qrcode.vue"

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
import {onMounted} from "vue";
const { blockStore } = usePageOrchestrator('compred', 'item', {
  fetch: (route) => route.params.slug
})

import { useUiStore } from '@/stores/uiStore';
const uiStore = useUiStore();
onMounted(() => {
   uiStore.setHeaderVars('menu', false);
});

import { chat } from '@/chat' // tidio

const openTidioChat = () => {
  chat.open()
}
</script>

<template>
<!--  <debug/>-->
  <Header/>
<!--  <CPheader />-->
  <div id="compred" v-if="blockStore.isItemReady">
    <!-- HERO -->
    <div class="home-section home-2">
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 col-md-12">
                <div class="main-banner-content">
                  <h6 class="text-gradient">{{ blockStore.item.properties.hero.pretitle }}</h6>
                  <h1>{{ blockStore.item.properties.hero.title }}<br><span class="text-gradient">{{ blockStore.item.properties.hero.focus }}</span></h1>
                  <p>{{ blockStore.item.properties.hero.paragraph }}</p>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="banner-image">
                  <CPimg :svgkey="blockStore.item.key"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-shape-animation">
        <div class="shape-1">
          <img src="/assets/img/shape/1.png" alt="shape image">
        </div>
        <div class="shape-2">
          <img src="/assets/img/shape/2.png" alt="shape image">
        </div>
        <div class="shape-3">
          <img src="/assets/img/shape/3.png" alt="shape image">
        </div>
        <div class="shape-4">
          <img src="/assets/img/shape/4.png" alt="shape image">
        </div>
        <div class="shape-5">
          <img src="/assets/img/shape/5.png" alt="shape image">
        </div>
        <div class="shape-6">
          <img src="/assets/img/shape/6.png" alt="shape image">
        </div>
        <div class="shape-7">
          <img src="/assets/img/shape/7.png" alt="shape image">
        </div>
      </div>
    </div>

    <!-- HERO
    <section v-if="blockStore.item.properties.content"  class="compred_content services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <content
                :content="blockStore.item.properties.content"
            />
          </div>
        </div>
      </div>
    </section>
-->

    <Benefits v-if="blockStore.item.properties.benefits" :data = "blockStore.item.properties.benefits" />

    <!-- About -->
    <section class="about-area bg-grey section-padding">
      <div class="container">
        <div class="row d-flex align-items-center">
          <div class="col-lg-6 col-md-12">
            <div v-if="uiStore.scope === 'ru'" class="about-content">
              <h6 class="sub-title">О нас</h6>
              <h2>Web Solution — решения с фокусом на результат</h2>
              <p class="about__text">Мы — международная digital-команда.</p>
              <p class="about__text">Создаём сайты, которые <strong>работают</strong> на рост бизнеса.</p>
              <p class="about__text">
                Фокус на удобстве пользователей, внимании к деталям и технологиях,
                которые решают задачи.
              </p>
              <p class="about__text"><em>Условия работы во Вьетнаме смотрите в конце документа.</em></p>
            </div>

            <div v-else-if="uiStore.scope === 'vi'" class="about-content">
              <h6 class="sub-title">Về chúng tôi</h6>
              <h2>Giải pháp Web — Tập trung vào kết quả thực tế</h2>
              <p class="about__text">Chúng tôi là một đội ngũ kỹ thuật số quốc tế.</p>
              <p class="about__text">Chúng tôi xây dựng các trang web giúp <strong>thúc đẩy sự tăng trưởng</strong> của doanh nghiệp.</p>
              <p class="about__text">
                Chú trọng vào trải nghiệm người dùng, sự tỉ mỉ trong chi tiết và công nghệ hiện đại để giải quyết mọi thách thức.
              </p>
              <p class="about__text">
                <small>Chi tiết về điều khoản làm việc tại Việt Nam, vui lòng xem ở cuối tài liệu này.</small>
              </p>
            </div>

            <div v-else class="about-content">
              <h6 class="sub-title">About the studio</h6>
              <h2>Results-focused web solutions</h2>
              <p class="about__text">We develop web solutions that drive business forward.</p>
              <p class="about__text">We create thoughtful websites and digital products <strong>focused on growth and user experience</strong>.</p>
              <p class="about__text">Attention to detail, technology, and design are at the core of every project.</p>
              <p class="about__text"><em>Please refer to the end of the document for terms of work in Vietnam.</em></p>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="about-image">
              <WSteam />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End About -->

    <!-- Packages -->
    <section class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">{{ blockStore.item.properties.items.pretitle }}</h6>
              <h2>{{ blockStore.item.properties.items.title }}</h2>
            </div>
          </div>
        </div>
        <div class="row align-items-stretch">
          <div class="col-lg-4 col-md-6 d-flex" v-for="item in blockStore.item.properties.items.items">
            <div class="service plan">
<!--              <div class="visual">
                <CPicon :svgkey="blockStore.item.key"/>
              </div>-->
              <div class="icon">
                <IconOffer
                    :index="item.index"
                    :properties="item"
                />
              </div>
              <div class="title">
                {{ item.name }}
              </div>
              <div v-if="item.desc" class="descr">
                {{ item.desc }}
              </div>
              <div v-if="item.discount" class="price roboto">
                {{ t('cp.packages.budget') }} <span class="sofia_bold oldprice">{{ item.price }}</span> {{ t('cp.packages.discount') }} <span class="discount">{{ item.discount }}</span>
              </div>
              <div v-else class="price w_dis roboto">
                {{ t('cp.packages.budget') }} <span class="sofia_bold">{{ item.price }}</span>
              </div>
              <div class="term roboto">
                {{ t('cp.packages.period') }} <span class="sofia_bold">{{ item.term }}</span>
              </div>
              <ul class="conditions">
                <li v-for="f in item.features" :key="f">{{ f }}</li>
              </ul>
              <div class="b_wrap">
                <a href="/pages/contacts"  @click.prevent="openTidioChat"  class="know_price">{{ t('cp.packages.button') }}</a>
                <!--                <AppLink :to="'/pages/contacts'" class="know_price">{{ t('cp.packages.button') }}</AppLink>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Packages -->

    <!-- Includes -->
    <section v-if="blockStore.item.properties.includes" class="services-section-two">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">{{ t('cp.includes.title') }}</h6>
            </div>
          </div>
        </div>
        <div class="row align-items-stretch">
          <div class="col-lg-3 col-md-6 d-flex" v-for="item in blockStore.item.properties.includes" :key="item.text">
            <div class="service">
              <div class="icon">
                <IconOffer
                    :index="item.index"
                    :properties="item"
                />
              </div>
              <div class="title">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Includes -->

    <!-- important -->
    <section v-if="blockStore.item.properties.important" class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">{{ blockStore.item.properties.important.pretitle }}</h6>
              <h2>{{ blockStore.item.properties.important.title }}</h2>
            </div>
          </div>
        </div>
        <div class="row align-items-stretch">
          <div class="col d-flex" v-for="b in blockStore.item.properties.important.items" :key="b.title">
            <div class="service">
              <div class="icon">
                <IconOffer
                    :index="b.index"
                    :properties="b"
                />
              </div>
              <div class="title">
                {{ b.title }}
              </div>
              <div class="descr" v-html="b.text"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End important -->

    <!-- reelsSystem -->
    <section v-if="blockStore.item.properties.reelsSystem" class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">{{ blockStore.item.properties.reelsSystem.pretitle }}</h6>
              <h2>{{ blockStore.item.properties.reelsSystem.title }}</h2>
            </div>
          </div>
          <div class="col-lg-3 col-md-6"  v-for="b in blockStore.item.properties.reelsSystem.items" :key="b.title">
            <div class="service">
              <div class="icon">
                <IconOffer
                    :index="b.index"
                    :properties="b"
                />
              </div>
              <div class="title">
                {{ b.title }}
              </div>
              <div class="descr">
                {{ b.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End reelsSystem -->

    <!-- extras -->
    <section v-if="blockStore.item.properties.extras" class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">{{ blockStore.item.properties.extras.pretitle }}</h6>
              <h2>{{ blockStore.item.properties.extras.title }}</h2>
            </div>
          </div>
          <div class="col-lg-3 col-md-6"  v-for="b in blockStore.item.properties.extras.items" :key="b.title">
            <div class="service">
              <div class="icon">
                <IconOffer
                    :index="b.index"
                    :properties="b"
                />
              </div>
              <div class="title">
                {{ b.title }}
              </div>
              <div class="descr">
                {{ b.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End extras -->

    <!-- acticle -->
    <section v-if="blockStore.item.properties.acticle"  class="acticle services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <content
                :content="blockStore.item.properties.acticle"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- End acticle -->

    <section v-if="blockStore.item.key === 'ivorycoast'">
      <div class="container">
        <qrcode
            url="https://www.wspro.xyz/vi/compred/ivorycoast"
            :size="150"
            foreground-color="#2c3e50"
        />
      </div>
    </section>


    <Portfolio />

  </div>
  <div v-else class="container">
    <div class="row row_load">Loading Item</div>
  </div>
  <Footer/>
</template>

<style scoped>

.service {
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: #000;
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
  width: 100%;
}
.service .icon { width: 50px; height: 50px;}
.service .title { font-size: 16px; font-weight: bold; margin: 16px 0 16px 0;}
.service .descr { font-size: 14px; line-height: 17px; color: #5F5F5F; margin: 0 0 16px 0; }

.service .roboto { font-family: Roboto, "Helvetica Neue", sans-serif; font-size: 11px; line-height: 22px; margin: 0 0 16px 0;}
.service .sofia_bold { font-family: "Sofia Sans", sans-serif; font-size: 18px; font-weight: bold; margin: 0 10px 0 10px;}
.service .conditions { padding: 0 0 0 16px; color: #5F5F5F; min-height: 220px;}
.service .conditions li { margin: 4px 0 4px 0; list-style: disc;}
.service .b_wrap {  display: flex; margin: 16px 0 0 0;}
.service .know_price { color: #00D9EA; border: solid 1px #00D9EA; border-radius: 4px; padding: 18px 14px;}
.service .know_price:hover { background-color: #00D9EA; color: #FFF; }


@media (max-width: 767px) {
  .home-section.home-2 {
    padding-top: 40px;
  }
  #compred .main-banner-content h6 { font-size: 14px;}
  #compred .home-section.home-2 .main-banner-content h1 { font-size: 38px;}
  #compred .section-title h2 { font-size: 27px;}
}

</style>