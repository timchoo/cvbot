var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment 
var botConnectorOptions = {  
     appId: process.env.BOTFRAMEWORK_APPID,  
     appSecret: process.env.BOTFRAMEWORK_APPSECRET  
}; 
 
// Create bot 
var bot = new builder.BotConnectorBot(botConnectorOptions);

// Create Luis Dialog
var dialog = new builder.LuisDialog(process.env.LUIS_APIURL);

bot.add('/', dialog);

dialog.on('About',builder.DialogAction.send('I have a broad range of experience across diverse disciplines, including software development, solutions delivery, strategy consulting, project management, market analysis, technical pre-sales support, crafting compelling presentation material, and public speaking. As a result, I possess the ability to empathize, understand, and interface with both business audiences (customers, stakeholders, management) as well as technical staff (engineering, IT). In my current role as a Senior Software Engineer / Technical Evangelist for IBM I showcase IBM\'s superiority across a wide portfolio of products covering everything from IoT, mobile development, DevOps, social, and enterprise collaboration. I present at customer conferences worldwide  as well as advise internal product management on how to improve our products. '));
dialog.on('Strengths', builder.DialogAction.send('1.I absorb information quickly, I can take large quantities of information or complex topics and distill them down into simple concepts.2. I can quickly locate the answers to queries / resolve any questions 3. I drive projects to completion.4. I bring a broad range of experience across multiple disciplines, from programming, to solutions delivery, to strategy consulting, to competitive analysis and sales. I believe I can bring a wide perspective to the team across technologies and industries.5. I am equally comfortable working with technical as well as business audiences and can tailor my dialogue or approach depending on who I am interacting with. So on the one hand I am converse with the developers about development tools, approaches etc, but at the same time I am can work with the customers or business owners about their issues and empathize with them.6. I am comfortable presenting to large crowds/audiences'));
dialog.on('Weaknesses', builder.DialogAction.send('I intensely dislike confrontation, I find it hard to say no to tasks which means I get saddled doing things I don’t want to do sometimes. How do I fix this? I ask for some time to provide an answer. Then I can think about it and provide a measured response that I like to write down before I take a deep breath, bite the bullet and do it.'));
dialog.on('Education', builder.DialogAction.send('I have a B.Sc. in Computer Science from Bob Jones University'));
dialog.on('Certifications', builder.DialogAction.send('I am a Project Management Professional (PMP)'));
dialog.on('Title', builder.DialogAction.send('I am a senior software engineer as well as technial evangelist with IBM Analytics'));
dialog.on('WorkExperience', builder.DialogAction.send('I’m currently a senior software enigneer with the Competitive Project Office in IBM Analytics. I cover products in the mobile, DevOps, IoT, as well as Enterprise Social Solutions portfolio. That means I have to be familiar with both our products as well as those of the competition such as Microsoft and Google. My role is both internal as well as external facing. On the one hand I travel around the world delivering a series of roadshows to customers touting the competitive advantages of our products vis-à-vis the competition. This is a half-day session where 2 of us will deliver both presentations as well as technical demos to showcase our superiority. On the other hand I consult with the product development teams to keep them abreast of the competition and to make them aware of areas where we are falling behind. I do walkthroughs with PMs to make sure they understand the gravity of the situation. At the same time I also help our field sales folks close deals where there is a significant competitive threat, whether it’s a greenfield, head to head, or defend opportunity. Before this I was a strategy consulting with BCS. I worked mainly with financial service/insurance clients to help them align their business strategy with technology initiatives. I would come in, conduct interviews with the client to understand their goals, current infrastructure, and then apply a model such as heatmaps, component business modeling etc to help them prioritize. Finally I would create a roadmap for implementation. I started out in IBM as a solutions consultant where I worked with clients across APAC and the USA implementing software solutions built on IBM platforms. In the beginning this was primarily using Domino, but over time grew to include WebSphere and Commerce. For more detail please check my LinkedIn profile at [LinkedIn profile](http://www.linkedin.com/in/timchoo)'));
dialog.on('Patents', builder.DialogAction.send('Yes, United States US 20070276676 A1 Social Information System'));
dialog.on('Skills', builder.DialogAction.send('I have skills in Javascript, Java, Eclipse, Xcode, Swift/iOS, MobileFirst Platform, MobileFirst Quality Assurance, JQuery, Bootstrap, WordPress, Windows 10 IoT, Azure, Bluemix, SalesForce Chatter, Microsoft Office 365, Yammer, SharePoint, Exchange, Lync, InfoPath, Amazon WorkMail, Slack, Google Apps, Atlassian Confluence, Socialcast, Adobe Experience Manager, WebSphere Portal, Domino, IBM Connections, Sametime, JBoss, MyEclipse, Git, TeamForge, Subversion, JIRA, Good Technologies MDM, Xtify, Urban Airship, strategy consulting, conducting workshops/facilitating, project management, SCRUM, utilizing prioritization frameworks (heatmaps, BCD, Component business modeling)'));
dialog.onDefault(builder.DialogAction.send("Please ask me a question about my resume/CV. You can ask me about myself, my current role, my work history, my skills, experience, certifications, patents, etc."));

bot.configure({
    userWelcomeMessage: "Welcome to Tim's CV Bot",
    goodbyeMessage: "Goodbye"
});


// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
