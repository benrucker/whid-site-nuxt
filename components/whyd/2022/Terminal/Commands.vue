<script>
export default {
  methods: {
    testFunction() {
      return [
        {
          content: '{test command invoked | italic}',
        },
      ]
    },
    helpTerminalFunction(_) {
      const lines = [
        {
          content: '{whydOS v1.2 Database Terminal Interface | underline}',
        },
        {
          content: `Commands can be executed by typing them in or by clicking the SmartButtons™ (patent pending) that are tuned to present the data optimized for your analytical experience.`,
        },
        {
          content: `{Directory of general System commands v.1 | underline}`,
        },
        {
          content: `'ls'          - List executables in current directory\n'cd ..'       - Navigate one directory up\n'cd [folder]' - Navigate to [folder]\n'dir'         - Display current directory `,
        },
        {
          content:
            '{NOTICE: The Information stored on this system is highly sensitive and should not be published. | error}',
        },
        { content: '{In the case of Security Breach... | error}' },
        {
          content: '{[TODO: Security Breach Contingency Plan] | error}',
        },
      ]
      return lines
    },
    SecBotDMsFunction(_) {
      const numWalter = 5
      const differentWalterUsers = 3

      const lines = [
        {
          content:
            '{@secuityBot4891#1995 Direct Message logs... | underline}\n',
        },
        {
          content: `This image was sent {${numWalter} | bold} times by {${differentWalterUsers} | bold} users.`,
          type: 'image',
          url: 'https://media.tenor.com/S_to1tY3ixUAAAAd/breaking-bad-walter-white.gif',
        },
      ]

      return lines
    },
    SecBotVoiceEventsFunction(stats) {
      const user = stats.user.name

      // let VECountTotal = 55
      const VECountTotal = Object.values(
        stats.server['SecBot voice event type_counts'],
      ).reduce((accumulator, currentValue) => accumulator + currentValue)

      let VECountUser = stats.user['SecBot voice event type counts']
      if (VECountUser) {
        VECountUser = Object.values(VECountUser).reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        )
      } else {
        VECountUser = 0
      }

      const mUser = stats.server['SecBot user with most VEs']
      const maxUser = stats.server.idsToNames[Object.keys(mUser)[0]] // count for most active user
      const VECountMax = Object.values(mUser)[0] // display name for most active user

      const lines = [
        {
          content: `{Voice Events | underline}`,
        },
        {
          content: `SecurityBot observed {${VECountTotal} | bold} 'Voice Events' from its initialization to the end of the year.`,
        },
        {
          content: `Voice Events include joining, leaving, and moving channels. They also include muting/unmuting, deafening/undeafening, and turning on and off your webcam or stream.`,
        },
      ]

      if (VECountUser === VECountMax) {
        lines.push({
          content: `User {${maxUser} | bold} had the highest Voice Event count with {${VECountUser} | bold}!`,
        })
      } else {
        lines.push({
          content: `User {${user} | bold} had a Voice Event count of {${VECountUser} | bold} compared to {${maxUser} | bold} with the highest count of {${VECountMax} | bold}!`,
        })
      }

      return lines
    }, // top user needs testing
    SecBotVoiceEventsMostActiveDayFunction(stats) {
      const user = stats.user.name
      const MADUser = stats.user['SecBot most active voice event days'] ?? 0
      const date = new Date(MADUser.mostActiveDay)
      const MADUserDate = date.toLocaleDateString('en-US', {
        dateStyle: 'long',
      })
      const MADServer = stats.server['SecBot server max voice event day']
      const dateServer = new Date(MADServer.timestamp)
      const MADServerDate = dateServer.toLocaleDateString('en-US', {
        dateStyle: 'long',
      })
      const MADServerNum = MADServer.count

      const lines = [
        {
          content: `{Most Active days by Voice Event count | underline}`,
        },
        {
          content: `{${user} | bold} was most active on {${MADUserDate} | bold} with {${MADUser.numEvents} | bold} unique events.`,
        },
        {
          content: `The server's most active day overall was {${MADServerDate} | bold} with {${MADServerNum} | bold} unique recorded events...`,
        },
        {
          content:
            'SecurityBot did not note any outstanding events occurring on that day... Additional analysis required.',
        },
      ]

      return lines
    },
    SecBotVoiceEventsFavoriteVoiceChannelFunction(stats) {
      // very subject to change when data relating to actual time in VCs is computed;
      // compare number of joins and total time spent in a channel
      const user = stats.user.name
      const joinsTotal = Math.trunc(
        stats.user['SecBot voice event type counts']?.join ?? 0,
      )
      const favoriteChannelStat = stats.user[
        'SecBot favorite VC by joinsmoves'
      ] ?? {
        'favorite channel': '861750372611129354',
        'number of events': 0,
      }

      const favoriteChannelName =
        stats.server.channelIdsToNames[favoriteChannelStat['favorite channel']]
      const favoriteChannelJoins = favoriteChannelStat['number of events']

      const lines = [
        { content: `{Favorite Voice Channel | underline}` },
        {
          content: `{${user} | bold} joined voice channels {${joinsTotal} | bold} times.`,
        },
        {
          content: `{${user} | bold}'s favorite channel was {${favoriteChannelName} | bold} which they joined {${favoriteChannelJoins} | bold} times.`,
        },
      ]

      return lines
    },
    SecBotVoiceEventsMutesFunction(stats) {
      const vec = stats.user['SecBot voice event type counts']
      const user = stats.user.name
      const mute = vec?.mute ?? 0
      const serverMute = vec?.['server mute'] ?? 0
      const selfMutes = Math.trunc(mute)
      const serverMutes = Math.trunc(serverMute)

      const lines = [
        { content: `{Mutes | underline}` },
        {
          content: `{${user} | bold} muted themselves {${selfMutes} | bold} times.`,
        },
      ]

      if (serverMutes > 0) {
        lines.push({
          content: `Additionally, {${user} | bold} was server muted {${serverMutes} | bold} times.\n Shameful. Or not. There is no context.`,
        })
      } else {
        lines.push({
          content: `Additionally, {${user} | bold} avoided being server muted according to records.`,
        })
      }
      return lines
    },
    SecBotScores(stats) {
      const user = stats.user?.name
      const firstEpochScore =
        stats.user['SecBot first epoch score']?.score ?? 750
      const finalScore = stats.user?.['SecBot user final score']?.score ?? 750

      const lines = [
        { content: '{SecurityBot Scores | underline}' },
        {
          content:
            'On {April 1st, 2022 | bold} every user was generously given {750 | bold} social credit points.',
        },
        {
          content: `By the end of the first scoring period, {${user} | bold} had a score of {${firstEpochScore} | bold}.`,
        },
        {
          content: `As of the final grading period of the year, {${user} | bold} had a score of {${finalScore} | bold}.`,
        },
      ]

      if (firstEpochScore > finalScore) {
        lines.push({ content: `Maybe ${user} could try harder in 2023.` })
      } else {
        lines.push({
          content: `May ${user} continue to be a paragon of agreeableness in 2023!`,
        })
      }

      return lines
    },
    SecBotScoresHigh(stats) {
      const user = stats.user.name
      const userHighScore = stats.user['SecBot user max score']?.score ?? 750
      const serverHigh = stats.server['SecBot server high score']
      const serverHighScore = serverHigh.score
      const serverHighScoreUser = stats.server.idsToNames[serverHigh.member_id]

      const lines = [
        { content: '{High Score | underline}' },
        {
          content: `{${user} | bold} had a high score of {${userHighScore} | bold}`,
        },
      ]

      if (userHighScore === serverHighScore) {
        lines.push({
          content: `Looks like this was the highest score recorded of all users! Please contact the majors to claim a voucher that can be redeemed for one (1) sound to be added to JermaBot!\nPlease continue to be agreeable into the new year.`,
        })
      } else {
        lines.push({
          content: `Compared to the apex score of {${serverHighScore} | bold} achived by {${serverHighScoreUser} | bold}, their score can be improved. They should consider improving their agreeability in the new year.`,
        })
      }

      return lines
    },
    SecBotScoresLow(stats) {
      const user = stats.user.name
      const userLowScore = stats.user['SecBot user min score']?.score ?? 750
      const serverLow = stats.server['SecBot server low score']
      const serverLowScore = serverLow.score
      const serverLowScoreUser = stats.server.idsToNames[serverLow.member_id]

      const lines = [
        { content: `{Low Score | underline}` },
        {
          content: `{${user} | bold}'s lowest score was {${userLowScore} | bold}.`,
        },
      ]

      if (userLowScore === 750) {
        lines.push({
          content: `If the records are correct, {${user} | bold}'d score never dropped below their starting value, this behavior does not go unnoticed.'`,
        })
      }

      if (userLowScore === serverLowScore) {
        lines.push({
          content: `Incidently, this was the lowest score recorded since SecurityBot's inception on 4/1/22. The associated behavior that resulted in this score has hopefully been corrected.`,
        })
      } else {
        lines.push({
          content: `Even this score can be made to look impressive compared to the lowest recorded score of {${serverLowScore} | bold} by {${serverLowScoreUser} | bold}.`,
        })
      }
      return lines
    },
    SecBotScoresAverage(stats) {
      const user = stats.user.name
      const userAverage = (
        stats.user['SecBot user average score']?.score ?? 750
      ).toFixed(2)
      const serverAverages = Object.values(
        stats.server['SecBot server mean scores by epoch'].score,
      )
      const avg = (
        serverAverages.reduce((a, b) => a + b) / serverAverages.length
      ).toFixed(2)

      const lines = [
        { content: `{Average Scores | underline}` },
        {
          content: `The average score of the entire server over the year was {${avg} | bold}`,
        },
      ]

      if (userAverage >= avg) {
        lines.push({
          content: `{${user} | bold}'s average score of {${userAverage} | bold}, on average, was higher on average than the average, on average.`,
        })
      } else {
        lines.push({
          content: `{${user} | bold}'s average score of {${userAverage} | bold}, on average left a lot to be desired, on average.`,
        })
      }

      return lines
    },
    SecBotMessages(stats) {
      const numMessages =
        stats.server['SecBot number of messages recorded'].count
      const firstSecBotMessage = stats.server['SecBot first recorded message']
      const firstMessageAuthor =
        stats.server.idsToNames[firstSecBotMessage.author]
      const date = new Date(firstSecBotMessage.timestamp)
      const firstMessageTimestamp = date.toGMTString()

      const lines = [
        { content: '{Messages | underline}' },
        {
          content: `Since joining 'what have i done', SecurityBot has seen and recorded {${numMessages} | bold} messages.`,
        },
        {
          content: `The earliest message was recorded on {${firstMessageTimestamp} | bold}. Its contents are as follows:`,
        },
        {
          content: `{ ${firstMessageAuthor}: ${firstSecBotMessage.content} | bold}`,
        },
      ]

      if (firstSecBotMessage.author === stats.user.id) {
        lines.push({
          content: `There's nothing special about being the first entry in a database, so there is no reason for celebration.`,
        })
      } else {
        const userFirstSecBotMessage = stats.user[
          'SecBot first message in SecBot'
        ] ?? { content: '', timestamp: 0 }
        const userFirstTimestamp = new Date(
          userFirstSecBotMessage.timestamp,
        ).toGMTString()

        lines.push({
          content: `{${stats.user.name} | bold}'s first message was added to the database on {${userFirstTimestamp} | bold} with the following content:`,
        })
        lines.push({
          content: `{ ${stats.user.name}: ${userFirstSecBotMessage.content} | bold}`,
        })
      }

      return lines
    },
    SecBotMessagesEditedDeleted(stats) {
      const numEdited =
        stats.server['SecBot number of edited messages recorded']['0']
      const numDeleted =
        stats.server['SecBot number of deleted messages recorded']['0']
      const userDeleted =
        stats.user['SecBot number deleted messages per member'] ?? 0

      const lines = [
        { content: `{Edited and Deleted Messages | underline}` },
        {
          content: `When a message has been added to the database it cannot be removed. According to the records, {${numDeleted} | bold} messages were deleted, and another {${numEdited} | bold} were edited.`,
        },
      ]

      if (userDeleted === 0) {
        lines.push({
          content: `Of the messages deleted, {${stats.user.name} | bold} did not send a single one of them. `,
        })
      } else {
        lines.push({
          content: `Of the messages deleted, {${stats.user.name} | bold} deleted {${userDeleted} | bold} of them.`,
        })
      }

      return lines
    }, // Add positive/negative comments
    SecBotVoiceStateTime(stats) {
      const serverTotalTimeWatched =
        stats.server['SecBot total time of users watched'].toFixed(2)
      const userTimeWatched = Number.parseFloat(
        stats.user['SecBot hours watched'] ?? 0,
      ).toFixed(2)
      const minimumWage = (userTimeWatched * 10.1).toFixed(2)

      const lines = [
        { content: `{Time Watched in Voice Chat | underline}` },
        {
          content: `{DISCLAIMER: SecurityBot's uptime has not been 100%. This data analysis should not be treated as absolute and is only for speculative / entertainment purposes. | error bold}`,
        },
        {
          content: `SecurityBot watched users for a combined total of {${serverTotalTimeWatched} | bold} hours.`,
        },
        {
          content: `{${stats.user.name} | bold} was watched for {${userTimeWatched} | bold} of those hours hours.`,
        },
        {
          content: `If {${stats.user.name} | bold} was being paid Minimum hourly wage at Ohio rates ($10.10), they would have made {$${minimumWage} | bold} this year.`,
        },
      ]

      return lines
    },
    SecBotVoiceStateLongest(stats) {
      const lines = [{ content: `{Longest Voice Streaks | underline}` }]

      const stat = stats.user['SecBot Longest session'] ?? {
        hours: 0,
        timestamp: 0,
      }
      const longestTimeInVC = stat.hours.toFixed(2)
      if (longestTimeInVC === 0) {
        lines.push({
          content: `SecurityBot has no records of ${stats.user.name} connected to any Voice Channels. Hopefully the database will be more populated with you in 2023.`,
        })
        return lines
      }

      const dateLongestTimeInVC = new Date(stat.timestamp).toString()

      lines.push({
        content: `{${stats.user.name} | bold}'s longest time spent in VC continuously was {${longestTimeInVC} | bold} hours on {${dateLongestTimeInVC} | bold}. What was happening on that day?`,
      })

      return lines
    }, // needs testing
    SecBotMostPeople(stats) {
      const sessionStat = stats.user['SecBot largest session'] ?? {
        count: 0,
        members: [],
        timestamp: 0,
      }
      const peopleSpottedWith = sessionStat.members.map(
        (id) => stats.server.idsToNames[id],
      )
      const mostPeopleTimestamp = new Date(
        sessionStat.timestamp,
      ).toLocaleDateString('en-US', {
        dateStyle: 'long',
      })

      const lines = [
        { content: `{Largest group in Voice Chat | underline}` },
        {
          content: `{${stats.user.name} | bold} was spotted with {${peopleSpottedWith.length} | bold} other people on {${mostPeopleTimestamp} | bold}. Here's a list of who they were with:`,
        },
        { content: `{${peopleSpottedWith.join(', ')} | bold}` },
      ]

      return lines
    },
    CoolS() {
      return [
        {
          content: `    ____________\n   /            \\ \n  /              \\ \n /                \\ \n/                  \\ \n|         |        |\n|         |        |\n|         |        |\n|         |        |\n\\         |________|\n \\        \\ \n  \\        \\ \n   \\        \\ \n    \\        \\ \n    /\\        \\ \n   /  \\        \\ \n  /    \\        \\ \n /      \\        \\ \n/        \\        \\ \n|        |        |\n|        |        |\n|        |        |\n|        |        |\n\\                 /\n \\               /\n  \\             /\n   \\___________/`,
        },
      ]
    },
    BdrThanks() {
      return [
        {
          content: 'hey!',
        },
        {
          content: 'thanks for checking out whyd22 :)',
        },
        {
          content: 'i hope you had a good time on this amusement park ride',
        },
        {
          content:
            "it was a big effort to pull off, even if it doesn't look like it!",
        },
        {
          content:
            'I learned a lot through the process, which is half the reason why I work on these at all.',
        },
        {
          content:
            'the other half is the joy of being able to give and share a fun experience with everyone!',
        },
        {
          content:
            'so ty again, and I hope you have a great 2023 {:cheeto: | terminal-emoji}',
        },
      ]
    },
    BdrWhyd2023() {
      return [
        {
          content: '{:fear: | terminal-emoji}',
        },
        {
          content: "you'll have to wait and see {:benheh: | terminal-emoji}",
        },
      ]
    },
    BdrKian() {
      return [{ content: '{{{Whyd2022TerminalEmbeddedKian}}}' }]
    },
    EcfReflection() {
      return [
        {
          content: `I learned a {shitload | bold} in this project, between both securityBot and the Terminal here. `,
        },
        { content: `Believe it or not, this stuff is kinda complicated.` },
        {
          content: `It's definitely the largest project i've been able to be a part of.`,
        },
        {
          content: `It really wouldn't have happened without Ben, who actually has the drive to say "we are actually going to do this".`,
        },
        {
          content: `The 'subpoena documents' folder if you havn't read it has a bunch of exerpts from mostly real unedited text conversations between Ben and I (among others) talking about the projects this year. `,
        },
        {
          content: `There's a bunch of files but I think they're like worth reading though, so I hope you do.`,
        },
      ]
    },
    EcfScrapped() {
      return [
        {
          content: `Sadly not all of the stuff we though of ended up actually becoming a reality so here is some cut/scrapped content that didn't make it.`,
        },
        {
          content: `- SecurityBot was going to randomly join VC and sit in silence for a few seconds before leaving.`,
        },
        {
          content: `- SecurityBot was going to become SantaBot around christmas time and determine whether you were naughty or nice.`,
        },
        {
          content: `- We were initially going to write a chatbot called DeNNIS that was going to guide you through the data this year, this idea eventually became the terminal.`,
        },
        {
          content: `- We wanted to use a Machine Learning model to guess everyone's political ideology based on only their messages in here but the models weren't that easy to use`,
        },
        {
          content: `- We were also going to make a 'Majors compass' that determined which majors you were most similar to, Ben did put a good amount of work into it but it didnt turn out they way we/he wanted.`,
        },
      ]
    },
    TwcmNote() {
      return [
        { content: `Yo.` },
        {
          content: `> I feel like I don't often get to tell you guys how much I'm indebted to your friendship. The people in this server have transformed from an unaware idiot into a slightly-more aware idiot with incredible influences.`,
        },
        {
          content: `> I brag about each of you guys to my parents and coworkers all the time because of how caring, respectful, and real we all are to each other.`,
        },
        {
          content: `> Every once in a while I get to sit back and reflect on what a unique and beautiful group of people I have to call my friends, and what ditch I could have ended up in if I had never got to know any of you.`,
        },
        {
          content: `> I really can't articulate how much I love all of you to death and back. I joke about how I would take a bullet for everyone on the server, but with how much you guys have changed me for the better, how could I not. `,
        },
        {
          content: `> If Vegas is truly making me live on borrowed time, I could die happy knowing it would be a bit for the greatest group of dudes on earth.`,
        },
        {
          content: `> Shoutouts to Ben and Ethan for talking me out of my shell and getting me on this project,`,
        },
        {
          content: `  Shoutout to the Haroth gang for believing in the creative side I didn't think I had,`,
        },
        {
          content: `  Shoutout to the late squad for keeping my sleep schedule ruined,`,
        },
        { content: `  Shoutouts to you for caring enough to read this,` },
        {
          content: `  And here's to seeing how far this boat of spit and duct-tape can take us.`,
        },
        { content: `> I love you guys,` },
        { content: `{- Tristan | tristan} {:shred.gif: | terminal-emoji}` },
      ]
    },
    TwcmShred() {
      return [{ content: `{:shred.gif: | terminal-emoji}` }]
    },
    TwcmMoreShred() {
      return [
        {
          content: ``,
          type: 'image',
          height: '275px',
          width: '500px',
          url: '/whyd/2022/its-time-shred.gif',
        },
        { content: `${'{:shred.gif: | terminal-emoji}'.repeat(495)}` },
      ]
    },
    Document1() {
      return [
        { content: `{Sometime in 2021... | underline}` },
        {
          content: `{> Idea for April fools day next year: social credit scores | ethan}`,
        },
        { content: `{> what if we [REDACTED] | ben }` },
        { content: `{> lmao | wyatt }` },
        { content: `{>  | tristan }{:crackSoldier.webp: | terminal-emoji}` },
      ]
    },
    Document2() {
      return [
        { content: `{January 2022... | underline }` },
        { content: `{> What are we gonna do for april fools again | ethan }` },
        { content: `{> Social credit scores or [REDACTED] | ben }` },
        {
          content: `{> [REDACTED]??? Okay no lets just do social credit scores | ethan }`,
        },
        {
          content: `{> planning meeting soon | ben } {:benheh: | terminal-emoji} `,
        },
      ]
    },
    Document3() {
      return [
        { content: `{February 2, 2022 | underline }` },
        { content: `{> any availibility today for working session 0? | ben }` },
        {
          content: `{> Tristan will be awake at like 2 if I had to guess | ethan }`,
        },
        { content: `{> Didn't he have class? | ben }` },
        { content: `{> He goes back to bed afterwards | ethan }` },
        { content: `{>  | ben }{:nairoDisbelief: | terminal-emoji }` },
        { content: `{> He's on that bicameral sleep schedule | ethan }` },
        {
          content: `{> | ben }`,
          type: 'image',
          url: 'https://media.tenor.com/17TCRYBps5IAAAAC/i-dont-get-it-dont-get-it.gif',
          width: 480,
          height: 270,
        },
        { content: `{> He's on that bisexual sleep schedule | ethan }` },
        {
          content: `{  This is only relevant because its where the concept of the 'bisexual sleep schedule' originated | italic }`,
        },
      ]
    },
    Document4() {
      return [
        { content: `{February 17th, 2022 | underline}` },
        { content: `{> okay the api is up | ben }` },
        {
          content: `{> I just went in and added event listeners for all the needed events, now I need to go in and add the handlers for everything | ethan }`,
        },
        {
          content: `{> also I changed the name of the bot github repo lol | ethan }`,
        },
        { content: `{> covert operations | ethan }` },
        { content: `{> good call lol | ben }` },
        {
          content: `{> I wonder why UC offers a grad level class on oppression. Huh. | ben }`,
        },
      ]
    },
    Document5() {
      return [
        { content: `{February 18th, 2022 | underline }` },
        {
          content: `{> test token for authentication is currently 'fidlersphatass' | ben }`,
        },
        { content: `{>  | ethan }{:ethanass: | terminal-emoji}` },
        {
          content: `{> also the website is actually broken as I incorporate the DB schemas into the code | ben}`,
        },
        { content: `{> todo fix later | ben}` },
      ]
    },
    Document6() {
      return [
        { content: `{March 1, 2022 | underline }` },
        {
          content: `{> hey @/everyone, I've been noticing some targeted harassment towards people (definitely not trent) recently, so I installed a security camera in the server to try and dissuade bullying and the sorts, hope you're having a good day | ben}`,
        },
        { content: `{> so what is the plan | wyatt }` },
        { content: `{> The plan is in 3 parts:  | ben}` },
        {
          content: `{> 1. develop a discord bot, an API, a database, and a website | ben}`,
        },
        {
          content: `{> 2. Glue the parts together to form a social credit score system | ben}`,
        },
        {
          content: `{> 3. Release everyone's social credit scores on April fool's day | ben}`,
        },
        { content: `{> Oh god | wyatt}` },
        { content: `{> how do you determine social credit | wyatt}` },
        {
          content: `{> | ethan }`,
          type: 'image',
          url: '/whyd/2022/data/stickers/905986304339234946.png',
          width: 200,
          height: 200,
        },
        {
          content: `{> through a long list of arbitrary and convoluted rules | ben }`,
        },
        {
          content: `{> basically, it will be impossible for anyone to guess how their score will move week-to-week | ben }`,
        },
        {
          content: `{> but each action they take will either add or subtract from their starting score | ben }`,
        },
        {
          content: `{  At this point everyone in #do started telling eachother to fuck themselves | italic }`,
        },
        {
          content: `{  It's worth noting that at this point SecurityBot had literally ZERO FEATURES other than just saying that it was watching someone, so it was really funny to see people try to “use” it. Also, Wyatt had no idea what was happening which made it even better. | italic}`,
        },
      ]
    },
    Document7() {
      return [
        { content: `{March 1, 2022 J | underline }` },
        {
          content: `{  Josh figured he would attempt to figure out how SecurityBot worked, despite it not having any features yet. | italic }`,
        },
        {
          content: `{> wait is this a bot that you cloned from a repo and added to the server? See when a discord bot changes its subheading (Watching ____) it's global | josh }`,
        },
        { content: `{> He did it | ben}` },
        { content: `{> He found the fatal flaw | ben}` },
        { content: `{> Thankfully I can deploy our cover | ben }` },
        {
          content: `{> am bored and this is a fun little game to me, whats its key. | josh }`,
        },
        { content: `{> ? | ben }` },
        { content: `{> [] ! ? $help | josh}` },
        { content: `{> (He means prefix) | ethan}` },
        { content: `{> it doesnt have one | ben}` },
        {
          content: `{> So its a data collection thing, im guessing for use in the whidapi? | josh}`,
        },
        {
          content: `{  He has immediately figured out what SecurityBot is | italic}`,
        },
        {
          content: `{> well I don't have a database or anything | ben } {(true at the time) | italic}{ so if that's the case then its doing a bad job. | ben}`,
        },
        { content: `{> mmmmmm | josh}` },
        {
          content: `{> If you cant tell im trying to figure out what it does without asking directly | josh}`,
        },
        {
          content: `{> I wish you the best of luck in figuring out what it does | ben }`,
        },
        {
          content: `{> I think this means that he fell for the fake repo title I gave it | ethan}`,
        },
        {
          content: `{  'CS4198 - Advanced Methods in Classifying Actors' | italic }`,
        },
        { content: `{> he is barking up a barren tree | ben }` },
        {
          content: `{> Brendan: He's seeing if "it's going to ban him." for being an asshole to Chris | brendan}`,
        },
        {
          content: `{> @Ginger Asian FUCK YOU, I hate your soul rat busterd | josh }`,
        },
        { content: `{> Fuck you chis | josh }` },
        { content: `{> You pile of shite | josh}` },
        { content: `{> Worthless crab | josh}` },
        { content: `{> Get the fuck outa here | josh}` },
        {
          content: `{> What I'm seeing is that this project is a resounding success already | ethan}`,
        },
        { content: `{> with a sample size of Josh, I would concur | ben}` },
        { content: `{> Worthless crab | ethan}` },
        {
          content: `{> if someone realizes that 4891 is an anagram for 1984 can I change it to 4892 and gaslight them | ethan }`,
        },
        { content: `{> kian has brains tho. I assumed he saw it | ben}` },
        {
          content: `{  The first thing Kian said when SecBot joined was “1984”, I wonder if he truly knew. | italic }`,
        },
      ]
    },
    Document8() {
      return [
        { content: `{March 3, 2022 | underline }` },
        {
          content: `{> Uh oh will I have to uneacape data that I receive? | ben }`,
        },
        {
          content: `{> | ethan}`,
          type: 'image',
          height: '169px',
          width: '550px',
          url: '/whyd/2022/xkdc.png',
        },
        { content: `{> True | ben }` },
        {
          content: `{> I think the only spot where that could be an issue is in the json parsing, which is handled by my library | ben }`,
        },
        {
          content: `{> we have some pretty good black hat QA engineers among our ranks | ethan }`,
        },
        {
          content: `  Lu actually tried to do the whole DROP TABLES thing and it didnt work 😎`,
        },
      ]
    },
    Document9() {
      return [
        { content: `{March 4, 2022 | underline }` },
        {
          content: `{> a friend of mine raised a good point, each person's credit score should give them a role that segregates them on the sidebar. | ethan }`,
        },
        {
          content: `{> part of the april fools day thing could be sunsetting the 'minors' role. | ethan }`,
        },
        {
          content: `{> This idea is hilarious and a much larger con than expected lol. | ben }`,
        },
        {
          content: `{> yeah we would need to think or new role names that are just good/bad enough for people to hate them / become tribal over them | ethan }`,
        },
        {
          content: `{> then have all of them shuffled the next week | ethan }`,
        },
        {
          content: `{> like I feel like the new role names need to be not good at all | ethan }`,
        },
        {
          content: `{> let's have a discussion about this tomorrow, too good of an opportunity to pass up. | ben }`,
        },
      ]
    },
    Document10() {
      return [
        { content: `{March 15, 2022 | underline }` },
        {
          content: `{> | ben }`,
          type: 'image',
          height: '112px',
          width: '363px',
          url: '/whyd/2022/gitcommit.png',
        },
        { content: `{> | ethan}{:imstuff.webp: | terminal-emoji}` },
        { content: `{> I love writing helpful commit messages | ethan }` },
      ]
    },
    Document11() {
      return [
        { content: `{March 28, 2022 | underline }` },
        { content: `{> here's new api token | ben }` },
        {
          content: `{> MIIEpgIBAAKCAQEA32KNsdfffddfuR3WiuychbFvtGn... | ben wrap }`,
        },
        {
          content: `{...Lyam6KC3gsU3ZMkJ/yZ0TOY18fSex40+d4TM/JZxRY... | ben wrap}`,
        },
        {
          content: `{...GRt2oaZJDINPd6wOXM/rvF3NZXu68ezGA6LHmfUO4kvJw | ben wrap}`,
        },
        {
          content: `{> WTF | ethan }`,
          type: 'image',
          height: '41px',
          width: '132px',
          url: '/whyd/2022/toy18fsex.png',
        },
        {
          content: `{>  | ben}{:fear: | terminal-emoji} {:booba: | terminal-emoji}`,
        },
        { content: `{> absolutely unbelievable | ethan}` },
        {
          content: `{> doesnt even matter because that is the wrong one | ben}`,
        },
        { content: `{> pour one out for toy18fsex | ethan }` },
        {
          content: `{> IIEpQIBAAKCAvoHVWsgtQz1RVaDXr7hZYAUbefHVk9oNi... | ben wrap}`,
        },
        {
          content: `{...s5tfPCUMPegODuBHptgeW9A3MDwliT+iFG+wOicNCR4WSVE | ben wrap}`,
        },
        {
          content: `{> how | ethan }`,
          type: 'image',
          height: '19px',
          width: '52px',
          url: '/whyd/2022/cumpeg.png',
        },
        { content: `{> well, this one is working | ethan }` },
        { content: `{> thank cumpeg | ben}` },
      ]
    },
    Document12() {
      return [
        { content: `{March 30, 2022 | underline }` },
        {
          content: `{> @here pls vote on which set of role names you think would be best | ben }`,
        },
        { content: `{> gamers, gaming, games | ben }` },
        { content: `{> women, boys, (something else) | ben}` },
        { content: `{> fucks, doesn't fuck, doesn't know what sex is | ben}` },
        { content: `{> snord, harold, cheeto | ben }` },
        { content: `{> gigachad, chad, (something else) | ben}` },
        { content: `{> kaiser, normal person, same person | ben}` },
        { content: `{> kaiser, john, librarians | ben}` },
        { content: `{> gold, silver, bronze | ben}` },
        { content: `{> gold, sivler, blongs | ben}` },
        { content: `{> we gon go w blongs cause footblong | ben}` },
        {
          content: `{ "fucks, doesnt fuck, doesnt know what sex is" actually got 2nd place | italic }`,
        },
      ]
    },
    Document13() {
      return [
        { content: `{March 31, 2022 @ 2:07pm | underline }` },
        {
          content: `{> go ahead and change the channel names, seems like they're hidden correctly | ben }`,
        },
        { content: `{> could be gold-general or gold-garage | ethan }` },
        { content: `{> Blong-basement | ethan }` },
        {
          content: `{> basement is hilarious, both that and box give off lower-class vibes so both are good | ben }`,
        },
        {
          content: `{> @eljefe do you like "blong-box" or "blong-basement" more | ethan }`,
        },
        { content: `{> For what | wyatt}` },
        { content: `{> But blong box sounds better | wyatt }` },
      ]
    },
    Document14() {
      return [
        { content: `{March 31, 2022 @ 6:30pm | underline}` },
        { content: `{> I cant wait for race war tomorrow | wyatt }` },
        { content: `{> *class war | wyatt }` },
        { content: `{> next april fools: straight up racism | ben }` },
        { content: `{  4/1/23. start preparing. | italic}` },
      ]
    },
    Document15() {
      return [
        { content: `{March 31, 2022 @ 9:00pm | underline }` },
        { content: `{> tomorrow's schedule | ben}` },
        { content: `{> 6:00am - william closes #do | ben}` },
        {
          content: `{> 6:30am - bot automatically runs, activates the roles+channels, and sends an announcement to #do | ben}`,
        },
        { content: `{> ???am - morning chaos ensues | ben}` },
        {
          content: `{> 10:00am - the majors make our own post explaning the situation | ben}`,
        },
        { content: `{> 10:01am and on - profit | ben}` },
        { content: `{> dennis pranger, we call him DP | ethan }` },
        {
          content: `{> email hasn't replied, where the hell could he be | ben}`,
        },
        { content: `{> has anyone emailed him | ethan}` },
        { content: `{> me | ben}` },
        { content: `{> dennis pranger rap incoming though? | ben}` },
        { content: `{> yeah dennis, academy khan like ghengis | ethan}` },
        { content: `{> they a menace, runnin a con outta venice | ben}` },
        { content: `{> new lore? | ben}` },
      ]
    },
    Document16() {
      return [
        { content: `{March 31, 2022 @ 11:05pm | underline}` },
        { content: `{> the scoring has been scheduled | ben}` },
        { content: `{> im so nervous haha | ethan}` },
        { content: `{> teehee 😳 | ben}` },
        { content: `{> all the hard work boutta pay off | ben}` },
        { content: `{> you said you're waking up at 7:30 right? | ben}` },
        { content: `{> yeah | ethan}` },
        { content: `{> you need me to move SecBot to the top? | ethan}` },
        { content: `{> Nah I got it | ben}` },
        { content: `{> Bandrew | ben}` },
        { content: `{> lol | ethan}` },
        { content: `{> Gn | ethan}` },
        { content: `{> bandrew foreskin @ig | ben}` },
        { content: `{> blanderson | ethan}` },
        {
          content: `{  I decided like 3 hours ago that 'blandrew' would be a funny name. ben is now informing me that jacob told me to change my name. | italic}`,
        },
      ]
    },
    Document17() {
      return [
        { content: `{April 1, 2022 @ 7am | underline}` },
        { content: `{> immediately I dont anything | ethan}` },
        { content: `{> Im gonna snooze my aparm a few times | ethan}` },
        { content: `{> Not even a webhook message? | ethan}` },
        {
          content: `{  What was supposed to happen was ben's website sends a message in whid, which SecBot sees and uses to change everyone's roles. | italic }`,
        },
        { content: `{  30 minutes pass | italic }` },
        {
          content: `{> the thing ran but it didnt try to send the scores | ben}`,
        },
        { content: `{> im running it again | ben}` },
        {
          content: `{  Ben and I then hopped on discord and made sure that it actually worked. I skipped my morning class to make sure that we would be able to actually get it out. | italic }`,
        },
      ]
    },
    Document18() {
      return [
        { content: `{April 1, 2022 @ 11:30am | underline }` },
        { content: `{> we can def have a phase 2 meeting soon | ben}` },
        {
          content: `{> Fizz Khalifa got gold by going literally nothing 😭 | ethan}`,
        },
      ]
    },
    Document19() {
      return [
        { content: `{April 17, 2022 | underline}` },
        {
          content: `{> wanna invert all of the scoring for 1 week then create a new algorithm | ethan}`,
        },
        { content: `{> yeah we should def shake it up | ben}` },
        {
          content: `{> I think it would be fun to increase the point values for everything, positive or negative, and make scores wrap around back to 0 at some point so people's score just go all over the place. | ben }`,
        },
        {
          content: `{> time to drunkenly change the scoring system in time for this week's scores | ben}`,
        },

        {
          content: `{  After tristan got the score of 2200, we finally implemented the scores to cap at 1600; after that it would wrap back around to 0. Also if you went lower than 0 you would shoot up to 1600, that might explain some strange score changes that you would have had. | italic}`,
        },
        {
          content: `{  Also at this point sending cheeto would deduct 1000 points. | italic}`,
        },
        { content: `{> @Von can I get a cheeto cheeto? | ben}` },
        {
          content: `{  Von:  | josh}{:cheeto: | terminal-emoji} {:cheeto: | terminal-emoji}`,
        },
      ]
    },
    Document20() {
      return [
        { content: `{April 17, 2022 | underline}` },
        { content: `{  Mr Sloan: us.get securityBot4891 | josh}` },
        { content: `{  Us Bot: Error: specified user does not exist | josh}` },
        { content: `{>  | ethan}{:fear: | terminal-emoji}` },
        {
          content: `{Mr Sloan: I feel like its because I misspelled 'secuity' | josh}`,
        },
        { content: `{> wait | ethan}` },
        { content: `{> Wtf | ethan}` },
        { content: `{> How have I never realized this | ethan}` },
        { content: `{> dude no way | ben}` },
        { content: `{> How has nobody noticed this for months? | ben}` },
        { content: `{> IDK | ethan}` },
        {
          content: `{> Did you not notice either? | ethan}`,
        },
        { content: `{> @brendan did you notice and not tell me? | ethan}` },
        { content: `{> I didnt notice | ben}` },
        {
          content: `{  Brendan: I think I told you awhile ago and you didnt care | brendan}`,
        },
        { content: `{> sounds about right | ethan}` },
      ]
    },
    Document21() {
      return [
        { content: `{> June 29, 2022 | underline }` },
        {
          content: `{> So is Dennis canonically “missing” by this point? Or have they successfully returned from Georgia? | ben}`,
        },
        { content: `{> idk | ethan}` },
      ]
    },
    DocumentBonus() {
      return [
        { content: `{wow, you got through all of these. | italic}` },
        {
          content: `{These are excerpts from conversations that we had while working on SecBot & what have you done but mostly SecBot. | italic }`,
        },
        {
          content: `{When I finished writing putting all of these down I realized it was quite a bit. many a great time were had were had working on this project. | italic}`,
        },
        { content: `{Oh! | italic}` },
        {
          content: `{Since you went through and read all of these or spam-clicked though like 2 weeks later after I mention that there is a secret with a reward in it that no one found yet; | italic }`,
        },
        {
          content: `@me (ethan) discreetly and tell me that you found the "TERMINAL SECRET ENDING" <- all caps important and I will give you a free custom one-of-a-kind role. Supplies are limited!`,
        },
        { content: `Thanks for reading!` },
      ]
    },
  },
}
</script>
