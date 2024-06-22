<template>
  <p class="mb-0 chapter">
    <a href="javascript:void(0)" @click="onClick(chapter)">{{
      chapter.timestamp
    }}</a>
    {{ chapter.label
    }}<DubChapter
      v-for="(subChapter, index) in chapter.subChapters"
      :key="index"
      :chapter="subChapter"
      :on-click="onClick"
      class="ps-4"
    />
  </p>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Chapter } from '~/types/catalogTypes';

export default Vue.extend({
  props: {
    chapter: {
      type: Object as PropType<Chapter>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(chapter: Chapter) => void>,
      required: true,
    },
  },
});
</script>
