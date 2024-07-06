require('dotenv/config');
const { Client, IntentsBitField, Interaction, GatewayIntentBits, Guild, MessageReaction } = require('discord.js');

const ms = require('ms')
const fs = require('fs');
const { addTextToImage } = require('./addTextToImage');
const m = require('gm');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
    ]
})

client.on('ready', () => {
    console.log("The bot is online. (maybe)")
    
    client.user.setActivity(`Veeloh is cool`, { type: 'WATCHING' })
})

client.on('messageCreate', async (message) => {
    let newData = `\n'${message.content}' written by: ${message.author.globalName}. In channel: ${message.channel.name}. Date: ${message.createdAt}`

    fs.appendFile('./logs/messagelogs.txt', newData, (err) => {

        if (err) throw err;
    })  
})

client.on('messageCreate', async (message) => {
    console.log(message.content);

    async function remoceAccess(user){
        const targetuser = await message.guild.members.fetch(user);
    
        const reason = 'Swearing isnt allowed. Lets keep it professional'
        const duration = '1h'
    
                if (!targetuser) {
                    await message.reply("That user doesn't exist in this server."); return;
                }
                
                if (targetuser.user.bot){
                    await message.reply("I can't remove access from a bot"); return;
                }
    
                const msDuration = ms(duration)
                if (isNaN(msDuration)){
                    await message.reply("Please provide a valid timeout duration.");
                    return;
                }
    
                if (msDuration < 5000 || msDuration > 2.419e9){
                    await message.reply("Timeout duration cannot be less than 5 seconds or more than 28 days.");
                    return;
                }
    
    
                try {
                    const { default: prettyMS } = await import( 'pretty-ms');
                    if (targetuser.isCommunicationDisabled()){
                        await targetuser.timeout(msDuration, reason)
                        await message.reply(`${targetuser}'s timeout has been updated to ${prettyMS(msDuration, {verbose: true} )}`)
                       message.delete();
                        return;
                    }
    
                    await targetuser.timeout(msDuration, reason)
                    await message.reply(`${targetuser} has been timed out for ${prettyMS(msDuration, {verbose: true} )}. \nReason: ${reason}`)
                    message.delete();
                    return;
    
                } catch (error) {
                    console.log(`there was an error while timing out: ${error}`)
                }
    
                
    }
   
   if (message.content == "<@1253920672615370812> !member count"){
    message.reply('This server has '+ message.guild.memberCount + ' people in it!')
   }
   if (message.content == "<@1253920672615370812> !report"){
    await message.channel.send({ files: [{ attachment: 'images/ratio.gif' }] });
    console.log(message.channel)
    message.channel.send('Owners pinged <@834907809510457364> <@1144417071212527716> (you are cooked) arrest this man right now!' )
   }
   if (message.content == '<@1253920672615370812> !silent alarm'){
    
    let dmChannel = await client.users.createDM('834907809510457364');
    dmChannel.send("silent alarm triggered in 'ARIE'!");
   }
   if (message.content == '<@1253920672615370812> !directory'){
    message.reply('Directory!')
    message.channel.send('Our Goals! - https://discord.com/channels/1253903512375529473/1253906860516442193')
    message.channel.send('General! - https://discord.com/channels/1253903512375529473/1253903512375529477')
    message.channel.send('Fast Planning - https://discord.com/channels/1253903512375529473/1253918503455428619')
    message.channel.send('Announcments - https://discord.com/channels/1253903512375529473/1253919793803952220')
    message.channel.send('rules - https://discord.com/channels/1253903512375529473/1253934281638809600')
   }
   if (message.content == '<@1253920672615370812> !help'){
    message.reply('Im here to help!')
    message.channel.send('<@1253920672615370812> !member count - shows the amount of members in the server')
    message.channel.send('<@1253920672615370812> !report - report a fellow member! (false reports will end with a timeout of 30 min)')
    message.channel.send('<@1253920672615370812> !silent alarm - report but sneaky (private dms the directors)')
    message.channel.send('<@1253920672615370812> !directory - tells the user where stuff is (if you use this you might be dumb)')
    message.channel.send('<@1253920672615370812> !Directors Meeting - Directors Meeting in 10 minutes (can not be called by average user)')
    message.channel.send("<@1253920672615370812> !shopping list - shows the user veeloh's shopping list")
    message.channel.send('<@1253920672615370812> !funny - for a random funny video or image!')

    message.channel.send('Use /femboyefy and input all the info needed to femboyefy the target!')
   }
   if (message.content == '<@1253920672615370812> !Directors Meeting'){
    if (message.channel.id == '1253919118986579979'){
        message.channel.send('<@&1253917232392704001> Directors meeting in 10 minutes!!')
    }
   }

   if (message.content == '<@1253920672615370812> !shopping list'){
    await message.channel.send('Veeloh has 1 item!')
    await message.channel.send('item number 1:')
    const rndInt = Math.floor(Math.random() * 4) + 1
    console.log(rndInt)
    if (rndInt == 1) {
        await message.channel.send({ files: [{ attachment: 'images/shoppinglist/listitem1.jpg' }] });
    }
    if (rndInt == 2) {
        await message.channel.send({ files: [{ attachment: 'images/shoppinglist/listitem2.png' }] });
    }
    if (rndInt == 3) {
        await message.channel.send({ files: [{ attachment: 'images/shoppinglist/listitem3.gif' }] });
    }
    if (rndInt == 4) {
        await message.channel.send({ files: [{ attachment: 'images/shoppinglist/listitem4.png' }] });
    }
   }
   if(message.content == '<@1253920672615370812> !funny'){

    var i = Math.floor(Math.random() * 239) + 1;
    await message.reply({ files: [{ attachment: './images/botjokes/' + i + '.mp4' }] });
   }

   //filter out swears
   //ass
   if (message.content.includes('ass')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said a*s');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Ass')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said a*s');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('ASs')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said a*s');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('ASS')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said a*s');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   //cock
   if (message.content.includes('cock')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the C*ck');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Cock')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the C*ck');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('COck')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the C*ck');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('COCk')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the C*ck');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('COCK')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the C*ck');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   //c*nt
   if (message.content.includes('cunt')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said C*nt');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Cunt')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said C*nt');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('CUnt')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said C*nt');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('CUNt')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said C*nt');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('CUNT')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said C*nt');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
