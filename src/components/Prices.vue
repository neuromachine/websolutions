<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true
  },
})

onMounted(() => {
  document.querySelectorAll('.scroll').forEach(a =>
      a.onclick = e => (e.preventDefault(), document.querySelector(`a[name="${a.getAttribute('href').slice(1)}"]`).scrollIntoView({ behavior: 'smooth' }))
  )
})
</script>

<template>
  <!-- Start Pricing Section -->
  <section v-if="!props.slug" class="price-area pt-100 pb-70">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">Востребованные пакеты</h6>
            <h2>Наши предложения</h2>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-pricing-content">
            <div class="price-tag">
              <h3>Лендинг "Старт"</h3>
            </div>
            <div class="price-heading">
              <div class="price-usd">
                <h2>₽ 35.000<span class="price-small-text">Быстрый запуск для продаж</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>Одностраничный сайт (Landing Page)</li>
                <li>Адаптивный дизайн для мобильных устройств</li>
                <li>Форма обратной связи</li>
                <li>Подключение базовой аналитики (Яндекс.Метрика/Google Analytics)</li>
                <li>Установка и настройка домена/хостинга</li>
                <li>Базовая SEO-оптимизация</li>
                <li class="offer-list-none"><del>Система управления контентом (CMS)</del></li>
                <li class="offer-list-none"><del>Интеграции с CRM/бронированием</del></li>
                <li class="offer-list-none"><del>Многостраничная структура</del></li>
              </ul>
            </div>
            <div class="price-btn">
              <a href="https://t.me/Lola_06" target="_blank" class="price-btn-one">Подробнее</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-pricing-content">
            <div class="price-tag">
              <h3>Корпоративный "Оптимум"</h3>
            </div>
            <div class="price-heading">
              <div class="price-usd">
                <h2>₽ 85.000<span class="price-small-text">Полноценный сайт для бизнеса</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>Многостраничный сайт (до 10 страниц)</li>
                <li>Система управления контентом (CMS)</li>
                <li>Адаптивный дизайн для мобильных устройств</li>
                <li>Форма обратной связи и интерактивная карта</li>
                <li>Подключение расширенной аналитики</li>
                <li>Расширенная SEO-структура</li>
                <li>Выбор 1 дополнительного модуля (например, блог, новости, фотогалерея)</li>
                <li class="offer-list-none"><del>Онлайн-оплата или личный кабинет</del></li>
                <li class="offer-list-none"><del>Продвинутый каталог товаров/услуг</del></li>
              </ul>
            </div>
            <div class="price-btn">
              <a href="https://t.me/Lola_06" target="_blank" class="price-btn-one">Подробнее</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-pricing-content">
            <div class="price-tag">
              <h3>Каталог "Профи"</h3>
            </div>
            <div class="price-heading">
              <div class="price-usd">
                <h2>₽ 110.000<span class="price-small-text">Сайт с каталогом и CRM</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>Полноценный сайт с каталогом (до 15 шаблонов страниц)</li>
                <li>Система управления контентом (CMS) с расширенными возможностями</li>
                <li>Адаптивный дизайн для мобильных устройств</li>
                <li>Продвинутый каталог с фильтрами и поиском</li>
                <li>Интеграция с CRM-системой</li>
                <li>Онлайн-бронирование или корзина/оплата</li>
                <li>Расширенная форма заявки и интерактивная карта</li>
                <li>Полная SEO-оптимизация</li>
                <li><i>Возможность добавления личного кабинета (опционально)</i></li>
              </ul>
            </div>
            <div class="price-btn">
              <a href="https://t.me/Lola_06" target="_blank" class="price-btn-one">Подробнее</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-else-if="props.slug === 'agora'" class="price-area pt-100 pb-70">
    <div class="container">
      <div class="row">
        <!-- Section Title -->
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">Предлагаем</h6>
            <h2>Наши решения для AGORA</h2>
          </div>
        </div>

        <!-- Pricing Section -->
        <div class="row">
          <!-- Промо страница -->
          <div class="package col-lg-4 col-md-6">
            <div class="single-pricing-content">
              <div class="price-tag">
                <h3>11 000 ฿</h3>
              </div>
              <div class="head">
                <div class="title">Промо<br>страница</div>
                <div class="discount discount_hi">- 30%</div>
              </div>
              <div class="descr">Стартовое решение за 3 недели</div>

              <div class="price-body">
                <ul>
                  <li>До 10 информационных блоков</li>
                  <li>Форма заявки</li>
                  <li>Карусель объектов</li>
                </ul>
              </div>
              <div class="oldprice"><span>฿</span>16000</div>
              <div class="price-btn">
                <a href="#first" class="scroll price-btn-one">Подробнее</a>
              </div>
            </div>
          </div>

          <!-- Каталог объектов -->
          <div class="package col-lg-4 col-md-6">
            <div class="single-pricing-content">

              <div class="price-tag">
                <h3>27 000 ฿</h3>
              </div>
              <div class="head">
                <div class="title">Каталог<br>объектов</div>
                <div class="discount">- 20%</div>
              </div>
              <div class="descr">Полноценный сайт за 1.5 месяца</div>

              <div class="price-body">
                <ul>
                  <li>Отдельные страницы каждого объекта</li>
                  <li>Параметрический поиск</li>
                  <li>Система управления контентом (CMS)</li>
                </ul>
              </div>
              <div class="oldprice"><span>฿</span>34000</div>
              <div class="price-btn">
                <a href="#second" class="scroll price-btn-one">Подробнее</a>
              </div>
            </div>
          </div>

          <!-- Инструмент продаж -->
          <div class="package col-lg-4 col-md-6">
            <div class="single-pricing-content">

              <div class="price-tag">
                <h3>47 000 ฿</h3>
              </div>
              <div class="head">
                <div class="title">Инструмент<br>продаж</div>
                <div class="discount">- 10%</div>
              </div>
              <div class="descr">2 мес + 1 мес тестирования</div>

              <div class="price-body">
                <ul>
                  <li>Индивидуальный дизайн</li>
                  <li>Глубокая фильтрация объектов</li>
                  <li>Интерактивная карта</li>
                  <li>Автоматический импорт с внешних ресурсов</li>
                </ul>
              </div>
              <div class="oldprice"><span>฿</span>52000</div>
              <div class="price-btn">
                <a href="#third" class="scroll price-btn-one">Подробнее</a>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </section>

  <section v-else >
    Раздел в стадии наполнения
  </section>
  <!-- End Pricing Section -->

  <section>
    <div class="container">
      <div class="row">

          <!-- Section Title -->
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">Подробнее</h6>
              <h2>Каждое решение масштабируется и позволяет бизнесу расти — от презентационного сайта до полноценной цифровой экосистемы.</h2>
            </div>
          </div>

        <div class="col-md-12">


          <div class="price_desc content_wrap">
            <a name="first"></a>
            <h3> Промо страница</h3>
            <p><strong>Срок реализации: 3 недели</strong><strong><br /></strong> <strong>Стоимость: </strong><strong>40 000 ₽</strong><strong> 35 000 ₽</strong></p>
            <p><strong>Описание пакета</strong></p>
            <p>Промо-страница &mdash; это одностраничный сайт, созданный для быстрой и эффектной презентации агентства, его объектов и возможностей. Идеально подходит для запуска нового бизнеса, вывода на рынок новых предложений или просто современного и понятного представления услуг компании "Агора".</p>
            <p><strong>Что входит в пакет</strong></p>
            <ul>
              <li><strong>Одностраничный сайт (Landing Page)</strong><strong><br /></strong> Простой, но эффективный сайт, состоящий из последовательных информационных блоков (до 10). Каждый блок &mdash; это визуально и смыслово самостоятельный раздел страницы: заголовок, описание, изображения или видео. Например, блоки могут включать: &laquo;О компании&raquo;, &laquo;Преимущества&raquo;, &laquo;Объекты&raquo;, &laquo;Отзывы&raquo;, &laquo;Контакты&raquo; и т.д. Всё это оформлено в едином стиле и логике повествования.<br /><br /></li>
              <li><strong>Форма заявки</strong><strong><br /></strong> Интерактивный элемент, позволяющий пользователю оставить контактные данные. Такая форма может располагаться в нескольких местах: например, рядом с кнопкой &laquo;Записаться&raquo;, &laquo;Мне интересен объект&raquo;, &laquo;Получить консультацию&raquo;. Удобный способ связи, который увеличивает конверсии.<br /><br /></li>
              <li><strong>Блок с "лотами" (объекты недвижимости)</strong><strong><br /></strong> Этот блок фокусируется на представлении объектов &mdash; ключевой информации для клиента. Мы оформим до 10 объектов в формате карусели: пользователь может пролистывать предложения в горизонтальной прокрутке. При клике &mdash; появляется всплывающее окно с краткой информацией об объекте (фото, цена, краткое описание, кнопка &laquo;Оставить заявку&raquo;). Это удобно, быстро и эффективно для первой демонстрации предложений.<br /><br /></li>
            </ul>
            <p><strong>Преимущества промо-страницы</strong></p>
            <ul>
              <li>Быстрый запуск и простота управления<br /><br /></li>
              <li>Четкий фокус на целевом действии пользователя<br /><br /></li>
              <li>Удобная подача информации &mdash; всё на одной странице<br /><br /></li>
              <li>Отлично подходит для рекламы и продвижения (в соцсетях, Google и Яндекс)<br /><br /></li>
            </ul>
          </div>

          <div class="price_desc content_wrap">
            <a name="second"></a>
            <h3>Каталог объектов</h3>
            <p><strong>Срок реализации: 1.5 месяца</strong><strong><br /></strong> <strong>Стоимость: </strong><strong>85 000 ₽</strong><strong> 75 000 ₽</strong></p>
            <p><strong>Описание пакета</strong></p>
            <p>Решение для агентств с расширенным перечнем объектов, когда необходим полноценный каталог с поиском, страницами объектов и удобной структурой представления информации.</p>
            <p><strong>Что входит в пакет</strong></p>
            <ul>
              <li><strong>Многоуровневый каталог</strong><strong><br /></strong> Возможность размещать десятки и сотни объектов с фильтрацией и переходами между разделами. Каждый объект имеет свою отдельную страницу. Типовые поля: название, район, цена, этаж, площадь, количество комнат, фото, описание и т.д.<br /><br /></li>
              <li><strong>Параметрический поиск (упрощенный)</strong><strong><br /></strong> Быстрый поиск по ключевым критериям: цена, район, этаж, количество комнат, тип недвижимости. Интерфейс &mdash; простой и удобный, подходит для быстрой навигации.<br /><br /></li>
              <li><strong>До 10 вариантов шаблонов контента</strong><strong><br /></strong> Возможность создавать разные типы разделов: галереи, списки объектов, карточки, блог, статьи и т.п. Это позволяет ограниченно варьировать структуру сайта без переувлажнения.<br /><br /></li>
              <li><strong>Система наполнения (CMS)</strong><strong><br /></strong> Панель администратора для удобного редактирования и добавления объектов без технических знаний.<br /><br /></li>
              <li><strong>Интерактивная карта (на уровне объекта)</strong><strong><br /></strong> Показывается местоположение на карте в карточке объекта. На уровне каталога и других разделов &mdash; не реализуется в этом варианте.<br /><br /></li>
              <li><strong>Расширенная форма заявки</strong><strong><br /></strong> Форма включает уточняющие поля: выбор объекта, имя, телефон, удобное время для связи, комментарий. Позволяет эффективнее обрабатывать заявки и фильтровать интерес пользователей.<br /><br /></li>
            </ul>
            <p><strong>Преимущества каталога объектов</strong></p>
            <ul>
              <li>Удобная структура для навигации по множеству объектов<br /><br /></li>
              <li>Отдельные страницы позволяют углубить информацию по каждому предложению<br /><br /></li>
              <li>Простая система управления контентом<br /><br /></li>
              <li>Оптимальный вариант для агентств с большим числом активных предложений<br /><br /></li>
            </ul>
          </div>

          <div class="price_desc content_wrap">
            <a name="third"></a>
            <h3>Инструмент продаж</h3>
            <p><strong>Срок реализации: 2 месяца + 1 месяц тестирования и ввода в эксплуатацию</strong><strong><br /></strong> <strong>Стоимость: </strong><strong>130 000 ₽ </strong><strong>120 000 ₽</strong></p>
            <p><strong>Описание пакета</strong></p>
            <p>Флагманское решение для агентства, желающего автоматизировать процессы и предоставить клиенту по-настоящему удобный цифровой сервис.</p>
            <p><strong>Что входит в пакет</strong></p>
            <ul>
              <li><strong>Уникальный дизайн интерфейса</strong><strong><br /></strong> Разработка индивидуального дизайна на основе референсного донора. Все макеты утверждаются до этапа наполнения &mdash; клиент получает проработанный визуал, ориентированный на его бренд.<br /><br /></li>
              <li><strong>Каталог с расширенной структурой</strong><strong><br /></strong> Всё, что в пакете №2, плюс возможность создавать вложенные категории, типы объектов, отдельные типовые карточки.<br /><br /></li>
              <li><strong>Фильтрация (расширенная)</strong><strong><br /></strong> Дополнительные фильтры: площадь, год постройки, тип дома, наличие ремонта, статус продажи, наличие парковки, и т.д. Удобный UX-интерфейс с возможностью сохранять фильтры.<br /><br /></li>
              <li><strong>Интерактивная карта объектов (агрегирующая)</strong><strong><br /></strong> Полноценная карта со всеми активными объектами, отображаемыми в реальном времени с возможностью кликнуть и перейти к нужному лоту. Возможна кластеризация, фильтрация по карте, привязка фильтров к геолокации.<br /><br /></li>
              <li><strong>Инструмент &laquo;Парсер объектов&raquo;</strong><strong><br /></strong> Мы можем реализовать систему автоматического импорта чужих объектов с внешних источников. Это расширяет предложение и позволяет клиенту видеть больше, не выходя с сайта. Отдельно согласуется, требует технического анализа.<br /><br /></li>
            </ul>
            <p><strong>Преимущества инструмента продаж</strong></p>
            <ul>
              <li>Максимально полный функционал для цифрового агентства<br /><br /></li>
              <li>Автоматизация и расширение ассортимента без дополнительных усилий<br /><br /></li>
              <li>Индивидуальность и узнаваемость через собственный дизайн<br /><br /></li>
              <li>Подходит для масштабного маркетинга и взаимодействия с CRM<br /><br /></li>
            </ul>
            <p><strong>Срок реализации: 2 месяца + 1 месяц тестирования и ввода в эксплуатацию</strong></p>
            <p><em>Для данного пакета предусмотрена отдельная схема работы, включающая этап согласования и оплаты технического задания.</em></p>
          </div>

        </div>

      </div>
    </div>
  </section>

</template>

<style scoped>

</style>