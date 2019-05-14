<template>
  <span>
    <a-icon :type="action[type].icon" />
    {{ action[type].desc }}
  </span>
</template>

<script>
export default {
  props: ['type'],
  data () {
    return {
      action: {
        full: { icon: 'ellipsis', desc: '阅读全文' },
        original: { icon: 'link', desc: '原文链接' },
        share: { icon: 'share-alt', desc: '分享' }
      }
    }
  }
}
</script>
