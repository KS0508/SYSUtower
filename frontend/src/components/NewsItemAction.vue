<template>
  <span>
    <a-icon :type="action[type].icon" :theme="action[type].theme" />
    {{ action[type].desc }}
  </span>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      action: {
        full: { icon: 'ellipsis', desc: '阅读全文', theme: 'outlined' },
        original: { icon: 'link', desc: '原文链接', theme: 'outlined' },
        bookmark: { icon: 'star', desc: '收藏', theme: 'outlined' },
        bookmarked: { icon: 'star', desc: '已收藏', theme: 'twoTone' },
      },
    };
  },
};
</script>
