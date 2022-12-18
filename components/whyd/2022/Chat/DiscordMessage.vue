<template>
  <div class="message">
    <div class="name-bar">
      <img class="d-msg-avatar" :src="authorAvatar" />
      <h2 class="name-ts">
        <span class="name" :style="`color: ${authorColor}`">{{
          authorName
        }}</span>
        <span class="timestamp">{{ parseTimestamp(timestamp) }}</span>
      </h2>
    </div>
    <div class="message-content">
      {{ content }}
    </div>
    <div class="message-extras">
      <div class="attachments">
        <img
          v-for="attachment in attachments"
          :key="`${authorName}${timestamp}${attachment}`"
          :src="attachment"
          class="attachment"
        />
      </div>
      <div class="reactions">
        <div
          v-for="(reaction, index) in reactions"
          :key="`${authorName}${timestamp}${reaction.emoji?.name}${index}`"
          class="reaction-bubble"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-html="true"
          data-bs-delay="500"
          :title="`${reaction.count} people reacted with ${reaction.emoji?.name}`"
        >
          <img
            :src="getUrlFor(reaction.emoji)"
            :class="
              'reaction-emoji ' +
              (getUrlFor(reaction.emoji).includes('.svg') ? 'svg' : '')
            "
          />
          <div class="reaction-count">{{ reaction.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => {}
    },
    content: {
      type: String,
      default: ''
    },
    reactions: {
      type: Array,
      default: () => []
    },
    authorName: {
      type: String,
      default: ''
    },
    authorAvatar: {
      type: String,
      default: ''
    },
    authorColor: {
      type: String,
      default: ''
    },
    attachments: {
      type: Array,
      default: () => []
    },
    timestamp: {
      type: String,
      default: ''
    }
  },
  methods: {
    parseTimestamp(timestamp) {
      const date = Date.parse(timestamp)
      // returns date in the format:
      // 11/26/2022 2:48 PM
      return (
        new Date(date).toLocaleString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric'
        }) +
        ' ' +
        new Date(date).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      )
    },
    getUrlFor(emoji) {
      if (emoji == null) return ''

      if (emoji.imageUrl != null) {
        if (emoji.imageUrl.includes('twemoji')) {
          return emoji.imageUrl
        } else {
          return `/whyd/2022/data/emojis/${emoji.name}.${
            emoji.imageUrl.split('.')[emoji.imageUrl.split('.').length - 1]
          }`
        }
      } else {
        const url = this.stats.server.emojiNameToFilename[emoji.name]
        return `/whyd/2022/data/emojis/${url}`
      }
    }
  }
}
</script>

<style scoped>
.message {
  min-height: 2.75rem;

  padding: 2px 48px 2px 72px;

  margin-top: 10px;
  margin-bottom: 1em;

  position: relative;
  flex-direction: column;
  align-items: flex-start;
}

.message:hover {
  background-color: rgba(4, 4, 5, 0.07);
}

.message.nohover:hover {
  background-color: rgba(0, 0, 0, 0);
}

.name-bar {
  font-size: 0.9em;
}

.name-ts {
  padding: 0;
  margin: 0px !important;

  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;
  vertical-align: baseline;

  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.name {
  margin-right: 0.25em;
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;

  position: static;
  margin-left: 0;
  padding-left: 0;
  text-indent: 0;
}

.timestamp {
  position: relative;
  min-height: 1.375em;

  margin: 0;
  padding: 0;
  border: 0;
  font-style: inherit;
  font-family: inherit;

  height: 1.25rem;
  cursor: default;
  pointer-events: none;
  font-weight: 500;

  margin-left: 0.25em;

  font-size: 0.75em;
  line-height: 1.375em;
  color: #72767d;
  vertical-align: baseline;
}

.d-msg-avatar {
  position: absolute;
  left: 18px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 2px;
  filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0));
  transition: filter 0.05s ease;
}

.d-msg-avatar:hover {
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.16));
}

.message-block a:link {
  text-decoration: none;
}

.message-block a:hover .name {
  text-decoration: underline;
}

.message-content {
  font-size: 1em;
  min-height: 4px;
  color: #dcddde;
}

.message-extras {
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 0.25rem;
  text-indent: 0;
  min-height: 0;
  min-width: 0;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  position: relative;
}

.attachments {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.attachment {
  justify-self: start;
  -ms-flex-item-align: start;
  align-self: start;
  position: relative;
  max-width: 100%;
}

.attachment img {
  width: 90%;
  border-radius: 4px;
}

@media (max-width: 576px) {
  .attachment video {
    width: 90%;
    border-radius: 4px;
    height: calc(100vw * 0.4);
  }
}
@media (min-width: 576px) {
  .attachment video {
    width: 381px;
    border-radius: 4px;
    height: 214px;
  }
}
@media (min-width: 768px) {
  .attachment video {
    height: calc(219px * 0.5625);
    width: 219px;
    border-radius: 4px;
  }
}
@media (min-width: 992px) {
  .attachment video {
    height: calc(327px * 0.5625);
    width: 327px;
    border-radius: 4px;
    /* height: 250px; */
  }
}
@media (min-width: 1200px) {
  .attachment video {
    height: calc(408px * 0.5625);
    width: 408px;
    border-radius: 4px;
    /* height: 250px; */
  }
}
@media (min-width: 1400px) {
  .attachment video {
    height: calc(490px * 0.5625);
    width: 490px;
    border-radius: 4px;
    /* height: 250px; */
  }
}

.reactions {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.reaction-bubble {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: hsl(223, 6.9%, 19.8%);
  border-radius: 7px;
  border: 1px solid;
  border-color: transparent;
  /* width: 3.125em; */
  padding: 0.075rem 0.375rem;
  gap: 0.375rem;
  margin-left: 0.25em;
  margin-bottom: 0.25em;
  cursor: pointer;

  color: hsl(216, 3.7%, 73.5%);
  font-weight: 600;
  text-align: center;
  transition: none 0.1s ease;
  transition-property: background-color, border-color;
}

.reaction-bubble:hover {
  color: #dcddde;
  border-color: rgba(255, 255, 255, 0.2);
  background-color: hsl(220, 7.7%, 22.9%);
}

.reaction-emoji {
  max-width: 1em;
  max-height: 1em;
}

.reaction-emoji.svg {
  width: 1em;
}

.reaction-count {
  font-size: 0.875em;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 9px;
}

.reaction-count:hover {
  color: hsl(210, 2.9%, 86.7%);
}
</style>
