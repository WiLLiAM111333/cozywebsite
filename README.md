# Heavily WIP

The table of contents links in `docs/tests/SuperMap.md` wont work for some reason, low priority issue so I will fix that when I'm done with the todo-list at the bottom of the file and cleaned up inevitable mistakes.

---

Had a change of mind in `backend/lib/auth`, I'll be using discord to sign in to store as little data about users as possible. It's for everyones sake 🙂

---

I've already deviated heavily from the plan below on Moderation and AutoModeration, so they are just a referance to get a rough expectation of what to expect.
Please do not use this as a set in stone plan of what will and wont be on the bot and dashboard!

---

# Plans for the website

* **Dashboard And Bot**
  - Configurable commands
  - Configurable automoderation 👮 
  - Event options *[read more here...](./backend/docs/dashboard/configurableEvents.md)*
  - Custom text commands
  - **✨ XP System ✨**
    - When to give which roles
    - Custom level-up message
    - Level-up notification channel
    - Level-up notification method (dm, channel, ping in last used channel)
    - XP rate modifier
    - No-XP role (It will stop the user from gaining experience)
    - Leaderboard
    - **❗ Commands ❗**
      - give-xp
      - remove-xp
      - give-level
      - remove-level
      - rank
  - **👮‍♂️ Moderation Sytem 👮‍♂️**
    - Switch to toggle logs of other bots' actions
    - Moderation Events
      - Warn
      - Mute
      - Kick
      - Ban
      - Gifban
      - External emote ban
      - Report
    - **🤖 Automation 🤖**
      - Switch to ignore other bots
      - Bad words
      - Repeated text
      - Invites
        - Invite created
        - Invite posted
      - External links (non Discord links)
      - Caps spam
      - Emoji spam
      - Spoiler spam
      - Mass-pings
      - Zalgo (T̶h̶i̶s̵ ̷i̷s̴ ̷z̵a̵l̵g̶o̸)
    - **❗ Commands ❗**
      - warn
      - mute
      - temp-mute
      - unmute
      - kick
      - ban
      - unban
        - gifban
        - emoteban
      - gifban
      - emote-ban
      - report
      - record (shows amount of each moderation incident for a pinged user or the message author)
      - clear-record
      - role-info
      - user-info
      - server-info
      - slowmode
  - **👋 Welcome and Goodbye 👋**
    - Welcome method (dm, channel, both)
    - Welcome channel
    - Welcome message (with formatting like mee6)
    - Goodbye Channel
    - Goodbye Message
    - Embed Switch
    - Embed options
      - Description
      - Color
      - Title
        - text
        - url
      - Author
        - text
        - url
        - icon
      - Footer
        - text
        - icon
        - url
      - Fields
        - inline
        - name
        - value
      - Thumbnail
        - image
        - url
        - height
        - width
      - Image
        - image
        - url
        - height
        - width
  - **📄 Help 📄**
    - Dashboard
    - Help Command
  - **🎶 Maybe music 🎶**