//dick
   
   if (message.content.includes('dick')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said D*ck');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Dick')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said D*ck');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('DIck')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said D*ck');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('DICk')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said D*ck');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('DICK')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said D*ck');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   //f slur

   if (message.content.includes('faggot')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Faggot')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FAggot')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FAGgot')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FAGGot')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FAGGOt')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FAGGOT')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('fag')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Fag')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FAg')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FAG')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the F slur');
      await  message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   //fuck

   if (message.content.includes('fuck')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "f*ck"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Fuck')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "f*ck"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FUck')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "f*ck"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FUCk')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "f*ck"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('FUCK')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "f*ck"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
//nword
   if (message.content.includes('nigger')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Nigger')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIgger')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIGger')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIGGer')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIGGEr')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIGGER')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }

   if (message.content.includes('nigga')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Nigga')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIgga')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIGga')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIGGa')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('NIGGA')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said the n word');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }

   //shit
   if (message.content.includes('shit')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "Sh*t"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('Shit')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "Sh*t"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('SHit')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "Sh*t"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('SHIt')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "Sh*t"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
   if (message.content.includes('SHIT')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "Sh*t"');
       await message.reply("I'm sorry! but swearing is not allowed in this server!");
        remoceAccess(message.author);
    }
   }
//retarded
    if (message.content.includes('retard')){
        if (message.channel.type != 'dm'){
            let dmChannel = await client.users.createDM('834907809510457364');
            dmChannel.send(message.author.globalName+' said "Reta*rd"');
            await message.reply("I'm sorry! but swearing is not allowed in this server!");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('Retard')){
        if (message.channel.type != 'dm'){
            let dmChannel = await client.users.createDM('834907809510457364');
            dmChannel.send(message.author.globalName+' said "Reta*rd"');
            await message.reply("I'm sorry! but swearing is not allowed in this server!");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('REtard')){
        if (message.channel.type != 'dm'){
            let dmChannel = await client.users.createDM('834907809510457364');
            dmChannel.send(message.author.globalName+' said "Reta*rd"');
            await message.reply("I'm sorry! but swearing is not allowed in this server!");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('RETard')){
        if (message.channel.type != 'dm'){
            let dmChannel = await client.users.createDM('834907809510457364');
            dmChannel.send(message.author.globalName+' said "Reta*rd"');
            await message.reply("I'm sorry! but swearing is not allowed in this server!");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('RETArd')){
        if (message.channel.type != 'dm'){
            let dmChannel = await client.users.createDM('834907809510457364');
            dmChannel.send(message.author.globalName+' said "Reta*rd"');
            await message.reply("I'm sorry! but swearing is not allowed in this server!");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('RETARd')){
        if (message.channel.type != 'dm'){
            let dmChannel = await client.users.createDM('834907809510457364');
            dmChannel.send(message.author.globalName+' said "Reta*rd"');
            await message.reply("I'm sorry! but swearing is not allowed in this server!");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('RETARD')){
        if (message.channel.type != 'dm'){
            let dmChannel = await client.users.createDM('834907809510457364');
            dmChannel.send(message.author.globalName+' said "Reta*rd"');
            await message.reply("I'm sorry! but swearing is not allowed in this server!");
             remoceAccess(message.author);
        }
    }

//bitch

if (message.content.includes('bitch')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "B*tch"');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
         remoceAccess(message.author);
    }
}
if (message.content.includes('Bitch')){
    if (message.channel.type != 'dm'){
        let dmChannel = await client.users.createDM('834907809510457364');
        dmChannel.send(message.author.globalName+' said "B*tch"');
        await message.reply("I'm sorry! but swearing is not allowed in this server!");
         remoceAccess(message.author);
    }
}

    //brainrot filtering
    if (message.content.includes('womp')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('rizz')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('gyatt')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('sigma')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('Sigma')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('alpha')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('beta')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('skibi')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
    if (message.content.includes('whomp')){
        if (message.channel.type != 'dm'){
            await message.reply("No brainrot loser");
             remoceAccess(message.author);
        }
    }
   

});

//apply role auto
client.on('guildMemberAdd', async member => {
    console.log("new member! adding role!")
    let role = member.guild.roles.cache.find(r => r.name === "Member");
    
    member.roles.add(role).catch(console.error);

    console.log("Role applied", role);
    
  
    client.channels.cache.get('1253903512375529477').send(`Welcome to A.R.I.E! Use "<@1253920672615370812> !help" for a list of commands\nPlease read our-goals & rules!`)


});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName == 'accessremover'){
        if (interaction.member.roles.cache.some(role => role.name === 'director')){
           
             const user = interaction.options.get('user');
            const reason = interaction.options.get('reason');
            const duration = interaction.options.get('duration');
            
            const targetuser = await interaction.guild.members.fetch(user);

            if (!targetuser) {
                await interaction.reply("That user doesn't exist in this server."); return;
            }
            
            if (targetuser.user.bot){
                await interaction.reply("I can't remove access from a bot"); return;
            }

            const msDuration = ms(duration.value)
            if (isNaN(msDuration)){
                await interaction.reply("Please provide a valid timeout duration.");
                return;
            }

            if (msDuration < 5000 || msDuration > 2.419e9){
                await interaction.reply("Timeout duration cannot be less than 5 seconds or more than 28 days.");
                return;
            }


            try {
                const { default: prettyMS } = await import( 'pretty-ms');
                if (targetuser.isCommunicationDisabled()){
                    await targetuser.timeout(msDuration, reason.value)
                    await interaction.reply(`${targetuser}'s timeout has been updated to ${prettyMS(msDuration, {verbose: true} )}`)
                    return;
                }

                await targetuser.timeout(msDuration, reason.value)
                await interaction.reply(`${targetuser} has been timed out for ${prettyMS(msDuration, {verbose: true} )}. \nReason: ${reason.value}`)
                return;

            } catch (error) {
                console.log(`there was an error while timing out: ${error}`)
            }
        }
    }
    else if (interaction.commandName == 'femboyefy'){
        const username = interaction.options.get('username')
        const channel = interaction.options.get('channel')
        const outputPath = 'images/brandnewimage/finishedimage.jpg'; // Replace with desired output path
        console.log(username.value)
        const textToAdd = `${username.value} is a huge femboy!!`;



        await addTextToImage(textToAdd, outputPath);

        await interaction.reply({ files: [{ attachment: 'images/brandnewimage/finishedimage.jpg' }] });

        fs.unlink('images/brandnewimage/finishedimage.jpg', (err) => {
            if (err) {
              // Handle specific error if any
              if (err.code === 'ENOENT') {
                console.error('File does not exist.');
              } else {
                throw err;
              }
            } else {
              console.log('File deleted!');
            }
          });
    }
    else if (interaction.commandName == 'logfile'){
        if (interaction.member.roles.cache.some(role => role.name === 'director')){
            await interaction.reply({ files: [{ attachment: './logs/messagelogs.txt' }] });
        }
    }
})






client.login(process.env.TOKEN);