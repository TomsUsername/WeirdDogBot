const Discord = require('discord.js')
exports.run = async (bot, msg, args) => {
    let staff = msg.member.permissions.has('KICK_MEMBERS')
    let bstaff = msg.guild.me.permissions.has('KICK_MEMBERS')
    let reason = args.splice(1).join(' ');
    let user = msg.mentions.users.first()
    let modlog = msg.guild.channels.find('name', 'mod-log')
    if(!staff) return msg.channel.send("You need the permission ``KICK_MEMBERS`` to use this")
    if(!bstaff) return msg.channel.send("I need the permission ``KICK_MEMBERS`` to use this")
    if(msg.mentions.users.size < 1) return msg.channel.send("Mention a user to kick.")
    if(reason.length < 1) return msg.channel.send("Enter a reason to kick the person")
    if(!msg.guild.member(user).kickable) return msg.channel.send("I can't kick this person")
    msg.guild.member(user).kick()

    msg.channel.send(`Successfully kicked ` + user + ` for ` + reason)
    if(!modlog) return msg.channel.send("I couldn't find ``#mod-log``")
    const embed = new Discord.RichEmbed()
    .setAuthor(`${msg.author.tag}`, msg.author.avatarURL)
    .setColor(msg.guild.me.displayHexColor)
    .addField("User", user)
    .addField("Responsible Staff", `${msg.author.tag} (${msg.author.id})`)
    .addField("Reason", reason)
    msg.guild.channels.find('name', 'mod-log').send({embed, embed})
}