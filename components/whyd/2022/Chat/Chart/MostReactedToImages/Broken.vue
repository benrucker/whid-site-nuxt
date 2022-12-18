<template>
  <div class="broken-reactions-root">
    <div class="duplicate clip-stutter">
      <Whyd2022ChatDiscordMessageBlock
        :messages="[message1, message2]"
        :stats="stats"
      />
    </div>
    <div class="gitching1">
      <Whyd2022ChatDiscordMessageBlock
        :messages="[message1, message2]"
        :stats="stats"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      message1: {
        reactions: [
          {
            emoji: {
              name: 'marioAndSonic',
              imageUrl:
                'https://media.tenor.com/9z3rpvYfoDIAAAAd/sonic-and-mario-kiss.gif'
            },
            count: 20
          },
          {
            emoji: {
              name: 'marioAndSonic',
              imageUrl:
                'https://media.tenor.com/9z3rpvYfoDIAAAAd/sonic-and-mario-kiss.gif'
            },
            count: 5
          },
          {
            emoji: {
              name: 'marioAndSonic',
              imageUrl:
                'https://media.tenor.com/9z3rpvYfoDIAAAAd/sonic-and-mario-kiss.gif'
            },
            count: 1
          },
          {
            emoji: {
              name: 'marioAndSonic',
              imageUrl:
                'https://media.tenor.com/9z3rpvYfoDIAAAAd/sonic-and-mario-kiss.gif'
            },
            count: 4
          },
          {
            emoji: {
              name: 'marioAndSonic',
              imageUrl:
                'https://media.tenor.com/9z3rpvYfoDIAAAAd/sonic-and-mario-kiss.gif'
            },
            count: 5
          }
        ],
        authorName: 'SergeiLNL',
        timestamp: '09/24/2022',
        authorAvatar:
          'https://cdn.discordapp.com/avatars/262799048430452746/45435ebe52b1cf8225d00861eb9045b7.png?size=1024',
        attachments: [
          'https://media.tenor.com/9z3rpvYfoDIAAAAd/sonic-and-mario-kiss.gif'
        ]
      },
      message2: {
        reactions: [
          { emoji: { name: 'downvote' }, count: 20 },
          { emoji: { name: 'cheeto' }, count: 5 },
          { emoji: { name: 'ahegao1' }, count: 1 },
          { emoji: { name: 'downvote' }, count: 4 },
          { emoji: { name: 'downvote' }, count: 5 }
        ],
        authorName: 'Mario & Sonic at the Olympic Winter Games',
        timestamp: '10/13/2009',
        authorAvatar:
          'https://media.tenor.com/9z3rpvYfoDIAAAAd/sonic-and-mario-kiss.gif',
        attachments: [
          'https://media.tenor.com/9z3rpvYfoDIAAAAd/sonic-and-mario-kiss.gif'
        ]
      }
    }
  }
}
</script>

<style scoped>
.broken-reactions-root {
}

.gitching1 {
  animation: random-move 100s infinite step-start;
}

.duplicate {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.clip-stutter {
  transform: translate(0, 0);
  clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
  animation: clip-stutter 13s infinite step-start;
  z-index: 1;
}

@keyframes random-move {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(10px, 5px);
  }
  20% {
    transform: translate(8px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(-1px, 3px);
  }
  50% {
    transform: translate(6px, 0px);
  }
  60% {
    transform: translate(-10px, -2px);
  }
  70% {
    transform: translate(7px, 1px);
  }
  80% {
    transform: translate(0px, 10px);
  }
  90% {
    transform: translate(2px, 2px);
  }
  100% {
    transform: translate(-5px, 0px);
  }
}

@keyframes clip-stutter {
  0% {
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
    transform: translate(0, 0);
  }
  10% {
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
    transform: translate(0, 0);
  }
  11% {
    clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
    transform: translate(10px, 5px);
  }
  14% {
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
    transform: translate(15px, 5px);
  }
  18% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  30% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  41% {
    clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
    transform: translate(10px, 0);
  }
  46% {
    clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
    transform: translate(10px, 150px);
  }
  49% {
    clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
    transform: translate(15px, 50px);
  }
  50% {
    clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
    transform: translate(15px, 5px);
  }
  52% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  70% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  71% {
    clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%);
    transform: translate(0, 0);
  }
  74% {
    clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%);
    transform: translate(10px, 5px);
  }
  79% {
    clip-path: polygon(0 75%, 100% 60%, 100% 85%, 0 85%);
    transform: translate(15px, 5px);
  }
  82% {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
}
</style>
