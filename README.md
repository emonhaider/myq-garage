# myq-garage-monitor

[![Build Status](https://travis-ci.com/emonhaider/myq-garage-monitor.svg?branch=master)](https://travis-ci.com/emonhaider/myq-garage-monitor)

The primary function of AWS Lambda is to ping the MyQ api on behalf of the user and check the status of the user's garage door. If the garage door was found open longer than the window configured by the user, the application will attempt to close the door.

The function will be triggered via CloudWatch Event.

The MyQ api credentials will be stored in AWS Secrets manager and will be read during bootstrapping of the application. The credentials will cached for configured period of time to limit calls to Secrets Manageer.

Serverless framework (https://serverless.com/learn/overview) was used generate the necesary cloudformation stack to deploy the function. 
