# General overview

We are working in branches: 

The **main branch** is for code that is ready to go live. The current main branch is also the same as our product that is in use.
The **dev branch** is our default branch. This is where the version of the product that is under development is.
**Hotfix branches** are used when something goes wrong and needs to be fixed as soon as possible.
**Feature branches** are where you do most of your daily work. You create a feature branch for your work and when you are ready you merge it, following the merging strategy described below.

# Merge conflicts

If you encounter a merging conflict where another teammembers code clashes with your own and you need to discuss how to proceed (compromise or decide whose code takes precedence) the team communicates primarily via Discord.

# Branching and merging

**Feature**
A feature branch may branch off from:
*dev*
Must merge back into:
*dev*

Should be named feature-descriptive-name-of-feature, eg. feature-shoppingcart.

A feature might be incorporated into the product, or it might be discarded. As we are working with the DevOps mindset of continual learning and experimentation a discarded feature should also be seen as a valuable contribution.

*Merging*: First you merge dev into your feature branch. Then you may merge your feature branch into dev.

When your feature is no longer in active development the branch is deleted.

**Hotfix**
A hotfix branch may branch off from:
*main*
Must merge back into:
*main* and *dev*

Should be named hotfix-descriptive-name-of-hotfix, eg. hotfix-calculating-total-price.

The reason we branch off from main is that a hotfix intends to adress a critical issue in the live production release and therefore needs to be adressed as soon as possible. The hotfix is merged back into main to resolve the issue and into dev so that the hotfix isn't rolled back accidentally when a new release is ready.

Merging into main: first you merge main into your hotfix branch. Then you merge your hotfix branch into main.
Merging into dev: first you merge dev into your hotfix branch. The you merge your hotfix branch into dev. (If there are merge conflicts it's especially important you discuss with team members involved so they are aware of the critical issue and the fix.)

When the hotfix is no longer in active development the branch is deleted.