<template>
  <div>
    <h2 id="content" data-aos="fade-up">what have we reacted to the most?</h2>

    <div class="row" data-masonry='{"percentPosition": true }'>
      <div class="col-12 col-md-6 mt-4" data-aos="fade-up">
        <div class="message-block m-1">
          <div class="message">
            <div class="name-bar">
              <img class="avatar" src="resources/avatars/sergei.webp" />

              <h2 class="name-ts">
                <span class="name sergei">SergeiLNL</span>
                <span class="timestamp">04/06/2021</span>
              </h2>
            </div>
            <div class="message-content">I got you</div>
            <div class="message-extras">
              <div class="attachment">
                <img
                  src="https://media.discordapp.net/attachments/200852342667476992/829092338806685786/20210406_163641.jpg"
                />
              </div>
            </div>
          </div>
          <a
            href="https://discord.com/channels/173840048343482368/200852342667476992/829092602737066036"
            target="_blank"
            title="Go to original!"
          >
            <div class="message">
              <div class="name-bar">
                <img class="avatar" src="resources/avatars/jacob.webp" />

                <h2 class="name-ts">
                  <span class="name jacob">Screenshare 8.0</span>
                  <span class="timestamp">04/06/2021</span>
                </h2>
              </div>
              <div class="message-extras">
                <div class="attachment">
                  <img
                    src="https://media.discordapp.net/attachments/200852342667476992/829092602598260756/image0.jpg"
                  />
                </div>
                <div class="attachment">
                  <img
                    src="https://media.discordapp.net/attachments/200852342667476992/829092632290394162/image0.png"
                  />
                </div>
                <div class="reactions">
                  <div
                    v-for="r in jacobReacts"
                    class="reaction-bubble"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-html="true"
                    data-bs-delay="500"
                    :title="r[1] + ' people reacted with ' + r[0]"
                    :key="r"
                  >
                    <img class="reaction-emoji" :src="r[2]" />
                    <span class="reaction-count">{{ r[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="message">
            <div class="name-bar">
              <img class="avatar" src="resources/avatars/jerma.webp" />

              <h2 class="name-ts">
                <span class="name anniv-color">JermaBot</span>
                <span class="timestamp">04/26/2021</span>
              </h2>
            </div>
            <div class="message-content">
              this loving moment got a total of 175 reactions
              :smiling_face_with_tear:
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 mt-4" data-aos="fade-up">
        <div class="message-block m-1">
          <a
            href="https://discord.com/channels/173840048343482368/200852342667476992/799395222710648843"
            target="_blank"
            title="Go to original!"
          >
            <div class="message">
              <div class="name-bar">
                <img class="avatar" src="resources/avatars/russell.webp" />

                <h2 class="name-ts">
                  <span class="name russell">Rustled Leaves</span>
                  <span class="timestamp">01/14/2021</span>
                </h2>
              </div>
              <div class="message-extras">
                <div class="attachment">
                  <img
                    src="https://media.discordapp.net/attachments/200852342667476992/799395222622699550/image0.jpg?width=627&height=601"
                  />
                </div>
                <div class="reactions">
                  <div
                    v-for="r in russellReacts"
                    class="reaction-bubble"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-html="true"
                    data-bs-delay="500"
                    :title="r[1] + ' people reacted with ' + r[0]"
                    :key="r"
                  >
                    <img class="reaction-emoji" :src="r[2]" />
                    <span class="reaction-count">{{ r[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="message">
            <div class="name-bar">
              <img class="avatar" src="resources/avatars/jerma.webp" />

              <h2 class="name-ts">
                <span class="name anniv-color">JermaBot</span>
                <span class="timestamp">04/26/2021</span>
              </h2>
            </div>
            <div class="message-content">
              i hate that image so goddamn much.
              <br />
              why'd you have to give it 143 reactions?
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 mt-4" data-aos="fade-up">
        <div class="message-block m-1">
          <a
            href="https://discord.com/channels/173840048343482368/557780039127793666/803463791978217472"
            target="_blank"
            title="Go to original!"
          >
            <div class="message">
              <div class="name-bar">
                <img class="avatar" src="resources/avatars/kian.webp" />

                <h2 class="name-ts">
                  <span class="name kian">SilentKON</span>
                  <span class="timestamp">01/25/2021</span>
                </h2>
              </div>
              <div class="message-extras">
                <div class="attachment">
                  <img
                    src="https://media.discordapp.net/attachments/557780039127793666/803463791831679017/image0.jpg"
                  />
                </div>
                <div class="reactions">
                  <div
                    v-for="r in kianReacts"
                    class="reaction-bubble"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-html="true"
                    data-bs-delay="500"
                    :title="r[1] + ' people reacted with ' + r[0]"
                    :key="r"
                  >
                    <img class="reaction-emoji" :src="r[2]" />
                    <span class="reaction-count">{{ r[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="message">
            <div class="name-bar">
              <img class="avatar" src="resources/avatars/jerma.webp" />

              <h2 class="name-ts">
                <span class="name anniv-color">JermaBot</span>
                <span class="timestamp">04/26/2021</span>
              </h2>
            </div>
            <div class="message-content">
              fuck you kian you want checkmate too bad you get 139 reactions
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 mt-4" data-aos="fade-up">
        <div class="message-block m-1">
          <a
            href="https://discord.com/channels/173840048343482368/200852342667476992/740799450473299968"
            target="_blank"
            title="Go to original!"
          >
            <div class="message">
              <div class="name-bar">
                <img class="avatar" src="resources/avatars/sergei.webp" />

                <h2 class="name-ts">
                  <span class="name sergei">SergeiLNL</span>
                  <span class="timestamp">08/26/2020</span>
                </h2>
              </div>
              <div class="message-extras">
                <div class="attachment">
                  <img
                    src="https://media.discordapp.net/attachments/200852342667476992/740799450284425216/SPOILER_SPOILER_animecheeto.png"
                  />
                </div>
                <div class="reactions">
                  <div
                    v-for="r in sergeiReacts"
                    class="reaction-bubble"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-html="true"
                    data-bs-delay="500"
                    :title="r[1] + ' people reacted with ' + r[0]"
                    :key="r"
                  >
                    <img class="reaction-emoji" :src="r[2]" />
                    <span class="reaction-count">{{ r[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="message">
            <div class="name-bar">
              <img class="avatar" src="resources/avatars/jerma.webp" />

              <h2 class="name-ts">
                <span class="name anniv-color">JermaBot</span>
                <span class="timestamp">04/26/2021</span>
              </h2>
            </div>
            <div class="message-content">
              at least the cheeto arguments boost the server message count.
              <br />
              133 reactions
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 mt-4" data-aos="fade-up">
        <div class="message-block m-1">
          <a
            href="https://discord.com/channels/173840048343482368/200852342667476992/415684468557479948"
            target="_blank"
            title="Go to original!"
          >
            <div class="message">
              <div class="name-bar">
                <img class="avatar" src="resources/avatars/ethan.gif" />

                <h2 class="name-ts">
                  <span class="name ethan">fops</span>
                  <span class="timestamp">02/20/2018</span>
                </h2>
              </div>
              <div class="message-extras">
                <div class="attachment">
                  <video
                    playsinline
                    autoplay
                    muted
                    loop
                    src="resources/videos/headgone.mp4"
                    type="video/mp4"
                  >
                    video.
                  </video>
                </div>
                <div class="reactions">
                  <div
                    v-for="r in ethanReacts"
                    class="reaction-bubble"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-html="true"
                    data-bs-delay="500"
                    :title="r[1] + ' people reacted with ' + r[0]"
                    :key="r"
                  >
                    <img class="reaction-emoji" :src="r[2]" />
                    <span class="reaction-count">{{ r[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="message">
            <div class="name-bar">
              <img class="avatar" src="resources/avatars/jerma.webp" />

              <h2 class="name-ts">
                <span class="name anniv-color">JermaBot</span>
                <span class="timestamp">04/26/2021</span>
              </h2>
            </div>
            <div class="message-content">
              121 head-cleaving emojis on this one
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 mt-4" data-aos="fade-up">
        <div class="message-block m-1 gx-0">
          <a
            href="https://discord.com/channels/173840048343482368/200852342667476992/835536474321190962"
            target="_blank"
            title="Go to original!"
          >
            <div class="message">
              <div class="name-bar">
                <img class="avatar" src="resources/avatars/wyatt.gif" />

                <h2 class="name-ts">
                  <span class="name wyatt">El Jefe</span>
                  <span class="timestamp">04/24/2021</span>
                </h2>
              </div>
              <div class="message-content">
                <span class="d-highlight">@SergeiLNL</span> HAPPY BIRTHDAY YOU
                FILTHY ANIMAL
              </div>
              <div class="message-extras">
                <div class="reactions">
                  <div
                    v-for="r in wyattReacts1"
                    class="reaction-bubble"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-html="true"
                    data-bs-delay="500"
                    :title="r[1] + ' people reacted with ' + r[0]"
                    :key="r"
                  >
                    <img class="reaction-emoji" :src="r[2]" />
                    <span class="reaction-count">{{ r[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="message">
            <div class="name-bar">
              <img class="avatar" src="resources/avatars/jerma.webp" />
              <h2 class="name-ts">
                <span class="name anniv-color">JermaBot</span>
                <span class="timestamp">04/26/2021</span>
              </h2>
            </div>
            <div class="message-content">118 filthy reactions</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 mt-4" data-aos="fade-up">
        <div class="message-block m-1 gx-0">
          <a
            href="https://discord.com/channels/173840048343482368/200852342667476992/740801255676313671"
            target="_blank"
            title="Go to original!"
          >
            <div class="message">
              <div class="name-bar">
                <img class="avatar" src="resources/avatars/wyatt.gif" />

                <h2 class="name-ts">
                  <span class="name wyatt">El Jefe</span>
                  <span class="timestamp">08/26/2020</span>
                </h2>
              </div>
              <div class="message-extras">
                <div class="attachment">
                  <img
                    style="height: 3em; width: auto"
                    src="resources/emojis/downvote.png"
                  />
                </div>
                <div class="reactions">
                  <div
                    v-for="r in wyattReacts2"
                    class="reaction-bubble"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-html="true"
                    data-bs-delay="500"
                    :title="r[1] + ' people reacted with ' + r[0]"
                    :key="r"
                  >
                    <img class="reaction-emoji" :src="r[2]" />
                    <span class="reaction-count">{{ r[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="message">
            <div class="name-bar">
              <img class="avatar" src="resources/avatars/jerma.webp" />
              <h2 class="name-ts">
                <span class="name anniv-color">JermaBot</span>
                <span class="timestamp">04/26/2021</span>
              </h2>
            </div>
            <div class="message-content">monkey see monkey do 117 times</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let map = {
  "🎲": "https://twemoji.maxcdn.com/v/latest/72x72/1f3b2.png",
  "👋": "https://twemoji.maxcdn.com/v/latest/72x72/1f44b.png",
  "📌": "https://twemoji.maxcdn.com/v/latest/72x72/1f4cc.png",
  "👍": "https://twemoji.maxcdn.com/v/latest/72x72/1f44d.png",
  "😋": "https://twemoji.maxcdn.com/v/latest/72x72/1f60b.png",
  "🔜": "https://twemoji.maxcdn.com/v/latest/72x72/1f51c.png",
  "🤰": "https://twemoji.maxcdn.com/v/latest/72x72/1f930.png",
  "🕺": "https://twemoji.maxcdn.com/v/latest/72x72/1f57a.png",
  "🍑": "https://twemoji.maxcdn.com/v/latest/72x72/1f351.png",
  "🤺": "https://twemoji.maxcdn.com/v/latest/72x72/1f93a.png",
  "😳": "https://twemoji.maxcdn.com/v/latest/72x72/1f633.png",
  "⬛": "https://twemoji.maxcdn.com/v/latest/72x72/2b1b.png",
  "👎": "https://twemoji.maxcdn.com/v/latest/72x72/1f44e.png",
  "👇": "https://twemoji.maxcdn.com/v/latest/72x72/1f447.png",
  "🔻": "https://twemoji.maxcdn.com/v/latest/72x72/1f53b.png",
  "⬇️": "https://twemoji.maxcdn.com/v/latest/72x72/2b07.png",
  "🔽": "https://twemoji.maxcdn.com/v/latest/72x72/1f53d.png",
  "😱": "https://twemoji.maxcdn.com/v/latest/72x72/1f631.png",
  "🥭": "https://twemoji.maxcdn.com/v/latest/72x72/1f96d.png",
  "😩": "https://twemoji.maxcdn.com/v/latest/72x72/1f629.png",
  "🍔": "https://twemoji.maxcdn.com/v/latest/72x72/1f354.png",
  "🤢": "https://twemoji.maxcdn.com/v/latest/72x72/1f922.png",
  "💯": "https://twemoji.maxcdn.com/v/latest/72x72/1f4af.png",
  "❤️": "https://twemoji.maxcdn.com/v/latest/72x72/2764.png",
  "😫": "https://twemoji.maxcdn.com/v/latest/72x72/1f62b.png",
  "😤": "https://twemoji.maxcdn.com/v/latest/72x72/1f624.png",
  "🇩": "https://twemoji.maxcdn.com/v/latest/72x72/1f1e9.png",
  "🇦": "https://twemoji.maxcdn.com/v/latest/72x72/1f1e6.png",
  "🇧": "https://twemoji.maxcdn.com/v/latest/72x72/1f1e7.png",

  ":ahegao1:": "resources/emojis/ahegao1.png",
  ":ahriHeart:": "resources/emojis/ahriheart.png",
  ":BarryBustaNutBenson:": "resources/emojis/BarryBustaNutBenson.png",
  ":bea:": "resources/emojis/bea.png",
  ":bigdrake1:": "resources/emojis/bigdrake1.gif",
  ":bigdrake2:": "resources/emojis/bigdrake2.gif",
  ":bigdrake3:": "resources/emojis/bigdrake3.gif",
  ":bigdrake4:": "resources/emojis/bigdrake4.gif",
  ":bananna:": "resources/emojis/bananna.gif",
  ":blushcat:": "resources/emojis/blushcat.png",
  ":Celly:": "resources/emojis/Celly.gif",
  ":chad:": "resources/emojis/chad.png",
  ":cheeto:": "resources/emojis/cheeto.png",
  ":cum:": "resources/emojis/cum.png",
  ":dab:": "resources/emojis/dab.png",
  ":dabThumbsDown:": "resources/emojis/dabThumbsDown.png",
  ":davithumbsdown:": "resources/emojis/davithumbsdown.png",
  ":defaultDance:": "resources/emojis/defaultDance.gif",
  ":dogeKek:": "resources/emojis/dogeKek.png",
  ":Doubt1:": "resources/emojis/Doubt1.png",
  ":downdoot:": "resources/emojis/downvote.png",
  ":downvote-reddit:": "resources/emojis/downvote-reddit.png",
  ":downvote:": "resources/emojis/downvote.png",
  ":Downvote:": "resources/emojis/downvote.png",
  ":drake:": "resources/emojis/drake.gif",
  ":elaineDance:": "resources/emojis/elaineDance.gif",
  ":EraEra:": "resources/emojis/EraEra.gif",
  ":goopie:": "resources/emojis/goopie.gif",
  ":gunright:": "resources/emojis/gunright.png",
  ":intensifeyes:": "resources/emojis/intensifeyes.png",
  ":jam:": "resources/emojis/jam.gif",
  ":joe:": "resources/emojis/joe.png",
  ":kale:": "resources/emojis/kale.png",
  ":kass:": "resources/emojis/kass.png",
  ":kevingif:": "resources/emojis/kevingif.gif",
  ":kill:": "resources/emojis/kill.png",
  ":kirby:": "resources/emojis/kirby.gif",
  ":KomodoHype:": "resources/emojis/KomodoHype.png",
  ":kylecum:": "resources/emojis/kylecum.png",
  ":lfg:": "resources/emojis/lfg.png",
  ":littleman:": "resources/emojis/littleman.gif",
  ":markwood:": "resources/emojis/markwood.png",
  ":Nora:": "resources/emojis/Nora.png",
  ":partyparrot:": "resources/emojis/partyparrot.gif",
  ":pizza:": "resources/emojis/pizza.png",
  ":PogBreathing:": "resources/emojis/PogBreathing.gif",
  ":popcat:": "resources/emojis/popcat.gif",
  ":ranbowfrog:": "resources/emojis/ranbowfrog.gif",
  ":shredward:": "resources/emojis/shredward.png",
  ":smug1:": "resources/emojis/smug1.png",
  ":snek:": "resources/emojis/snek.png",
  ":snowWiggle:": "resources/emojis/snowWiggle.gif",
  ":sonervous:": "resources/emojis/sonervous.png",
  ":speen:": "resources/emojis/speen.gif",
  ":spotify:": "resources/emojis/spotify.png",
  ":stevespin:": "resources/emojis/stevespin.gif",
  ":themeaning:": "resources/emojis/themeaning.png",
  ":troll:": "resources/emojis/troll.png",
  ":trueshred:": "resources/emojis/trueshred.gif",
  ":upvote:": "resources/emojis/upvote.png",
  ":upvote-reddit:": "resources/emojis/upvote-reddit.png",
  ":voredoor:": "resources/emojis/voredoor.png",
  ":votedown:": "resources/emojis/votedown.png",
  ":wyatt2:": "resources/emojis/wyatt2.png",
  ":wyatt3:": "resources/emojis/wyatt3.png",
  ":wyattPog:": "resources/emojis/wyattPog.png",
  ":YAMERO:": "resources/emojis/YAMERO.gif",
  ":YOOO:": "resources/emojis/YOOO.png",
  ":YOOOOOO:": "resources/emojis/yoooooo.png",
  ":youtube:": "resources/emojis/youtube.png",
};

export default {
  data() {
    return {
      jacobStr:
        "lfg (11),lfg (11),upvote (10),drake (11),upvote (9),drake (11),bigdrake1 (11),bigdrake2 (11),trueshred (10),bigdrake3 (11),bigdrake4 (11),😤 (9),YOOO (9),elaineDance (9),voredoor (8),troll (9),goopie (8),🇩 (2),🇦 (2),🇧 (2)",
      russellStr:
        "lfg (7),upvote (8),❤️ (7),intensifeyes (7),wyattPog (7),👍 (7),trueshred (7),drake (7),chad (7),dogeKek (8),BarryBustaNutBenson (7),YAMERO (7),😫 (8),😩 (7),💯 (7),YOOOOOO (7),blushcat (7),kirby (7),partyparrot (7),ranbowfrog (7)",
      kianStr:
        "upvote (7),😱 (7),🥭 (7),YAMERO (7),😩 (7),🍔 (7),ahegao1 (7),sonervous (7),cum (7),🤢 (7),💯 (6),kylecum (7),joe (7),dab (7),Nora (7),ahriHeart (7),partyparrot (7),PogBreathing (7),wyatt2 (7),lfg (7)",
      sergeiStr:
        "upvote (10),cheeto (9),⬛ (5),downvote (7),Downvote (7),👎 (6),downvote (7),downvote (7),Downvote (7),downvote (7),downvote (7),downvote (7),downvote (6),davithumbsdown (6),👇 (7),dabThumbsDown (6),votedown (6),🔻 (5),🔽 (5),⬇️ (6)",
      ethanStr:
        "😋 (7),🔜 (6),🤰 (6),🕺 (6),🍑 (7),🤺 (6),snek (6),kass (6),wyatt2 (6),smug1 (6),wyatt3 (6),bea (6),kale (6),😳 (6),ahegao1 (6),Doubt1 (6),pizza (5),sonervous (6),markwood (6),themeaning (6)",
      wyattStr1:
        "lfg (7),partyparrot (6),PogBreathing (7),trueshred (7),drake (6),ranbowfrog (6),littleman (6),jam (5),bananna (5),KomodoHype (5),popcat (6),EraEra (5),Celly (6),kevingif (5),stevespin (6),goopie (6),elaineDance (6),defaultDance (6),snowWiggle (6),speen (6)",
      wyattStr2:
        "votedown (17),downvote (15),downvote (15),downdoot (15),downvote (15),downvote (10),Downvote (10),downvote (10),downvote (10)",
      jacobReacts: [],
      russellReacts: [],
      kianReacts: [],
      sergeiReacts: [],
      ethanReacts: [],
      wyattReacts1: [],
      wyattReacts2: [],
    };
  },
  mounted() {
    this.jacobReacts = strToReacts(this.jacobStr);
    this.russellReacts = strToReacts(this.russellStr);
    this.kianReacts = strToReacts(this.kianStr);
    this.sergeiReacts = strToReacts(this.sergeiStr);
    this.ethanReacts = strToReacts(this.ethanStr);
    this.wyattReacts1 = strToReacts(this.wyattStr1);
    this.wyattReacts2 = strToReacts(this.wyattStr2);
    console.log(this.russellReacts);

    setTimeout((s) => enableTooltips(), 100);
  },
  methods: {},
};

function strToReacts(str) {
  pairs = str.split(",");
  reacts = [];
  pairs.forEach((pair) => {
    [emoji, count] = pair.split(" ");
    if (emoji.length > 2)
      // on our data, this means it's custom
      emoji = ":" + emoji + ":";
    count = count.substring(1, count.length - 1);
    reacts.push([emoji, count, map[emoji]]);
  });
  return reacts;
}

// Vue.createApp(mostReactedMessages).mount("#reactedMessagesApp");
</script>