<template>
  <section class="st-view-home">
    <div v-if="loadingStatus !== 'done'">
      <a-skeleton :paragraph="{rows: 10}"/>
    </div>
    <div v-else>
      <div v-if="newsData.length">
        <news-feed
          v-for="category in newsData"
          :count="itemsCount"
          :key="category.id"
          :category="category" />
      </div>
      <div v-else>
        <p>欢迎使用 SYSU Tower 逸仙塔。<br>
        看起来您还没有订阅任何一个新闻源。点击下面的添加订阅按钮，开始体验吧！</p>
      </div>
      <a-button
        block
        type="primary"
        size="large"
        icon="plus"
        @click.native="openAddSubscription">添加订阅</a-button>
      </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapState, mapGetters } from 'vuex';
import NewsFeed from '@/components/NewsFeed.vue';

export default {
  name: 'home',
  props: [
    'loading',
  ],
  components: {
    NewsFeed,
  },
  data() {
    return {
      clientWidth: document.body.clientWidth,
    };
  },
  computed: {
    itemsCount() {
      if (this.clientWidth >= 1600) {
        return 6;
      } if (this.clientWidth >= 1200) {
        return 4;
      } if (this.clientWidth >= 992) {
        return 3;
      } if (this.clientWidth >= 768) {
        return 2;
      } if (this.clientWidth >= 576) {
        return 1;
      }
      return 3;
    },
    ...mapState([
      'loadingStatus',
    ]),
    ...mapGetters({
      newsData: 'subscriptions/items',
    }),
  },
  methods: {
    openAddSubscription() {
      this.$store.commit('addTab', {
        type: 'addSubscription',
      });
    },
  },
  mounted() {
    window.onresize = () => {
      this.clientWidth = document.documentElement.clientWidth;
    };
  },
};
</script>

<style>
  .st-view-home {
    padding: 24px;
  }
</style>
