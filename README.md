# General overview

"Diagon Alley" is a webbshop for all your magical needs. The team behind it are:

- Dennis (AnderssonDennis)
- Maria (MariaFranz)
- Mia (Entitet)
- Tomas (tvoul)

We communicate on Discord and keep track of the project via a Trello-board.

We strive to work according to the three ways of DevOps (Kim et al.): The Principles of Flow, The Principles of Feedback, The Principles of Continual Learning and Experimentation.

# Getting started
After you clone the code from Github and open it with Visual Studio Code for the first time you need to run **npm install** in the terminal.

The next step, which applies any time before you run the project, is to open the database folder and remove the shop.db file. Then copy the template.db file and rename this copy shop.db and place it back into the database folder.

Now you are ready to run the project. You do this by typing **npm start** in the terminal.

# Branching-setup

We are working in branches: 

The **main branch** is for code that is ready to go live. The current main branch is also the same as our product that is in use.

The **dev branch** is our default branch. This is where the version of the product that is under development is.

**Hotfix branches** are used when something goes wrong and needs to be fixed as soon as possible.

**Feature branches** are where you do most of your daily work. You create a feature branch for your work and when you are ready you merge it, following the merging strategy described below.

## Merge conflicts

If you encounter a merging conflict where another teammembers code clashes with your own and you need to discuss how to proceed (compromise or decide whose code takes precedence) the team communicates primarily via Discord.

## Branching and merging

**Feature-branch**

A feature branch may branch off from:

- *dev*

Must merge back into:

- *dev*

Should be named:

 - feature-descriptive-name-of-feature, eg. feature-shoppingcart.

A feature might be incorporated into the product, or it might be discarded. As we are working with the DevOps mindset of continual learning and experimentation a discarded feature should also be seen as a valuable contribution.

*Merging*: 

First you merge dev into your feature branch. Then you may merge your feature branch into dev.

When your feature is no longer in active development the branch is deleted.

**Hotfix-branch**

A hotfix branch may branch off from:

- *main*

Must merge back into:

- *main* and *dev*

Should be named:

- hotfix-descriptive-name-of-hotfix, eg. hotfix-calculating-total-price.

The reason we branch off from main is that a hotfix intends to adress a critical issue in the live production release and therefore needs to be adressed as soon as possible. The hotfix is merged back into main to resolve the issue and into dev so that the hotfix isn't rolled back accidentally when a new release is ready.

*Merging*

Merging into main: first you merge main into your hotfix branch. Then you merge your hotfix branch into main.

Merging into dev: first you merge dev into your hotfix branch. The you merge your hotfix branch into dev. (If there are merge conflicts it's especially important you discuss with team members involved so they are aware of the critical issue and the fix.)

When the hotfix is no longer in active development the branch is deleted.

# Tests and CI
We perform three different kinds of tests:

We test our API with Postman
We test our GUI with WebdriverIO
We perform unit tests with Jest.

To run the unit tests write **npm test** in the terminal. The project doesn't need to be up and running for you to able to do these tests.

To run the API and GUI tests locally you need to have the project up and running (**npm start**). After this open a new terminal window and write for API-tests and for GUI-tests.

These tests are then gathered and automated to run in the following workflows:
name the workflows

The branches dev and main are protected. To be able to merge your changes you need to do a pullrequest. The automated tests run and should pass. There are also codeowners that do a coderewiev.

# CD

When deploying [named test workflows] are needs, meaning they need to pass for a deployment job to run.

Our dev server is:
Our main (live) server is:

About the database when we go live:
(Tänk på att få med eventuella abers kring detta.)