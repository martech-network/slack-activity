# slack-activity
# Join https://martech.network for full tutorial

Adobe Campaign Custom Slack Activity

Adobe Campaign is a powerful orchestration platform, but it lacks a native way to send real-time alerts to third-party collaboration tools. One of the most widely used tools in the industry is Slack, a platform designed for instant communication, team collaboration, and streamlined workflows across channels.
Typically, Adobe Campaign relies on email for operational notifications. However, this approach can quickly become overwhelming as most solutions generate hundreds of automated email alerts, making it easy for critical messages to get lost or ignored.

This “Proof of concept” was created to solve that problem. By building a Custom Slack Activity for Adobe Campaign, I offer a modern alternative that delivers alerts directly to Slack channels, right where teams are already working. This approach helps reduce email clutter and ensures that important updates are seen and acted on in real time.

Prerequisites
I.	Slack App
To send messages to Slack channels, use the chat.postMessage API method. Start by creating a Slack app bot through the Slack API portal, then install it into your workspace and configure the necessary permissions—specifically, ensure the bot has both chat:write and chat:write.public scopes enabled. Once installed and properly authorized, authenticate with the Bot Token to interact with Slack programmatically using chat.postMessage endpoint. For a step-by-step guide, refer to the following YouTube tutorial on setting up a Slack bot app. Note: this setup should be completed by your Slack workspace administrator.

II.	Adobe Campaign
Ensure you have development or administrative access to Adobe Campaign, as you’ll need the ability to create and modify key components such as schemas, input forms, custom activities, and other critical assets required for integration.

III.	Postman (or others)
Before implementing your custom JSON templates or integrating business logic into Adobe Campaign, it's essential to test your payloads using an API tool like Postman. This ensures your requests are well-structured and Slack-ready before deploying them in production. If you're familiar with API testing, you'll feel right at home here.


