# Felis OpenXml JS

This is an implementation of OpenXML SDK in Javascript.

# Why is felis.openXml.js

I was going to develop a software to generate the presentations of summaries of my department automatically in 2019. The OpenXML SDK on .NET platform was my first choise. But the programming language on .NET platform, such as C#, F#, are strongly typed. I had to write each branch code for every element class, even I only operated the properties with the same name and type of them. So a new kind of SDK is in my plans. This SDK must summarize the same data as much as possible into the underlying interface, and support the weakly typed language. So that, we can code the functions flexibly. 

# The plan

This will be a long, complicated process if the SDK supports all functions of OpenXml. So I just develop the necessary basic class and some functions needed by my software first. The othe functions will be added step by step later.

At this time, this SDK is not up to release standards yet. The desig and coding work is still in progress.

# How the run the DEMO

There are two way to run the DEMO.

The first way is launch program in debug mode in vscode:
- run "npm i" in shell to download the dependency modules,
- open this workspace in vscode,
- press F5 to launch the program

The second way is launch program in command line:
- make sure this SDK is packed in ".\\.dist",
- run "npm i" in shell to download the dependency modules,
- run the command "node .\debug\nodejs\<xxx.js>" in shell. (<xxx.js> is a javascript file under the fold named "debug\nodejs")
