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

      const VECountUser = Object.values(
        stats.user['SecBot voice event type counts'],
      ).reduce((accumulator, currentValue) => accumulator + currentValue)

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
      const MADUser = stats.user['SecBot most active voice event days'] // mostActiveDay and numEvents
      // Date.today().toString("MMMM dS, yyyy") // "April 12th, 2008"
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
        stats.user['SecBot voice event type counts'].join,
      )
      const favoriteChannelStat = stats.user['SecBot favorite VC by joinsmoves']
      const favoriteChannelName = favoriteChannelStat['favorite channel']
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
      const selfMutes = Math.trunc(vec.mute)
      const serverMutes = Math.trunc(vec['server mute'])

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
      const user = stats.user.name
      const firstEpochScore = stats.user['SecBot first epoch score'].score
      const finalScore = stats.user['SecBot user final score'].score

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
      const userHighScore = stats.user['SecBot user max score'].score
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
      const userLowScore = stats.user['SecBot user min score'].score
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
      const userAverage = stats.user['SecBot user average score'].score
      const serverAverage = 55 // stats.server['']

      const lines = [
        { content: `{Average Scores | underline}` },
        {
          content: `The average score of the entire server over the year was {${serverAverage} | bold}`,
        },
      ]

      if (userAverage >= serverAverage) {
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
          content: `{${firstMessageAuthor}: ${firstSecBotMessage.content} | bold}`,
        },
      ]

      if (firstSecBotMessage.author === stats.user.id) {
        lines.push({
          content: `There's nothing special about being the first entry in a database, so there is no reason for celebration.`,
        })
      } else {
        const userFirstSecBotMessage =
          stats.user['SecBot first message in SecBot']
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
        stats.user['SecBot number deleted messages per member']

      const lines = [
        { content: `{Edited and Deleted Messages | underlined}` },
        {
          content: `When a message has been added to the database it cannot be removed. According to the records, {${numDeleted} | bold} messages were deleted, and another {${numEdited} | bold} were edited.`,
        },
      ]

      if (userDeleted === 0) {
        lines.push({
          content: `Of the messages deleted, {${stats.user.name}| bold} did not send a single one of them. `,
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
        stats.user['SecBot hours watched'],
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

      const stat = stats.user['SecBot Longest session']
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
      const sessionStat = stats?.user['SecBot largest session'] ?? {
        count: 0,
        members: [],
        timestamp: '0',
      }
      const peopleSpottedWith = sessionStat.members.map((id) =>
        stats.server.idsToNames(id),
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
        { content: `{${peopleSpottedWith.join(',')} | bold}` },
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
          content: 'no',
        },
      ]
    },
  },
}
</script>
