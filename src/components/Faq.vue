<script setup>
import $ from 'jquery'
import {onMounted} from "vue"
onMounted( () => {
  $('.accordion').find('.accordion-title').on('click', function(){
    // Adds Active Class
    $(this).toggleClass('active');
    // Expand or Collapse This Panel
    $(this).next().slideToggle('slow');
    // Hide The Other Panels
    $('.accordion-content').not($(this).next()).slideUp('slow');
    // Removes Active Class From Other Titles
    $('.accordion-title').not($(this)).removeClass('active');
  });
})

</script>

<template>
  <!-- Start Faq Section -->
  <section class="faq-section home-faq bg-grey section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-12">
          <div class="faq-img">
            <img src="/assets/img/faq.png" alt="images">
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="section-title">
            <h6 class="sub-title">Вопросы</h6>
            <h2>Ответы</h2>
          </div>
          <div class="faq-accordion first-faq-box">
            <ul class="accordion">
              <li class="accordion-item">
                <a class="accordion-title" href="javascript:void(0)"> <i class="fa fa-plus"></i> У конкурентов дешевле, почему?</a>
                <p class="accordion-content">При выполнении услуг - строим производственные цепочки с упором на качество! Не умеем и не стремимся удерешвлять нашу работу, ниже определенного порога</p>
              </li>
              <li class="accordion-item">
                <a class="accordion-title" href="javascript:void(0)"> <i class="fa fa-plus"></i> Возможно снизить цену?</a>
                <p class="accordion-content">Мы стремимся обеспечить гибкий подход к клиенту, в определенных случаях мы можем договорится о поэтамном подходе в реализации проекта</p>
              </li>
              <li class="accordion-item">
                <a class="accordion-title" href="javascript:void(0)"> <i class="fa fa-plus"></i> Сколько стоит интернет магазин?</a>
                <p class="accordion-content">Минимальная цена проекта реализующего "цепочку on-line продаж" - 500$, в данном случае мы предложем ряд условий, обеспечивающих понижение издержек на таких этапах как: разработка дизайн макета, а так же введем упрощенную систему заказа. Советуем закладывать бюджет подобного проекта от 1k $</p>
              </li>
              <li class="accordion-item">
                <a class="accordion-title" href="javascript:void(0)"> <i class="fa fa-plus"></i> Вы занимаетесь продвижением бизнеса локализированного не в РФ</a>
                <p class="accordion-content">Наша квалификация позволяет выпонять услуги всюду, конечно в ряде случаев необходимо заложить издержки на переводчика и юриста, однако на базовом уровне можно обойтись средствами GPT</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Faq Section -->
</template>

<style scoped>

</style>