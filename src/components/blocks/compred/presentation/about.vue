<script setup>
import WSteam from "@/components/WSteam.vue";

const props = defineProps({
  scope: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="about-area bg-grey section-padding">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-lg-6 col-md-12">
          <div v-if="props.scope === 'ru'" class="about-content">
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

          <div v-else-if="props.scope === 'vi'" class="about-content">
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
</template>

<style scoped>
</style>
