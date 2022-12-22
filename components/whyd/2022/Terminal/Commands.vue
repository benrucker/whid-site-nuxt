<script>
export default {
  methods: {
    testFunction() {
      return [
        {
          content: '{test command invoked | italic}'
        }
      ]
    },
    helpTerminalFunction(_) {
      const lines = [
        {
          content: '{whydOS v1.2 Database Terminal Interface | underline}'
        },
        {
          content: `Commands can be executed by typing them in or by clicking the SmartButtons (patent pending) that are tuned to present the data optimized for your analytical experience.`
        },
        {
          content: `{Directory of general System commands v.1 | underline}`
        },
        {
          content: `'ls' - List executables in current directory\n'cd ..' - Navigate one directory up\n'cd [folder]' - Navigate to [folder]\n'dir' - Display working directory `
        },
        {
          content:
            '{NOTICE: The Information accessible is highly sensitive and should not be published. | error}'
        },
        { content: '{In the case of Security Breach... | error}' },
        {
          content: '{[TODO: Security Breach Contingency Plan] | error}'
        }
      ]
      return lines
    },
    SecBotDMsFunction(_) {
      const numWalter = 5
      const differentWalterUsers = 3

      const lines = [
        {
          content: '{@secuityBot4891#1995 Direct Message logs... | underline}\n'
        },
        {
          content: `This image was sent {${numWalter} | bold} times by {${differentWalterUsers} | bold} users.`,
          type: 'image',
          url: 'https://media.tenor.com/S_to1tY3ixUAAAAd/breaking-bad-walter-white.gif'
        }
      ]

      return lines
    },
    SecBotVoiceEventsFunction(stats) {
      const user = stats.user.name

      // let VECountTotal = 55
      const VECountTotal = Object.values(
        stats.server['SecBot voice event type_counts']
      ).reduce((accumulator, currentValue) => accumulator + currentValue)

      const VECountUser = Object.values(
        stats.user['SecBot voice event type counts']
      ).reduce((accumulator, currentValue) => accumulator + currentValue)
      const VECountMax = 55 // count for most active user
      const maxUser = '#MAX' // display name for most active user

      const lines = [
        {
          content: `{Voice Events | underline}`
        },
        {
          content: `SecurityBot observed {${VECountTotal} | bold} 'Voice Events' from it's initialization to the end of the year.`
        },
        {
          content: `Voice Events include joining, leaving, moving channels as well as muting, deafening, turning on webcam as well as their opposites.`
        }
      ]

      if (VECountUser === VECountMax) {
        lines.push({
          content: `User {${maxUser} | } had the highest Voice Event count with {${VECountUser} | bold}!`
        })
      } else {
        lines.push({
          content: `User {${user} | bold} had a Voice Event count of {${VECountUser} | bold} compared to {${maxUser} | bold} with the highest count of {${VECountMax} | bold}!`
        })
      }

      // add top 5 list either as addition to this one or another command that displays afterwards.
      return lines
    },
    SecBotVoiceEventsMostActiveDayFunction(stats) {
      const user = stats.user.name
      const MADUser = stats.user['SecBot most active voice event days'] // mostActiveDay and numEvents
      // Date.today().toString("MMMM dS, yyyy") // "April 12th, 2008"
      const date = new Date(MADUser.mostActiveDay)
      const MADUserDate = date.toLocaleDateString('en-US', {
        dateStyle: 'long'
      })
      const MADServerDate = '#DATE'
      const MADServerNum = 55

      const lines = [
        {
          content: `{Most Active days by Voice Event count | underline}`
        },
        {
          content: `{${user} | bold} was most active on {${MADUserDate} | bold} with {${MADUser.numEvents} | bold} unique events.`
        },
        {
          content: `The server's most active day overall was {${MADServerDate} | bold} with {${MADServerNum} | bold} unique recorded events...`
        },
        {
          content:
            'SecurityBot did not note any outstanding events occurring on that day... Additional analysis required.'
        }
      ]

      return lines
    },
    SecBotVoiceEventsFavoriteVoiceChannelFunction(stats) {
      // very subject to change when data relating to actual time in VCs is computed;
      // compare number of joins and total time spent in a channel
      const user = stats.user.name
      const joinsTotal = Math.trunc(
        stats.user['SecBot voice event type counts'].join
      )
      const favoriteChannelName = '#CHANNEL'
      const favoriteChannelJoins = 55

      const lines = [
        { content: `{Favorite Voice Channel | underline}` },
        {
          content: `{${user} | bold} joined voice channels {${joinsTotal} | bold} times.`
        },
        {
          content: `{${user} | bold}'s favorite channel was {${favoriteChannelName} | bold} which they joined {${favoriteChannelJoins} | bold} times.`
        }
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
          content: `{${user} | bold} muted themselves {${selfMutes} | bold} times.`
        }
      ]

      if (serverMutes > 0) {
        lines.push({
          content: `Additionally, {${user} | bold} was server muted {${serverMutes} | bold} times.\n Shameful. Or not. There is no context.`
        })
      } else {
        lines.push({
          content: `Additionally, {${user} | bold} avoided being server muted according to records.`
        })
      }
      return lines
    },
    SecBotScores(stats) {
      const user = stats.user.name
      const firstEpochScore = 55 // stats.user[""]
      const finalScore = stats.user['SecBot user final score'].score

      const lines = [
        { content: '{SecurityBot Scores | underline}' },
        {
          content:
            'On April 1st, 2022 every user was generously given 750 social credit points.'
        },
        {
          content: `By the end of the first scoring period, {${user} | bold} had a score of {${firstEpochScore} | bold}.`
        },
        {
          content: `As of the final grading period of the year, {${user} | bold} had a score of {${finalScore} | bold}.`
        }
      ]

      if (firstEpochScore > finalScore) {
        lines.push({ content: `[Negative Remark]` })
      } else {
        lines.push({ content: `[Positive Remark]` })
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
          content: `{${user} | bold} had a high score of {${userHighScore} | bold}`
        }
      ]

      if (userHighScore === serverHighScore) {
        lines.push({
          content: `Looks like this was the highest score recorded of all users! Please contact the majors to claim a voucher that can be redeemed for one (1) sound to be added to JermaBot!\nPlease continue to be agreeable into the new year.`
        })
      } else {
        lines.push({
          content: `Compared to the apex score of {${serverHighScore} | bold} achived by {${serverHighScoreUser} | bold}, their score can be improved. They should consider improving their agreeability in the new year.`
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
          content: `{${user} | bold}'s lowest score was {${userLowScore} | bold}.`
        }
      ]

      if (userLowScore === 750) {
        lines.push({
          content: `If the records are correct, {${user} | bold}'d score never dropped below their starting value, this behavior does not go unnoticed.'`
        })
      }

      if (userLowScore === serverLowScore) {
        lines.push({
          content: `Incidently, this was the lowest score recorded since SecurityBot's inception on 4/1/22. The associated behavior that resulted in this score has hopefully been corrected.`
        })
      } else {
        lines.push({
          content: `Even this score can be made to look impressive compared to the lowest recorded score of {${serverLowScore} | bold} by {${serverLowScoreUser} | bold}.`
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
          content: `The average score of the entire server over the year was {${serverAverage} | bold}`
        }
      ]

      if (userAverage >= serverAverage) {
        lines.push({
          content: `{${user} | bold}'s average score of {${userAverage} | bold}, on average, was higher on average than the average, on average.`
        })
      } else {
        lines.push({
          content: `{${user} | bold}'s average score of {${userAverage} | bold}, on average left a lot to be desired, on average.`
        })
      }

      return lines
    },
    SecBotMessages(stats) {
      const firstSecBotMessage = stats.server['SecBot first recorded message']
      const firstMessageAuthor =
        stats.server.idsToNames[firstSecBotMessage.author]
      const date = new Date(firstSecBotMessage.timestamp)
      const firstMessageTimestamp = date.toGMTString()

      const lines = [
        { content: '{Messages | underline}' },
        {
          content: `On {${firstMessageTimestamp} | bold} SecurityBot recorded it's first message in 'what have i done'. Its contents are as follows:`
        },
        {
          content: `{${firstMessageAuthor}: ${firstSecBotMessage.content} | bold}`
        }
      ]

      if (firstSecBotMessage.author === stats.user.id) {
        lines.push({
          content: `There's nothing special about being the first entry in a database, so there is no reason for celebration.`
        })
      } else {
        const userFirstSecBotMessage =
          stats.user['SecBot first message in SecBot']
        const userFirstTimestamp = new Date(
          userFirstSecBotMessage.timestamp
        ).toGMTString()

        lines.push({
          content: `{${stats.user.name} | bold}'s first message was added to the database on {${userFirstTimestamp} | bold} with the following content:`
        })
        lines.push({
          content: `{ ${stats.user.name}: ${userFirstSecBotMessage.content} | bold}`
        })
      }
    }, // ADD NUMBER OF TOTAL MESSAGES SEEN BY SECBOT TO THIS
    SecBotEditedDeletedMessages(stats) {},
    SecBotVoiceStateTime(stats) {
      // calculate minimum wage
      // user time + total man hours
    },
    SecBotVoiceStateLongest(stats) {
      // longest user spent in vc
      // single day where they were in VC the longest
    },
    MetaSecBotDevelopment() {
      // describe how the scoring worked? including the initial method and how it was changed to be wackier after a few weeks while ben was drunk? (cheeto cheeto)
      // include how scores loop around from 1600
      // at 7am on april 1st Ethan and Ben met up to make sure that it worked, and it didnt so we needed to manually activate it.
      // creation of Dennis
      // CUMPEG
      // format all of these like they are chat logs between Ben and Ethan?
      // have some corrupted / jumbled text
      // folder title: subpoena documents, backups,
    }
  }
}
</script>
